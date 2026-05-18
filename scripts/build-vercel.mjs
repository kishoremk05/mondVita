/**
 * Post-build script: converts dist/ into .vercel/output/ format.
 * 
 * TanStack Start 1.162.x builds to:
 *   dist/client/  — static assets (JS, CSS, images)
 *   dist/server/server.js — SSR handler
 *
 * Vercel expects:
 *   .vercel/output/static/       — static assets served by CDN
 *   .vercel/output/functions/index.func/  — serverless function
 *   .vercel/output/config.json   — routing config
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const root = process.cwd();
const distClient = path.join(root, "dist", "client");
const distServer = path.join(root, "dist", "server");
const vercelOut = path.join(root, ".vercel", "output");
const staticOut = path.join(vercelOut, "static");
const funcOut = path.join(vercelOut, "functions", "index.func");

// 1. Run the standard vite build
console.log("▶ Running vite build...");
execSync("npm run build", { stdio: "inherit" });

// 2. Clean and create .vercel/output directories
console.log("▶ Creating .vercel/output structure...");
fs.rmSync(vercelOut, { recursive: true, force: true });
fs.mkdirSync(staticOut, { recursive: true });
fs.mkdirSync(funcOut, { recursive: true });

// 3. Copy client assets to static
console.log("▶ Copying client assets to static...");
copyDirSync(distClient, staticOut);

// 4. Copy server bundle to function
console.log("▶ Copying server bundle to function...");
copyDirSync(distServer, funcOut);

// 5. Write the function config
const funcConfig = {
  runtime: "nodejs20.x",
  handler: "server.js",
  launcherType: "Nodejs",
  shouldAddHelpers: true,
};
fs.writeFileSync(
  path.join(funcOut, ".vc-config.json"),
  JSON.stringify(funcConfig, null, 2)
);

// 6. Write the Vercel output config (route all requests to SSR function)
const vercelConfig = {
  version: 3,
  routes: [
    // Serve static assets directly
    { src: "^/assets/(.+)$", dest: "/assets/$1" },
    // Everything else goes to SSR
    { src: "/(.*)", dest: "/index" },
  ],
};
fs.writeFileSync(
  path.join(vercelOut, "config.json"),
  JSON.stringify(vercelConfig, null, 2)
);

console.log("✅ .vercel/output created successfully!");

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
