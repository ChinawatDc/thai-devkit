const fs = require('fs');
const path = require('path');

const packages = {
  'thai-phone-formatter': `
export function formatThaiPhone(phone: string): string {
  const cleaned = phone.replace(/\\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return cleaned.replace(/(\\d{3})(\\d{3})(\\d{4})/, '$1-$2-$3');
  }
  if (cleaned.length === 9 && cleaned.startsWith('0')) {
    return cleaned.replace(/(\\d{2})(\\d{3})(\\d{4})/, '$1-$2-$3');
  }
  return phone;
}

export function isValidThaiPhone(phone: string): boolean {
  const cleaned = phone.replace(/\\D/g, '');
  return (cleaned.length === 10 || cleaned.length === 9) && cleaned.startsWith('0');
}
  `,
  'thai-bank-utils': `
export interface BankInfo {
  code: string;
  nameTh: string;
  nameEn: string;
  color: string;
}

const banks: Record<string, BankInfo> = {
  kbank: { code: 'kbank', nameTh: 'ธนาคารกสิกรไทย', nameEn: 'Kasikornbank', color: '#00A950' },
  scb: { code: 'scb', nameTh: 'ธนาคารไทยพาณิชย์', nameEn: 'Siam Commercial Bank', color: '#4E2A84' },
  bbl: { code: 'bbl', nameTh: 'ธนาคารกรุงเทพ', nameEn: 'Bangkok Bank', color: '#1E4598' },
  ktb: { code: 'ktb', nameTh: 'ธนาคารกรุงไทย', nameEn: 'Krungthai Bank', color: '#12A8E0' },
  krungsri: { code: 'krungsri', nameTh: 'ธนาคารกรุงศรีอยุธยา', nameEn: 'Bank of Ayudhya', color: '#FCC416' },
  ttb: { code: 'ttb', nameTh: 'ธนาคารทหารไทยธนชาต', nameEn: 'TTB', color: '#0050F0' },
  gsb: { code: 'gsb', nameTh: 'ธนาคารออมสิน', nameEn: 'Government Savings Bank', color: '#EB008B' },
};

export function getBankInfo(code: string): BankInfo | null {
  return banks[code.toLowerCase()] || null;
}

export function getAllBanks(): BankInfo[] {
  return Object.values(banks);
}
  `,
  'tiny-promptpay-qr': `
// CRC16 implementation
function crc16(data: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

export function generatePayload(target: string, amount?: number): string {
  let targetType = '01'; // Default Mobile
  let formattedTarget = target.replace(/\\D/g, '');
  if (formattedTarget.length === 10) {
    formattedTarget = '0066' + formattedTarget.substring(1);
  } else if (formattedTarget.length === 13) {
    targetType = '02'; // National ID
  }

  const amountStr = amount ? \`54\${String(amount.toFixed(2).length).padStart(2, '0')}\${amount.toFixed(2)}\` : '';
  const payloadBeforeCrc = \`00020101021129370016A000000677010111\${targetType}13\${formattedTarget}5802TH5303764\${amountStr}6304\`;
  
  return payloadBeforeCrc + crc16(payloadBeforeCrc);
}
  `,
  'llm-cost-estimator': `
const rates: Record<string, { input: number, output: number }> = {
  'gpt-4o': { input: 5, output: 15 }, // Per 1M tokens
  'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  'claude-3-5-sonnet': { input: 3, output: 15 },
};

export function estimateCost(model: string, inputTokens: number, outputTokens: number): { usd: number, thb: number } {
  const rate = rates[model.toLowerCase()] || rates['gpt-4o']; // Default to gpt-4o if unknown
  
  const inputCost = (inputTokens / 1_000_000) * rate.input;
  const outputCost = (outputTokens / 1_000_000) * rate.output;
  const totalUsd = inputCost + outputCost;
  
  return {
    usd: totalUsd,
    thb: totalUsd * 35 // Approximate 35 THB/USD
  };
}
  `,
  'ai-stream-reader': `
export async function* readSSEStream(response: Response) {
  if (!response.body) throw new Error("No body in response");
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\\n');
    
    buffer = lines.pop() || ''; // Keep the last incomplete line
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') return;
        yield data;
      }
    }
  }
}
  `,
  'use-click-outside-esm': `
import { useEffect, RefObject } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
  `,
  'tiny-jwt-decoder': `
export function decodeJwt<T = any>(token: string): T | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as T;
  } catch (e) {
    return null;
  }
}
  `
};

const devDepsBase = {
  "tsup": "^8.5.1",
  "typescript": "^5.4.5"
};

Object.entries(packages).forEach(([pkg, code]) => {
  const dir = path.join(__dirname, pkg);
  const srcDir = path.join(dir, 'src');
  
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }

  // Write src/index.ts
  fs.writeFileSync(path.join(srcDir, 'index.ts'), code.trim());

  // Package.json creation or update
  const pkgJsonPath = path.join(dir, 'package.json');
  let pkgData = {
    name: '@chinawatdc/' + pkg,
    version: "1.0.0",
    main: "./dist/index.js",
    module: "./dist/index.mjs",
    types: "./dist/index.d.ts",
    scripts: {
      build: "tsup src/index.ts --format cjs,esm --dts --clean"
    },
    exports: {
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.mjs",
        require: "./dist/index.js"
      }
    },
    dependencies: {},
    devDependencies: { ...devDepsBase }
  };

  if (pkg === 'use-click-outside-esm') {
    pkgData.dependencies['react'] = '^18.0.0 || ^19.0.0';
    pkgData.devDependencies['@types/react'] = '^18.0.0';
  }

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgData, null, 2));
});

console.log("All 7 packages initialized!");
