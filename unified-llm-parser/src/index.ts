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
 * Extracts raw JSON substring from LLM text (ignoring markdown and conversational text).
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
                
  if (start === -1) return rawJson; // Cannot find boundaries, return as is to let parser try
  
  // Find the last valid closing bracket if possible, else take up to the end (for streaming)
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
  
  // 1. Remove trailing commas before closing braces/brackets
  healed = healed.replace(/,\\s*([}\\]])/g, "$1");
  
  // 3. Balance missing brackets for Streaming scenarios
  let openBraces = 0;
  let openBrackets = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = 0; i < healed.length; i++) {
    const char = healed[i];
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === '\\\\') {
      escapeNext = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
  }

  if (inString) {
    healed += '"';
  }

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

/**
 * Extracts and heals a JSON object from an LLM string.
 * It handles trailing commas and missing brackets (Streaming-safe).
 */
export function extractJSON<T = any>(text: string): T {
  let rawJson = extractRawJSON(text);
  
  try {
    return JSON.parse(rawJson) as T;
  } catch (err) {
    const healed = healJSONString(rawJson);
    try {
      return JSON.parse(healed) as T;
    } catch (finalErr: any) {
      throw new Error("Auto-Healing Failed. Original error: " + (err as Error).message + ". Healed string: " + healed);
    }
  }
}

/**
 * Core function to parse LLM output (handles objects or strings) into a clean JSON structure.
 */
export function parseLLMOutput<T = any>(response: any): T {
  const text = getStandardText(response);
  return extractJSON<T>(text);
}
