# บอกลาการเขียน Regex เช็คเบอร์โทรศัพท์ด้วย thai-phone-formatter\n\nการรับ Input เบอร์โทรศัพท์จากผู้ใช้งานมักจะมีปัญหาน่าปวดหัวเสมอ บางคนพิมพ์ขีด บางคนพิมพ์เว้นวรรค 

เราขอแนะนำ `@chinawatdc/thai-phone-formatter` ไลบรารีที่ช่วยคุณจัดการเบอร์มือถือและเบอร์บ้านในไทยได้อย่างหมดจด

**การติดตั้ง:**
```bash
npm install @chinawatdc/thai-phone-formatter
```

**ตัวอย่างการใช้งาน:**
```typescript
import { formatThaiPhone, isValidThaiPhone } from '@chinawatdc/thai-phone-formatter';

console.log(formatThaiPhone('0812345678')); // "081-234-5678"
console.log(isValidThaiPhone('081-234-5678')); // true
```

ช่วยให้ระบบของคุณมี Data ที่สะอาดและเป็นระเบียบขึ้นเยอะ ลองไปเล่น Demo ได้ที่: [UI Playground](https://ui-playground.vercel.app/)