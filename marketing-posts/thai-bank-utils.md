# ไม่ต้องเสียเวลาหาโลโก้ธนาคารอีกต่อไป! จบครบด้วย thai-bank-utils\n\nใครทำระบบ E-Commerce หรือระบบที่ต้องมีการโอนเงิน น่าจะเคยเหนื่อยกับการหารูปโลโก้ หรือโค้ดสีที่ถูกต้องของแต่ละธนาคาร 

`@chinawatdc/thai-bank-utils` รวบรวมข้อมูลธนาคารไทยไว้ให้หมดแล้ว เรียกปุ๊บได้ข้อมูลปั๊บ Type-Safe ด้วย!

**การติดตั้ง:**
```bash
npm install @chinawatdc/thai-bank-utils
```

**ตัวอย่างการใช้งาน:**
```typescript
import { getBankInfo } from '@chinawatdc/thai-bank-utils';

const bank = getBankInfo('kbank');
console.log(bank.nameTh); // "ธนาคารกสิกรไทย"
console.log(bank.color);  // "#00A950"
```

เอาไปใช้ทำ UI หน้าชำระเงินได้แบบหล่อๆ เลยครับ!