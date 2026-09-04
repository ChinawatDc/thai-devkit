# จัดการข้อความภาษาไทยใน JavaScript ด้วย thai-nlp-utils ขนาดจิ๋ว\n\nการคลีนข้อความภาษาไทย หรือเช็คว่าใน String มีภาษาไทยปนอยู่ไหม บางทีการเขียน Regex เองก็ชวนงง

ผมรวม Utilities พื้นฐานสำหรับคนทำเว็บไทยมาให้แล้วใน `@chinawatdc/thai-nlp-utils` ไม่ต้องโหลดไลบรารี NLP ขนาดใหญ่ แค่ใช้ฟังก์ชันพื้นฐานเท่าที่จำเป็น

**การติดตั้ง:**
```bash
npm install @chinawatdc/thai-nlp-utils
```

**ตัวอย่าง:**
```typescript
import { cleanThaiText, isThai } from '@chinawatdc/thai-nlp-utils';

console.log(isThai('สวัสดี Hello')); // true
console.log(cleanThaiText('Hello สวัสดี 123 !@#')); // "Hello สวัสดี 123"
```
ลดอาการโค้ดพังเพราะอักขระพิเศษภาษาไทยแปลกๆ ได้เยอะเลยครับ!