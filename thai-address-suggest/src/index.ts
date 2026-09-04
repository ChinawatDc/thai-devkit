const provinces = ['กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น'];

export function suggestProvince(keyword: string): string[] {
  if (!keyword) return [];
  return provinces.filter(p => p.includes(keyword));
}
