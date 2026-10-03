// Central business configuration. Replace placeholders with confirmed client details.
export const siteConfig = {
  name: "Periyapalayam Veerapandiyar Guest House",
  shortName: "Veerapandiyar",
  // PLACEHOLDER — replace with the confirmed phone number (international format, digits only after +).
  phone: "+910000000000",
  phoneDisplay: "+91 00000 00000",
  // PLACEHOLDER — replace with the confirmed WhatsApp number (digits only, with country code).
  whatsapp: "910000000000",
  mapsQuery: "Bhavani Amman Temple, Periyapalayam",
  get mapsUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.mapsQuery)}`;
  },
  get mapsEmbedUrl() {
    return `https://www.google.com/maps?q=${encodeURIComponent(this.mapsQuery)}&output=embed`;
  },
};

export const telHref = () => `tel:${siteConfig.phone}`;
export const whatsappHref = (message?: string) =>
  `https://wa.me/${siteConfig.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
