const { getUser, createSession } = require("./_lib/blobDb.cjs");
const { validateEmail, sanitizeString } = require("./_lib/countries.cjs");

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

module.exports = async function loginHandler(req, res) {
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

  const rawEmail = sanitizeString(body.email || "");
  console.log(`[Login] Incoming email="${rawEmail}"`);

  if (!rawEmail || !validateEmail(rawEmail)) {
    return send(res, 400, { error: "Please enter a valid email address" });
  }

  // Note: Per spec, login NEVER contacts CRM.
  let user = null;
  try {
    console.log(`[Login] Step 1/2: Fetching Blob user...`);
    user = await getUser(rawEmail);
  } catch (e) {
    console.warn(`[Login] Blob getUser warning:`, e.message);
    user = null;
  }

  if (!user) {
    console.warn(`[Login] No account found for "${rawEmail}"`);
    return send(res, 404, {
      error: "No account found with this email. Please sign up first.",
      code: "NOT_FOUND",
    });
  }

  let sessionToken;
  try {
    console.log(`[Login] Step 2/2: Creating session...`);
    const s = await createSession(user);
    sessionToken = s.token;
  } catch (e) {
    console.warn(`[Login] createSession warning:`, e.message);
    sessionToken = require("./_lib/blobDb.cjs").generateSessionToken();
  }

  console.log(`[Login] Success: ${user.email}`);
  return send(res, 200, {
    success: true,
    message: "Login successful.",
    user,
    sessionToken,
  });
};
