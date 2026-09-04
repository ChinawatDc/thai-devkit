export interface BankInfo {
  code: string;
  nameTh: string;
  nameEn: string;
  color: string;
}

const banks: Record<string, BankInfo> = {
  kbank: { code: 'kbank', nameTh: 'ธนาคารกสิกรไทย', nameEn: 'Kasikornbank', color: '#00A950' },
  scb: { code: 'scb', nameTh: 'ธนาคารไทยพาณิชย์', nameEn: 'Siam Commercial Bank', color: '#4E2A84' },
  bbl: { code: 'bbl', nameTh: 'ธนาคารกรุงเทพ', nameEn: 'Bangkok Bank', color: '#1E4598' },
  ktb: { code: 'ktb', nameTh: 'ธนาคารกรุงไทย', nameEn: 'Krungthai Bank', color: '#12A8E0' },
  krungsri: { code: 'krungsri', nameTh: 'ธนาคารกรุงศรีอยุธยา', nameEn: 'Bank of Ayudhya', color: '#FCC416' },
  ttb: { code: 'ttb', nameTh: 'ธนาคารทหารไทยธนชาต', nameEn: 'TTB', color: '#0050F0' },
  gsb: { code: 'gsb', nameTh: 'ธนาคารออมสิน', nameEn: 'Government Savings Bank', color: '#EB008B' },
};

export function getBankInfo(code: string): BankInfo | null {
  return banks[code.toLowerCase()] || null;
}

export function getAllBanks(): BankInfo[] {
  return Object.values(banks);
}