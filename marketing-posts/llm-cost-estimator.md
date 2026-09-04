# ทำแอป AI อย่างไรไม่ให้งบบานปลาย? มาคำนวณต้นทุนด้วย llm-cost-estimator\n\nปัญหาของคนที่ต่อ API ของ ChatGPT หรือ Claude คือเรามักจะไม่รู้เลยว่าเสียเงินไปเท่าไหร่แล้ว 

`@chinawatdc/llm-cost-estimator` คือเครื่องมือเล็กๆ ที่ช่วยคุณประเมินราคาการใช้งานจากจำนวน Tokens ออกมาเป็นหน่วย USD หรือเงินบาทไทยได้ทันที

**การติดตั้ง:**
```bash
npm install @chinawatdc/llm-cost-estimator
```

**ตัวอย่างการใช้งาน:**
```typescript
import { estimateCost } from '@chinawatdc/llm-cost-estimator';

const cost = estimateCost('gpt-4o', 1000, 500); 
console.log(`Estimated: $${cost.usd} หรือประมาณ ฿${cost.thb}`);
```

เหมาะมากสำหรับเอาไปทำระบบ Dashboard ควบคุมค่าใช้จ่ายครับ