# สร้าง QR Code พร้อมเพย์แบบมีโลโก้ตรงกลาง ภายใน 3 บรรทัด! (Zero Dependencies)\n\nไลบรารีสร้าง QR Code ส่วนใหญ่มักจะตัวใหญ่และต้องพึ่งพา Canvas แต่วันนี้คุณสามารถสร้าง QR Code PromptPay ที่มาในรูปแบบ SVG ภาพคมกริบ พร้อมแปะโลโก้ร้านหรือพิมพ์ข้อความกรอบได้ด้วย

ขอแนะนำ `@chinawatdc/tiny-promptpay-qr` ไลบรารีขนาดจิ๋วที่จบในตัวเอง 100% ไม่มี Dependencies ซ่อนเร้น

**การติดตั้ง:**
```bash
npm install @chinawatdc/tiny-promptpay-qr
```

**ตัวอย่างการใช้งาน:**
```typescript
import { generatePromptPaySVG } from '@chinawatdc/tiny-promptpay-qr';

const svgQr = generatePromptPaySVG('0812345678', 150.50, {
  frameText: 'แสกนจ่ายเงิน (Scan to Pay)',
});

// นำ svgQr ไป render เป็น HTML ได้เลย
```

โหลดไว โค้ดสั้น ใช้งานง่าย ไปลองเล่น UI จำลองของจริงก่อนได้ที่: [UI Playground](https://ui-playground.vercel.app/)