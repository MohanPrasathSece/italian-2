const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

function getEnv(name) {
  const v = process.env[name];
  return typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0';

// Load API route handlers
const contactHandler = require('./api/contact.cjs');
const signupHandler = require('./api/signup.cjs');
const loginHandler = require('./api/login.cjs');

// Wrap handlers for Express
function toExpress(handler) {
  return (req, res) => {
    return handler(req, res);
  };
}

// API routes
app.post('/api/contact', toExpress(contactHandler));
app.post('/api/signup', toExpress(signupHandler));
app.post('/api/login', toExpress(loginHandler));

app.options('/api/contact', (req, res) => { res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); res.status(200).end(); });
app.options('/api/signup', (req, res) => { res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); res.status(200).end(); });
app.options('/api/login', (req, res) => { res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); res.status(200).end(); });

// ── Sitemap & Robots ──
app.get('/robots.txt', (req, res) => {
  try {
    const SITE_URL = (getEnv('SITE_URL') || 'https://silverstonecapital.com').replace(/\/+$/, '');
    const body = [
      "# Silver Stone Capital — Crawler Control",
      "User-agent: *",
      "Allow: /",
      "Disallow: /api/",
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      ""
    ].join("\n");
    res.header("content-type", "text/plain; charset=utf-8");
    res.send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/sitemap.xml', (req, res) => {
  try {
    const SITE_URL = (getEnv('SITE_URL') || 'https://silverstonecapital.com').replace(/\/+$/, '');
    const now = new Date().toISOString();
    const esc = (s) => String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

    const routes = [
      { path: "/", changefreq: "weekly", priority: "1.0" },
      { path: "/learn", changefreq: "weekly", priority: "0.90" },
      { path: "/privacy", changefreq: "monthly", priority: "0.40" },
      { path: "/terms", changefreq: "monthly", priority: "0.40" },
    ];

    const urls = routes.map(r => [
      "  <url>",
      `    <loc>${esc(SITE_URL + r.path)}</loc>`,
      `    <lastmod>${esc(now)}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority}</priority>`,
      "  </url>"
    ].join("\n")).join("\n");

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      urls,
      "</urlset>",
      ""
    ].join("\n");

    res.header("content-type", "application/xml; charset=utf-8");
    res.header("x-content-type-options", "nosniff");
    res.send(xml);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString(),
    crmConfigured: !!getEnv('CRM_TOKEN'),
    blobConfigured: !!getEnv('BLOB_READ_WRITE_TOKEN'),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[server.cjs] Silver Stone Capital backend running on port ${PORT}`);
  console.log(`[server.cjs] CRM configured: ${!!getEnv('CRM_TOKEN') || !!getEnv('CRM_ENDPOINT')}`);
  console.log(`[server.cjs] Blob configured: ${!!getEnv('BLOB_READ_WRITE_TOKEN')}`);
});
