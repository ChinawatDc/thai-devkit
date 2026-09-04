# แสดงเวลาแบบ "5 นาทีที่แล้ว" ใน JavaScript โดยไม่ต้องพึ่ง Moment.js\n\nการแสดงผลเวลาแบบ Relative Time (เช่น "เมื่อวานนี้", "5 นาทีที่แล้ว") เป็นฟีเจอร์พื้นฐานของแอปโซเชียล แต่ถ้าโหลด Date-fns หรือ Moment.js เข้ามาแค่เพื่อฟีเจอร์เดียวก็อาจจะหนักแอปเกินไป

`@chinawatdc/tiny-time-ago` ถูกสร้างมาเพื่อเรื่องนี้โดยเฉพาะครับ

**การติดตั้ง:**
```bash
npm install @chinawatdc/tiny-time-ago
```

**ตัวอย่าง:**
```typescript
import { timeAgo } from '@chinawatdc/tiny-time-ago';

const pastDate = new Date(Date.now() - 5 * 60 * 1000);
console.log(timeAgo(pastDate)); // "5 minutes ago"
```
จิ๋วแต่แจ๋ว โค้ดอ่านง่าย ไม่พึ่ง Dependency ใดๆ ลองเล่น Demo ดูครับ: [UI Playground](https://ui-playground.vercel.app/)