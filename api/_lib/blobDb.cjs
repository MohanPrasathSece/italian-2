const { put, list, head } = require("@vercel/blob");
const fs = require("fs");
const path = require("path");

const LOCAL_DB_PATH = path.resolve(process.cwd(), ".users.json");

const ACCESS_MODE = "public";

function safeEmail(email) {
  return email.toLowerCase().replace(/@/g, "_at_");
}

let localUsersCache = [];
if (fs.existsSync(LOCAL_DB_PATH)) {
  try {
    localUsersCache = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf-8"));
  } catch (e) {
    console.error("Failed to read local users db", e);
  }
}

async function getUser(email) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token || token === "undefined" || token === "null" || !token.trim()) {
    const user = localUsersCache.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  }
  try {
    const blobPath = `users/${safeEmail(email)}.json`;
    const { blobs } = await list({ token, prefix: blobPath });
    const userBlob = blobs.find((b) => b.pathname === blobPath);
    
    if (!userBlob) return null;

    const blobUrl = userBlob.downloadUrl || userBlob.url;
    if (!blobUrl) return null;

    const fetchHeaders = {};
    const res = await fetch(blobUrl, { method: "GET", headers: fetchHeaders, redirect: "follow" });
    if (!res.ok) {
      console.warn(`[BlobDB] getUser(${email}) HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json;
  } catch (e) {
    console.error(`[BlobDB] getUser(${email}) failed:`, e.message);
    return null;
  }
}

async function saveUser(email, userData) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  
  // update local cache
  const idx = localUsersCache.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx >= 0) {
    localUsersCache[idx] = userData;
  } else {
    localUsersCache.push(userData);
  }
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(localUsersCache, null, 2), "utf-8");
  } catch(e) {}

  if (!token || token === "undefined" || token === "null" || !token.trim()) {
    return;
  }

  try {
    const blobPath = `users/${safeEmail(email)}.json`;
    await put(blobPath, JSON.stringify(userData, null, 2), {
      access: ACCESS_MODE,
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControl: "no-store, no-cache, must-revalidate, max-age=0",
      token,
    });
    console.log(`[BlobDB] Saved user to ${blobPath}`);
  } catch (e) {
    console.error(`[BlobDB] saveUser failed:`, e);
  }
}

async function createSession(email) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const sessionToken = "sess_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
  
  if (!token || token === "undefined" || token === "null" || !token.trim()) {
    return sessionToken;
  }

  try {
    const blobPath = `sessions/${sessionToken}.json`;
    await put(blobPath, JSON.stringify({ email, createdAt: new Date().toISOString() }, null, 2), {
      access: ACCESS_MODE,
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControl: "no-store, no-cache, must-revalidate, max-age=0",
      token,
    });
    console.log(`[BlobDB] createSession(${email}) -> token:${sessionToken}`);
  } catch (e) {
    console.error("[BlobDB] createSession error:", e);
  }
  return sessionToken;
}

module.exports = {
  getUser,
  saveUser,
  createSession,
};
