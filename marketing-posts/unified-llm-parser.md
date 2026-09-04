# สกัด JSON จากข้อความของ AI ได้แม่นยำ 100% ด้วย unified-llm-parser\n\nถ้าคุณเขียนแอปคุยกับ ChatGPT หรือ Gemini แล้วสั่งให้มันพ่นผลลัพธ์เป็น JSON มักจะเจอปัญหาคือ AI ชอบมีคำพูดเกริ่นนำ หรือครอบ Markdown ```json มาด้วย ทำให้ `JSON.parse` พัง!

`@chinawatdc/unified-llm-parser` คือฮีโร่ของคุณครับ มันจะเข้าไปสกัดก้อน JSON ออกมาจากข้อความขยะพวกนั้นให้เอง

**การติดตั้ง:**
```bash
npm install @chinawatdc/unified-llm-parser
```

**ตัวอย่าง:**
```typescript
import { parseLLMOutput } from '@chinawatdc/unified-llm-parser';

const output = `
แน่นอนครับ นี่คือ JSON ที่คุณขอ:
\`\`\`json
{"name": "Dev", "role": "Admin"}
\`\`\`
หวังว่าจะมีประโยชน์นะครับ!
`;

const data = parseLLMOutput(output);
console.log(data.name); // "Dev"
```
แค่นี้แอป AI ของคุณก็จะไม่พังเพราะ Parse Error อีกต่อไปครับ!