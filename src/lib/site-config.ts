// Central business configuration. Replace placeholders with confirmed client details.
export const siteConfig = {
  name: "Periyapalayam Veerapandiyar Guest House",
  shortName: "Veerapandiyar",
  // PLACEHOLDER — replace with the confirmed phone number (international format, digits only after +).
  phone: "+917401338883",
  phoneDisplay: "+91 74013 38883",
  // PLACEHOLDER — replace with the confirmed WhatsApp number (digits only, with country code).
  whatsapp: "917401338883",
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
