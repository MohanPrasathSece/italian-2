require("dotenv").config();
const { getUsers } = require("./api/_lib/blobDb.cjs");

async function run() {
  const users = await getUsers();
  console.log(users);
}

run();
