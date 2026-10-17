import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/lib/site-config";

const SITE_URL = "https://www.periyapalayamrooms.in";
const OG_IMAGE_URL = `${SITE_URL}/building.jpg`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Periyapalayam Veerapandiyaar Guest House | AC & Non-AC Rooms Near Temple" },
      {
        name: "description",
        content:
          "Comfortable AC and Non-AC guest rooms at Periyapalayam Veerapandiyaar Guest House, located near Bhavani Amman Temple. Call +91 84283 38999 for instant booking.",
      },
      {
        name: "keywords",
        content:
          "Periyapalayam guest house, Bhavani Amman temple stay, rooms in Periyapalayam, Veerapandiyaar guest house, AC rooms Periyapalayam, non ac lodge Periyapalayam, Periyapalayam lodge booking",
      },
      { property: "og:site_name", content: "Veerapandiyaar Guest House" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:title", content: "Periyapalayam Veerapandiyaar Guest House | AC & Non-AC Rooms" },
      {
        property: "og:description",
        content:
          "Comfortable rooms near Bhavani Amman Temple in Periyapalayam. AC & Non-AC options with easy phone and WhatsApp booking. Call +91 84283 38999.",
      },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:secure_url", content: OG_IMAGE_URL },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Veerapandiyaar Guest House Building Near Bhavani Amman Temple" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Periyapalayam Veerapandiyaar Guest House" },
      {
        name: "twitter:description",
        content: "AC & Non-AC rooms near Bhavani Amman Temple in Periyapalayam. Call +91 84283 38999.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Periyapalayam" },
      { name: "geo.position", content: "13.314415;80.0437654" },
      { name: "ICBM", content: "13.314415, 80.0437654" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LodgingBusiness",
              "@id": `${SITE_URL}/#lodging`,
              name: "Veerapandiyaar Guest House",
              alternateName: "வீரபாண்டியார் மாளிகை (Veerapandiyaar Guest House)",
              url: SITE_URL,
              image: OG_IMAGE_URL,
              telephone: siteConfig.phone || "+918428338999",
              email: siteConfig.email,
              priceRange: "₹₹",
              currenciesAccepted: "INR",
              paymentAccepted: "Cash, UPI",
              checkinTime: "12:00",
              checkoutTime: "11:00",
              description:
                "Comfortable AC and Non-AC room accommodation near Bhavani Amman Temple in Periyapalayam, Tamil Nadu.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Near Bhavani Amman Temple",
                addressLocality: "Periyapalayam",
                addressRegion: "Tamil Nadu",
                postalCode: "601102",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 13.314415,
                longitude: 80.0437654,
              },
              hasMap: siteConfig.mapsUrl,
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
                { "@type": "LocationFeatureSpecification", name: "Near Bhavani Amman Temple", value: true },
                { "@type": "LocationFeatureSpecification", name: "Family Accommodation (up to 8 per room)", value: true },
                { "@type": "LocationFeatureSpecification", name: "24-Hour Front Desk Support", value: true },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How far is Veerapandiyaar Guest House from Bhavani Amman Temple?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Veerapandiyaar Guest House is located right near Bhavani Amman Temple in Periyapalayam, making it a quick and convenient walk for devotees.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What room types are available at Veerapandiyaar Guest House?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We provide both Deluxe AC Rooms and Non-AC Rooms, suitable for families, pilgrim groups, and individual guests.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the check-in and check-out timings?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Standard check-in is at 12:00 PM and check-out is at 11:00 AM. 24-hour phone and reception support is available.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many guests can stay in one room?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Each spacious room comfortably accommodates up to 8 guests. For larger devotee groups, multiple rooms can be booked together.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I book a room or check availability?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can book directly by calling +91 84283 38999, chatting on WhatsApp, or submitting the booking form at periyapalayamrooms.in.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Header />
        <main className="overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
