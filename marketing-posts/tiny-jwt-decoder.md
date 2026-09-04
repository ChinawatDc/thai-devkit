# ถอดรหัส JWT Payload ฝั่ง Frontend โดยไม่ต้องโหลดไลบรารี Crypto ยักษ์ใหญ่\n\nเวลาได้ JWT Token จากระบบ Login มา แล้วเราแค่อยากแกะเอาชื่อหรือ Role ออกมาแสดงผลบนหน้าเว็บ หลายคนเผลอไปติดตั้งไลบรารีใหญ่ๆ อย่าง `jsonwebtoken` ลงฝั่ง Frontend ทำให้เว็บช้าลง

`@chinawatdc/tiny-jwt-decoder` คือพระเอกของคุณครับ มันถอด Base64 ออกมาเป็น JSON ล้วนๆ ในขนาดไม่กี่ร้อย Bytes!

**การติดตั้ง:**
```bash
npm install @chinawatdc/tiny-jwt-decoder
```

**ตัวอย่างการใช้งาน:**
```typescript
import { decodeJwt } from '@chinawatdc/tiny-jwt-decoder';

const payload = decodeJwt('eyJhbGciOi... (JWT Token)');
console.log(payload.name); 
console.log(payload.role);
```

ใช้แค่นี้พอครับ ประหยัดพื้นที่ Bandwidth ของแอปคุณไปได้มหาศาล!