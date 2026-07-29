const { submitToCRM } = require("./_lib/crm.cjs");
const { getUsers, saveUsers } = require("./_lib/blobDb.cjs");

async function parseJsonBody(req) {
  try {
    if (req.body !== undefined && req.body !== null) {
      return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    }
  } catch {}
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk.toString(); });
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { resolve({}); }
    });
  });
}

module.exports = async function signupHandler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.statusCode = 200; res.end(); return; }
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const body = await parseJsonBody(req);
    const { name, email, phone, countryCode } = body;

    console.log(`[API Signup Request] Name: "${name}", Email: "${email}", Phone: "${phone || "(none)"}", CountryCode: "${countryCode || "CH"}"`);

    if (!email || !email.trim()) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Email is required" }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Please enter a valid email address" }));
      return;
    }

    if (!name || !name.trim()) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Name is required" }));
      return;
    }

    console.log("[API Signup] Submitting to CRM...");
    try {
      await submitToCRM({
        name: name.trim(),
        email: email.trim(),
        phone: phone || "",
        description: "Aethel Capital",
        outlineYourCase: "Signup Lead",
        countryCode: countryCode || "CH",
      });
      console.log("[API Signup] CRM submission succeeded.");
    } catch (crmError) {
      const errMsg = crmError?.message || "";
      if (errMsg.toLowerCase().includes("already exist") || errMsg.toLowerCase().includes("duplicate")) {
        console.warn("[API Signup Warning] CRM lead already exists, continuing:", crmError);
      } else {
        console.error("[API Signup Error] CRM Submission failed:", crmError);
      }
    }

    console.log("[API Signup] Fetching current user list...");
    const users = await getUsers();
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase());

    const updatedUser = {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      phone: phone || "",
      createdAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      users[existingIndex] = updatedUser;
    } else {
      users.push(updatedUser);
    }

    await saveUsers(users);

    const sessionToken = "sess_" + Math.random().toString(36).substring(2) + Date.now().toString(36);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      success: true,
      user: updatedUser,
      sessionToken,
      alreadyExists: existingIndex >= 0,
    }));
  } catch (error) {
    console.error("[API Signup Error] Critical failure:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
};
