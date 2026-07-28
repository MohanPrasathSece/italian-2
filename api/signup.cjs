const { submitToCRM, incrementLeadDashboard } = require("./_lib/crm.cjs");
const { getUser, saveUser, createSession } = require("./_lib/blobDb.cjs");
const {
  getCountryByISO,
  formatPhoneForBlob,
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

module.exports = async function signupHandler(req, res) {
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
  const countryIso = String(body.countryCode || "CH").toUpperCase();

  console.log(`[Signup] Incoming: name="${rawName}" email="${rawEmail}" country="${countryIso}"`);

  if (!rawName) return send(res, 400, { error: "Name is required" });
  if (!rawEmail || !validateEmail(rawEmail))
    return send(res, 400, { error: "Please enter a valid email address" });

  const country = getCountryByISO(countryIso);
  if (!validatePhone(rawPhone, country)) {
    return send(res, 400, {
      error: `Invalid phone number. Example: +${country.dialCode} ${country.example}`,
    });
  }

  const blobPhone = formatPhoneForBlob(rawPhone, country.dialCode);

  let crmResult = null;
  let crmAlreadyExists = false;
  let crmInvalid = false;
  try {
    console.log(`[Signup] Step 1/4: Submitting to CRM...`);
    crmResult = await submitToCRM({
      name: rawName,
      email: rawEmail,
      phone: rawPhone,
      countryCode: country.iso,
      message: "CryptoVest Capital — Signup Lead",
      outlineYourCase: "Signup enquiry via website",
      description: "CryptoVest Capital — Website Signup",
    });
    crmAlreadyExists = crmResult.duplicate || crmResult.alreadyExists;
    console.log(`[Signup] CRM success. duplicate=${crmAlreadyExists}`);
  } catch (crmErr) {
    const code = String(crmErr.code || "").toUpperCase();
    if (code === "INVALID_LEAD") {
      crmInvalid = true;
      console.warn(`[Signup] CRM rejected the lead (INVALID_LEAD). Not continuing.`);
      return send(res, 422, {
        error:
          "We couldn't process your enquiry with the information provided. Please review your details and try again.",
        code: "INVALID_LEAD",
      });
    }
    console.warn(`[Signup] CRM error (non-blocking):`, crmErr.message || crmErr);
    crmResult = null;
  }

  let existing = null;
  try {
    console.log(`[Signup] Step 2/4: Checking existing Blob user...`);
    existing = await getUser(rawEmail);
  } catch (e) {
    console.warn(`[Signup] Blob getUser warning:`, e.message);
    existing = null;
  }

  const wasAlreadyExists = crmAlreadyExists || !!existing;

  let user = existing;
  if (!user) {
    user = {
      email: rawEmail.toLowerCase(),
      name: rawName,
      phone: blobPhone,
      countryCode: country.iso,
      createdAt: new Date().toISOString(),
    };
    try {
      console.log(`[Signup] Step 3/4: Creating user in Blob...`);
      await saveUser(user);
    } catch (e) {
      console.warn(`[Signup] Blob saveUser warning:`, e.message);
    }
  }

  let sessionToken = null;
  try {
    console.log(`[Signup] Step 4/4: Creating session...`);
    const s = await createSession(user);
    sessionToken = s.token;
  } catch (e) {
    console.warn(`[Signup] createSession warning:`, e.message);
    sessionToken = require("./_lib/blobDb.cjs").generateSessionToken();
  }

  if (!crmInvalid) {
    try {
      await incrementLeadDashboard("signup", user.name, user.email);
    } catch (e) {}
  }

  if (wasAlreadyExists) {
    return send(res, 200, {
      success: true,
      alreadyExists: true,
      message:
        "It looks like you've already contacted us. We've recognized your details and will continue with your request.",
      user,
      sessionToken,
    });
  }

  return send(res, 200, {
    success: true,
    message: "Thank you! Your account has been created successfully.",
    user,
    sessionToken,
  });
};
