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
  Camera,
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

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Guest House near Bhavani Amman Temple, Periyapalayam | Veerapandiyar",
      "Comfortable AC and Non-AC rooms at Periyapalayam Veerapandiyar Guest House, near Bhavani Amman Temple. Enquire by call or online booking form.",
      "/"
    ),
  component: Home,
});

const icons = [BedDouble, Snowflake, MapPin, Landmark, Heart, MessageCircle];

function Home() {
  const { t } = useI18n();
  const common = galleryImages.find((g) => g.key === "common")!;

  const scrollToBook = (e: React.MouseEvent) => {
    const el = document.getElementById("book");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. HERO SECTION - Brighter Building Visibility */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink pb-10 pt-28 sm:min-h-[100svh] sm:pb-24 sm:pt-32">
        <img
          src={heroImage}
          alt={t.images.exterior}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-top sm:object-center brightness-105 contrast-105"
          fetchPriority="high"
        />
        {/* Subtle bottom gradient only: Building remains bright, crisp & clearly visible */}
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

          <h1 className="max-w-2xl font-serif text-3xl font-normal leading-[1.12] tracking-tight text-ink-foreground sm:text-5xl lg:text-6xl">
            {t.home.heroTitle}
          </h1>

          <p className="mt-2.5 max-w-lg text-sm font-light leading-relaxed text-ink-foreground/85 sm:mt-4 sm:text-base">
            {t.home.heroText}
          </p>

          {/* Desktop CTAs - Dynamic & Interactive */}
          <div className="mt-7 hidden items-center gap-3.5 sm:flex">
            {/* Book Your Stay - Gold Gradient Shimmer & Hover Lift */}
            <a
              href="#book"
              onClick={scrollToBook}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-gold via-[#F6E7B4] to-gold bg-[length:200%_auto] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-ink shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-all duration-300 hover:bg-[position:right_center] hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.home.heroCta}</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Call Us - Emerald Tint & Tactile Pulse */}
            <a
              href={telHref()}
              className="group inline-flex items-center justify-center rounded-lg border border-white/20 bg-ink/70 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white backdrop-blur-md shadow-md transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-600 hover:shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="h-4 w-4 mr-2 text-gold transition-colors duration-200 group-hover:text-white group-hover:rotate-12" />
              <span>{t.common.call}</span>
            </a>

            {/* Location - Amber Pill Accent */}
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center rounded-lg border border-gold/40 bg-ink/70 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white backdrop-blur-md shadow-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-500 hover:text-ink hover:shadow-[0_4px_20px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <MapPin className="h-4 w-4 mr-2 text-gold transition-colors duration-200 group-hover:text-ink group-hover:scale-110" />
              <span>Location</span>
            </a>
          </div>
        </div>

        {/* Mobile Sticky Bar - High-End Floating Action Capsule with Tactile Feedback */}
        <div className="fixed bottom-3 inset-x-3 z-50 flex items-center justify-between gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 shadow-[0_12px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:hidden">
          {/* Call Button */}
          <a
            href={telHref()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-2 py-2.5 text-[0.72rem] font-bold uppercase tracking-wider text-white shadow-[0_2px_12px_rgba(16,185,129,0.35)] transition-all active:scale-95 text-center"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 fill-current" />
            <span className="truncate">{t.common.call}</span>
          </a>

          {/* Highlighted Location Button */}
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-2 py-2.5 text-[0.72rem] font-bold uppercase tracking-wider text-ink shadow-[0_2px_12px_rgba(245,158,11,0.35)] transition-all active:scale-95 text-center border border-amber-300/40"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 fill-current text-ink" />
            <span className="truncate">Location</span>
          </a>

          {/* Book Now Button */}
          <a
            href="#book"
            onClick={scrollToBook}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-gold via-[#F6E7B4] to-gold px-2 py-2.5 text-[0.72rem] font-bold uppercase tracking-wider text-ink shadow-[0_2px_15px_rgba(212,175,55,0.45)] transition-all active:scale-95 text-center"
          >
            <span className="truncate">{t.nav.book}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </a>
        </div>
      </section>

      {/* 2. WELCOME SECTION */}
      <section className="container-x grid items-center gap-12 py-20 md:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src={common.src}
            alt={t.images.common}
            loading="lazy"
            width={1280}
            height={853}
            className="w-full rounded-2xl object-cover shadow-2xl border border-border/40"
          />
        </Reveal>
        <Reveal delay={150}>
          <div>
            <SectionHeading eyebrow={t.home.welcomeEyebrow} title={t.home.welcomeTitle} />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t.home.welcomeText1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.home.welcomeText2}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/about" className={btn("secondary")}>
                {t.common.learnMore}
              </Link>
              <Link to="/rooms" className={btn("ghost")}>
                {t.common.viewRooms} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. ROOMS SECTION */}
      <section className="border-t bg-muted/40 py-20 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.home.roomsEyebrow}
            title={t.home.roomsTitle}
            className="max-w-xl"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <RoomCard
              type="ac"
              title={t.rooms.ac}
              description={t.rooms.acDesc}
              features={t.rooms.acFeatures}
              cta={t.rooms.acCta}
            />
            <RoomCard
              type="nonac"
              title={t.rooms.nonac}
              description={t.rooms.nonacDesc}
              features={t.rooms.nonacFeatures}
              cta={t.rooms.nonacCta}
            />
          </div>
        </div>
      </section>

      {/* 4. BOOKING FORM SECTION */}
      <section id="book" className="scroll-mt-24 border-t bg-background py-16 md:py-24">
        <div className="container-x">
          <BookingForm />
        </div>
      </section>

      {/* 5. WHY STAY WITH US */}
      <section className="border-t py-20 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.home.whyEyebrow}
            title={t.home.whyTitle}
            className="max-w-xl"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((f, i) => {
              const Icon = icons[i % icons.length]!;
              return (
                <div
                  key={f.t}
                  className="rounded-xl border border-border/70 bg-card p-6 shadow-sm transition-all hover:border-gold/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">{f.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW - Premium Responsive Bento Grid with 8 High-Res Photos */}
      <section className="border-t bg-muted/30 py-20 md:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.home.galleryEyebrow} title={t.home.galleryTitle} />
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold shadow-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink hover:shadow-[0_4px_16px_rgba(212,175,55,0.3)] self-start md:self-auto"
            >
              <Camera className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>{t.home.galleryCta} (11 Photos)</span>
              <ArrowRight className="h-3.5 w-3.5 ml-0.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10">
            {/* Show 8 curated guest house photos in the enhanced balanced grid */}
            <GalleryGrid limit={8} />
          </div>
        </div>
      </section>

      {/* 7. PROMINENT LOCATION SECTION (With இருப்பிடம் (Location) & Dynamic Location Button) */}
      <section className="border-t bg-muted/20 py-12 md:py-16">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 text-center sm:p-10 md:flex-row md:text-left shadow-sm">
            <div className="max-w-xl">
              {/* Large, clearly visible badge with Tamil & English: இருப்பிடம் (Location) */}
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-sm font-bold text-gold">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <span>இருப்பிடம் (Location)</span>
              </div>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                Stay Close to Bhavani Amman Temple
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Near Bhavani Amman Temple, Periyapalayam. Our guest house is located right next to the temple — a convenient base for your visit.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="#book"
                onClick={scrollToBook}
                className="group inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                <span>Enquire Now</span>
                <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Highlighted Location Button in English - Dynamic Accent */}
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold via-[#F6E7B4] to-gold bg-[length:200%_auto] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[0_4px_18px_rgba(212,175,55,0.4)] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                <Navigation className="h-4 w-4 fill-current shrink-0 transition-transform group-hover:rotate-45" />
                <span>Location</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
