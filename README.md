# My NPM Packages Workspace 📦

นี่คือ Workspace สำหรับเก็บและพัฒนา NPM Packages ทั้งหมดที่จะถูก Publish ภายใต้ชื่อ `@chinawatdc`

## 🌟 รายการ Packages ทั้งหมดในแผนงาน

### 1. เครื่องมือสำหรับผู้พัฒนาในไทย (Thai Developer Tools) 🇹🇭
* 📂 **[thai-address-suggest](./thai-address-suggest)** - ระบบ Auto-complete ข้อมูลที่อยู่ไทยแบบเบาๆ
* 📂 **[thai-id-validator](./thai-id-validator)** - ตัวตรวจสอบความถูกต้องบัตรประชาชนไทยแบบละเอียด
* 📂 **[thai-baht-text-esm](./thai-baht-text-esm)** - แปลงตัวเลขเป็นข้อความภาษาไทย (TypeScript 100%)
* 📂 **[thai-nlp-utils](./thai-nlp-utils)** - ระบบแปลงคำอ่าน ค้นหาคำพ้องเสียง และตัดคำ

### 2. เครื่องมือเชื่อมต่อกับ AI (AI Wrappers & Utilities) 🤖
* 📂 **[unified-llm-parser](./unified-llm-parser)** - ตัวจัดการผลลัพธ์จาก AI หลายค่ายให้อยู่ในฟอร์แมตเดียวกัน
* 📂 **[ai-prompt-manager](./ai-prompt-manager)** - ตัวช่วยสร้างและจัดการ Prompt Template

### 3. เครื่องมือแบบ "จิ๋วแต่แจ๋ว" (Micro Utilities) ⚡
* ✅ 📂 **[tiny-time-ago](./tiny-time-ago)** - ตัวแปลงเวลา (พัฒนาเสร็จแล้ว!)
* 📂 **[tiny-fetch-wrapper](./tiny-fetch-wrapper)** - ตัวครอบ `fetch` API ให้ใช้งานง่ายพร้อมระบบ Retry

### 4. ตัวช่วยจัดการโค้ดและ Developer Experience (DX) 🛠️
* 📂 **[create-custom-stack](./create-custom-stack)** - CLI Boilerplate สร้างโปรเจกต์สไตล์ตัวคุณเอง
* 📂 **[env-type-checker](./env-type-checker)** - ระบบตรวจสอบ Environment variables ก่อนรันเซิร์ฟเวอร์

---

## 🛠️ วิธีการพัฒนาแพ็กเกจใหม่
1. เข้าไปในโฟลเดอร์แพ็กเกจเป้าหมาย (เช่น `cd thai-id-validator`)
2. รันคำสั่ง `npm i -D typescript tsup` เพื่อติดตั้งตัว Build
3. เขียนโค้ด และเมื่อเสร็จแล้วทดสอบด้วยการรัน `npm link`
4. รัน `npm publish --access public` เพื่อเผยแพร่ขึ้น npm
