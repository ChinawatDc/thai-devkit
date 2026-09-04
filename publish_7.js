const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const packages = [
  'thai-phone-formatter',
  'thai-bank-utils',
  'tiny-promptpay-qr',
  'llm-cost-estimator',
  'ai-stream-reader',
  'use-click-outside-esm',
  'tiny-jwt-decoder'
];

for (const pkg of packages) {
  const dir = path.join(__dirname, pkg);
  
  // Create a minimal README.md
  const readmeContent = '# @chinawatdc/' + pkg + '\\n\\n' +
  'A lightweight utility library by @chinawatdc.\\n\\n' +
  '## Installation\\n\\n' +
  '```bash\\n' +
  'npm install @chinawatdc/' + pkg + '\\n' +
  '```\\n\\n' +
  '## Usage\\n' +
  'Please check the source code or UI Playground for usage examples.\\n';
  fs.writeFileSync(path.join(dir, 'README.md'), readmeContent);
  
  console.log("Publishing " + pkg + "...");
  try {
    execSync('npm publish --access public', { cwd: dir, stdio: 'inherit' });
    console.log("✅ Successfully published " + pkg);
  } catch (err) {
    console.error("❌ Failed to publish " + pkg);
  }
}
