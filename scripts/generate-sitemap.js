import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(
  __dirname,
  "..",
  "Haryana Shajra Database - Sheet1.csv"
);

const csv = fs.readFileSync(csvPath, "utf8");

const lines = csv.trim().split(/\r?\n/);
lines.shift();

const base = "https://haryana-village-digital-shajra.vercel.app";
const publicDir = path.join(__dirname, "..", "public");

const today = new Date().toISOString().split("T")[0];
const CHUNK_SIZE = 2000;

// --------------------
// Static Pages
// --------------------

const pages = [
  `${base}/`,
  `${base}/about`,
  `${base}/contact`,
  `${base}/coverage`,
];

// --------------------
// Village URLs
// --------------------

const villages = [];

for (const line of lines) {
  const cols = line.split(",");
  const code = cols[3]?.trim();

  if (code) {
    villages.push(`${base}/village/${code}`);
  }
}

// --------------------
// URLSET Generator
// --------------------

function createUrlSet(urls) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const url of urls) {
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

// --------------------
// Pages Sitemap
// --------------------

fs.writeFileSync(
  path.join(publicDir, "sitemap-pages.xml"),
  createUrlSet(pages)
);

// --------------------
// Village Sitemaps
// --------------------

const sitemapFiles = ["sitemap-pages.xml"];

let index = 1;

for (let i = 0; i < villages.length; i += CHUNK_SIZE) {
  const chunk = villages.slice(i, i + CHUNK_SIZE);

  const filename = `sitemap-${index}.xml`;

  fs.writeFileSync(
    path.join(publicDir, filename),
    createUrlSet(chunk)
  );

  sitemapFiles.push(filename);

  index++;
}

// --------------------
// Sitemap Index
// --------------------

let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const file of sitemapFiles) {
  indexXml += `  <sitemap>\n`;
  indexXml += `    <loc>${base}/${file}</loc>\n`;
  indexXml += `    <lastmod>${today}</lastmod>\n`;
  indexXml += `  </sitemap>\n`;
}

indexXml += `</sitemapindex>`;

fs.writeFileSync(
  path.join(publicDir, "sitemap.xml"),
  indexXml
);

console.log("✅ Sitemap generation completed.");
console.log(`📄 Pages Sitemap : sitemap-pages.xml`);
console.log(`🗺️ Village Sitemaps : ${index - 1}`);
console.log(`📦 Total Village URLs : ${villages.length}`);