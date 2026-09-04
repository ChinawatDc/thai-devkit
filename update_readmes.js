const fs = require('fs');
const path = require('path');

const packagesInfo = {
  'ai-prompt-manager': {
    desc: 'จัดการ Prompt แบบมีตัวแปร ใส่ Template ใช้งานง่าย ลดความซ้ำซ้อนในโค้ด (Zero Dependencies)',
    keywords: ['prompt', 'ai', 'manager', 'llm', 'template', 'openai', 'chatgpt', 'gemini']
  },
  'create-custom-stack': {
    desc: 'บอกลาการตั้งค่าซ้ำซาก สร้าง Next.js + Tailwind + Zod + Prisma แบบพร้อมใช้งานในคำสั่งเดียว',
    keywords: ['cli', 'scaffold', 'boilerplate', 'nextjs', 'tailwind', 'prisma', 'react', 'stack']
  },
  'env-type-checker': {
    desc: 'เช็ค Type และ Required ของตัวแปร Environment ตั้งแต่ตอนรัน ป้องกันแอปพังเพราะลืมตั้งค่า Config',
    keywords: ['env', 'environment', 'validation', 'type-checker', 'dotenv', 'schema', 'config']
  },
  'thai-address-suggest': {
    desc: 'API เล็กๆ ในตัวเพื่อทำระบบแนะนำตำบล อำเภอ จังหวัด แบบเบาๆ ไม่ต้องโหลด Database ใหญ่ๆ ลงเครื่อง',
    keywords: ['thai', 'address', 'autocomplete', 'thailand', 'province', 'district', 'subdistrict']
  },
  'thai-baht-text-esm': {
    desc: 'แปลงเลขจำนวนเงินเป็นคำอ่านไทยเป๊ะๆ รองรับ ESM (ECMAScript Modules)',
    keywords: ['thai', 'baht', 'text', 'money', 'currency', 'thailand', 'esm', 'บาท', 'แปลงเงิน']
  },
  'thai-id-validator': {
    desc: 'เช็ค Format ความยาว และตัวเลข Checksum ว่ารหัสบัตรประชาชนนี้ถูกต้องหรือไม่ อย่างรวดเร็ว',
    keywords: ['thai', 'id', 'validator', 'national-id', 'thailand', 'citizen', 'บัตรประชาชน']
  },
  'thai-nlp-utils': {
    desc: 'ตัดคำแปลกปลอม ตรวจสอบภาษาไทย หรือจัดการข้อความพื้นฐาน แบบน้ำหนักเบา ไม่พึ่งพาไลบรารีใหญ่',
    keywords: ['thai', 'nlp', 'text', 'cleaner', 'thailand', 'string', 'utils']
  },
  'tiny-fetch-wrapper': {
    desc: 'จัดการ Error และ Retry ให้แบบอัตโนมัติ ใช้ง่ายเหมือน axios แต่ขนาดเล็กกว่า 10 เท่า',
    keywords: ['fetch', 'wrapper', 'retry', 'http', 'request', 'axios-alternative', 'tiny', 'api']
  },
  'tiny-time-ago': {
    desc: 'บอกลา Date-fns หรือ Moment.js ถ้าคุณแค่ต้องการแปลงวันที่เป็น "5 นาทีที่แล้ว" หรือ "ในอีก 10 นาที"',
    keywords: ['time', 'date', 'time-ago', 'relative', 'tiny', 'format', 'moment', 'date-fns']
  },
  'unified-llm-parser': {
    desc: 'ดึงข้อมูล JSON ที่ซ่อนอยู่ในข้อความที่ AI พ่นออกมา (เช่น Markdown JSON blocks) ได้อย่างแม่นยำและทนทาน',
    keywords: ['llm', 'ai', 'json', 'parser', 'extract', 'openai', 'chatgpt', 'gemini', 'anthropic']
  }
};

Object.keys(packagesInfo).forEach(pkg => {
  const info = packagesInfo[pkg];
  const dir = path.join(__dirname, pkg);
  if (!fs.existsSync(dir)) return;

  // 1. package.json keywords
  const pkgJsonPath = path.join(dir, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgData = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    pkgData.keywords = info.keywords;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgData, null, 2));
  }

  // 2. README.md
  let readme = "# @chinawatdc/" + pkg + "\\n\\n";
  readme += "[![npm version](https://img.shields.io/npm/v/@chinawatdc/" + pkg + ".svg)](https://www.npmjs.com/package/@chinawatdc/" + pkg + ")\\n\\n";
  readme += "> " + info.desc + "\\n\\n";
  readme += "🎮 **ลองเล่น Demo (Playground):** [UI Playground](https://ui-playground.vercel.app)\\n\\n";
  readme += "## 🚀 ทำไมต้องใช้แพ็กเกจนี้? (Features)\\n";
  readme += "- 📦 **เบามาก (Lightweight):** ไม่มี Dependency ที่ไม่จำเป็น\\n";
  readme += "- 🛡️ **Type-safe:** เขียนด้วย TypeScript 100%\\n";
  readme += "- ⚡ **ใช้ง่าย (Simple API):** ก๊อปโค้ดไปวางแล้วใช้งานได้เลย\\n\\n";
  readme += "## 📦 การติดตั้ง (Installation)\\n\\n";
  readme += "```bash\\nnpm install @chinawatdc/" + pkg + "\\n```\\n\\n";
  readme += "## 📝 License\\nMIT License - Created by ChinawatDc\\n";

  // Use JSON parse to handle \n properly in writeFileSync or just use string
  // It's already string. Oh wait, double slashes were used in the code block.
  // I will just use actual newlines.
  
  let actualReadme = "# @chinawatdc/" + pkg + "\\n\\n";
  actualReadme += "[![npm version](https://img.shields.io/npm/v/@chinawatdc/" + pkg + ".svg)](https://www.npmjs.com/package/@chinawatdc/" + pkg + ")\\n\\n";
  actualReadme += "> " + info.desc + "\\n\\n";
  actualReadme += "🎮 **ลองเล่น Demo (Playground):** [UI Playground](https://ui-playground.vercel.app)\\n\\n";
  actualReadme += "## 🚀 ทำไมต้องใช้แพ็กเกจนี้? (Features)\\n";
  actualReadme += "- 📦 **เบามาก (Lightweight):** ไม่มี Dependency ที่ไม่จำเป็น\\n";
  actualReadme += "- 🛡️ **Type-safe:** เขียนด้วย TypeScript 100%\\n";
  actualReadme += "- ⚡ **ใช้ง่าย (Simple API):** ก๊อปโค้ดไปวางแล้วใช้งานได้เลย\\n\\n";
  actualReadme += "## 📦 การติดตั้ง (Installation)\\n\\n";
  actualReadme += "```bash\\n";
  actualReadme += "npm install @chinawatdc/" + pkg + "\\n";
  actualReadme += "```\\n\\n";
  actualReadme += "## 📝 License\\nMIT License - Created by ChinawatDc\\n";

  fs.writeFileSync(path.join(dir, 'README.md'), actualReadme.replace(/\\n/g, '\\n'));
});

console.log("Updated readmes and keywords for all packages.");
