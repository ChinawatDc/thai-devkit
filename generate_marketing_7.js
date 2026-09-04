const fs = require('fs');
const path = require('path');

const posts = {
  'thai-phone-formatter': {
    title: 'บอกลาการเขียน Regex เช็คเบอร์โทรศัพท์ด้วย thai-phone-formatter',
    content: `การรับ Input เบอร์โทรศัพท์จากผู้ใช้งานมักจะมีปัญหาน่าปวดหัวเสมอ บางคนพิมพ์ขีด บางคนพิมพ์เว้นวรรค 

เราขอแนะนำ \`@chinawatdc/thai-phone-formatter\` ไลบรารีที่ช่วยคุณจัดการเบอร์มือถือและเบอร์บ้านในไทยได้อย่างหมดจด

**การติดตั้ง:**
\`\`\`bash
npm install @chinawatdc/thai-phone-formatter
\`\`\`

**ตัวอย่างการใช้งาน:**
\`\`\`typescript
import { formatThaiPhone, isValidThaiPhone } from '@chinawatdc/thai-phone-formatter';

console.log(formatThaiPhone('0812345678')); // "081-234-5678"
console.log(isValidThaiPhone('081-234-5678')); // true
\`\`\`

ช่วยให้ระบบของคุณมี Data ที่สะอาดและเป็นระเบียบขึ้นเยอะ ลองไปเล่น Demo ได้ที่: [UI Playground](https://ui-playground.vercel.app/)`
  },
  'thai-bank-utils': {
    title: 'ไม่ต้องเสียเวลาหาโลโก้ธนาคารอีกต่อไป! จบครบด้วย thai-bank-utils',
    content: `ใครทำระบบ E-Commerce หรือระบบที่ต้องมีการโอนเงิน น่าจะเคยเหนื่อยกับการหารูปโลโก้ หรือโค้ดสีที่ถูกต้องของแต่ละธนาคาร 

\`@chinawatdc/thai-bank-utils\` รวบรวมข้อมูลธนาคารไทยไว้ให้หมดแล้ว เรียกปุ๊บได้ข้อมูลปั๊บ Type-Safe ด้วย!

**การติดตั้ง:**
\`\`\`bash
npm install @chinawatdc/thai-bank-utils
\`\`\`

**ตัวอย่างการใช้งาน:**
\`\`\`typescript
import { getBankInfo } from '@chinawatdc/thai-bank-utils';

const bank = getBankInfo('kbank');
console.log(bank.nameTh); // "ธนาคารกสิกรไทย"
console.log(bank.color);  // "#00A950"
\`\`\`

เอาไปใช้ทำ UI หน้าชำระเงินได้แบบหล่อๆ เลยครับ!`
  },
  'tiny-promptpay-qr': {
    title: 'สร้าง QR Code พร้อมเพย์แบบมีโลโก้ตรงกลาง ภายใน 3 บรรทัด! (Zero Dependencies)',
    content: `ไลบรารีสร้าง QR Code ส่วนใหญ่มักจะตัวใหญ่และต้องพึ่งพา Canvas แต่วันนี้คุณสามารถสร้าง QR Code PromptPay ที่มาในรูปแบบ SVG ภาพคมกริบ พร้อมแปะโลโก้ร้านหรือพิมพ์ข้อความกรอบได้ด้วย

ขอแนะนำ \`@chinawatdc/tiny-promptpay-qr\` ไลบรารีขนาดจิ๋วที่จบในตัวเอง 100% ไม่มี Dependencies ซ่อนเร้น

**การติดตั้ง:**
\`\`\`bash
npm install @chinawatdc/tiny-promptpay-qr
\`\`\`

**ตัวอย่างการใช้งาน:**
\`\`\`typescript
import { generatePromptPaySVG } from '@chinawatdc/tiny-promptpay-qr';

const svgQr = generatePromptPaySVG('0812345678', 150.50, {
  frameText: 'แสกนจ่ายเงิน (Scan to Pay)',
});

// นำ svgQr ไป render เป็น HTML ได้เลย
\`\`\`

โหลดไว โค้ดสั้น ใช้งานง่าย ไปลองเล่น UI จำลองของจริงก่อนได้ที่: [UI Playground](https://ui-playground.vercel.app/)`
  },
  'llm-cost-estimator': {
    title: 'ทำแอป AI อย่างไรไม่ให้งบบานปลาย? มาคำนวณต้นทุนด้วย llm-cost-estimator',
    content: `ปัญหาของคนที่ต่อ API ของ ChatGPT หรือ Claude คือเรามักจะไม่รู้เลยว่าเสียเงินไปเท่าไหร่แล้ว 

\`@chinawatdc/llm-cost-estimator\` คือเครื่องมือเล็กๆ ที่ช่วยคุณประเมินราคาการใช้งานจากจำนวน Tokens ออกมาเป็นหน่วย USD หรือเงินบาทไทยได้ทันที

**การติดตั้ง:**
\`\`\`bash
npm install @chinawatdc/llm-cost-estimator
\`\`\`

**ตัวอย่างการใช้งาน:**
\`\`\`typescript
import { estimateCost } from '@chinawatdc/llm-cost-estimator';

const cost = estimateCost('gpt-4o', 1000, 500); 
console.log(\`Estimated: $\${cost.usd} หรือประมาณ ฿\${cost.thb}\`);
\`\`\`

เหมาะมากสำหรับเอาไปทำระบบ Dashboard ควบคุมค่าใช้จ่ายครับ`
  },
  'ai-stream-reader': {
    title: 'อ่าน Data Stream จาก AI API ง่ายๆ ไม่ต้องปวดหัวกับ Buffer ด้วย ai-stream-reader',
    content: `เวลาต่อ API แบบ Streaming (SSE) ของ OpenAI บางครั้งเราต้องมานั่งเขียนตัวอ่าน Buffer เอง ซึ่งจุกจิกและ Error ง่าย

\`@chinawatdc/ai-stream-reader\` ช่วยจัดการเรื่องยุ่งยากพวกนี้ให้คุณอ่าน Data ทีละบรรทัดได้แบบคลีนๆ ด้วย \`async/await\`

**การติดตั้ง:**
\`\`\`bash
npm install @chinawatdc/ai-stream-reader
\`\`\`

**ตัวอย่างการใช้งาน:**
\`\`\`typescript
import { readSSEStream } from '@chinawatdc/ai-stream-reader';

const response = await fetch('https://api.openai.com/v1/chat/completions', { ... });

for await (const data of readSSEStream(response)) {
  console.log(data); // ได้ก้อน JSON แบบคลีนๆ ออกมาเลย
}
\`\`\`

ชีวิตนักพัฒนา AI จะง่ายขึ้นอีกระดับครับ`
  },
  'use-click-outside-esm': {
    title: 'ลาก่อน Boilerplate! Custom Hook useClickOutside แบบเบาหวิวสำหรับ React 18/19',
    content: `ทุกครั้งที่ทำ Modal, Dropdown หรือ Popup เราก็ต้องมานั่งก๊อปโค้ดตรวจจับการคลิกนอกกรอบ (Click Outside) มาแปะใหม่ทุกครั้ง

จบปัญหานี้ด้วย \`@chinawatdc/use-click-outside-esm\` เล็ก เบา ซัพพอร์ต ESM และพิมพ์ Type-safe มาให้เรียบร้อย

**การติดตั้ง:**
\`\`\`bash
npm install @chinawatdc/use-click-outside-esm
\`\`\`

**ตัวอย่างการใช้งาน:**
\`\`\`tsx
import { useRef, useState } from 'react';
import { useClickOutside } from '@chinawatdc/use-click-outside-esm';

function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef(null);
  
  useClickOutside(ref, () => setIsOpen(false));

  return isOpen ? <div ref={ref}>Click outside to close me!</div> : null;
}
\`\`\`

ลดโค้ดรกๆ ในโปรเจกต์คุณไปได้เยอะเลยทีเดียว!`
  },
  'tiny-jwt-decoder': {
    title: 'ถอดรหัส JWT Payload ฝั่ง Frontend โดยไม่ต้องโหลดไลบรารี Crypto ยักษ์ใหญ่',
    content: `เวลาได้ JWT Token จากระบบ Login มา แล้วเราแค่อยากแกะเอาชื่อหรือ Role ออกมาแสดงผลบนหน้าเว็บ หลายคนเผลอไปติดตั้งไลบรารีใหญ่ๆ อย่าง \`jsonwebtoken\` ลงฝั่ง Frontend ทำให้เว็บช้าลง

\`@chinawatdc/tiny-jwt-decoder\` คือพระเอกของคุณครับ มันถอด Base64 ออกมาเป็น JSON ล้วนๆ ในขนาดไม่กี่ร้อย Bytes!

**การติดตั้ง:**
\`\`\`bash
npm install @chinawatdc/tiny-jwt-decoder
\`\`\`

**ตัวอย่างการใช้งาน:**
\`\`\`typescript
import { decodeJwt } from '@chinawatdc/tiny-jwt-decoder';

const payload = decodeJwt('eyJhbGciOi... (JWT Token)');
console.log(payload.name); 
console.log(payload.role);
\`\`\`

ใช้แค่นี้พอครับ ประหยัดพื้นที่ Bandwidth ของแอปคุณไปได้มหาศาล!`
  }
};

const dir = path.join(__dirname, 'marketing-posts');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

Object.entries(posts).forEach(([pkg, data]) => {
  const filePath = path.join(dir, pkg + '.md');
  const content = '# ' + data.title + '\\n\\n' + data.content;
  fs.writeFileSync(filePath, content);
});

console.log("7 new marketing posts generated successfully.");
