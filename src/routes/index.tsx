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
} from "lucide-react";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { galleryImages, heroImage } from "@/lib/images";
import { btn, Reveal, SectionHeading, WhatsAppIcon } from "@/components/site/ui";
import { RoomCard } from "@/components/site/sections";
import { GalleryGrid } from "@/components/site/Gallery";
import { BookingForm } from "@/components/site/BookingForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Guest House near Bhavani Amman Temple, Periyapalayam | Veerapandiyar",
      "Comfortable AC and Non-AC rooms at Periyapalayam Veerapandiyar Guest House, near Bhavani Amman Temple. Enquire by call or online booking form."
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
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink pb-10 pt-28 sm:min-h-[100svh] sm:pb-24 sm:pt-32">
        <img
          src={heroImage}
          alt={t.images.exterior}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 via-40% to-black/30" />

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

          {/* Desktop CTAs */}
          <div className="mt-7 hidden items-center gap-4 sm:flex">
            <a href="#book" onClick={scrollToBook} className={btn("gold", "px-6 py-3 shadow-lg")}>
              {t.home.heroCta} <ArrowRight className="h-4 w-4 ml-1" />
            </a>
            <a
              href={telHref()}
              className={btn("outlineLight", "px-6 py-3 border-white/25 hover:border-gold")}
            >
              <Phone className="h-4 w-4 mr-2 text-gold" />
              {t.common.call}
            </a>
          </div>
        </div>

        {/* Client-Specified Mobile Sticky Bar: WhatsApp removed, Highlighted Call + Gold Book Now */}
        <div className="fixed bottom-3.5 inset-x-3.5 z-50 flex items-center justify-between gap-2.5 rounded-full border border-white/20 bg-ink/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:hidden">
          {/* Highlighted Call Button */}
          <a
            href={telHref()}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-3 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md active:scale-95 transition-all hover:bg-emerald-500 text-center"
          >
            <Phone className="h-4 w-4 shrink-0 fill-current" />
            <span className="text-center truncate">{t.common.call}</span>
          </a>

          {/* Preserved Gold Book Now Button (Centered) */}
          <a
            href="#book"
            onClick={scrollToBook}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold px-3 py-3 text-xs font-bold uppercase tracking-wider text-ink shadow-md active:scale-95 transition-all hover:brightness-105 text-center"
          >
            <span className="text-center truncate">{t.nav.book}</span>
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
          <SectionHeading
            eyebrow={t.home.welcomeEyebrow}
            title={t.home.welcomeTitle}
            description={t.home.welcomeText1}
          />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t.home.welcomeText2}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/about" className={btn("secondary")}>
              {t.common.learnMore}
            </Link>
            <Link to="/rooms" className={btn("ghost")}>
              {t.common.viewRooms}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 3. ROOMS SECTION */}
      <section className="border-t bg-muted/40 py-20 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.home.roomsEyebrow}
            title={t.home.roomsTitle}
            centered
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-10">
            <RoomCard type="ac" />
            <RoomCard type="nonac" />
          </div>
        </div>
      </section>

      {/* 4. HOMEPAGE BOOKING ENQUIRY SECTION */}
      <section id="book" className="relative scroll-mt-20 border-t bg-background py-16 md:py-24">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow="Quick Booking"
            title="Book Your Room in Seconds"
            description="Select your room preferences below. Our reception team will reserve your accommodation right away."
            centered
          />
          <div className="mt-10">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* 5. WHY STAY WITH US */}
      <section className="border-t py-20 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.home.whyEyebrow}
            title={t.home.whyTitle}
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((f, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={f.t} delay={i * 60}>
                  <div className="flex flex-col rounded-xl border border-border/70 bg-card p-6 shadow-sm transition-all hover:border-gold/50 hover:shadow-md">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-foreground">{f.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section className="border-t bg-muted/30 py-20 md:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.home.galleryEyebrow} title={t.home.galleryTitle} />
            <Link to="/gallery" className={btn("ghost", "self-start md:self-auto")}>
              {t.home.galleryCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <GalleryGrid limit={4} />
          </div>
        </div>
      </section>

      {/* 7. COMPACT LOCATION / DIRECTIONS SECTION */}
      <section className="border-t bg-muted/20 py-12 md:py-16">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 text-center sm:p-10 md:flex-row md:text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
                <MapPin className="h-3.5 w-3.5" />
                <span>Location</span>
              </div>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                Stay Close to Bhavani Amman Temple
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Near Bhavani Amman Temple, Periyapalayam. Our guest house is located right next to the temple — a convenient base for your visit.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href="#book" onClick={scrollToBook} className={btn("gold", "w-full justify-center sm:w-auto")}>
                Enquire Now
              </a>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btn("outline", "w-full justify-center sm:w-auto")}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
