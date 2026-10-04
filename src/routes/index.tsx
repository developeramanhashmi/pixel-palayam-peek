import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Heart, MapPin, MessageCircle, Snowflake, Landmark } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappHref } from "@/lib/site-config";
import { galleryImages, heroImage } from "@/lib/images";
import { btn, Reveal, SectionHeading, WhatsAppIcon } from "@/components/site/ui";
import { CTASection, LocationSection, RoomCard } from "@/components/site/sections";
import { GalleryGrid } from "@/components/site/Gallery";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Guest House near Bhavani Amman Temple, Periyapalayam | Veerapandiyar", "Comfortable AC and Non-AC rooms at Periyapalayam Veerapandiyar Guest House, near Bhavani Amman Temple. Enquire by call or WhatsApp."),
  component: Home,
});

const icons = [BedDouble, Snowflake, MapPin, Landmark, Heart, MessageCircle];

function Home() {
  const { t } = useI18n();
  const common = galleryImages.find((g) => g.key === "common")!;
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
        <img src={heroImage} alt={t.images.exterior} width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-x relative pb-20 pt-32 md:pb-28 page-in">
          <p className="mb-6 inline-flex items-center gap-2 border-b border-gold/60 pb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            <MapPin className="h-3.5 w-3.5" />{t.common.nearTemple}
          </p>
          <h1 className="max-w-3xl text-5xl leading-[1.02] text-ink-foreground md:text-7xl lg:text-8xl">{t.home.heroTitle}</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-foreground/85">{t.home.heroText}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/booking" className={btn("gold")}>{t.home.heroCta} <ArrowRight className="h-4 w-4" /></Link>
            <a href={whatsappHref(t.common.waGreeting)} target="_blank" rel="noopener noreferrer" className={btn("outlineLight")}><WhatsAppIcon className="h-4 w-4" />{t.common.whatsapp}</a>
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal><img src={common.src} alt={t.images.common} loading="lazy" width={1280} height={960} className="aspect-[4/5] w-full object-cover" /></Reveal>
        <Reveal>
          <SectionHeading eyebrow={t.home.welcomeEyebrow} title={t.home.welcomeTitle} />
          <p className="text-lg leading-relaxed text-muted-foreground">{t.home.welcomeText1}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.home.welcomeText2}</p>
          <Link to="/about" className={btn("outline", "mt-10")}>{t.common.learnMore}</Link>
        </Reveal>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.roomsEyebrow} title={t.home.roomsTitle} center />
          <div className="grid gap-8 md:grid-cols-2">
            <RoomCard type="ac" />
            <RoomCard type="nonac" />
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <SectionHeading eyebrow={t.home.whyEyebrow} title={t.home.whyTitle} center />
        <ul className="grid gap-px overflow-hidden border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((f, i) => {
            const I = icons[i]!;
            return (
              <li key={i} className="bg-background p-8 md:p-10">
                <I className="h-7 w-7 text-gold" strokeWidth={1.25} />
                <h3 className="mt-5 text-2xl">{f.t}</h3>
                <p className="mt-2 text-muted-foreground">{f.d}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.home.galleryEyebrow} title={t.home.galleryTitle} />
            <Link to="/gallery" className={btn("ghost", "mb-10 self-start px-0 md:mb-14 md:self-auto")}>{t.home.galleryCta} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      <LocationSection />
      <CTASection />
    </>
  );
}
