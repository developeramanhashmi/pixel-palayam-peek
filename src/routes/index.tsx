import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  Heart,
  MapPin,
  MessageCircle,
  Snowflake,
  Landmark,
  Star,
  Phone,
  Navigation,
} from "lucide-react";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, telHref } from "@/lib/site-config";
import { galleryImages, heroImage } from "@/lib/images";
import { btn, Reveal, SectionHeading } from "@/components/site/ui";
import { RoomCard } from "@/components/site/sections";
import { GalleryGrid } from "@/components/site/Gallery";
import { BookingForm } from "@/components/site/BookingForm";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Periyapalayam Rooms | Veerapandiyaar Guest House Near Bhavani Amman Temple",
      description:
        "Book clean and comfortable Periyapalayam rooms at Veerapandiyaar Guest House. AC & Non-AC accommodation located near Bhavani Amman Temple. Instant booking: +91 84283 38999.",
      keywords:
        "Periyapalayam rooms, rooms in Periyapalayam, Periyapalayam guest house, Periyapalayam lodge, Bhavani Amman temple stay, Veerapandiyaar guest house, AC rooms Periyapalayam, lodge in Periyapalayam",
      path: "/",
      image: "/building.jpg",
    }),
  component: Home,
});

const icons = [BedDouble, Snowflake, MapPin, Landmark, Heart, MessageCircle];

