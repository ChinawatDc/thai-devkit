# ทิ้ง Axios ไปซะ! ถ้าคุณต้องการแค่ Fetch พร้อมระบบ Auto-Retry\n\nAxios เป็นไลบรารีที่ดีครับ แต่มันเริ่มจะใหญ่เกินไปสำหรับโปรเจกต์ยุคใหม่ที่รองรับ Fetch API แบบ Native แล้ว ปัญหาเดียวคือ Fetch ไม่มีระบบจัดการ Error และ Retry ที่ดีพอ

พบกับ `@chinawatdc/tiny-fetch-wrapper` ที่ช่วยคลุม Fetch API ให้ใช้ง่ายเหมือน Axios แถมมี Retry อัตโนมัติ เล็กกว่า 10 เท่า!

**การติดตั้ง:**
```bash
npm install @chinawatdc/tiny-fetch-wrapper
```

**ตัวอย่าง:**
```typescript
import { tinyFetch } from '@chinawatdc/tiny-fetch-wrapper';

tinyFetch('https://api.example.com/data', { retryCount: 3 })
  .then(data => console.log(data))
  .catch(err => console.error('พัง 3 รอบติดกันแล้ว', err));
```
ลองเอาไปใช้แทน Axios ในโปรเจกต์ถัดไปดูนะครับ!