#!/bin/bash
set -e

echo "=== Step 1: Setting up npm workspaces & Turborepo ==="
# Create root package.json
cat << 'EOF' > package.json
{
  "name": "thai-devkit-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "ai-prompt-manager",
    "ai-stream-reader",
    "create-custom-stack",
    "env-type-checker",
    "llm-cost-estimator",
    "thai-address-suggest",
    "thai-baht-text-esm",
    "thai-bank-utils",
    "thai-id-validator",
    "thai-nlp-utils",
    "thai-phone-formatter",
    "tiny-fetch-wrapper",
    "tiny-jwt-decoder",
    "tiny-promptpay-qr",
    "tiny-time-ago",
    "unified-llm-parser",
    "use-click-outside-esm",
    "ui-playground",
    "docs"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "turbo": "^2.1.2",
    "prettier": "^3.3.3"
  }
}
EOF

# Create turbo.json
cat << 'EOF' > turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {}
  }
}
EOF

echo "=== Step 2: GitHub Actions (CI/CD) ==="
mkdir -p .github/workflows
# CI Workflow
cat << 'EOF' > .github/workflows/ci.yml
name: CI

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install
      - run: npm run build
EOF

# Publish Workflow
cat << 'EOF' > .github/workflows/publish.yml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm run build
      - run: |
          for dir in */ ; do
            if [ -f "$dir/package.json" ] && [ "$dir" != "ui-playground/" ] && [ "$dir" != "docs/" ]; then
              echo "Publishing $dir..."
              (cd "$dir" && npm publish --access public) || echo "Failed to publish $dir"
            fi
          done
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
EOF

echo "=== Step 4: Community Setup ==="
mkdir -p .github/ISSUE_TEMPLATE
cat << 'EOF' > .github/ISSUE_TEMPLATE/bug_report.md
---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
A clear and concise description of what you expected to happen.
EOF

cat << 'EOF' > .github/ISSUE_TEMPLATE/feature_request.md
---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: enhancement
assignees: ''

---

**Is your feature request related to a problem? Please describe.**

**Describe the solution you'd like**

**Describe alternatives you've considered**
EOF

cat << 'EOF' > CONTRIBUTING.md
# Contributing to Thai DevKit

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes (`npm run build`).
4. Issue that pull request!

## Local Development
1. Clone the repository
2. Run `npm install` at the root (it will install dependencies for all workspaces).
3. Run `npm run build` at the root to build all packages.
EOF

cat << 'EOF' > README.md
# 🇹🇭 Thai DevKit (Monorepo)

A collection of lightweight, zero-dependency, and high-performance utility libraries specifically tailored for Thai developers and AI integrations.

## 📦 Packages

### Utilities
- `@chinawatdc/thai-phone-formatter`
- `@chinawatdc/thai-bank-utils`
- `@chinawatdc/tiny-promptpay-qr`
- `@chinawatdc/thai-address-suggest`
- `@chinawatdc/thai-id-validator`
- `@chinawatdc/thai-baht-text-esm`
- `@chinawatdc/thai-nlp-utils`
- `@chinawatdc/use-click-outside-esm`
- `@chinawatdc/tiny-time-ago`
- `@chinawatdc/tiny-fetch-wrapper`
- `@chinawatdc/tiny-jwt-decoder`
- `@chinawatdc/env-type-checker`

### AI & LLM Tools
- `@chinawatdc/ai-prompt-manager`
- `@chinawatdc/ai-stream-reader`
- `@chinawatdc/llm-cost-estimator`
- `@chinawatdc/unified-llm-parser`

### CLI Tools
- `@chinawatdc/create-custom-stack`

## 🛠️ Development

This project is a Monorepo powered by **Turborepo** and **npm workspaces**.

```bash
# Install dependencies for all packages
npm install

# Build all packages simultaneously
npm run build
```

## 🤝 Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
EOF

echo "Done writing files. Now installing root dependencies..."
npm install
