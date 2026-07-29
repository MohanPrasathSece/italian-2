const { submitToCRM } = require("./_lib/crm.cjs");
const { getUser, saveUser, createSession } = require("./_lib/blobDb.cjs");

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

    console.log(`[API Signup Request] Name: "${name}", Email: "${email}"`);

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
        console.warn("[API Signup Warning] CRM lead already exists");
      } else {
        console.error("[API Signup Error] CRM Submission failed:", crmError);
      }
    }

    console.log(`[API Signup] Fetching user: ${email}...`);
    const existingUser = await getUser(email.trim());

    if (existingUser) {
      console.log(`[API Signup] Account already exists for: "${email}"`);
      res.statusCode = 409;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "You have already contacted us. Please wait while our team reviews your request.", code: "ALREADY_EXISTS" }));
      return;
    }

    const updatedUser = {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      phone: phone ? phone.trim() : "",
      createdAt: new Date().toISOString(),
    };

    await saveUser(email.trim(), updatedUser);
    
    // Sync to dashboard
    try {
      const url = process.env.VITE_DASHBOARD_URL || "https://lead-dashboard-orcin.vercel.app/api/increment";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "Aethel Capital", type: "signup", name: name, email: email})
      }).catch(() => {});
    } catch(e){}

    const sessionToken = await createSession(email.trim());

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      success: true,
      user: updatedUser,
      sessionToken,
    }));
  } catch (error) {
    console.error("[API Signup Error] Critical failure:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
};
