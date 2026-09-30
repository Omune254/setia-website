// Edit the details below to update contact info across the whole site.

export const WHATSAPP_NUMBER = "254702550359"; // +254 702 550 359, written without the leading "+" for wa.me links

export const SOCIALS = {
  instagram: "https://www.instagram.com/setia_apparel",
  tiktok: "https://www.tiktok.com/@setiaapparel",
};

/**
 * Builds a wa.me link that opens WhatsApp with a pre-filled message.
 */
export function whatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
