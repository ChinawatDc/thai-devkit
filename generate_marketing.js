const fs = require('fs');
const path = require('path');

const posts = {
  'ai-prompt-manager': {
    title: 'หมดปัญหา Prompt รกโค้ด! จัดการ AI Prompt ใน Node.js ให้เป็นระเบียบด้วย ai-prompt-manager',
    content: `เคยไหมครับ เวลาเขียนแอปที่ต่อกับ AI (OpenAI, Gemini) แล้วต้องเอา String ยาวๆ มาต่อกันจนโค้ดรกไปหมด?\n\nวันนี้ผมขอเสนอ \`@chinawatdc/ai-prompt-manager\` ไลบรารีขนาดจิ๋วที่จะช่วยให้คุณจัดการ Prompt ได้เหมือนกับการเรียกใช้ฟังก์ชันธรรมดา!\n\n### ปัญหาที่เจอ\nเวลาเราจะส่ง Prompt ไปให้ AI เรามักจะใช้ Template Literals ต่อ String กันแบบนี้:\n\`\`\`javascript\nconst prompt = \`Hello \${name}, you are an expert in \${topic}. Please explain it to me.\`;\n\`\`\`\nพอ Prompt เริ่มยาวขึ้น มีหลายเวอร์ชัน โค้ดของเราก็จะเริ่มอ่านยากและจัดการยาก\n\n### วิธีแก้ด้วย ai-prompt-manager\nไลบรารีนี้จะช่วยแยก Prompt ออกมาจัดการต่างหาก คุณสามารถลงทะเบียน Template ไว้ แล้วเรียกใช้โดยส่งแค่ตัวแปรเข้าไป\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/ai-prompt-manager\n\`\`\`\n\n**ตัวอย่างการใช้งาน:**\n\`\`\`typescript\nimport { PromptManager } from '@chinawatdc/ai-prompt-manager';\n\nconst manager = new PromptManager();\n\n// 1. ลงทะเบียน Prompt ไว้ส่วนบนของแอป\nmanager.register('expert-tutor', 'Hello {{name}}, you are an expert in {{topic}}. Please explain it.');\n\n// 2. เรียกใช้เมื่อต้องการ\nconst text = manager.get('expert-tutor', { name: 'Dev', topic: 'React' });\nconsole.log(text); \n// Output: Hello Dev, you are an expert in React. Please explain it.\n\`\`\`\n\nแค่นี้โค้ดก็สะอาดขึ้นเยอะเลยครับ ใครสนใจลองโหลดไปใช้ หรือเข้าไปเล่น Demo ได้ที่: [UI Playground](https://ui-playground.vercel.app/)\n\nถ้าชอบฝากกด ⭐️ ให้กำลังใจใน GitHub ด้วยนะครับ!`
  },
  'env-type-checker': {
    title: 'แอปพังเพราะลืมตั้ง ENV จะหมดไป! ตรวจสอบ Type ของ Environment Variables ง่ายๆ ด้วย env-type-checker',
    content: `ปัญหาคลาสสิกของนักพัฒนา Node.js คือเวลา Deploy ขึ้นเซิร์ฟเวอร์แล้วแอปพัง เพราะลืมตั้งค่า Environment Variables หรือตั้งค่าผิด Type (เช่น เผลอใส่ Port เป็น String)\n\nวันนี้ผมเลยทำเครื่องมือเล็กๆ ชื่อ \`@chinawatdc/env-type-checker\` มาช่วยแก้ปัญหานี้ครับ\n\n### ทำไมต้องใช้?\nปกติเรามักจะดึง ENV มาใช้โต้งๆ เลย \`process.env.PORT\` ซึ่งมันไม่ปลอดภัยและไม่มี Type Support ไลบรารีตัวนี้จะช่วยตรวจเช็คให้ตั้งแต่ตอนเริ่มรันแอปเลยว่า ENV ครบไหม และ Type ถูกหรือเปล่า\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/env-type-checker\n\`\`\`\n\n**ตัวอย่างการใช้งาน:**\n\`\`\`typescript\nimport { validateEnv, types } from '@chinawatdc/env-type-checker';\n\nconst schema = {\n  PORT: { type: types.number, required: true },\n  API_KEY: { type: types.string, required: true }\n};\n\nconst result = validateEnv(schema, process.env);\n\nif (!result.success) {\n  console.error("Environment variables ไม่ถูกต้อง!", result.data);\n  process.exit(1);\n}\n\n// ใช้งานได้อย่างสบายใจ\nconsole.log(\`App is running on port \${result.data.PORT}\`);\n\`\`\`\n\nใครเคยเจอปัญหานี้ ลองเอาไปใช้กันดูนะครับ เล็กและเบามากๆ\nลองเล่น Demo: [UI Playground](https://ui-playground.vercel.app/)`
  },
  'thai-address-suggest': {
    title: 'ทำ Auto-complete ที่อยู่ไทยใน React ง่ายๆ ไม่ต้องโหลด Database ใหญ่ๆ ลงเครื่อง',
    content: `เวลาทำฟอร์มสมัครสมาชิกหรือฟอร์มสั่งซื้อของ การให้ User พิมพ์ที่อยู่เองมักจะพิมพ์ผิดกันบ่อย เราเลยมักจะทำ Auto-complete ให้ \n\nแต่ไลบรารีหลายตัวมักจะพ่วง Database ขนาดใหญ่มาด้วย ทำให้แอปบวม วันนี้ผมเลยพัฒนา \`@chinawatdc/thai-address-suggest\` ขึ้นมาครับ!\n\n### จุดเด่น\nมันคือ API เล็กๆ ในตัวเพื่อทำระบบแนะนำตำบล อำเภอ จังหวัด แบบเบาๆ ดึงมาใช้เฉพาะฟังก์ชันที่จำเป็น ไม่กินพื้นที่โปรเจกต์\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/thai-address-suggest\n\`\`\`\n\n**ตัวอย่างการใช้งาน (React):**\n\`\`\`tsx\nimport { suggestProvince } from '@chinawatdc/thai-address-suggest';\n\n// เวลา User พิมพ์คำว่า "กรุง"\nconst results = suggestProvince('กรุง');\nconsole.log(results); // ['กรุงเทพมหานคร']\n\`\`\`\n\nเอาไปต่อยอดกับ Input Dropdown ของคุณได้สบายๆ ครับ \nลองไปกดเล่น Demo บนเว็บที่ผมทำไว้ได้ที่นี่เลย: [UI Playground](https://ui-playground.vercel.app/)`
  },
  'thai-baht-text-esm': {
    title: 'แปลงตัวเลขเป็นคำอ่านเงินบาทภาษาไทย (Thai Baht Text) ฉบับรองรับ ESM',
    content: `ใครทำระบบ E-commerce, ระบบบัญชี หรือระบบออกใบเสร็จ น่าจะเคยปวดหัวกับการต้องแปลงตัวเลข เช่น 150.50 เป็นคำอ่าน "หนึ่งร้อยห้าสิบบาทห้าสิบสตางค์" \n\nผมขอแนะนำ \`@chinawatdc/thai-baht-text-esm\` ไลบรารีขนาดจิ๋วที่แก้ปัญหานี้ให้คุณแบบตรงจุด แถมรองรับ ESM เต็มรูปแบบ!\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/thai-baht-text-esm\n\`\`\`\n\n**ตัวอย่าง:**\n\`\`\`typescript\nimport { ThaiBahtText } from '@chinawatdc/thai-baht-text-esm';\n\nconsole.log(ThaiBahtText(1234.56)); \n// "หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์"\n\`\`\`\nง่ายและแม่นยำ ลองเล่นดูได้ที่ [UI Playground](https://ui-playground.vercel.app/) ครับ`
  },
  'thai-id-validator': {
    title: 'Validate รหัสบัตรประชาชนไทย 13 หลักด้วย JavaScript / TypeScript',
    content: `การตรวจสอบรหัสบัตรประชาชนไทย ไม่ใช่แค่เช็คว่ากรอกครบ 13 หลักไหม แต่เราต้องเช็ค Checksum ด้วยสมการคณิตศาสตร์ที่ถูกต้อง\n\nไม่ต้องไปนั่งเขียน Regex หรือสูตรเองครับ ใช้ \`@chinawatdc/thai-id-validator\` โหลดปุ๊บ ใช้ได้ปั๊บ Type-safe ด้วย\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/thai-id-validator\n\`\`\`\n\n**ตัวอย่าง:**\n\`\`\`typescript\nimport { validateThaiID } from '@chinawatdc/thai-id-validator';\n\nconst result = validateThaiID('1101400000000');\nconsole.log(result.isValid); // false\nconsole.log(result.errorMessage); // "รหัสบัตรประชาชนไม่ถูกต้อง (Checksum ไม่ตรง)"\n\`\`\`\nเหมาะมากสำหรับทำ Form Validation บน Frontend หรือตรวจฝั่ง Backend ครับ`
  },
  'thai-nlp-utils': {
    title: 'จัดการข้อความภาษาไทยใน JavaScript ด้วย thai-nlp-utils ขนาดจิ๋ว',
    content: `การคลีนข้อความภาษาไทย หรือเช็คว่าใน String มีภาษาไทยปนอยู่ไหม บางทีการเขียน Regex เองก็ชวนงง\n\nผมรวม Utilities พื้นฐานสำหรับคนทำเว็บไทยมาให้แล้วใน \`@chinawatdc/thai-nlp-utils\` ไม่ต้องโหลดไลบรารี NLP ขนาดใหญ่ แค่ใช้ฟังก์ชันพื้นฐานเท่าที่จำเป็น\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/thai-nlp-utils\n\`\`\`\n\n**ตัวอย่าง:**\n\`\`\`typescript\nimport { cleanThaiText, isThai } from '@chinawatdc/thai-nlp-utils';\n\nconsole.log(isThai('สวัสดี Hello')); // true\nconsole.log(cleanThaiText('Hello สวัสดี 123 !@#')); // "Hello สวัสดี 123"\n\`\`\`\nลดอาการโค้ดพังเพราะอักขระพิเศษภาษาไทยแปลกๆ ได้เยอะเลยครับ!`
  },
  'tiny-fetch-wrapper': {
    title: 'ทิ้ง Axios ไปซะ! ถ้าคุณต้องการแค่ Fetch พร้อมระบบ Auto-Retry',
    content: `Axios เป็นไลบรารีที่ดีครับ แต่มันเริ่มจะใหญ่เกินไปสำหรับโปรเจกต์ยุคใหม่ที่รองรับ Fetch API แบบ Native แล้ว ปัญหาเดียวคือ Fetch ไม่มีระบบจัดการ Error และ Retry ที่ดีพอ\n\nพบกับ \`@chinawatdc/tiny-fetch-wrapper\` ที่ช่วยคลุม Fetch API ให้ใช้ง่ายเหมือน Axios แถมมี Retry อัตโนมัติ เล็กกว่า 10 เท่า!\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/tiny-fetch-wrapper\n\`\`\`\n\n**ตัวอย่าง:**\n\`\`\`typescript\nimport { tinyFetch } from '@chinawatdc/tiny-fetch-wrapper';\n\ntinyFetch('https://api.example.com/data', { retryCount: 3 })\n  .then(data => console.log(data))\n  .catch(err => console.error('พัง 3 รอบติดกันแล้ว', err));\n\`\`\`\nลองเอาไปใช้แทน Axios ในโปรเจกต์ถัดไปดูนะครับ!`
  },
  'tiny-time-ago': {
    title: 'แสดงเวลาแบบ "5 นาทีที่แล้ว" ใน JavaScript โดยไม่ต้องพึ่ง Moment.js',
    content: `การแสดงผลเวลาแบบ Relative Time (เช่น "เมื่อวานนี้", "5 นาทีที่แล้ว") เป็นฟีเจอร์พื้นฐานของแอปโซเชียล แต่ถ้าโหลด Date-fns หรือ Moment.js เข้ามาแค่เพื่อฟีเจอร์เดียวก็อาจจะหนักแอปเกินไป\n\n\`@chinawatdc/tiny-time-ago\` ถูกสร้างมาเพื่อเรื่องนี้โดยเฉพาะครับ\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/tiny-time-ago\n\`\`\`\n\n**ตัวอย่าง:**\n\`\`\`typescript\nimport { timeAgo } from '@chinawatdc/tiny-time-ago';\n\nconst pastDate = new Date(Date.now() - 5 * 60 * 1000);\nconsole.log(timeAgo(pastDate)); // "5 minutes ago"\n\`\`\`\nจิ๋วแต่แจ๋ว โค้ดอ่านง่าย ไม่พึ่ง Dependency ใดๆ ลองเล่น Demo ดูครับ: [UI Playground](https://ui-playground.vercel.app/)`
  },
  'unified-llm-parser': {
    title: 'สกัด JSON จากข้อความของ AI ได้แม่นยำ 100% ด้วย unified-llm-parser',
    content: `ถ้าคุณเขียนแอปคุยกับ ChatGPT หรือ Gemini แล้วสั่งให้มันพ่นผลลัพธ์เป็น JSON มักจะเจอปัญหาคือ AI ชอบมีคำพูดเกริ่นนำ หรือครอบ Markdown \`\`\`json มาด้วย ทำให้ \`JSON.parse\` พัง!\n\n\`@chinawatdc/unified-llm-parser\` คือฮีโร่ของคุณครับ มันจะเข้าไปสกัดก้อน JSON ออกมาจากข้อความขยะพวกนั้นให้เอง\n\n**การติดตั้ง:**\n\`\`\`bash\nnpm install @chinawatdc/unified-llm-parser\n\`\`\`\n\n**ตัวอย่าง:**\n\`\`\`typescript\nimport { parseLLMOutput } from '@chinawatdc/unified-llm-parser';\n\nconst output = \`\nแน่นอนครับ นี่คือ JSON ที่คุณขอ:\n\\\`\\\`\\\`json\n{"name": "Dev", "role": "Admin"}\n\\\`\\\`\\\`\nหวังว่าจะมีประโยชน์นะครับ!\n\`;\n\nconst data = parseLLMOutput(output);\nconsole.log(data.name); // "Dev"\n\`\`\`\nแค่นี้แอป AI ของคุณก็จะไม่พังเพราะ Parse Error อีกต่อไปครับ!`
  },
  'create-custom-stack': {
    title: 'สร้าง Boilerplate ให้โปรเจกต์ของคุณใน 1 คำสั่ง ด้วย create-custom-stack',
    content: `เบื่อไหมที่ต้องมานั่งลง Next.js, Tailwind, Prisma, Zod ใหม่ทุกครั้งที่เริ่มโปรเจกต์? แล้วยังต้องมานั่ง Config ให้มันคุยกันรู้เรื่องอีก\n\nทำไมไม่สร้าง CLI ของตัวเองล่ะ? วันนี้ผมทำ \`@chinawatdc/create-custom-stack\` ออกมาเป็นต้นแบบให้ทุกคนลองเอาไปใช้ครับ\n\n**วิธีใช้:**\n\`\`\`bash\nnpx @chinawatdc/create-custom-stack my-new-app\n\`\`\`\nคำสั่งเดียวจบ รอระบบติดตั้ง เสร็จปุ๊บเริ่มเขียนโค้ดธุรกิจของคุณได้เลย ไม่ต้องเสียเวลาเซ็ตอัปโครงสร้างอีกต่อไป!\n\nถ้าอยากดูว่า CLI ทำงานยังไง ลองไปโหลดโค้ดมารื้อดูได้บน GitHub เลยครับ`
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

console.log("Marketing posts generated successfully in /marketing-posts folder.");
