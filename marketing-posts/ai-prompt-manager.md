# หมดปัญหา Prompt รกโค้ด! จัดการ AI Prompt ใน Node.js ให้เป็นระเบียบด้วย ai-prompt-manager\n\nเคยไหมครับ เวลาเขียนแอปที่ต่อกับ AI (OpenAI, Gemini) แล้วต้องเอา String ยาวๆ มาต่อกันจนโค้ดรกไปหมด?

วันนี้ผมขอเสนอ `@chinawatdc/ai-prompt-manager` ไลบรารีขนาดจิ๋วที่จะช่วยให้คุณจัดการ Prompt ได้เหมือนกับการเรียกใช้ฟังก์ชันธรรมดา!

### ปัญหาที่เจอ
เวลาเราจะส่ง Prompt ไปให้ AI เรามักจะใช้ Template Literals ต่อ String กันแบบนี้:
```javascript
const prompt = `Hello ${name}, you are an expert in ${topic}. Please explain it to me.`;
```
พอ Prompt เริ่มยาวขึ้น มีหลายเวอร์ชัน โค้ดของเราก็จะเริ่มอ่านยากและจัดการยาก

### วิธีแก้ด้วย ai-prompt-manager
ไลบรารีนี้จะช่วยแยก Prompt ออกมาจัดการต่างหาก คุณสามารถลงทะเบียน Template ไว้ แล้วเรียกใช้โดยส่งแค่ตัวแปรเข้าไป

**การติดตั้ง:**
```bash
npm install @chinawatdc/ai-prompt-manager
```

**ตัวอย่างการใช้งาน:**
```typescript
import { PromptManager } from '@chinawatdc/ai-prompt-manager';

const manager = new PromptManager();

// 1. ลงทะเบียน Prompt ไว้ส่วนบนของแอป
manager.register('expert-tutor', 'Hello {{name}}, you are an expert in {{topic}}. Please explain it.');

// 2. เรียกใช้เมื่อต้องการ
const text = manager.get('expert-tutor', { name: 'Dev', topic: 'React' });
console.log(text); 
// Output: Hello Dev, you are an expert in React. Please explain it.
```

แค่นี้โค้ดก็สะอาดขึ้นเยอะเลยครับ ใครสนใจลองโหลดไปใช้ หรือเข้าไปเล่น Demo ได้ที่: [UI Playground](https://ui-playground.vercel.app/)

ถ้าชอบฝากกด ⭐️ ให้กำลังใจใน GitHub ด้วยนะครับ!