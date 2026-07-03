import { inferTags, renderContext, runIntercept } from "./intercept";
import { compile } from "./compiler";
import { readLedger } from "./ledger";

// M8 slice 0 — "connect the pipe": prove interceptCommand actually compiles
// minimal context from a prompt, injects it, and logs REAL input-side tokens.
// This is the slice that removes the outside-voice "optimizes nothing" critique.

function main() {
  const repoRoot = process.cwd(); // run from repo root with .harness/
  let pass = 0;
  let fail = 0;
  const check = (name: string, ok: boolean, detail = "") => {
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  (" + detail + ")" : ""}`);
    ok ? pass++ : fail++;
  };

  // 1. Tag inference maps prompt language to real rule tags.
  const authTags = inferTags("fix the auth token sanitization bug", repoRoot);
  check(
    "inferTags: security prompt -> security tag",
    authTags.includes("security"),
    `got [${authTags.join(",")}]`
  );

  const gitTags = inferTags("rebase this branch and force push", repoRoot);
  check(
    "inferTags: git/safety prompt -> git+safety",
    gitTags.includes("git") && gitTags.includes("safety"),
    `got [${gitTags.join(",")}]`
  );

  const noiseTags = inferTags("what time is it", repoRoot);
  check("inferTags: irrelevant prompt -> no tags", noiseTags.length === 0, `got [${noiseTags.join(",")}]`);

  // 2. Only tags backed by a real rule are ever returned (no phantom tags).
  const allReturned = inferTags(
    "typescript react component test security git commit",
    repoRoot
  );
  const bundle = compile("x", allReturned, allReturned, repoRoot); // must not throw
  check(
    "inferTags: every returned tag is satisfiable by compile()",
    bundle.rules_included.length > 0,
    `${allReturned.length} tags -> ${bundle.rules_included.length} rules`
  );

  // 3. The core pipe: real input-side savings vs naive full context.
  const before = readLedger(repoRoot).length;
  const result = runIntercept(
    { prompt: "fix a typescript security bug in the auth middleware", cwd: repoRoot },
    repoRoot
  );
  check(
    "runIntercept: compiled tokens < baseline (real savings)",
    result.tokens_in < result.baseline_tokens && result.baseline_tokens > 0,
    `in=${result.tokens_in} baseline=${result.baseline_tokens}`
  );
  check(
    "runIntercept: injected context is non-empty for a matching prompt",
    result.additionalContext.length > 0
  );
  check(
    "runIntercept: context contains ONLY selected rules (not all)",
    result.rules_included.length > 0 && result.rules_included.length < 6,
    `${result.rules_included.length}/6 rules`
  );

  // 4. Ledger actually recorded the intercept with real numbers.
  const after = readLedger(repoRoot);
  const added = after.length - before;
  const last = after[after.length - 1];
  check("ledger: intercept appended exactly one entry", added === 1, `added=${added}`);
  check(
    "ledger: entry has real tokens_in and baseline",
    !!last && last.step === "user-prompt-submit" && last.tokens_in > 0 && last.baseline_tokens > 0,
    last ? `in=${last.tokens_in} base=${last.baseline_tokens}` : "no entry"
  );

  // 5. Empty / irrelevant prompt injects nothing (no false context).
  const empty = runIntercept({ prompt: "hello there", cwd: repoRoot }, repoRoot);
  check("runIntercept: no context injected when nothing matches", empty.additionalContext === "", `ctx len=${empty.additionalContext.length}`);

  // 6. renderContext formats selected rules as a bulleted block.
  const rendered = renderContext(compile("x", ["security"], ["security"], repoRoot));
  check("renderContext: produces a bulleted rules block", rendered.includes("- ") && rendered.includes("harness"));

  const savings =
    result.baseline_tokens > 0
      ? (((result.baseline_tokens - result.tokens_in) / result.baseline_tokens) * 100).toFixed(1)
      : "0";
  console.log("---");
  console.log(`intercept pipe savings on sample prompt: ${savings}%`);
  console.log(`M8 (connect-the-pipe) RESULT: ${fail === 0 ? "PASS" : "FAIL"}  (${pass} passed, ${fail} failed)`);
  process.exit(fail === 0 ? 0 : 1);
}

main();
