const { put, get, list } = require("@vercel/blob");
const crypto = require("crypto");

const ACCESS_MODE = "public";

function cleanToken(v) {
  if (!v) return "";
  let s = String(v).trim();
  if (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);
  return s;
}

function getBlobCredentials() {
  const token = cleanToken(
    process.env.BLOB_READ_WRITE_TOKEN_NEW_READ_WRITE_TOKEN ||
    process.env.BLOB_READ_WRITE_TOKEN ||
    ""
  );
  const storeId = cleanToken(
    process.env.BLOB_READ_WRITE_TOKEN_NEW_STORE_ID ||
    process.env.BLOB_STORE_ID ||
    ""
  );
  return { token, storeId };
}

function isBlobConfigured() {
  const { token } = getBlobCredentials();
  return Boolean(token) && token !== "undefined" && token !== "null";
}

function hashEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, "_")
    .replace(/@/g, "_at_");
}

function userPath(email) {
  return `users/${hashEmail(email)}.json`;
}

function sessionPath(token) {
  const clean = String(token || "").replace(/[^a-zA-Z0-9_-]/g, "");
  return `sessions/${clean}.json`;
}

async function getUser(email) {
  if (!email) return null;
  const { token } = getBlobCredentials();
  if (!isBlobConfigured()) {
    console.warn(`[BlobDB/public] getUser(${email}) skipped: Blob token missing`);
    return null;
  }
  try {
    const path = userPath(email);
    const getOpts = { access: ACCESS_MODE };
    if (token) getOpts.token = token;
    const result = await get(path, getOpts);
    const url = result?.downloadUrl || result?.url;
    if (!url) return null;
    const cacheBustedUrl = url.includes("?") ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
    const res = await fetch(cacheBustedUrl, { method: "GET", redirect: "follow" });
    if (!res.ok) {
      console.warn(`[BlobDB/public] getUser(${email}) HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json && typeof json === "object" ? json : null;
  } catch (e) {
    if (/NOT_FOUND|not found|404|ENOENT/i.test(String(e.message || ""))) {
      return null;
    }
    console.warn(`[BlobDB/public] getUser(${email}) failed:`, e.message);
    return null;
  }
}

async function saveUser(user) {
  if (!user?.email) {
    console.warn(`[BlobDB/public] saveUser skipped: no email`);
    return null;
  }
  const { token, storeId } = getBlobCredentials();
  if (!isBlobConfigured()) {
    console.warn(`[BlobDB/public] saveUser(${user.email}) skipped: Blob token missing`);
    return { skipped: true, url: null };
  }
  try {
    const path = userPath(user.email);
    const payload = typeof user === "string" ? user : JSON.stringify(user, null, 2);
    const opts = {
      access: ACCESS_MODE,
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControl: "public, max-age=0, no-cache, must-revalidate",
    };
    if (token) opts.token = token;
    if (storeId) opts.storeId = storeId;
    const result = await put(path, payload, opts);
    console.log(`[BlobDB/public] saveUser(${user.email}) -> ${result?.url || path}`);
    return result;
  } catch (e) {
    console.error(`[BlobDB/public] saveUser(${user.email}) failed:`, e);
    return null;
  }
}

function generateSessionToken() {
  return "sess_" + crypto.randomBytes(32).toString("hex");
}

async function createSession(user) {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
  const session = {
    token,
    email: String(user?.email || "").toLowerCase(),
    createdAt: new Date().toISOString(),
    expiresAt,
  };
  const { token: blobToken, storeId } = getBlobCredentials();
  if (!isBlobConfigured()) {
    console.warn(`[BlobDB/public] createSession skipped: Blob token missing; returning local token`);
    return { token, session, skipped: true };
  }
  try {
    const path = sessionPath(token);
    const opts = {
      access: ACCESS_MODE,
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControl: "public, max-age=0, no-cache, must-revalidate",
    };
    if (blobToken) opts.token = blobToken;
    if (storeId) opts.storeId = storeId;
    await put(path, JSON.stringify(session, null, 2), opts);
    console.log(`[BlobDB/public] createSession(${session.email}) -> token:${token.slice(0, 12)}...`);
    return { token, session };
  } catch (e) {
    console.error(`[BlobDB/public] createSession(${session.email}) failed:`, e);
    return { token, session, error: true };
  }
}

async function getSession(token) {
  if (!token) return null;
  const { token: blobToken } = getBlobCredentials();
  if (!isBlobConfigured()) return null;
  try {
    const path = sessionPath(token);
    const getOpts = { access: ACCESS_MODE };
    if (blobToken) getOpts.token = blobToken;
    const result = await get(path, getOpts);
    const url = result?.downloadUrl || result?.url;
    if (!url) return null;
    const cacheBustedUrl = url.includes("?") ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
    const res = await fetch(cacheBustedUrl, { method: "GET", redirect: "follow" });
    if (!res.ok) return null;
    const json = await res.json();
    return json && typeof json === "object" ? json : null;
  } catch (e) {
    if (/NOT_FOUND|not found|404|ENOENT/i.test(String(e.message || ""))) return null;
    console.warn(`[BlobDB/public] getSession(${token.slice(0, 12)}...) failed:`, e.message);
    return null;
  }
}

module.exports = {
  ACCESS_MODE,
  isBlobConfigured,
  hashEmail,
  userPath,
  sessionPath,
  getUser,
  saveUser,
  generateSessionToken,
  createSession,
  getSession,
};
