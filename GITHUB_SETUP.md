# GitHub Setup Instructions

This guide walks you through publishing harness to GitHub with best practices.

## Prerequisites

- GitHub account
- Git installed locally
- Repository already initialized locally (✅ done)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in repository details:

### Repository Settings

**Repository name:** `harness`

**Description:** 
```
Save 60-70% of Claude Code input tokens by compiling minimal context instead of full CLAUDE.md. Deterministic orchestration spine with smart routing, typed contracts, and learning from runs.
```

**Visibility:** 
- [ ] Public (recommended for open source)
- [ ] Private

**Initialize repository:**
- [ ] ❌ Do NOT add README (we have one)
- [ ] ❌ Do NOT add .gitignore (we have one)
- [ ] ❌ Do NOT add license (we have one)

**Topics/Tags** (add these after creation):
```
claude, claude-code, ai, llm, tokens, optimization, context-compilation, 
orchestration, anthropic, typescript, productivity, cost-savings
```

## Step 2: Connect Local to GitHub

After creating the repository on GitHub:

```bash
cd /Users/luca/Documents/coding/Infra/harness

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/harness.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin master

# Or if you created 'main' branch on GitHub:
git branch -M main
git push -u origin main
```

## Step 3: Update Placeholder URLs

After creating the repository, update these files with your actual GitHub username:

### package.json
```bash
sed -i '' 's/YOUR_USERNAME/your-actual-username/g' package.json
```

### README.md
```bash
sed -i '' 's/YOUR_USERNAME/your-actual-username/g' README.md
```

### SECURITY.md
```bash
# Update email in SECURITY.md manually
# Replace: [your-email@example.com]
# With: your-actual-email@example.com
```

Then commit and push:
```bash
git add package.json README.md SECURITY.md
git commit -m "docs: Update GitHub URLs with actual username"
git push
```

## Step 4: Configure Repository Settings

On GitHub, go to your repository settings:

### About Section (Top right of repo page)
- ✅ Add description (same as above)
- ✅ Add website (if you have one)
- ✅ Add topics (see list above)

### General Settings
- ✅ Enable **Issues**
- ✅ Enable **Discussions** (optional, good for Q&A)
- ✅ Enable **Projects** (optional)

### Branches
- Set default branch to `main` (or `master`)
- Consider branch protection rules:
  - ✅ Require pull request reviews before merging
  - ✅ Require status checks to pass (CI)
  - ✅ Require branches to be up to date before merging

### Actions (GitHub Actions CI)
- ✅ Enable Actions (should be automatic)
- Verify CI runs on first push

## Step 5: Add Repository Badges

After first CI run passes, your README badges will work:

- [![npm version](https://img.shields.io/npm/v/harness.svg?style=flat-square)](https://www.npmjs.com/package/harness)
- [![Tests](https://github.com/YOUR_USERNAME/harness/workflows/CI/badge.svg)](https://github.com/YOUR_USERNAME/harness/actions)
- [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Update README.md CI badge URL:
```markdown
[![Tests](https://github.com/YOUR_USERNAME/harness/workflows/CI/badge.svg)](https://github.com/YOUR_USERNAME/harness/actions)
```

## Step 6: Create First Release

After pushing to GitHub:

```bash
# Tag the current version
git tag v0.1.0
git push origin v0.1.0
```

On GitHub:
1. Go to **Releases** → **Create a new release**
2. Choose tag: `v0.1.0`
3. Release title: `v0.1.0 - Initial Release`
4. Description: Copy from CHANGELOG.md v0.1.0 section
5. ✅ Mark as latest release
6. Publish release

## Step 7: (Optional) Publish to npm

If you want others to install via `npm install -g harness`:

```bash
# Login to npm (one time)
npm login

# Publish (ensure package.json name is unique)
npm publish

# Or for scoped package
npm publish --access public
```

**Note:** Check if `harness` name is available on npm first:
```bash
npm view harness
```

If taken, consider: `@your-username/harness` or `claude-harness` or `harness-ai`

## Step 8: Add to README

Add installation instructions in README:

```markdown
## Installation

### From npm
\`\`\`bash
npm install -g harness
\`\`\`

### From GitHub
\`\`\`bash
npm install -g github:YOUR_USERNAME/harness
\`\`\`

### From source
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/harness.git
cd harness
npm install
npm run build
npm link
\`\`\`
```

## Step 9: Social/Promotion (Optional)

Share your project:
- Twitter/X: "Built harness: save 60-70% of @AnthropicAI Claude Code tokens"
- Reddit: r/ClaudeAI, r/programming
- Hacker News: Show HN
- Dev.to: Write a blog post

## Verification Checklist

After setup, verify:

- [ ] Repository is visible on GitHub
- [ ] README renders correctly with badges
- [ ] CI workflow runs and passes
- [ ] Issues/PRs use templates
- [ ] License is visible
- [ ] Topics/tags are added
- [ ] Description is set
- [ ] Release v0.1.0 exists
- [ ] Clone works: `git clone https://github.com/YOUR_USERNAME/harness.git`
- [ ] URLs in package.json work
- [ ] Security contact is correct

## Common Issues

### Badge not showing
- Wait for first CI run to complete
- Verify workflow file is in `.github/workflows/ci.yml`
- Check Actions tab for errors

### Tests failing on CI
- Ensure `.harness/` fixtures are committed
- Check Node version compatibility (18+)
- Verify all dependencies in package.json

### npm publish fails
- Name might be taken (check `npm view harness`)
- Use scoped package: `@username/harness`
- Ensure you're logged in: `npm whoami`

## Next Steps

1. **Star your own repo** (shows confidence)
2. **Add contributing guidelines** link to README
3. **Monitor issues** and respond quickly
4. **Keep CHANGELOG.md updated** with each change
5. **Consider adding:**
   - Code of Conduct
   - Funding options (GitHub Sponsors)
   - Examples directory
   - Wiki for extended docs

## Support

If you need help:
- GitHub Issues: Technical problems
- GitHub Discussions: Questions and ideas
- CONTRIBUTING.md: Development setup

---

**Ready to push?** Follow Step 2 above to connect and push to GitHub!
