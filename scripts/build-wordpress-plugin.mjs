#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await listFiles(full);
      files.push(...nested);
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function build() {
  const projectRoot = process.cwd();
  const pluginRoot = path.join(projectRoot, "scripts", "wordpress-plugin", "referlabs-referral-integration");
  const outDir = path.join(projectRoot, "public");
  const outZip = path.join(outDir, "referlabs-referral-integration.zip");

  await ensureDir(outDir);

  const zip = new JSZip();
  const files = await listFiles(pluginRoot);

  for (const absolutePath of files) {
    const relativePath = path.relative(pluginRoot, absolutePath).replaceAll(path.sep, "/");
    const data = await fs.readFile(absolutePath);
    zip.file(`referlabs-referral-integration/${relativePath}`, data);
  }

  const buffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  await fs.writeFile(outZip, buffer);
  console.log(`✅ Built WordPress plugin zip: ${path.relative(projectRoot, outZip)}`);
}

build().catch((error) => {
  console.error("Failed to build WordPress plugin zip:", error);
  process.exit(1);
});

