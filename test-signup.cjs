require("dotenv").config();
const http = require("http");

const data = JSON.stringify({
  name: "John Test",
  email: "johntest123@example.com",
  phone: "1234567890",
  countryCode: "US"
});

const req = http.request({
  hostname: "localhost",
  port: 5000,
  path: "/api/signup",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
}, res => {
  let body = "";
  res.on("data", d => body += d);
  res.on("end", () => {
    console.log("Status:", res.statusCode);
    console.log("Body:", body);
  });
});

req.on("error", console.error);
req.write(data);
req.end();
