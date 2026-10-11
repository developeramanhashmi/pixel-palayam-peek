// Central business configuration
export const siteConfig = {
  name: "Periyapalayam Veerapandiyar Guest House",
  shortName: "Veerapandiyar",

  // Calling Phone Number (Client's calling contact)
  phone: "+918428338999",
  phoneDisplay: "+91 84283 38999",

  // WhatsApp Only Number
  whatsapp: "+917401338883",

  email: "veerapandiyarguesthouse@gmail.com",

  web3FormsKey: "2e350fee-0a3f-42bf-933c-16d07391d47b",

  mapsQuery: "Bhavani Amman Temple, Periyapalayam",
  // Client's exact Google Maps Place URL
  mapsUrl:
    "https://www.google.com/maps/place/%E0%AE%AA%E0%AF%86%E0%AE%B0%E0%AE%BF%E0%AE%AF%E0%AE%AA%E0%AE%BE%E0%AE%B3%E0%AF%88%E0%AE%AF%E0%AE%AE%E0%AF%8D+%E0%AE%B5%E0%AF%80%E0%AE%B0%E0%AE%AA%E0%AE%BE%E0%AE%A3%E0%AF%8D%E0%AE%9F%E0%AE%BF%E0%AE%AF%E0%AE%BE%E0%AE%B0%E0%AF%8D+%E0%AE%95%E0%AF%86%E0%AE%B8%E0%AF%8D%E0%AE%9F%E0%AF%8D+%E0%AE%B9%E0%AE%B5%E0%AF%81%E0%AE%B8%E0%AF%8D/@13.314415,80.0437654,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52815a5fc3e831:0xd8fec008bf680d7f!8m2!3d13.314415!4d80.0437654!16s%2Fg%2F11s3r59308?entry=ttu",
  get mapsEmbedUrl() {
    return `https://www.google.com/maps?q=${encodeURIComponent(this.mapsQuery)}&output=embed`;
  },
};

export const telHref = () => `tel:${siteConfig.phone}`;
export const whatsappHref = (message?: string) =>
  `https://wa.me/${siteConfig.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
