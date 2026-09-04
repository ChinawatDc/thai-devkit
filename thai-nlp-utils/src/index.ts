export function cleanThaiText(text: string): string {
  return text.replace(/[^\u0E00-\u0E7Fa-zA-Z0-9\s]/g, '').trim();
}

export function isThai(text: string): boolean {
  return /[\u0E00-\u0E7F]/.test(text);
}
