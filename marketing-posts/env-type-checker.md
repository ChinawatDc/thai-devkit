# แอปพังเพราะลืมตั้ง ENV จะหมดไป! ตรวจสอบ Type ของ Environment Variables ง่ายๆ ด้วย env-type-checker\n\nปัญหาคลาสสิกของนักพัฒนา Node.js คือเวลา Deploy ขึ้นเซิร์ฟเวอร์แล้วแอปพัง เพราะลืมตั้งค่า Environment Variables หรือตั้งค่าผิด Type (เช่น เผลอใส่ Port เป็น String)

วันนี้ผมเลยทำเครื่องมือเล็กๆ ชื่อ `@chinawatdc/env-type-checker` มาช่วยแก้ปัญหานี้ครับ

### ทำไมต้องใช้?
ปกติเรามักจะดึง ENV มาใช้โต้งๆ เลย `process.env.PORT` ซึ่งมันไม่ปลอดภัยและไม่มี Type Support ไลบรารีตัวนี้จะช่วยตรวจเช็คให้ตั้งแต่ตอนเริ่มรันแอปเลยว่า ENV ครบไหม และ Type ถูกหรือเปล่า

**การติดตั้ง:**
```bash
npm install @chinawatdc/env-type-checker
```

**ตัวอย่างการใช้งาน:**
```typescript
import { validateEnv, types } from '@chinawatdc/env-type-checker';

const schema = {
  PORT: { type: types.number, required: true },
  API_KEY: { type: types.string, required: true }
};

const result = validateEnv(schema, process.env);

if (!result.success) {
  console.error("Environment variables ไม่ถูกต้อง!", result.data);
  process.exit(1);
}

// ใช้งานได้อย่างสบายใจ
console.log(`App is running on port ${result.data.PORT}`);
```

ใครเคยเจอปัญหานี้ ลองเอาไปใช้กันดูนะครับ เล็กและเบามากๆ
ลองเล่น Demo: [UI Playground](https://ui-playground.vercel.app/)