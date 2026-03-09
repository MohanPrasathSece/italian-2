function getEnv(name) {
  const value = process.env[name];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function normalizeBaseUrl(url) {
  return url.replace(/\/+$/, "");
}

exports.handler = async () => {
  try {
    const SITE_URL = normalizeBaseUrl(
      getEnv("SITE_URL") || "https://kpjadvocates.com"
    );

    const body = [
      "# ════════════════════════════════════════════════════════════",
      "# KPJ Advocates — Elite Crawl & Indexing Control",
      "# Entity: P. J. Jedidiah Koilson | kpjadvocates.com",
      "# ════════════════════════════════════════════════════════════",
      "",
      "User-agent: *",
      "Allow: /",
      "Disallow: /api/",
      "Disallow: /.netlify/",
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
      "Disallow: /.netlify/",
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

    return {
      statusCode: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=3600"
      },
      body
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "content-type": "text/plain; charset=utf-8" },
      body: err instanceof Error ? err.message : "Server error"
    };
  }
};
