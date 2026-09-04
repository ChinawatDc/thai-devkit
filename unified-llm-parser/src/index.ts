/**
 * Standardizes the output from different LLM providers 
 */
export function getStandardText(response: any): string {
  if (typeof response === "string") return response;
  if (response?.choices?.[0]?.message?.content) return response.choices[0].message.content;
  if (response?.content && Array.isArray(response.content)) return response.content.map((c: any) => c.text || "").join("");
  if (response?.candidates?.[0]?.content?.parts) return response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
  return JSON.stringify(response);
}

/**
 * Extracts raw JSON substring from LLM text (ignoring markdown).
 */
export function extractRawJSON(text: string): string {
  if (!text) return "";
  const markdownMatch = text.match(/```(?:json)?\\s*([\\s\\S]*?)\\s*```/);
  let rawJson = markdownMatch ? markdownMatch[1] : text;
  
  rawJson = rawJson.trim();
  const firstBrace = rawJson.indexOf("{");
  const firstBracket = rawJson.indexOf("[");
  const start = firstBrace !== -1 && firstBracket !== -1 ? Math.min(firstBrace, firstBracket) : 
                firstBrace !== -1 ? firstBrace : 
                firstBracket !== -1 ? firstBracket : -1;
                
  if (start === -1) return rawJson;
  
  const lastBrace = rawJson.lastIndexOf("}");
  const lastBracket = rawJson.lastIndexOf("]");
  const end = lastBrace !== -1 && lastBracket !== -1 ? Math.max(lastBrace, lastBracket) : 
              lastBrace !== -1 ? lastBrace : 
              lastBracket !== -1 ? lastBracket : rawJson.length - 1;

  return rawJson.substring(start, end + 1);
}

/**
 * Attempts to repair broken JSON from LLMs (Trailing commas, missing brackets).
 */
export function healJSONString(jsonStr: string): string {
  let healed = jsonStr.trim();
  
  // 1. Remove trailing commas
  healed = healed.replace(/,\\s*([}\\]])/g, "$1");
  
  // 2. Fix simple unescaped quotes inside string values (Basic heuristic)
  // Replaces "key": "value with "quotes" inside" -> "key": "value with \\"quotes\\" inside"
  healed = healed.replace(/(:\\s*")([^]*?)("\\s*[,}])/g, (match, p1, p2, p3) => {
    // If p2 contains unescaped quotes, escape them
    const fixedInner = p2.replace(/(?<!\\\\)"/g, '\\\\\"');
    return p1 + fixedInner + p3;
  });

  // 3. Balance missing brackets for Streaming scenarios
  let inString = false;
  let escapeNext = false;

  for (let i = 0; i < healed.length; i++) {
    const char = healed[i];
    if (escapeNext) { escapeNext = false; continue; }
    if (char === '\\\\') { escapeNext = true; continue; }
    if (char === '"') { inString = !inString; continue; }
  }

  if (inString) healed += '"';

  const stack: string[] = [];
  inString = false;
  escapeNext = false;
  for (let i = 0; i < healed.length; i++) {
    const char = healed[i];
    if (escapeNext) { escapeNext = false; continue; }
    if (char === '\\\\') { escapeNext = true; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (!inString) {
      if (char === '{') stack.push('}');
      else if (char === '[') stack.push(']');
      else if (char === '}' || char === ']') stack.pop();
    }
  }

  while (stack.length > 0) {
    healed += stack.pop();
  }

  return healed;
}

export interface ParserOptions<T> {
  /**
   * Zod, Yup, or Valibot schema. Must have a \`.parse()\` or \`.validateSync()\` method.
   */
  schema?: { parse?: (data: any) => T; validateSync?: (data: any) => T; [key: string]: any };
  /**
   * If true, attempts to coerce common types (e.g., string "25" to number 25).
   * Note: If using Zod, Zod can handle coercion itself, but this is a lightweight built-in fallback.
   */
  autoCoerce?: boolean;
}

/**
 * Lightweight type coercion to fix AI mistakes (e.g. returning string instead of number)
 */
function coerceTypes(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(coerceTypes);
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      let val = obj[key];
      // Coerce string to number if it looks exactly like a number
      if (typeof val === 'string' && !isNaN(Number(val)) && val.trim() !== '') {
        newObj[key] = Number(val);
      } 
      // Coerce string to boolean
      else if (val === 'true' || val === 'True') newObj[key] = true;
      else if (val === 'false' || val === 'False') newObj[key] = false;
      else {
        newObj[key] = coerceTypes(val);
      }
    }
    return newObj;
  }
  return obj;
}

/**
 * Extracts and heals a JSON object from an LLM string, optionally validating via Schema.
 */
export function extractJSON<T = any>(text: string, options?: ParserOptions<T>): T {
  let rawJson = extractRawJSON(text);
  let parsed: any;
  
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    const healed = healJSONString(rawJson);
    try {
      parsed = JSON.parse(healed);
    } catch (finalErr: any) {
      throw new Error("Auto-Healing Failed. Original error: " + (err as Error).message + ". Healed string: " + healed);
    }
  }

  // 1. Auto Coercion (Optional)
  if (options?.autoCoerce) {
    parsed = coerceTypes(parsed);
  }

  // 2. Schema Validation (Zod / Yup / Custom)
  if (options?.schema) {
    if (typeof options.schema.parse === 'function') {
      return options.schema.parse(parsed) as T;
    } else if (typeof options.schema.validateSync === 'function') {
      return options.schema.validateSync(parsed) as T;
    }
  }

  return parsed as T;
}

/**
 * Core function to parse LLM output (handles objects or strings) into a clean JSON structure.
 */
export function parseLLMOutput<T = any>(response: any, options?: ParserOptions<T>): T {
  const text = getStandardText(response);
  return extractJSON<T>(text, options);
}
