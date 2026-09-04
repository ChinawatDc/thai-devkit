export type EnvType = "string" | "number" | "boolean";

export interface EnvSchemaItem<T extends EnvType> {
  type: T;
  required?: boolean;
  default?: T extends "string" ? string : T extends "number" ? number : boolean;
  choices?: (T extends "string" ? string : T extends "number" ? number : boolean)[];
}

export type EnvSchema = Record<string, EnvSchemaItem<any>>;

// Helper to infer the return type based on the schema
export type InferEnv<T extends EnvSchema> = {
  [K in keyof T]: T[K]["type"] extends "string"
    ? string
    : T[K]["type"] extends "number"
    ? number
    : T[K]["type"] extends "boolean"
    ? boolean
    : never;
};

/**
 * ฟังก์ชันสำหรับตรวจสอบและแปลงชนิดข้อมูล Environment Variables
 * @param schema โครงสร้างของตัวแปรที่ต้องการตรวจสอบ
 * @param envSource แหล่งข้อมูล environment (ค่าเริ่มต้นคือ process.env)
 * @returns object ที่มีตัวแปรตามที่ระบุใน schema พร้อมชนิดข้อมูลที่ถูกต้อง
 */
export function validateEnv<T extends EnvSchema>(
  schema: T,
  envSource: Record<string, string | undefined> = typeof process !== 'undefined' ? process.env : {}
): InferEnv<T> {
  const result: any = {};
  const errors: string[] = [];

  for (const [key, config] of Object.entries(schema)) {
    const rawValue = envSource[key];
    const { type, required, default: defaultValue, choices } = config;

    // Check required
    if (rawValue === undefined || rawValue === "") {
      if (required) {
        errors.push(`Missing required environment variable: ${key}`);
        continue;
      }
      if (defaultValue !== undefined) {
        result[key] = defaultValue;
        continue;
      }
      continue;
    }

    // Parse and validate based on type
    let parsedValue: any = rawValue;

    if (type === "number") {
      parsedValue = Number(rawValue);
      if (isNaN(parsedValue)) {
        errors.push(`Environment variable ${key} must be a number. Got: "${rawValue}"`);
        continue;
      }
    } else if (type === "boolean") {
      const lower = rawValue.toLowerCase();
      if (lower === "true" || lower === "1" || lower === "yes") {
        parsedValue = true;
      } else if (lower === "false" || lower === "0" || lower === "no") {
        parsedValue = false;
      } else {
        errors.push(`Environment variable ${key} must be a boolean (true/false, 1/0). Got: "${rawValue}"`);
        continue;
      }
    }

    // Check choices
    if (choices && choices.length > 0) {
      if (!choices.includes(parsedValue)) {
        errors.push(`Environment variable ${key} must be one of [${choices.join(", ")}]. Got: "${parsedValue}"`);
        continue;
      }
    }

    result[key] = parsedValue;
  }

  if (errors.length > 0) {
    throw new Error(`\n❌ Environment Validation Failed:\n- ${errors.join("\n- ")}\n`);
  }

  return result as InferEnv<T>;
}

// Utility wrapper for cleaner schema definition
export const types = {
  string: (opts: Omit<EnvSchemaItem<"string">, "type"> = {}): EnvSchemaItem<"string"> => ({ type: "string", ...opts }),
  number: (opts: Omit<EnvSchemaItem<"number">, "type"> = {}): EnvSchemaItem<"number"> => ({ type: "number", ...opts }),
  boolean: (opts: Omit<EnvSchemaItem<"boolean">, "type"> = {}): EnvSchemaItem<"boolean"> => ({ type: "boolean", ...opts }),
};
