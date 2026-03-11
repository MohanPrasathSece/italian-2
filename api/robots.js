function getEnv(name) {
  const value = process.env[name];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function normalizeBaseUrl(url) {
  return (url || "").replace(/\/+$/, "");
}

export default async function handler(req, res) {
  try {
    const SITE_URL = normalizeBaseUrl(getEnv("SITE_URL") || "https://kpjadvocates.com");
    const body = [
      "# ════════════════════════════════════════════════════════════",
      "# KPJ Advocates — Elite Crawl & Indexing Control",
      "# Entity: P. J. Jedidiah Koilson | kpjadvocates.com",
      "# ════════════════════════════════════════════════════════════",
      "",
      "User-agent: *",
      "Allow: /",
      "Disallow: /api/",
      "",
      "User-agent: Googlebot",
      "Allow: /",
      "Allow: /*.js$",
      "Allow: /*.css$",
      "Allow: /*.png$",
      "Allow: /*.jpg$",
      "Allow: /*.jpeg$",
      "Allow: /*.svg$",
      "Disallow: /api/",
      "",
      "User-agent: Googlebot-Image",
      "Allow: /",
      "",
      "User-agent: Googlebot-Mobile",
      "Allow: /",
      "",
      "User-agent: Bingbot",
      "Allow: /",
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      ""
    ].join("\n");

    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.status(200).send(body);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
