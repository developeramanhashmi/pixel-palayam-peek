import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { heroImage } from "@/lib/images";
import { btn, PageHero, Reveal, WhatsAppIcon } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact Us | Veerapandiyar Guest House, Periyapalayam",
      "Call, WhatsApp or find directions to Periyapalayam Veerapandiyar Guest House near Bhavani Amman Temple."
    ),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero safely using heroImage to prevent any crash */}
      <PageHero
        title={t.contact.title}
        sub={t.contact.sub}
        image={heroImage}
        alt={siteConfig.name}
      />

      <section className="container-x py-16 md:py-24">
        {/* Contact Touchpoint Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Phone */}
          <Reveal className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold mb-4">
              <Phone className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold">{t.common.call}</h2>
            <p className="mt-1 text-xs text-muted-foreground flex-1">Speak directly with our reception.</p>
            <a href={telHref()} className="mt-4 font-semibold text-sm text-foreground hover:text-gold transition-colors">
              {siteConfig.phoneDisplay}
            </a>
          </Reveal>

          {/* WhatsApp */}
          <Reveal className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] mb-4">
              <WhatsAppIcon className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold">WhatsApp</h2>
            <p className="mt-1 text-xs text-muted-foreground flex-1">Instant chat & room booking assistance.</p>
            <a
              href={whatsappHref(t.common.waGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 font-semibold text-sm text-[#25D366] hover:underline"
            >
              Chat on WhatsApp →
            </a>
          </Reveal>

          {/* Email */}
          <Reveal className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold mb-4">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold">Email</h2>
            <p className="mt-1 text-xs text-muted-foreground flex-1">For group booking & formal queries.</p>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 font-semibold text-sm text-foreground hover:text-gold truncate">
              {siteConfig.email}
            </a>
          </Reveal>

          {/* Location */}
          <Reveal className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold mb-4">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold">{t.contact.location}</h2>
            <p className="mt-1 text-xs text-muted-foreground flex-1">{t.common.address}</p>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 font-semibold text-sm text-gold hover:underline"
            >
              Google Maps Directions ↗
            </a>
          </Reveal>
        </div>

        {/* Embedded Map */}
        <div className="mt-12 overflow-hidden rounded-xl border border-border shadow-md aspect-[16/9] md:aspect-[21/9]">
          <iframe
            title={t.contact.mapTitle}
            src={siteConfig.mapsEmbedUrl}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={btn("outline", "px-6 py-3")}
          >
            <Navigation className="mr-2 h-4 w-4" />
            {t.common.directions}
          </a>
          <Link to="/booking" className={btn("gold", "px-8 py-3 shadow-md")}>
            {t.common.makeEnquiry}
          </Link>
        </div>
      </section>
    </>
  );
}
