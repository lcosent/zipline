# Project Rename Checklist: zipline → claude0 (ClaudeZero)

## ✅ Completed in PR

- [x] Package name changed to `claude0`
- [x] Binary command changed to `claude0`
- [x] Directory renamed: `.zipline/` → `.claude0/`
- [x] All documentation updated (README, QUICKSTART, CONTRIBUTING)
- [x] All source code updated (65 files total)
- [x] All test files updated
- [x] GitHub templates updated
- [x] Internal docs updated (BACKLOG, MILESTONES, etc.)
- [x] URLs updated to `lcosent/claude0`
- [x] Twitter share text updated to "ClaudeZero"
- [x] Build verified (npm run build passes)

## 📋 Post-Merge Tasks

### 1. Rename GitHub Repository (Critical)

**Go to:** `https://github.com/lcosent/zipline/settings`

1. Scroll to "Repository name"
2. Change from `zipline` to `claude0`
3. Click "Rename"

⚠️ **Important:** GitHub will automatically set up redirects from the old URL, but update any external references.

### 2. Update npm Package

**Before publishing:**

```bash
# Make sure you're on master after merge
git checkout master
git pull

# Verify package name
grep '"name"' package.json
# Should show: "name": "claude0"

# Publish to npm
npm publish
```

**Note:** This will be a new package on npm. The old `zipline` package will remain but can be deprecated:

```bash
npm deprecate zipline "Package renamed to claude0"
```

### 3. Update GitHub Settings

After renaming the repository:

1. **Description:** Update if it mentions "zipline"
   ```
   Cut your Claude Code bill by 65%. Intelligent context compilation that sends only relevant rules. Zero workflow changes.
   ```

2. **Topics:** Keep existing topics, they're already correct

3. **Social Preview Image:** Update if it shows "zipline" text
   - Should show "⚡️ claude0" or "ClaudeZero"

### 4. Update External References

Check and update any external mentions:

- [ ] Personal website/portfolio
- [ ] Twitter/social media bios
- [ ] Blog posts
- [ ] Other repositories that link to this one
- [ ] Documentation sites

### 5. Notify Users (If Any)

If people are already using zipline:

1. **Create GitHub Release** (v1.3.0 or v2.0.0)
   ```markdown
   # Version 2.0.0 - Renamed to ClaudeZero
   
   The package has been renamed from `zipline` to `claude0` (pronounced "ClaudeZero").
   
   ## Migration
   
   1. Uninstall old package: `npm uninstall -g zipline`
   2. Install new package: `npm install -g claude0`
   3. Run `claude0 init` in your projects (creates .claude0/ directory)
   
   Your existing `.zipline/` directories will need to be renamed to `.claude0/`.
   
   ## Breaking Changes
   - Command changed: `zipline` → `claude0`
   - Directory changed: `.zipline/` → `.claude0/`
   
   ## What Stays the Same
   - All functionality remains identical
   - Same 65% token savings
   - Same configuration format
   ```

2. **Add migration note to README**
   ```markdown
   > **Note:** This project was previously called "zipline". If you're upgrading, see [migration guide](#migration-from-zipline).
   ```

### 6. Update Documentation Links

- [ ] README badges (npm, downloads) - will auto-update after npm publish
- [ ] Any external documentation
- [ ] GitHub Wiki (if exists)

### 7. Clean Up Old Package (Optional)

After confirming new package works:

```bash
# Deprecate old package on npm
npm deprecate zipline "Renamed to claude0. Install with: npm install -g claude0"

# Optionally transfer ownership or archive
npm owner add <new-owner> zipline  # if transferring
```

## 🎯 Expected Outcome

**Before:**
- Package: `zipline`
- Command: `zipline init`
- Repo: `github.com/lcosent/zipline`
- Directory: `.zipline/`

**After:**
- Package: `claude0`
- Command: `claude0 init`
- Repo: `github.com/lcosent/claude0`
- Directory: `.claude0/`

## 📝 Version Bump Recommendation

Since this is a breaking change (command name changes), consider:

**Option 1: Major version bump**
- Current: v1.2.0
- New: v2.0.0
- Signals breaking change to users

**Option 2: Keep version, new package**
- Current: v1.2.0
- New: v1.2.0 (as claude0)
- It's a new npm package, can start fresh

## 🔗 Key URLs

- **PR:** https://github.com/lcosent/zipline/pull/1
- **Current Repo:** https://github.com/lcosent/zipline
- **After Rename:** https://github.com/lcosent/claude0
- **Old npm:** https://www.npmjs.com/package/zipline (if published)
- **New npm:** https://www.npmjs.com/package/claude0 (after publish)

## ⚠️ Important Notes

1. **GitHub redirects:** Old URLs will redirect automatically
2. **npm package:** `claude0` is a NEW package, not a rename
3. **Breaking change:** Users must reinstall and update commands
4. **Migration path:** Users need to run `claude0 init` in their projects

---

**Next immediate action:** Merge PR #1, then rename GitHub repository
