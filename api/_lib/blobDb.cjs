const { put, list } = require("@vercel/blob");
const fs = require("fs");
const path = require("path");

const LOCAL_DB_PATH = path.resolve(process.cwd(), ".users.json");

let localUsersCache = [];
if (fs.existsSync(LOCAL_DB_PATH)) {
  try {
    localUsersCache = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf-8"));
  } catch (e) {
    console.error("Failed to read local users db", e);
  }
}

async function getBlobUrl() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token || token === "undefined" || token === "null" || !token.trim()) {
    return null;
  }
  try {
    const { blobs } = await list({ token });
    const userBlob = blobs.find((b) => b.pathname === "users.json");
    return userBlob ? (userBlob.downloadUrl || userBlob.url) : null;
  } catch (e) {
    console.error("Vercel Blob list error:", e);
    return null;
  }
}

async function getUsers() {
  try {
    const blobUrl = await getBlobUrl();
    if (!blobUrl) {
      return localUsersCache;
    }

    const cacheBustedUrl = blobUrl.includes("?")
      ? `${blobUrl}&t=${Date.now()}`
      : `${blobUrl}?t=${Date.now()}`;
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const response = await fetch(cacheBustedUrl, {
      headers: token && token !== "undefined" && token !== "null"
        ? { Authorization: `Bearer ${token}` }
        : {},
    });
    if (!response.ok) {
      console.warn(`Fetch users from Blob failed with status ${response.status}. Falling back to local cache.`);
      return localUsersCache;
    }
    const json = await response.json();
    return Array.isArray(json) ? json : localUsersCache;
  } catch (e) {
    console.error("Failed to fetch users from Vercel Blob, falling back to local cache:", e);
    return localUsersCache;
  }
}

async function saveUsers(users) {
  localUsersCache = users;
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write users to local file:", e);
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token || token === "undefined" || token === "null" || !token.trim()) {
    return;
  }

  try {
    await put("users.json", JSON.stringify(users, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControl: "no-store, no-cache, must-revalidate, max-age=0",
      token,
    });
  } catch (e) {
    console.error("Failed to put users to Vercel Blob:", e);
  }
}

module.exports = {
  getUsers,
  saveUsers,
};
