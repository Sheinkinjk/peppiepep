#!/usr/bin/env node
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const vercelBin = path.join(projectRoot, "node_modules", ".bin", "vercel");
const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";
const deploymentUrlPattern = /https:\/\/peppiepep-[a-z0-9-]+\.vercel\.app/gi;
const vercelProjectConfigPath = path.join(projectRoot, ".vercel", "project.json");
dotenv.config({ path: path.join(projectRoot, ".env.local") });

function getVercelScope() {
  try {
    const raw = fs.readFileSync(vercelProjectConfigPath, "utf8");
    const parsed = JSON.parse(raw);
    return typeof parsed?.orgId === "string" ? parsed.orgId : null;
  } catch {
    return null;
  }
}

const vercelScope = getVercelScope();

function runVercelAndCapture(args) {
  return new Promise((resolve, reject) => {
    const scopedArgs = vercelScope ? [...args, "--scope", vercelScope] : args;
    const child = spawn(vercelBin, scopedArgs, {
      cwd: projectRoot,
      stdio: ["inherit", "pipe", "pipe"],
      env: process.env,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      stdout += text;
      process.stdout.write(chunk);
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(chunk);
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      // Vercel `promote` returns exit code 1 for "already current production" (409).
      if (args[0] === "promote" && /already the current production deployment/i.test(stderr)) {
        resolve({ stdout, stderr });
        return;
      }

      const error = new Error(
        `vercel ${args.join(" ")} exited with code ${code ?? "unknown"}`,
      );
      error.stdout = stdout;
      error.stderr = stderr;
      error.code = code;
      reject(error);
    });
  });
}

function extractDeploymentUrl(stdout, stderr) {
  const combined = `${stdout}\n${stderr}`;
  const matches = combined.match(deploymentUrlPattern);
  if (!matches || matches.length === 0) {
    return null;
  }
  return matches[matches.length - 1];
}

function runSupabaseMigrations() {
  console.log("📦 Running Supabase migrations before deploy...");
  return new Promise((resolve, reject) => {
    const child = spawn(
      npxBin,
      ["--yes", "supabase", "db", "push"],
      {
        cwd: projectRoot,
        stdio: "inherit",
        env: process.env,
      },
    );

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `supabase db push exited with code ${code ?? "unknown"}`,
          ),
        );
      }
    });
  });
}

async function main() {
  if (
    !process.env.SUPABASE_DB_URL &&
    !process.env.SUPABASE_PROJECT_ID
  ) {
    console.warn(
      "⚠️  SUPABASE connection environment variables are not set. Skipping automatic migrations.",
    );
  } else {
    await runSupabaseMigrations();
  }
  console.log("🚀 Launching Vercel production deploy with auto-alias...");
  const deployResult = await runVercelAndCapture(["--prod", "--yes"]);
  const deploymentUrl = extractDeploymentUrl(deployResult.stdout, deployResult.stderr);

  if (!deploymentUrl) {
    console.error(
      "Unable to determine deployment URL from Vercel output. Please check the logs above.",
    );
    process.exit(1);
  }

  console.log(`\n🔗 Detected deployment: ${deploymentUrl}`);
  console.log("📌 Updating peppiepep.vercel.app alias...");
  await runVercelAndCapture(["alias", deploymentUrl, "peppiepep.vercel.app"]);

  console.log("📌 Promoting deployment to current production...");
  await runVercelAndCapture(["promote", deploymentUrl, "--yes"]);
  console.log("✅ Deployment live at https://peppiepep.vercel.app");
}

main().catch((error) => {
  console.error("Deployment automation failed:", error);
  process.exit(typeof error.code === "number" ? error.code : 1);
});
