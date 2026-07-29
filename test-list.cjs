require("dotenv").config();
const { list } = require("@vercel/blob");

async function run() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  console.log("Token starts with:", token ? token.substring(0, 10) : null);
  
  try {
    const { blobs } = await list({ token });
    console.log("Blobs in store:", blobs);
  } catch (e) {
    console.error("List error:", e);
  }
}

run();
