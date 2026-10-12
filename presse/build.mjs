import { readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const root = new URL("./", import.meta.url);
const { articles, contactEmail } = JSON.parse(await readFile(new URL("articles.json", root), "utf8"));
const template = await readFile(new URL("template.html", root), "utf8");
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const dateLabel = (date) => date.split("-").reverse().join(".");
const arrow = '<svg class="press-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';

assert.match(contactEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
assert.ok(articles.length >= 11, "All 11 requested articles must be present.");
const requiredIds = [...Array.from({ length: 9 }, (_, i) => `press-${String(i + 1).padStart(2, "0")}`).filter((id) => !["press-03", "press-05"].includes(id)), ...Array.from({ length: 4 }, (_, i) => `science-${String(i + 1).padStart(2, "0")}`)];
for (const id of requiredIds) assert.ok(articles.some((article) => article.id === id), `Missing required article: ${id}`);
assert.equal(new Set(articles.map((article) => article.id)).size, articles.length, "Duplicate article IDs.");
assert.equal(new Set(articles.map((article) => article.url)).size, articles.length, "Duplicate article URLs.");
for (const article of articles) {
  for (const key of ["id", "title", "medium", "description", "category", "url"]) assert.ok(article[key], `Missing ${key}.`);
  if (article.date !== null) {
    assert.match(article.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(`${article.date}T00:00:00Z`).toISOString().slice(0, 10), article.date);
  }
  assert.equal(new URL(article.url).protocol, "https:");
  assert.ok(["obm-wahl", "wissenschaft-engagement"].includes(article.category));
  assert.ok(article.types.length && article.types.every((type) => ["Artikel", "Interview", "Audio", "Video"].includes(type)));
}
const sorted = [...articles].sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.id.localeCompare(b.id));
const primary = sorted.filter((article) => article.featured === "primary");
const secondary = sorted.filter((article) => article.featured === "secondary");
assert.equal(primary.length, 1);
assert.equal(secondary.length, 2);
const typeLabel = (article) => article.format || article.types.join(" & ");
const attributes = (article) => `href="${escape(article.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(article.title)} – ${escape(article.medium)} (öffnet einen neuen Tab)" data-press-id="${escape(article.id)}"`;
const metadata = (article) => `<span class="press-medium">${escape(article.medium)}</span>${article.date ? `<time datetime="${article.date}">${dateLabel(article.date)}</time>` : '<span class="press-date">Ohne Datumsangabe</span>'}<span class="press-type">${escape(typeLabel(article))}</span>`;
const actionLabel = (article) => article.types.includes("Video") ? "Beitrag mit Video ansehen" : article.types.includes("Audio") ? "Interview anhören" : "Artikel lesen";
const card = (article, featured = false) => `<article class="press-card${featured ? " press-card--featured" : ""}">
  <a class="press-card-link" ${attributes(article)}>
    <div class="press-card-copy">
      <p class="press-meta">${metadata(article)}</p>
      <h3>${escape(article.title)}</h3>
      <p class="press-description">${escape(article.description)}</p>
      <span class="press-action">${actionLabel(article)} ${arrow}</span>
    </div>
    ${featured ? '<div class="press-card-photo"><img src="../bilder/getu-gundlach-freigestellt.png" alt="" width="1072" height="1467" loading="lazy" /></div>' : ""}
  </a>
</article>`;
const list = (items) => `<ul class="press-list">${items.map((article) => `
  <li><a class="press-list-link" ${attributes(article)}>
    <div class="press-list-meta">${metadata(article)}</div>
    <div class="press-list-copy"><h3>${escape(article.title)}</h3><p>${escape(article.description)}</p></div>
    ${arrow}
  </a></li>`).join("")}\n</ul>`;
const engagement = sorted.filter((article) => article.category === "wissenschaft-engagement");
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Presse & Medien | Getu Abraham",
  description: "Medienberichte, Wissenschaft, Engagement und Pressekontakt zur Kandidatur von Prof. Dr. Getu Abraham bei der Leipziger Oberbürgermeisterwahl 2027.",
  url: "https://www.getu-abraham.de/presse/",
  mainEntity: { "@type": "ItemList", itemListElement: sorted.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: article.url })) }
};
const replacements = {
  CONTACT_EMAIL: escape(contactEmail),
  FEATURED: card(primary[0], true) + '\n<div class="press-secondary">' + secondary.map((article) => card(article)).join("\n") + "</div>",
  RECENT: list(sorted.filter((article) => article.category === "obm-wahl" && !article.featured)),
  ENGAGEMENT: list(engagement),
  STRUCTURED_DATA: JSON.stringify(structuredData).replace(/</g, "\\u003c")
};
const html = template.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => {
  assert.ok(Object.hasOwn(replacements, key), `Unknown template slot: ${key}`);
  return replacements[key];
});
assert.equal((html.match(/data-press-id=/g) || []).length, articles.length);
if (process.argv.includes("--check")) {
  assert.equal(await readFile(new URL("index.html", root), "utf8"), html, "Generated HTML is stale. Run node presse/build.mjs.");
  console.log(`Verified ${articles.length} unique articles, dates, types, categories and generated HTML.`);
} else {
  await writeFile(new URL("index.html", root), html);
  console.log(`Built presse/index.html with ${articles.length} unique articles.`);
}
