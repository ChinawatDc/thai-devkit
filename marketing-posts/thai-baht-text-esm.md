# แปลงตัวเลขเป็นคำอ่านเงินบาทภาษาไทย (Thai Baht Text) ฉบับรองรับ ESM\n\nใครทำระบบ E-commerce, ระบบบัญชี หรือระบบออกใบเสร็จ น่าจะเคยปวดหัวกับการต้องแปลงตัวเลข เช่น 150.50 เป็นคำอ่าน "หนึ่งร้อยห้าสิบบาทห้าสิบสตางค์" 

ผมขอแนะนำ `@chinawatdc/thai-baht-text-esm` ไลบรารีขนาดจิ๋วที่แก้ปัญหานี้ให้คุณแบบตรงจุด แถมรองรับ ESM เต็มรูปแบบ!

**การติดตั้ง:**
```bash
npm install @chinawatdc/thai-baht-text-esm
```

**ตัวอย่าง:**
```typescript
import { ThaiBahtText } from '@chinawatdc/thai-baht-text-esm';

console.log(ThaiBahtText(1234.56)); 
// "หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์"
```
ง่ายและแม่นยำ ลองเล่นดูได้ที่ [UI Playground](https://ui-playground.vercel.app/) ครับ