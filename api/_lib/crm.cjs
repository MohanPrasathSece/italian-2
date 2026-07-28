const { parseName, getCountryByISO, formatPhoneForCRM, sanitizeString } = require("./countries.cjs");

const WEBSITE_NAME = "CryptoVest Capital";

async function submitToCRM(leadData) {
  const crmEndpoint =
    process.env.CRM_URL ||
    process.env.CRM_ENDPOINT ||
    "https://api.myinvesttrade.com/api/lead_management/api/affiliates";

  const crmToken =
    process.env.CRM_TOKEN ||
    process.env.CRM_AFFILIATE_TOKEN ||
    "AFF_1_697ac63e6f88cac9f990b1a5c4beaefd";

  const country = getCountryByISO(leadData.countryCode || "CH");
  const { first_name, last_name } = parseName(leadData.name);
  const finalPhone = formatPhoneForCRM(leadData.phone || "", country.dialCode);
  const countryName = country.iso.toLowerCase();
  const description = sanitizeString(leadData.message || leadData.description || WEBSITE_NAME);

  const payload = {
    country_name: countryName,
    description: description || "Website Lead",
    phone: finalPhone,
    email: sanitizeString(leadData.email),
    first_name: sanitizeString(first_name),
    last_name: sanitizeString(last_name),
    custom_fields: {
      Source_ID: "Website",
      Outline_Your_Case: sanitizeString(leadData.message || leadData.outlineYourCase || "Website Enquiry"),
    },
  };

  console.log(`[CRM] Submitting payload:`, JSON.stringify(payload));

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const headers = {
    "Content-Type": "application/json",
    Token: crmToken,
    Authorization: `Bearer ${crmToken}`,
    "X-Affiliate-Token": crmToken,
    "x-token": crmToken,
  };

  let response;
  try {
    response = await fetch(crmEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
  } catch (netErr) {
    console.error(`[CRM] Network error:`, netErr);
    throw new Error("CRM network failure");
  }

  const statusCode = response.status;
  const rawText = await response.text().catch(() => "");
  console.log(`[CRM] Response status: ${statusCode}, body: ${rawText.slice(0, 500)}`);

  let parsedData = null;
  try {
    parsedData = JSON.parse(rawText);
  } catch {
    parsedData = { raw: rawText };
  }

  const responseLower = String(rawText || "").toLowerCase();
  const msgLower = String((parsedData && parsedData.message) || "").toLowerCase();
  const errLower = String((parsedData && parsedData.error) || "").toLowerCase();

  const isAlreadyExists =
    responseLower.includes("already exist") ||
    responseLower.includes("already_exist") ||
    responseLower.includes("duplicate") ||
    responseLower.includes("account exists") ||
    msgLower.includes("already exist") ||
    msgLower.includes("duplicate") ||
    errLower.includes("already exist") ||
    errLower.includes("duplicate");

  const isInvalidLead =
    responseLower.includes("not valid") ||
    responseLower.includes("invalid lead") ||
    responseLower.includes("invalid") ||
    responseLower.includes("rejected") ||
    msgLower.includes("not valid") ||
    msgLower.includes("rejected");

  if (response.ok || statusCode === 200 || statusCode === 201 || statusCode === 202) {
    return { success: true, duplicate: isAlreadyExists, payload, parsedData, statusCode };
  }

  if (isAlreadyExists) {
    return { success: true, duplicate: true, alreadyExists: true, payload, parsedData, statusCode };
  }

  if (isInvalidLead || statusCode === 400 || statusCode === 422) {
    const error = new Error("Lead is not valid");
    error.code = "INVALID_LEAD";
    error.statusCode = statusCode;
    throw error;
  }

  const error = new Error(`CRM request failed: ${statusCode}`);
  error.code = "CRM_ERROR";
  error.statusCode = statusCode;
  error.rawBody = rawText;
  throw error;
}

async function incrementLeadDashboard(type, name, email) {
  const dashboardUrl = process.env.DASHBOARD_URL || "https://lead-dashboard-orcin.vercel.app/api/increment";
  const payload = {
    website: WEBSITE_NAME,
    type: type === "contact" ? "contact" : "signup",
    name: sanitizeString(name),
    email: sanitizeString(email),
  };
  console.log(`[Dashboard] Sending:`, JSON.stringify(payload));
  try {
    const res = await fetch(dashboardUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.text().catch(() => "");
    console.log(`[Dashboard] Status: ${res.status}, body: ${body.slice(0, 200)}`);
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    console.warn(`[Dashboard] Error:`, e);
    return { ok: false, error: String(e) };
  }
}

module.exports = { submitToCRM, incrementLeadDashboard, WEBSITE_NAME };
