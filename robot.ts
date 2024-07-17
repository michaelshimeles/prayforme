export default async function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [],
    },
    sitemap: "https://prayforme.fyi/sitemap.xml",
  };
}
