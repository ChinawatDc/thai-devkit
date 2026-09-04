const fs = require('fs');
const path = require('path');

const packages = [
  'ai-prompt-manager',
  'create-custom-stack',
  'thai-address-suggest',
  'thai-nlp-utils',
  'tiny-fetch-wrapper'
];

const packageJsonUpdates = {
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "dev": "tsup src/index.ts --format cjs,esm --watch",
    "test": "echo \"No test yet\""
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }
};

const devDeps = {
  "tsup": "^8.5.1",
  "typescript": "^5.4.5"
};

const sourceCodes = {
  'ai-prompt-manager': `export class PromptManager {
  private prompts: Map<string, string> = new Map();

  register(name: string, template: string) {
    this.prompts.set(name, template);
  }

  get(name: string, variables: Record<string, string | number> = {}): string {
    const template = this.prompts.get(name);
    if (!template) {
      throw new Error(\`Prompt template '\${name}' not found.\`);
    }

    return Object.entries(variables).reduce(
      (result, [key, value]) => result.replace(new RegExp(\`{{\${key}}}\`, 'g'), String(value)),
      template
    );
  }
}
`,
  'create-custom-stack': `export function initStack(options: any) {
  console.log("Initializing custom stack with options:", options);
  return true;
}
`,
  'thai-address-suggest': `const provinces = ['กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น'];

export function suggestProvince(keyword: string): string[] {
  if (!keyword) return [];
  return provinces.filter(p => p.includes(keyword));
}
`,
  'thai-nlp-utils': `export function cleanThaiText(text: string): string {
  return text.replace(/[^\\u0E00-\\u0E7Fa-zA-Z0-9\\s]/g, '').trim();
}

export function isThai(text: string): boolean {
  return /[\\u0E00-\\u0E7F]/.test(text);
}
`,
  'tiny-fetch-wrapper': `export interface FetchOptions extends RequestInit {
  retryCount?: number;
  retryDelay?: number;
  timeout?: number;
}

export class FetchError extends Error {
  public response: Response;
  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export async function tinyFetch(url: string, options: FetchOptions = {}): Promise<any> {
  const { retryCount = 0, retryDelay = 1000, timeout = 10000, ...fetchOptions } = options;

  let attempt = 0;
  while (attempt <= retryCount) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new FetchError(\`HTTP error! status: \${response.status}\`, response);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return response.text();
    } catch (error: any) {
      if (attempt >= retryCount) throw error;
      attempt++;
      await new Promise(res => setTimeout(res, retryDelay));
    }
  }
}
`
};

for (const pkg of packages) {
  const dir = path.join(__dirname, pkg);
  const srcDir = path.join(dir, 'src');
  
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }

  // Write src/index.ts
  fs.writeFileSync(path.join(srcDir, 'index.ts'), sourceCodes[pkg]);

  // Update package.json
  const pkgJsonPath = path.join(dir, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgData = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    Object.assign(pkgData, packageJsonUpdates);
    
    if (!pkgData.devDependencies) pkgData.devDependencies = {};
    Object.assign(pkgData.devDependencies, devDeps);
    
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgData, null, 2));
  }
}
console.log("All packages initialized with code and config!");
