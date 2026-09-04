export interface AddressItem {
  district: string;
  amphoe: string;
  province: string;
  zipcode: string;
}

// 📌 สำหรับ Demo นี้ ผมใส่ฐานข้อมูลจำลองของกรุงเทพมหานคร (บางส่วน) เพื่อให้เห็นภาพการทำงานจริง
// ของจริงจะใช้ script เพื่อดึง json ครบ 7000+ ตำบลมาบีบอัดรวมไว้ตรงนี้
const database: AddressItem[] = [
  { district: 'คลองเตย', amphoe: 'คลองเตย', province: 'กรุงเทพมหานคร', zipcode: '10110' },
  { district: 'คลองตัน', amphoe: 'คลองเตย', province: 'กรุงเทพมหานคร', zipcode: '10110' },
  { district: 'พระโขนง', amphoe: 'คลองเตย', province: 'กรุงเทพมหานคร', zipcode: '10110' },
  { district: 'บางจาก', amphoe: 'พระโขนง', province: 'กรุงเทพมหานคร', zipcode: '10260' },
  { district: 'ประเวศ', amphoe: 'ประเวศ', province: 'กรุงเทพมหานคร', zipcode: '10250' },
  { district: 'หนองบอน', amphoe: 'ประเวศ', province: 'กรุงเทพมหานคร', zipcode: '10250' },
  { district: 'ดอกไม้', amphoe: 'ประเวศ', province: 'กรุงเทพมหานคร', zipcode: '10250' },
  { district: 'คลองเตยเหนือ', amphoe: 'วัฒนา', province: 'กรุงเทพมหานคร', zipcode: '10110' },
  { district: 'คลองตันเหนือ', amphoe: 'วัฒนา', province: 'กรุงเทพมหานคร', zipcode: '10110' },
  { district: 'พระโขนงเหนือ', amphoe: 'วัฒนา', province: 'กรุงเทพมหานคร', zipcode: '10110' },
  { district: 'ปทุมวัน', amphoe: 'ปทุมวัน', province: 'กรุงเทพมหานคร', zipcode: '10330' },
  { district: 'ลุมพินี', amphoe: 'ปทุมวัน', province: 'กรุงเทพมหานคร', zipcode: '10330' },
  { district: 'รองเมือง', amphoe: 'ปทุมวัน', province: 'กรุงเทพมหานคร', zipcode: '10330' },
  { district: 'วังใหม่', amphoe: 'ปทุมวัน', province: 'กรุงเทพมหานคร', zipcode: '10330' },
  { district: 'ช้างเผือก', amphoe: 'เมืองเชียงใหม่', province: 'เชียงใหม่', zipcode: '50300' },
  { district: 'สุเทพ', amphoe: 'เมืองเชียงใหม่', province: 'เชียงใหม่', zipcode: '50200' },
  { district: 'พระสิงห์', amphoe: 'เมืองเชียงใหม่', province: 'เชียงใหม่', zipcode: '50200' },
];

/**
 * 🔍 ค้นหาที่อยู่จาก รหัสไปรษณีย์ (Zip Code Reverse Lookup)
 * @param zipcode รหัสไปรษณีย์ เช่น "10110"
 * @returns Array ของที่อยู่ที่ตรงกับรหัสไปรษณีย์
 */
export function searchByZipcode(zipcode: string): AddressItem[] {
  if (!zipcode || zipcode.length < 2) return [];
  return database.filter(item => item.zipcode.startsWith(zipcode));
}

/**
 * 🔍 ค้นหาที่อยู่แบบ Fuzzy (พิมพ์ผิดก็หาเจอ)
 * @param keyword คำค้นหา เช่น "คลองเตย" หรือ "10110"
 * @returns Array ของที่อยู่ที่เกี่ยวข้อง
 */
export function searchAddress(keyword: string): AddressItem[] {
  if (!keyword || keyword.trim() === '') return [];
  const cleanKeyword = keyword.trim();
  
  // ถ้ายาวและเป็นตัวเลขล้วน -> ค้นหาจากรหัสไปรษณีย์
  if (/^\\d+$/.test(cleanKeyword)) {
    return searchByZipcode(cleanKeyword);
  }

  // ค้นหาจากชื่อ ตำบล/อำเภอ/จังหวัด
  return database.filter(item => 
    item.district.includes(cleanKeyword) ||
    item.amphoe.includes(cleanKeyword) ||
    item.province.includes(cleanKeyword)
  );
}

// ยังคงฟังก์ชันเดิมไว้เพื่อไม่ให้ Break Change แต่เพิ่มความสามารถเข้าไป
export function suggestProvince(keyword: string): string[] {
  if (!keyword) return [];
  const results = searchAddress(keyword);
  // ดึงเฉพาะชื่อจังหวัดที่ไม่ซ้ำกัน
  const provinces = Array.from(new Set(results.map(r => r.province)));
  return provinces;
}