function Home() {
  const { t, lang } = useI18n();
  const common = galleryImages.find((g) => g.key === "common") || galleryImages[0];

  const scrollToBook = (e: React.MouseEvent) => {
    const el = document.getElementById("book");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink pb-10 pt-28 sm:min-h-[100svh] sm:pb-24 sm:pt-32">
        <img
          src={heroImage}
          alt={
            lang === "ta"
              ? "பெரியபாளையம் பவானி அம்மன் கோவில் அருகில் உள்ள வீரபாண்டியார் கெஸ்ட் ஹவுஸ் கட்டிட தோற்றம்"
              : "Veerapandiyaar Guest House Building Exterior near Bhavani Amman Temple, Periyapalayam"
          }
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-top sm:object-center brightness-105 contrast-105"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 via-32% to-transparent" />

        <div className="container-x relative z-10 w-full page-in">
          {/* Micro badges */}
          <div className="mb-3.5 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/80 px-2.5 py-1 text-[0.68rem] font-medium text-ink-foreground backdrop-blur-md">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span><strong className="text-gold">4.5</strong> Rating</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/70 px-2.5 py-1 text-[0.68rem] font-medium text-ink-foreground/90 backdrop-blur-md">
              <Snowflake className="h-3 w-3 text-gold" />
              <span>AC & Non-AC</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/70 px-2.5 py-1 text-[0.68rem] font-medium text-ink-foreground/80 backdrop-blur-md">
              <MapPin className="h-3 w-3 text-gold" />
              <span>{t.common.nearTemple}</span>
            </div>
          </div>

          {/* Hero Title: Tamil is broken into 2 balanced lines so building name remains visible */}
          <h1
            className={cn(
              "font-serif font-normal tracking-tight text-ink-foreground",
              lang === "ta"
                ? "max-w-xl text-2xl sm:text-4xl lg:text-5xl leading-tight sm:leading-snug"
                : "max-w-2xl text-3xl sm:text-5xl lg:text-6xl leading-[1.12]"
            )}
          >
            {lang === "ta" ? (
              <span className="block">{t.home.heroTitle}</span>
            ) : (
              t.home.heroTitle
            )}
          </h1>

          <p className="mt-2.5 max-w-lg text-sm font-light leading-relaxed text-ink-foreground/85 sm:mt-4 sm:text-base">
            {t.home.heroText}
          </p>

          {/* Desktop CTAs */}
          <div className="mt-7 hidden items-center gap-3.5 sm:flex">
            <a
              href="#book"
              onClick={scrollToBook}
              className="group inline-flex items-center justify-center rounded-lg bg-gold px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-ink shadow-[0_4px_14px_rgba(212,175,55,0.35)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.nav.book}</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={telHref()}
              className="group inline-flex items-center justify-center rounded-lg border border-white/20 bg-ink/70 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white backdrop-blur-md shadow-md transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-600 hover:shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="h-4 w-4 mr-2 text-emerald-400 transition-colors duration-200 group-hover:text-white" />
              <span>{t.common.call}</span>
            </a>

            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center rounded-lg border border-amber-400/40 bg-ink/70 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-amber-200 backdrop-blur-md shadow-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-500 hover:text-ink hover:shadow-[0_4px_20px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <MapPin className="h-4 w-4 mr-2 text-amber-400 transition-colors duration-200 group-hover:text-ink" />
              <span>{lang === "ta" ? "இடம்" : "Location"}</span>
            </a>
          </div>
        </div>

        {/* Mobile Sticky Bar */}
        <div className="fixed bottom-3 inset-x-3 z-50 flex items-center justify-between gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 shadow-[0_12px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:hidden">
          <a
            href={telHref()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-1.5 py-2.5 text-[0.74rem] font-bold uppercase tracking-normal text-white shadow-[0_2px_12px_rgba(16,185,129,0.35)] transition-all active:scale-95 text-center leading-none"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 fill-current" />
            <span className="whitespace-nowrap">{t.common.call}</span>
          </a>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500/20 to-amber-600/30 px-1.5 py-2.5 text-[0.74rem] font-bold uppercase tracking-normal text-amber-200 shadow-[0_2px_12px_rgba(245,158,11,0.25)] transition-all active:scale-95 text-center leading-none"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-300" />
            <span className="whitespace-nowrap">{lang === "ta" ? "இடம்" : "Location"}</span>
          </a>

          <a
            href="#book"
            onClick={scrollToBook}
            className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold px-1.5 py-2.5 text-[0.74rem] font-extrabold uppercase tracking-normal text-ink shadow-[0_2px_15px_rgba(212,175,55,0.5)] transition-all active:scale-95 text-center leading-none"
          >
            <span className="whitespace-nowrap">{t.nav.book}</span>
          </a>
        </div>
      </section>

      {/* 2. WELCOME / ABOUT SECTION */}
      <section className="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-32">
        <Reveal>
          <img
            src={common.src}
            alt={t.images.common}
            loading="lazy"
            width={1280}
            height={960}
            className="aspect-[4/3] w-full rounded-2xl object-cover border border-border shadow-lg"
          />
        </Reveal>
        <Reveal>
          <span className="eyebrow">{t.home.welcomeEyebrow}</span>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            {t.home.welcomeTitle}
          </h2>
          <div className="my-6 h-px w-20 bg-gold" />
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">{t.home.welcomeText1}</p>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">{t.home.welcomeText2}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/about" className={btn("gold")}>
              {t.common.learnMore}
            </Link>
            <Link to="/rooms" className={btn("outline")}>
              {t.common.viewRooms}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 3. ROOMS SECTION */}
      <section className="border-t bg-muted/40 py-20 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.roomsEyebrow} title={t.home.roomsTitle} />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <RoomCard type="ac" />
            <RoomCard type="nonac" />
          </div>
        </div>
      </section>

      {/* 4. ONLINE BOOKING & ENQUIRY FORM */}
      <section id="book" className="border-t py-20 md:py-32 scroll-mt-20">
        <div className="container-x max-w-4xl">
          <BookingForm />
        </div>
      </section>

      {/* 5. WHY STAY WITH US */}
      <section className="border-t py-20 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.whyEyebrow} title={t.home.whyTitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((f, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={f.t}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-gold/60 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-medium">{f.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section className="border-t bg-muted/30 py-20 md:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">{t.home.galleryEyebrow}</span>
              <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">{t.home.galleryTitle}</h2>
            </div>
            <Link to="/gallery" className={btn("outline", "gap-2")}>
              {t.home.galleryCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10">
            <GalleryGrid limit={8} />
          </div>
        </div>
      </section>

      {/* 7. PROMINENT LOCATION SECTION (Above Footer) */}
      <section className="border-t bg-muted/20 py-12 md:py-16">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 text-center sm:p-10 md:flex-row md:text-left shadow-sm">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-sm font-bold text-gold">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <span>{lang === "ta" ? "இருப்பிடம்" : "Location"}</span>
              </div>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                {lang === "ta" ? "பவானி அம்மன் கோவில் மிக அருகில்" : "Stay Close to Bhavani Amman Temple"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {lang === "ta"
                  ? "பெரியபாளையம் பவானி அம்மன் கோவிலுக்கு மிக அருகில் அமைந்துள்ள எங்கள் கெஸ்ட் ஹவுஸ் — உங்கள் ஆன்மீக பயணத்திற்கு மிக வசதியான தங்குமிடம்."
                  : "Near Bhavani Amman Temple, Periyapalayam. Our guest house is located right next to the temple — a convenient base for your visit."}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="#book"
                onClick={scrollToBook}
                className="group inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                <span>{lang === "ta" ? "முன்பதிவு / விசாரணை" : "Enquire Now"}</span>
                <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold via-[#F6E7B4] to-gold bg-[length:200%_auto] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[0_4px_18px_rgba(212,175,55,0.4)] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                <Navigation className="h-4 w-4 fill-current shrink-0 transition-transform group-hover:rotate-45" />
                <span>{lang === "ta" ? "இருப்பிடம்" : "Location"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
