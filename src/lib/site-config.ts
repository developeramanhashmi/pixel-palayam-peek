// Central business configuration
export const siteConfig = {
  name: "Periyapalayam Veerapandiyar Guest House",
  shortName: "Veerapandiyar",

  // Apne real contact details yahan replace kijiye
  phone: "+917401338883", // International format with +91
  phoneDisplay: "+91 74013 38883", // Screen par dikhne wala format
  whatsapp: "+917401338883", // Digits only without '+'
  email: "veerapandiyarguesthouse@gmail.com", // Aapka booking email

  // Web3Forms.com se apni free access key yahan daalein (email par notification aane ke liye)
  web3FormsKey: "2e350fee-0a3f-42bf-933c-16d07391d47b",

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

