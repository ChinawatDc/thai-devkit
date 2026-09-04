// @ts-ignore
import qrcode from './qrcode.js';

// CRC16 implementation
function crc16(data: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

export function generatePayload(target: string, amount?: number): string {
  let targetType = '01'; // Default Mobile
  let formattedTarget = target.replace(/\\D/g, '');
  if (formattedTarget.length === 10) {
    formattedTarget = '0066' + formattedTarget.substring(1);
  } else if (formattedTarget.length === 13) {
    targetType = '02'; // National ID
  }

  const amountStr = amount ? `54${String(amount.toFixed(2).length).padStart(2, '0')}${amount.toFixed(2)}` : '';
  const payloadBeforeCrc = `00020101021129370016A000000677010111${targetType}13${formattedTarget}5802TH5303764${amountStr}6304`;
  
  return payloadBeforeCrc + crc16(payloadBeforeCrc);
}

export interface QROptions {
  logo?: string;
  frameText?: string;
  frameColor?: string;
}

export function generatePromptPaySVG(target: string, amount?: number, options?: QROptions): string {
  const payload = generatePayload(target, amount);
  const qr = qrcode(0, 'H');
  qr.addData(payload);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const cellSize = 10;
  const padding = options?.frameText ? 40 : 20;
  
  let frameHeader = 0;
  if (options?.frameText) {
    frameHeader = 60; // Extra space for text at the top
  }

  const innerSize = moduleCount * cellSize;
  const svgWidth = innerSize + (padding * 2);
  const svgHeight = innerSize + padding + frameHeader + (options?.frameText ? 20 : padding);

  let svgContent = '';
  
  // Draw background frame if text is provided
  if (options?.frameText) {
    const color = options.frameColor || '#143464'; // PromptPay blue
    svgContent += `
      <rect width="100%" height="100%" rx="20" ry="20" fill="${color}" />
      <rect x="15" y="${frameHeader}" width="${svgWidth - 30}" height="${innerSize + padding}" rx="10" ry="10" fill="#FFFFFF" />
      <text x="50%" y="40" font-family="sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${options.frameText}</text>
    `;
  } else {
    // Just a white background
    svgContent += `<rect width="100%" height="100%" fill="#FFFFFF" />`;
  }

  // Draw QR code modules
  const qrXOffset = padding;
  const qrYOffset = options?.frameText ? frameHeader + (padding / 2) : padding;
  
  const logoSize = Math.floor(moduleCount * 0.25); // Logo takes 25% of the center
  const logoStart = Math.floor((moduleCount - logoSize) / 2);
  const logoEnd = logoStart + logoSize;

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      const isDark = qr.isDark(row, col);
      
      // If we have a logo, don't draw modules in the center
      if (options?.logo) {
        if (row >= logoStart && row < logoEnd && col >= logoStart && col < logoEnd) {
          continue; // Skip center modules
        }
      }

      if (isDark) {
        const x = qrXOffset + (col * cellSize);
        const y = qrYOffset + (row * cellSize);
        svgContent += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#000000" />`;
      }
    }
  }

  // Inject logo if provided
  if (options?.logo) {
    const logoPxSize = logoSize * cellSize;
    const lx = qrXOffset + (logoStart * cellSize);
    const ly = qrYOffset + (logoStart * cellSize);
    
    // Draw white background for logo to be safe
    svgContent += `<rect x="${lx}" y="${ly}" width="${logoPxSize}" height="${logoPxSize}" fill="#FFFFFF" />`;
    svgContent += `<image x="${lx + 5}" y="${ly + 5}" width="${logoPxSize - 10}" height="${logoPxSize - 10}" href="${options.logo}" preserveAspectRatio="xMidYMid slice" />`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="100%">${svgContent}</svg>`;
}