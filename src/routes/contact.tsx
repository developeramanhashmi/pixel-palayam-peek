import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { galleryImages } from "@/lib/images";
import { btn, PageHero, Reveal, WhatsAppIcon } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Us | Veerapandiyar Guest House, Periyapalayam", "Call, WhatsApp or find directions to Periyapalayam Veerapandiyar Guest House near Bhavani Amman Temple."),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const cards = [
    { I: Phone, h: t.common.call, p: t.contact.callText, v: siteConfig.phoneDisplay, href: telHref(), ext: false },
    { I: WhatsAppIcon, h: "WhatsApp", p: t.contact.waText, v: t.common.whatsapp, href: whatsappHref(t.common.waGreeting), ext: true },
    { I: MapPin, h: t.contact.location, p: t.common.address, v: t.common.directions, href: siteConfig.mapsUrl, ext: true },
  ];
  return (
    <>
      <PageHero title={t.contact.title} sub={t.contact.sub} image={galleryImages.find((g) => g.key === "temple")!.src} alt={t.images.temple} />
      <section className="container-x py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ I, h, p, v, href, ext }) => (
            <Reveal key={h} className="flex flex-col border bg-card p-8">
              <I className="h-7 w-7 text-gold" strokeWidth={1.25} />
              <h2 className="mt-5 text-2xl">{h}</h2>
              <p className="mt-2 flex-1 text-muted-foreground">{p}</p>
              <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-6 font-semibold text-primary underline-offset-4 hover:text-gold hover:underline">{v}</a>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 aspect-[4/3] w-full overflow-hidden border md:aspect-[21/9]">
          <iframe title={t.contact.mapTitle} src={siteConfig.mapsEmbedUrl} className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn("outline")}>{t.common.directions}</a>
          <Link to="/booking" className={btn("primary")}>{t.common.makeEnquiry}</Link>
        </div>
      </section>
    </>
  );
}
