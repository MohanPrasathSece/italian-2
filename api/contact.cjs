const { submitToCRM, incrementLeadDashboard } = require("./_lib/crm.cjs");
const {
  getCountryByISO,
  validatePhone,
  validateEmail,
  sanitizeString,
} = require("./_lib/countries.cjs");

async function parseJson(req) {
  try {
    if (req.body !== undefined && req.body !== null) {
      return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    }
  } catch (e) {}
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (c) => (body += c.toString()));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function send(res, status, json) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(json));
}

module.exports = async function contactHandler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }
  if (req.method !== "POST") {
    return send(res, 405, { error: "Method not allowed" });
  }

  let body;
  try {
    body = await parseJson(req);
  } catch (e) {
    return send(res, 400, { error: "Invalid request body" });
  }

  const rawName = sanitizeString(body.name || "");
  const rawEmail = sanitizeString(body.email || "");
  const rawPhone = String(body.phone || "");
  const rawMessage = sanitizeString(body.message || "");
  const countryIso = String(body.countryCode || "CH").toUpperCase();

  console.log(`[Contact] Incoming: name="${rawName}" email="${rawEmail}" country="${countryIso}" msg_length=${rawMessage.length}`);

  if (!rawName) return send(res, 400, { error: "Name is required" });
  if (!rawEmail || !validateEmail(rawEmail))
    return send(res, 400, { error: "Please enter a valid email address" });

  const country = getCountryByISO(countryIso);
  if (!validatePhone(rawPhone, country)) {
    return send(res, 400, {
      error: `Invalid phone number. Example: +${country.dialCode} ${country.example}`,
    });
  }

  let crmResult = null;
  let alreadyExists = false;
  try {
    console.log(`[Contact] Submitting to CRM...`);
    crmResult = await submitToCRM({
      name: rawName,
      email: rawEmail,
      phone: rawPhone,
      countryCode: country.iso,
      message: rawMessage || "General website enquiry",
      outlineYourCase: rawMessage || "Contact form submission",
      description: "CryptoVest Capital — Contact Enquiry",
    });
    alreadyExists = crmResult.duplicate || crmResult.alreadyExists;
    console.log(`[Contact] CRM success. duplicate=${alreadyExists}`);
  } catch (crmErr) {
    const code = String(crmErr.code || "").toUpperCase();
    if (code === "INVALID_LEAD") {
      console.warn(`[Contact] CRM rejected (INVALID_LEAD). Not continuing.`);
      return send(res, 422, {
        error:
          "We couldn't process your enquiry with the information provided. Please review your details and try again.",
        code: "INVALID_LEAD",
      });
    }
    console.warn(`[Contact] CRM error:`, crmErr.message || crmErr);
    return send(res, 502, {
      error:
        "We couldn't process your enquiry at this time. Please try again shortly or reach us directly by email.",
    });
  }

  try {
    await incrementLeadDashboard("contact", rawName, rawEmail);
  } catch (e) {}

  if (alreadyExists) {
    return send(res, 200, {
      success: true,
      alreadyExists: true,
      message:
        "It looks like you've already contacted us. We've recognized your details and will continue with your request.",
    });
  }

  return send(res, 200, {
    success: true,
    message:
      "Thank you for contacting us. Your message has been received, and our team will get back to you shortly.",
  });
};
