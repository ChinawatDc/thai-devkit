# ลาก่อน Boilerplate! Custom Hook useClickOutside แบบเบาหวิวสำหรับ React 18/19\n\nทุกครั้งที่ทำ Modal, Dropdown หรือ Popup เราก็ต้องมานั่งก๊อปโค้ดตรวจจับการคลิกนอกกรอบ (Click Outside) มาแปะใหม่ทุกครั้ง

จบปัญหานี้ด้วย `@chinawatdc/use-click-outside-esm` เล็ก เบา ซัพพอร์ต ESM และพิมพ์ Type-safe มาให้เรียบร้อย

**การติดตั้ง:**
```bash
npm install @chinawatdc/use-click-outside-esm
```

**ตัวอย่างการใช้งาน:**
```tsx
import { useRef, useState } from 'react';
import { useClickOutside } from '@chinawatdc/use-click-outside-esm';

function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef(null);
  
  useClickOutside(ref, () => setIsOpen(false));

  return isOpen ? <div ref={ref}>Click outside to close me!</div> : null;
}
```

ลดโค้ดรกๆ ในโปรเจกต์คุณไปได้เยอะเลยทีเดียว!