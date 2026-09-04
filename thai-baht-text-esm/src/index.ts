const THAI_NUMBERS = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
const THAI_POSITIONS = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];

function convertIntegerToThaiText(numberStr: string): string {
  if (numberStr === "0") return "ศูนย์";
  
  let result = "";
  let length = numberStr.length;
  
  for (let i = 0; i < length; i++) {
    const digit = parseInt(numberStr.charAt(i), 10);
    const position = length - i - 1;
    
    // Split into millions if length > 6
    if (position > 5) {
      const millionPart = numberStr.substring(0, length - 6);
      const restPart = numberStr.substring(length - 6);
      return convertIntegerToThaiText(millionPart) + "ล้าน" + (restPart === "000000" ? "" : convertIntegerToThaiText(restPart));
    }

    if (digit !== 0) {
      if (position === 1 && digit === 1) {
        result += "สิบ";
      } else if (position === 1 && digit === 2) {
        result += "ยี่สิบ";
      } else if (position === 0 && digit === 1 && length > 1 && numberStr.charAt(length - 2) !== "0") {
        result += "เอ็ด";
      } else {
        result += THAI_NUMBERS[digit] + THAI_POSITIONS[position];
      }
    }
  }
  
  return result;
}

/**
 * แปลงตัวเลขเป็นคำอ่านจำนวนเงินบาทภาษาไทย
 * @param amount จำนวนเงินที่ต้องการแปลง (number หรือ string)
 * @returns คำอ่านภาษาไทย เช่น "หนึ่งร้อยบาทถ้วน"
 */
export function ThaiBahtText(amount: number | string): string {
  // Convert to string and handle basic cleanups
  let numberStr = String(amount).replace(/,/g, "").trim();
  
  // Handle negative numbers
  let prefix = "";
  if (numberStr.startsWith("-")) {
    prefix = "ลบ";
    numberStr = numberStr.substring(1);
  }

  // Validate number
  if (isNaN(Number(numberStr))) {
    throw new Error("Invalid number format");
  }

  // Ensure 2 decimal places
  const parts = Number(numberStr).toFixed(2).split(".");
  const bahtPart = parts[0];
  const satangPart = parts[1];

  let bahtText = "";
  if (bahtPart !== "0") {
    bahtText = convertIntegerToThaiText(bahtPart) + "บาท";
  } else if (bahtPart === "0" && satangPart === "00") {
    bahtText = "ศูนย์บาท";
  }

  let satangText = "";
  if (satangPart === "00") {
    satangText = "ถ้วน";
  } else {
    satangText = convertIntegerToThaiText(satangPart) + "สตางค์";
  }

  // If there's only satang but no baht
  if (bahtPart === "0" && satangPart !== "00") {
    return prefix + satangText;
  }

  return prefix + bahtText + satangText;
}

export default ThaiBahtText;
