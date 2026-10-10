import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Heart, MapPin, MessageCircle, Snowflake, Landmark, Star } from "lucide-react";
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
      <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-ink py-20 sm:min-h-[100svh] sm:items-end sm:py-24">
        {/* Background photo & dark cinematic overlay */}
        <img
          src={heroImage}
          alt={t.images.exterior}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />

        <div className="container-x relative z-10 w-full pt-16 pb-12 sm:pt-28 sm:pb-20">
          
          {/* 1. TOP MICRO BADGES: Khali jagah bharega & trust dikhayega */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {/* Google Rating */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/70 px-3 py-1 text-[0.7rem] font-medium text-ink-foreground backdrop-blur-md">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span><strong className="text-gold">4.5</strong> Google Rating</span>
            </div>

            {/* Room Types */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/60 px-3 py-1 text-[0.7rem] font-medium text-ink-foreground/90 backdrop-blur-md">
              <Snowflake className="h-3 w-3 text-gold" />
              <span>AC & Non-AC Rooms</span>
            </div>

            {/* Temple Distance */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/60 px-3 py-1 text-[0.7rem] font-medium text-ink-foreground/80 backdrop-blur-md">
              <MapPin className="h-3 w-3 text-gold" />
              <span>Near Bhavani Amman Temple</span>
            </div>
          </div>

          {/* 2. MAIN TITLE: Classy & formal hospitality font */}
          <h1 className="max-w-2xl font-serif text-3xl font-normal leading-[1.15] tracking-tight text-ink-foreground sm:text-5xl lg:text-6xl">
            {t.home.heroTitle}
          </h1>

          {/* 3. SUBTEXT: Clean, readable spacing */}
          <p className="mt-3.5 max-w-lg text-sm font-light leading-relaxed text-ink-foreground/80 sm:text-base">
            {t.home.heroText}
          </p>

          {/* Desktop in-place buttons (Mobile par hide rahenge) */}
          <div className="mt-8 hidden items-center gap-4 sm:flex">
            <Link to="/booking" className={btn("gold", "px-6 py-3 shadow-lg")}>
              {t.home.heroCta} <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
            <a
              href={whatsappHref(t.common.waGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className={btn("outlineLight", "px-6 py-3 border-white/25 hover:border-gold")}
            >
              <WhatsAppIcon className="h-4 w-4 mr-2" />
              {t.common.whatsapp}
            </a>
          </div>

        </div>

        {/* 4. MOBILE STICKY FLOATING DOCK (Hollow, floating glass capsule) */}
        <div className="fixed bottom-3 inset-x-3 z-40 sm:hidden">
          <div className="mx-auto flex max-w-sm items-center gap-2 rounded-2xl border border-white/15 bg-ink/80 p-2 shadow-2xl backdrop-blur-xl">
            <a
              href={whatsappHref(t.common.waGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-2.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
            <Link
              to="/booking"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gold py-2.5 text-xs font-semibold text-ink shadow-md transition-transform active:scale-[0.98]"
            >
              <span>{t.home.heroCta}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
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
