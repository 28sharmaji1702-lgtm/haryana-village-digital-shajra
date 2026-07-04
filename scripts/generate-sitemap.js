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

const urls = [
  `${base}/`,
  `${base}/about`,
  `${base}/contact`,
  `${base}/coverage`,
];

for (const line of lines) {
  const cols = line.split(",");

  const code = cols[3]?.trim();

  if (code) {
    urls.push(`${base}/village/${code}`);
  }
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const url of urls) {
  xml += `  <url>\n`;
  xml += `    <loc>${url}</loc>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "..", "public", "sitemap.xml"),
  xml
);

console.log(`✅ Sitemap generated successfully.`);
console.log(`Total URLs: ${urls.length}`);