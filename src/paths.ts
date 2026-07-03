import * as fs from "fs";
import * as path from "path";

/**
 * Finds .zipline/ by walking upward from cwd (like git does with .git/).
 * Returns null if not found.
 */
export function findZiplineRoot(startDir = process.cwd()): string | null {
  let dir = path.resolve(startDir);
  const root = path.parse(dir).root;

  while (dir !== root) {
    const candidate = path.join(dir, ".zipline");
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return null;
}

/**
 * Gets the zipline root, throwing a helpful error if not initialized.
 */
export function requireZiplineRoot(): string {
  const root = findZiplineRoot();
  if (!root) {
    throw new Error(
      "Not a zipline repository. Run 'zipline init' in your project root."
    );
  }
  return root;
}

export function ziplineDir(repoRoot: string): string {
  return path.join(repoRoot, ".zipline");
}

export function rulesDir(repoRoot: string): string {
  return path.join(ziplineDir(repoRoot), "rules");
}

export function ledgerPath(repoRoot: string): string {
  return path.join(ziplineDir(repoRoot), "ledger.jsonl");
}

export function policyPath(repoRoot: string): string {
  return path.join(ziplineDir(repoRoot), "policy.yaml");
}

export function claudeSettingsPath(repoRoot: string): string {
  return path.join(repoRoot, ".claude", "settings.json");
}
