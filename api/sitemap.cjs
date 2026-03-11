function getEnv(name) {
  const value = process.env[name];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function normalizeBaseUrl(url) {
  return (url || "").replace(/\/+$/, "");
}

function xmlEscape(input) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

module.exports = async (req, res) => {
  try {
    const SITE_URL = normalizeBaseUrl(getEnv("SITE_URL") || "https://kpjadvocates.com");
    const now = new Date().toISOString();
    const routes = [
      { path: "/", changefreq: "weekly", priority: "1.0", imageUrl: `${SITE_URL}/kpj-advocates-thoothukudi-logo.png`, imageTitle: "Best Advocate in Thoothukudi | KPJ Advocates | P. J. Jedidiah Koilson", imageCaption: "Official logo of KPJ Advocates — #1 Rated Law Firm in Thoothukudi, led by Advocate P. J. Jedidiah Koilson." },
      { path: "/about", changefreq: "weekly", priority: "0.95", imageUrl: `${SITE_URL}/best-advocate-in-thoothukudi-jedidiah-koilson.jpeg`, imageTitle: "P. J. Jedidiah Koilson — Best Advocate in Thoothukudi", imageCaption: "Ranked #1 Advocate in Thoothukudi, P. J. Jedidiah Koilson B.A. LL.B — Lead Advocate at KPJ Advocates." },
      { path: "/practice-areas", changefreq: "weekly", priority: "0.90", imageUrl: `${SITE_URL}/family-lawyer-thoothukudi.png`, imageTitle: "Top Legal Services in Thoothukudi | Practice Areas", imageCaption: "Comprehensive legal practice areas including Civil, Property, and Family Law in Thoothukudi." },
      { path: "/services", changefreq: "weekly", priority: "0.85" },
      { path: "/contact", changefreq: "monthly", priority: "0.85" }
    ];

    const urlset = routes.map((route) => {
      const loc = xmlEscape(`${SITE_URL}${route.path}`);
      const imageBlock = route.imageUrl ? [
        "    <image:image>",
        `      <image:loc>${xmlEscape(route.imageUrl)}</image:loc>`,
        `      <image:title>${xmlEscape(route.imageTitle)}</image:title>`,
        `      <image:caption>${xmlEscape(route.imageCaption)}</image:caption>`,
        "    </image:image>"
      ].join("\n") : "";
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${xmlEscape(now)}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        imageBlock,
        "  </url>"
      ].filter(Boolean).join("\n");
    }).join("\n");

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset',
      '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      '  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
      urlset,
      "</urlset>",
      ""
    ].join("\n");

    res.header("content-type", "application/xml; charset=utf-8");
    res.header("x-content-type-options", "nosniff");
    res.send(xml);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
