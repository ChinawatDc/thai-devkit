# อ่าน Data Stream จาก AI API ง่ายๆ ไม่ต้องปวดหัวกับ Buffer ด้วย ai-stream-reader\n\nเวลาต่อ API แบบ Streaming (SSE) ของ OpenAI บางครั้งเราต้องมานั่งเขียนตัวอ่าน Buffer เอง ซึ่งจุกจิกและ Error ง่าย

`@chinawatdc/ai-stream-reader` ช่วยจัดการเรื่องยุ่งยากพวกนี้ให้คุณอ่าน Data ทีละบรรทัดได้แบบคลีนๆ ด้วย `async/await`

**การติดตั้ง:**
```bash
npm install @chinawatdc/ai-stream-reader
```

**ตัวอย่างการใช้งาน:**
```typescript
import { readSSEStream } from '@chinawatdc/ai-stream-reader';

const response = await fetch('https://api.openai.com/v1/chat/completions', { ... });

for await (const data of readSSEStream(response)) {
  console.log(data); // ได้ก้อน JSON แบบคลีนๆ ออกมาเลย
}
```

ชีวิตนักพัฒนา AI จะง่ายขึ้นอีกระดับครับ