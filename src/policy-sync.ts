import * as fs from "fs";
import * as path from "path";
import { Tier } from "./policy";
import { policyPath } from "./paths";
import { appendLedger } from "./ledger";

// Cross-project policy sync. The routing policy (step → tier) becomes a
// portable, versioned artifact shared across repos. `push` writes the local
// policy up to a central store; `pull` layers the central policy UNDER the
// repo's own entries (per-repo overrides always win). Provenance is logged.
//
// Central store: $HARNESS_POLICY_REMOTE if set, else ~/.harness/policy.yaml
// (the global path `harness init --global` creates). Flat `key: tier` format,
// parsed directly — no YAML dependency.

export type PolicyMap = Record<string, Tier>;

export function centralPolicyPath(): string {
  if (process.env.HARNESS_POLICY_REMOTE) return process.env.HARNESS_POLICY_REMOTE;
  return path.join(process.env.HOME || "", ".harness", "policy.yaml");
}

/** Parse the flat `# comment` / `key: tier` policy format. */
export function parsePolicy(text: string): PolicyMap {
  const out: PolicyMap = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const m = trimmed.match(/^([A-Za-z0-9._-]+):\s*(haiku|sonnet|opus)\s*$/);
    if (m) out[m[1]] = m[2] as Tier;
  }
  return out;
}

export function serializePolicy(policy: PolicyMap, header?: string): string {
  const lines = header ? [header, ""] : [];
  for (const [step, tier] of Object.entries(policy)) lines.push(`${step}: ${tier}`);
  return lines.join("\n") + "\n";
}

function readPolicyFile(file: string): PolicyMap {
  if (!fs.existsSync(file)) return {};
  return parsePolicy(fs.readFileSync(file, "utf8"));
}

const HEADER =
  "# Harness routing policy\n# Maps step types to Anthropic model tiers (haiku/sonnet/opus)";

export interface SyncResult {
  central: string;
  local: string;
  changed: string[]; // steps whose tier changed
  merged: PolicyMap;
}

/**
 * PUSH: local repo policy → central store. Local wins on conflict (you're
 * publishing this repo's tuned decisions). Provenance logged to the repo ledger.
 */
export function pushPolicy(repoRoot: string): SyncResult {
  const local = readPolicyFile(policyPath(repoRoot));
  const centralFile = centralPolicyPath();
  const central = readPolicyFile(centralFile);

  const merged: PolicyMap = { ...central, ...local };
  const changed = Object.keys(merged).filter((k) => merged[k] !== central[k]);

  fs.mkdirSync(path.dirname(centralFile), { recursive: true });
  fs.writeFileSync(centralFile, serializePolicy(merged, HEADER));

  logProvenance(repoRoot, "push", changed, centralFile);
  return { central: centralFile, local: policyPath(repoRoot), changed, merged };
}

/**
 * PULL: central store → local repo, layered so per-repo overrides survive.
 * central provides defaults; any step already set locally is KEPT (repo wins).
 */
export function pullPolicy(repoRoot: string): SyncResult {
  const localFile = policyPath(repoRoot);
  const local = readPolicyFile(localFile);
  const centralFile = centralPolicyPath();
  const central = readPolicyFile(centralFile);

  // central under local: start from central, then local overrides on top.
  const merged: PolicyMap = { ...central, ...local };
  const changed = Object.keys(merged).filter((k) => merged[k] !== local[k]);

  fs.mkdirSync(path.dirname(localFile), { recursive: true });
  fs.writeFileSync(localFile, serializePolicy(merged, HEADER));

  logProvenance(repoRoot, "pull", changed, centralFile);
  return { central: centralFile, local: localFile, changed, merged };
}

function logProvenance(
  repoRoot: string,
  op: "push" | "pull",
  changed: string[],
  centralFile: string
): void {
  try {
    appendLedger(
      {
        ts: new Date().toISOString(),
        milestone: "policy-sync",
        step: op,
        attempt: 1,
        tier: "n/a",
        tokens_in: 0,
        tokens_out: 0,
        baseline_tokens: 0,
        pass: true,
        metric: changed.length,
        outcome: "PASS",
        retries: 0,
        rules_included: [],
        rules_excluded: [],
        note: `${op} ${changed.length} steps changed [${changed.join(",")}] via ${centralFile}`,
      },
      repoRoot
    );
  } catch {
    // provenance is best-effort
  }
}
