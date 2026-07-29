require("dotenv").config();
const { put } = require("@vercel/blob");

async function run() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  try {
    const res = await put("users.json", JSON.stringify([{ test: 1 }]), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
    console.log("Put success:", res);
  } catch (e) {
    console.error("Put error:", e);
  }
}
run();
