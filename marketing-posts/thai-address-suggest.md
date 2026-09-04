# ทำ Auto-complete ที่อยู่ไทยใน React ง่ายๆ ไม่ต้องโหลด Database ใหญ่ๆ ลงเครื่อง\n\nเวลาทำฟอร์มสมัครสมาชิกหรือฟอร์มสั่งซื้อของ การให้ User พิมพ์ที่อยู่เองมักจะพิมพ์ผิดกันบ่อย เราเลยมักจะทำ Auto-complete ให้ 

แต่ไลบรารีหลายตัวมักจะพ่วง Database ขนาดใหญ่มาด้วย ทำให้แอปบวม วันนี้ผมเลยพัฒนา `@chinawatdc/thai-address-suggest` ขึ้นมาครับ!

### จุดเด่น
มันคือ API เล็กๆ ในตัวเพื่อทำระบบแนะนำตำบล อำเภอ จังหวัด แบบเบาๆ ดึงมาใช้เฉพาะฟังก์ชันที่จำเป็น ไม่กินพื้นที่โปรเจกต์

**การติดตั้ง:**
```bash
npm install @chinawatdc/thai-address-suggest
```

**ตัวอย่างการใช้งาน (React):**
```tsx
import { suggestProvince } from '@chinawatdc/thai-address-suggest';

// เวลา User พิมพ์คำว่า "กรุง"
const results = suggestProvince('กรุง');
console.log(results); // ['กรุงเทพมหานคร']
```

เอาไปต่อยอดกับ Input Dropdown ของคุณได้สบายๆ ครับ 
ลองไปกดเล่น Demo บนเว็บที่ผมทำไว้ได้ที่นี่เลย: [UI Playground](https://ui-playground.vercel.app/)