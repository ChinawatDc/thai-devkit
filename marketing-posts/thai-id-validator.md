# Validate รหัสบัตรประชาชนไทย 13 หลักด้วย JavaScript / TypeScript\n\nการตรวจสอบรหัสบัตรประชาชนไทย ไม่ใช่แค่เช็คว่ากรอกครบ 13 หลักไหม แต่เราต้องเช็ค Checksum ด้วยสมการคณิตศาสตร์ที่ถูกต้อง

ไม่ต้องไปนั่งเขียน Regex หรือสูตรเองครับ ใช้ `@chinawatdc/thai-id-validator` โหลดปุ๊บ ใช้ได้ปั๊บ Type-safe ด้วย

**การติดตั้ง:**
```bash
npm install @chinawatdc/thai-id-validator
```

**ตัวอย่าง:**
```typescript
import { validateThaiID } from '@chinawatdc/thai-id-validator';

const result = validateThaiID('1101400000000');
console.log(result.isValid); // false
console.log(result.errorMessage); // "รหัสบัตรประชาชนไม่ถูกต้อง (Checksum ไม่ตรง)"
```
เหมาะมากสำหรับทำ Form Validation บน Frontend หรือตรวจฝั่ง Backend ครับ