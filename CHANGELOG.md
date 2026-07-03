# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Hook integration for transparent context compilation
- Real LLM API calls (currently simulated in tests)
- Cross-project policy sync (`harness policy pull/push`)

## [0.1.0] - 2026-07-03

### Added
- **M0: Autonomy Harness**
  - Self-running milestone loops with PASS/FAIL/STUCK detection
  - `hello` and `always-fail` test milestones
  - No-improvement stop (2 consecutive attempts)

- **M1: Context Compiler + Ledger**
  - Context compiler: `compile(goal, tags)` selects minimal rule set
  - Rules system: `.harness/rules/*.md` with frontmatter tags
  - Ledger: append-only JSONL with `tokens_in`, `baseline_tokens`
  - **Proven savings:** 64.4% median token reduction vs full-context
  - Silent-drop protection with `rules_included[]`, `rules_excluded[]`

- **M2: Router**
  - Policy-based tier selection (Haiku/Sonnet/Opus)
  - Escalation on contract validation failure
  - Auto-demote: >40% fail-rate promotes default tier
  - **Cost savings:** 19.8% of always-Opus cost at pass-rate parity

- **M3: Contracts**
  - Zod schemas for typed step I/O
  - Schema validation with 1 repair retry
  - **Output quality:** 100% valid rate, 70% token reduction

- **M4: The Loop**
  - DESIGN step: Multi-agent debate (pragmatist/skeptic/architect) → converge
  - PLAN step: Design → milestones with success criteria
  - GATE step: Re-plan against prior actuals from ledger
  - BUILD step: Implementation with compiler + router
  - VERIFY step: 2 independent reviewers (santa-method)

- **M5: Learning**
  - Policy tuning from ≥100 ledger runs
  - Compiler rule selection optimization
  - Human-approved policy diffs
  - **Tuning results:** 75% of starting policy cost at pass-rate parity

- **M6: Dashboard**
  - `harness report`: runs, savings %, tier mix, escalations
  - Savings by milestone with regression detection
  - Ledger reconciliation checks

- **M7: Cross-Project Policy**
  - Shared policy across repos
  - Cold-start beats hand-written policy

- **CLI Commands**
  - `harness init [--global]` - Initialize .harness/ structure
  - `harness report [--global]` - Token savings dashboard
  - `harness compile "goal" tags` - Manual context compilation
  - `harness uninstall [--global] [--force]` - Clean removal with data protection

- **Path Resolution**
  - Upward search for `.harness/` (like git with `.git/`)
  - Per-repo or global `~/.harness/` support
  - Works from any subdirectory

- **Documentation**
  - README.md: User guide
  - DESIGN.md: Architecture and design decisions
  - MILESTONES.md: Detailed success criteria
  - IMPLEMENTATION.md: Delivery summary and metrics

### Test Results
- All milestone tests (M0-M7) passing
- Integration tests validated full workflow
- Median token savings: 63.2%
- Pass rate: 89.7%

## [0.0.1] - 2026-07-02

### Initial
- Project structure created
- Design document drafted
- Gstack review completed
- GO/NO-GO gate defined for M1

---

## Version History

- **0.1.0** - First complete release (all milestones M0-M7)
- **0.0.1** - Initial design and planning

## Deprecation Notice

None currently.

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting.
