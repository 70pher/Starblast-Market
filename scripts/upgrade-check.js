import { execSync } from "child_process";
import fs from "fs";

const REPO_URL = "https://github.com/70pher/Starblast-Market.git";
const VERSION_FILE = ".version";

function sh(cmd) { return execSync(cmd, { stdio: "pipe" }).toString().trim(); }

try {
  try { sh("git rev-parse --is-inside-work-tree"); } catch { process.exit(0); }

  const current = fs.existsSync(VERSION_FILE) ? fs.readFileSync(VERSION_FILE,"utf8").trim() : "";
  const latest  = sh(`git ls-remote ${REPO_URL} HEAD`).split("\t")[0];

  if (latest && latest !== current) {
    console.log("🚀 Upgrade available – pulling latest...");
    sh("git fetch origin main");
    sh("git reset --hard origin/main");
    try { sh("npm ci"); } catch { sh("npm install"); }
    fs.writeFileSync(VERSION_FILE, latest);
    console.log("✅ Upgrade complete.");
  } else {
    console.log("✅ Already up to date.");
  }
} catch (e) {
  console.log("⚠️ Upgrade check skipped:", e.message);
}
