// Usage: node scripts/restructure-pages.js
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const IGNORE_DIRS = new Set(["node_modules", ".git", ".vscode"]);
const HTML_EXT = ".html";

function moveHtmlToFolder(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, HTML_EXT);

  if (path.basename(filePath) === "index.html") return null;

  const targetDir = path.join(dir, base);
  const targetPath = path.join(targetDir, "index.html");

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  fs.renameSync(filePath, targetPath);

  return { from: filePath, to: targetPath };
}

function collectHtmlFiles(startDir) {
  const out = [];
  const entries = fs.readdirSync(startDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(startDir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      out.push(...collectHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(HTML_EXT)) {
      out.push(fullPath);
    }
  }
  return out;
}

function updateLinksInHtml(filePath) {
  let html = fs.readFileSync(filePath, "utf8");

  html = html.replace(/href=(['"])([^'"]+)\1/gi, (m, quote, href) => {
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("javascript:")
    ) {
      return m;
    }

    if (
      href.endsWith(".css") ||
      href.endsWith(".js") ||
      href.endsWith(".png") ||
      href.endsWith(".jpg") ||
      href.endsWith(".jpeg") ||
      href.endsWith(".webp") ||
      href.endsWith(".svg") ||
      href.endsWith(".ico") ||
      href.endsWith(".json") ||
      href.endsWith(".xml") ||
      href.endsWith(".txt") ||
      href.endsWith(".pdf")
    ) {
      return m;
    }

    if (href.endsWith(".html")) {
      const noExt = href.replace(/\.html$/, "");
      return `href=${quote}${noExt}/${quote}`;
    }

    return m;
  });

  fs.writeFileSync(filePath, html, "utf8");
}

function main() {
  const htmlFiles = collectHtmlFiles(ROOT);
  const moved = [];

  for (const file of htmlFiles) {
    const result = moveHtmlToFolder(file);
    if (result) moved.push(result);
  }

  const htmlFilesAfter = collectHtmlFiles(ROOT);
  for (const file of htmlFilesAfter) {
    updateLinksInHtml(file);
  }

  const redirectsPath = path.join(ROOT, "_redirects");
  if (fs.existsSync(redirectsPath)) {
    fs.unlinkSync(redirectsPath);
  }

  console.log("Restructure complete.");
  console.log(`Moved ${moved.length} HTML files into folder index.html structure.`);
}

main();
