import QRCode from "qrcode";

export async function generateQRCode(data: string): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
    });
    return qrDataUrl;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw err;
  }
}

export function generateFamilyQRData(familyId: string): string {
  return JSON.stringify({
    type: "family",
    id: familyId,
    timestamp: Date.now(),
  });
}

export function generateChildQRData(childId: string, familyId: string): string {
  return JSON.stringify({
    type: "child",
    childId,
    familyId,
    timestamp: Date.now(),
  });
}
