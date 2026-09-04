/**
 * Extracts a JSON object or array from a string, 
 * automatically removing markdown code blocks (```json ... ```) 
 * or finding the first valid JSON substring.
 */
export function extractJSON<T = any>(text: string): T {
  if (!text) {
    throw new Error("Input text is empty");
  }

  // 1. Try to find markdown code block
  const markdownMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  let rawJson = markdownMatch ? markdownMatch[1] : text;

  // 2. Cleanup common prefixes/suffixes from LLM
  rawJson = rawJson.trim();
  
  // 3. Find the first '{' or '[' and the last '}' or ']'
  const firstBrace = rawJson.indexOf("{");
  const firstBracket = rawJson.indexOf("[");
  
  const start = 
    firstBrace !== -1 && firstBracket !== -1 ? Math.min(firstBrace, firstBracket) : 
    firstBrace !== -1 ? firstBrace : 
    firstBracket !== -1 ? firstBracket : -1;
    
  if (start === -1) {
    throw new Error("No JSON structure found in the text.");
  }

  const lastBrace = rawJson.lastIndexOf("}");
  const lastBracket = rawJson.lastIndexOf("]");
  
  const end = 
    lastBrace !== -1 && lastBracket !== -1 ? Math.max(lastBrace, lastBracket) : 
    lastBrace !== -1 ? lastBrace : 
    lastBracket !== -1 ? lastBracket : -1;

  const jsonSubstring = rawJson.substring(start, end + 1);

  try {
    return JSON.parse(jsonSubstring) as T;
  } catch (err: any) {
    throw new Error(`Failed to parse extracted JSON: ${err.message}\nExtracted content: ${jsonSubstring.substring(0, 50)}...`);
  }
}

/**
 * Standardizes the output from different LLM providers 
 * (OpenAI, Anthropic, Google Gemini) into a clean string.
 */
export function getStandardText(response: any): string {
  // If it's already a string
  if (typeof response === "string") return response;
  
  // OpenAI structure
  if (response?.choices?.[0]?.message?.content) {
    return response.choices[0].message.content;
  }
  
  // Anthropic / Claude structure
  if (response?.content && Array.isArray(response.content)) {
    return response.content.map((c: any) => c.text || "").join("");
  }
  
  // Google Gemini structure
  if (response?.candidates?.[0]?.content?.parts) {
    return response.candidates[0].content.parts.map((p: any) => p.text || "").join("");
  }

  // Fallback to stringify if unknown
  return JSON.stringify(response);
}

/**
 * Parse LLM output into a specific JSON structure directly.
 */
export function parseLLMOutput<T = any>(response: any): T {
  const text = getStandardText(response);
  return extractJSON<T>(text);
}
