import { timeAgo, timeUntil } from "@chinawatdc/tiny-time-ago";

console.log("=== Testing @chinawatdc/tiny-time-ago ===");

const pastDate = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
console.log("5 minutes ago:", timeAgo(pastDate));

const futureDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // in 2 hours
console.log("In 2 hours:", timeUntil(futureDate));

console.log("\nAdd more test imports here for your future packages!");

import { validateThaiID } from "@chinawatdc/thai-id-validator";

console.log("\n=== Testing thai-id-validator ===");
const idTest = validateThaiID("1101400000000"); // เลขมั่ว แต่ลองดูผลลัพธ์
console.log(idTest);

import { validateEnv, types } from "@chinawatdc/env-type-checker";

console.log("\n=== Testing env-type-checker ===");
try {
  // จำลองว่าเรามีไฟล์ .env แบบนี้
  const mockProcessEnv = {
    PORT: "8080",
    DEBUG_MODE: "true",
    // ขาด DATABASE_URL
  };
  
  const env = validateEnv({
    PORT: types.number({ default: 3000 }),
    DEBUG_MODE: types.boolean(),
    DATABASE_URL: types.string({ required: true })
  }, mockProcessEnv);
  
  console.log("Validated Env:", env);
} catch (error) {
  console.error((error as Error).message);
}

import { extractJSON } from "@chinawatdc/unified-llm-parser";

console.log("\n=== Testing unified-llm-parser ===");
try {
  const llmResponse = "Here is the data you requested:\n```json\n{\n  \"name\": \"Antigravity\",\n  \"status\": \"Awesome\"\n}\n```\nHope it helps!";
  const parsed = extractJSON(llmResponse);
  console.log("Extracted JSON:", parsed);
} catch (err) {
  console.error(err);
}

import ThaiBahtText from "@chinawatdc/thai-baht-text-esm";

console.log("\n=== Testing thai-baht-text-esm ===");
console.log("1250.50 ->", ThaiBahtText(1250.50));
console.log("1000000 ->", ThaiBahtText(1000000));
console.log("-50.25 ->", ThaiBahtText("-50.25"));
