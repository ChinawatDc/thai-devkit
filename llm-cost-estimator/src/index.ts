const rates: Record<string, { input: number, output: number }> = {
  'gpt-4o': { input: 5, output: 15 }, // Per 1M tokens
  'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  'claude-3-5-sonnet': { input: 3, output: 15 },
};

export function estimateCost(model: string, inputTokens: number, outputTokens: number): { usd: number, thb: number } {
  const rate = rates[model.toLowerCase()] || rates['gpt-4o']; // Default to gpt-4o if unknown
  
  const inputCost = (inputTokens / 1_000_000) * rate.input;
  const outputCost = (outputTokens / 1_000_000) * rate.output;
  const totalUsd = inputCost + outputCost;
  
  return {
    usd: totalUsd,
    thb: totalUsd * 35 // Approximate 35 THB/USD
  };
}