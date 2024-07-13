
export default async function sitemap() {
  const baserl = "https://prayforme.fyi";


  return [
    {
      url: baserl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    }
  ];
}
