import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Heart, MapPin, MessageCircle, Snowflake, Landmark, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, whatsappHref } from "@/lib/site-config";
import { galleryImages, heroImage } from "@/lib/images";
import { btn, Reveal, SectionHeading, WhatsAppIcon } from "@/components/site/ui";
import { RoomCard } from "@/components/site/sections";
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
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-ink py-20 sm:min-h-[100svh] sm:items-end sm:py-24">
        <img
          src={heroImage}
          alt={t.images.exterior}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/40" />

        <div className="container-x relative z-10 w-full pt-16 pb-16 sm:pt-28 sm:pb-24 page-in">
          {/* Micro badges */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/75 px-3 py-1 text-[0.7rem] font-medium text-ink-foreground backdrop-blur-md">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span><strong className="text-gold">4.5</strong> Google Rating</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/60 px-3 py-1 text-[0.7rem] font-medium text-ink-foreground/90 backdrop-blur-md">
              <Snowflake className="h-3 w-3 text-gold" />
              <span>AC & Non-AC Rooms</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/60 px-3 py-1 text-[0.7rem] font-medium text-ink-foreground/80 backdrop-blur-md">
              <MapPin className="h-3 w-3 text-gold" />
              <span>{t.common.nearTemple}</span>
            </div>
          </div>

          <h1 className="max-w-2xl font-serif text-3xl font-normal leading-[1.15] tracking-tight text-ink-foreground sm:text-5xl lg:text-6xl">
            {t.home.heroTitle}
          </h1>

          <p className="mt-3.5 max-w-lg text-sm font-light leading-relaxed text-ink-foreground/80 sm:text-base">
            {t.home.heroText}
          </p>

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

        {/* Mobile Sticky Bar */}
        <div className="fixed bottom-0 inset-x-0 z-50 flex items-stretch border-t border-border/80 bg-background/95 shadow-2xl backdrop-blur-md sm:hidden">
          <a
            href={whatsappHref(t.common.waGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 border-r border-border/60 py-3.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 active:bg-muted"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{t.common.whatsapp}</span>
          </a>
          <Link
            to="/booking"
            className="flex flex-1 items-center justify-center gap-1.5 bg-gold py-3.5 text-xs font-bold uppercase tracking-wider text-ink active:opacity-90"
          >
            <span>{t.home.heroCta}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* 2. WELCOME SECTION */}
      <section className="container-x grid items-center gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal><img src={common.src} alt={t.images.common} loading="lazy" width={1280} height={960} className="aspect-[4/5] w-full object-cover" /></Reveal>
        <Reveal>
          <SectionHeading eyebrow={t.home.welcomeEyebrow} title={t.home.welcomeTitle} />
          <p className="text-lg leading-relaxed text-muted-foreground">{t.home.welcomeText1}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.home.welcomeText2}</p>
          <Link to="/about" className={btn("outline", "mt-10")}>{t.common.learnMore}</Link>
        </Reveal>
      </section>

      {/* 3. ROOMS SECTION */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.roomsEyebrow} title={t.home.roomsTitle} center />
          <div className="grid gap-8 md:grid-cols-2">
            <RoomCard type="ac" />
            <RoomCard type="nonac" />
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
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

      {/* 5. GALLERY HIGHLIGHTS */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.home.galleryEyebrow} title={t.home.galleryTitle} />
            <Link to="/gallery" className={btn("ghost", "mb-10 self-start px-0 md:mb-14 md:self-auto")}>{t.home.galleryCta} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      {/* 6. CLEAN COMPACT LOCATION & ENQUIRY SECTION (Mandir ki badi photo aur bada map hata diya gaya hai) */}
      <section className="relative overflow-hidden bg-ink py-20 text-center text-ink-foreground md:py-28">
        <div className="container-x relative z-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Location
          </p>
          <h2 className="font-serif text-3xl font-normal leading-tight md:text-5xl text-ink-foreground">
            Stay Close to Bhavani Amman Temple
          </h2>
          <p className="mt-2.5 text-sm font-semibold text-gold md:text-base">
            Near Bhavani Amman Temple, Periyapalayam
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-foreground/80 md:text-base">
            Our guest house is located near Bhavani Amman Temple in Periyapalayam — a convenient base for your visit.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/booking" className={btn("gold", "w-full sm:w-auto px-8 py-3.5 shadow-lg")}>
              {t.common.enquireNow} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btn("outlineLight", "w-full sm:w-auto px-8 py-3.5 border-white/30 hover:border-gold")}
            >
              <MapPin className="mr-2 h-4 w-4 text-gold" />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
