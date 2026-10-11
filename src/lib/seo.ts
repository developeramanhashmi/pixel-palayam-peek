interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
}

const SITE_URL = "https://www.periyapalayamrooms.in";
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;
const DEFAULT_KEYWORDS =
  "Periyapalayam guest house, Bhavani Amman temple stay, rooms in Periyapalayam, Veerapandiyar guest house, AC rooms Periyapalayam, non ac rooms Periyapalayam, Periyapalayam lodge booking, temple devotee rooms";

export function seo(
  titleOrOpts: string | SeoOptions,
  legacyDescription?: string,
  legacyPath?: string
) {
  const opts: SeoOptions =
    typeof titleOrOpts === "string"
      ? {
          title: titleOrOpts,
          description: legacyDescription ?? "",
          path: legacyPath ?? "",
        }
      : titleOrOpts;

  const cleanPath = (opts.path ?? "").replace(/^\/+/, "");
  const canonicalUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : `${SITE_URL}/`;
  const ogImage = opts.image
    ? opts.image.startsWith("http")
      ? opts.image
      : `${SITE_URL}${opts.image.startsWith("/") ? "" : "/"}${opts.image}`
    : DEFAULT_IMAGE;

  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "keywords", content: opts.keywords ?? DEFAULT_KEYWORDS },

      // Canonical and indexing signals
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },

      // Open Graph / WhatsApp / Facebook Preview
      { property: "og:site_name", content: "Periyapalayam Veerapandiyar Guest House" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:image", content: ogImage },
      { property: "og:locale", content: "en_IN" },
      { property: "og:locale:alternate", content: "ta_IN" },

      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: ogImage },

      // Local Geo Meta Tags (Periyapalayam, Tamil Nadu)
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Periyapalayam" },
      { name: "geo.position", content: "13.314415;80.0437654" },
      { name: "ICBM", content: "13.314415, 80.0437654" },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl },
    ],
  };
}
