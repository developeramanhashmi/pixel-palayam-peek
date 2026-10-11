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
      { title: "Periyapalayam Veerapandiyar Guest House | AC & Non-AC Rooms" },
      {
        name: "description",
        content:
          "Comfortable AC and Non-AC guest rooms at Periyapalayam Veerapandiyar Guest House, located near Bhavani Amman Temple. Call +91 74013 38883 for instant booking.",
      },
      { name: "keywords", content: "Periyapalayam guest house, Bhavani Amman temple stay, rooms in Periyapalayam, Veerapandiyar guest house, AC rooms Periyapalayam" },
      { property: "og:site_name", content: "Veerapandiyar Guest House" },
      { property: "og:title", content: "Periyapalayam Veerapandiyar Guest House" },
      {
        property: "og:description",
        content: "Comfortable rooms near Bhavani Amman Temple in Periyapalayam. AC & Non-AC options available.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;500;600&family=Noto+Serif+Telugu:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: siteConfig.name,
          alternateName: "பெரியபாளையம் வீரபாண்டியார் கெஸ்ட் ஹவுஸ்",
          description: "Comfortable AC and Non-AC room accommodation near Bhavani Amman Temple in Periyapalayam, Tamil Nadu.",
          telephone: siteConfig.phone,
          priceRange: "₹₹",
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
            { "@type": "LocationFeatureSpecification", name: "Near Temple", value: true },
            { "@type": "LocationFeatureSpecification", name: "Family Accommodation", value: true },
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
