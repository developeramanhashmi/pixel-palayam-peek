// import { createFileRoute, Link } from "@tanstack/react-router";
// import {
//   ArrowRight,
//   BedDouble,
//   Heart,
//   MapPin,
//   MessageCircle,
//   Snowflake,
//   Landmark,
//   Star,
//   Phone,
//   Navigation,
//   Camera,
// } from "lucide-react";
// import React from "react";
// import { useI18n } from "@/lib/i18n";
// import { siteConfig, telHref } from "@/lib/site-config";
// import { galleryImages, heroImage } from "@/lib/images";
// import { btn, Reveal, SectionHeading } from "@/components/site/ui";
// import { RoomCard } from "@/components/site/sections";
// import { GalleryGrid } from "@/components/site/Gallery";
// import { BookingForm } from "@/components/site/BookingForm";
// import { seo } from "@/lib/seo";
// import { cn } from "@/lib/utils";

// export const Route = createFileRoute("/")({
//   head: () =>
//     seo({
//       title: "Periyapalayam Veerapandiyaar Guest House | AC & Non-AC Rooms Near Temple",
//       description:
//         "Comfortable AC and Non-AC rooms at Periyapalayam Veerapandiyaar Guest House, located right near Bhavani Amman Temple. Call +91 84283 38999 for instant booking & enquiry.",
//       path: "/",
//       image: "/building.jpg",
//     }),
//   component: Home,
// });

// const icons = [BedDouble, Snowflake, MapPin, Landmark, Heart, MessageCircle];

// function Home() {
//   const { t, lang } = useI18n();
//   const common = galleryImages.find((g) => g.key === "common") || galleryImages[0];

//   const scrollToBook = (e: React.MouseEvent) => {
//     const el = document.getElementById("book");
//     if (el) {
//       e.preventDefault();
//       el.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       {/* 1. HERO SECTION - Brighter Building Visibility */}
//       <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink pb-10 pt-28 sm:min-h-[100svh] sm:pb-24 sm:pt-32">
//         <img
//           src={heroImage}
//           alt={
//             lang === "ta"
//               ? "பெரியபாளையம் பவானி அம்மன் கோவில் அருகில் உள்ள வீரபாண்டியார் கெஸ்ட் ஹவுஸ் கட்டிட தோற்றம்"
//               : "Veerapandiyaar Guest House Building Exterior near Bhavani Amman Temple, Periyapalayam"
//           }
//           width={1920}
//           height={1088}
//           className="absolute inset-0 h-full w-full object-cover object-top sm:object-center brightness-105 contrast-105"
//           fetchPriority="high"
//         />

//         {/* Subtle bottom gradient only: Building remains bright, crisp & clearly visible */}
//         <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 via-32% to-transparent" />

//         <div className="container-x relative z-10 w-full page-in">
//           {/* Micro badges */}
//           <div className="mb-3.5 flex flex-wrap items-center gap-2">
//             <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/80 px-2.5 py-1 text-[0.68rem] font-medium text-ink-foreground backdrop-blur-md">
//               <Star className="h-3 w-3 fill-gold text-gold" />
//               <span><strong className="text-gold">4.5</strong> Rating</span>
//             </div>

//             <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/70 px-2.5 py-1 text-[0.68rem] font-medium text-ink-foreground/90 backdrop-blur-md">
//               <Snowflake className="h-3 w-3 text-gold" />
//               <span>AC & Non-AC</span>
//             </div>

//             <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/70 px-2.5 py-1 text-[0.68rem] font-medium text-ink-foreground/80 backdrop-blur-md">
//               <MapPin className="h-3 w-3 text-gold" />
//               <span>{t.common.nearTemple}</span>
//             </div>
//           </div>

//           {/* Hero Title: Tamil is broken into 2 balanced lines & scaled so building name stays visible */}
//           <h1
//             className={cn(
//               "font-serif font-normal tracking-tight text-ink-foreground",
//               lang === "ta"
//                 ? "text-[1.75rem] leading-[1.25] sm:text-4xl md:text-5xl max-w-2xl"
//                 : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl"
//             )}
//           >
//             {lang === "ta" ? (
//               <>
//                 <span className="block font-medium">பெரியபாளையத்தில்</span>
//                 <span className="block text-gold">வசதியான தங்குமிடம்</span>
//               </>
//             ) : (
//               t.hero.title
//             )}
//           </h1>

//           <p className="mt-2.5 max-w-xl text-xs text-ink-foreground/85 sm:text-sm md:text-base leading-relaxed">
//             {t.hero.subtitle}
//           </p>

//           {/* Desktop / tablet action dock */}
//           <div className="mt-5 hidden sm:flex sm:flex-wrap sm:items-center sm:gap-3">
//             <a
//               href="#book"
//               onClick={scrollToBook}
//               className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink shadow-md transition-all hover:bg-gold-light hover:shadow-lg active:scale-95"
//             >
//               {t.nav.book}
//             </a>

//             <a
//               href={telHref()}
//               className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-ink/70 px-5 py-2.5 text-xs font-semibold text-ink-foreground backdrop-blur-md transition-all hover:border-gold hover:text-gold"
//             >
//               <Phone className="h-3.5 w-3.5 text-gold" />
//               <span>{siteConfig.phoneDisplay}</span>
//             </a>

//             <a
//               href={siteConfig.mapsUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-ink/70 px-4 py-2.5 text-xs font-semibold text-ink-foreground backdrop-blur-md transition-all hover:border-gold hover:text-gold"
//             >
//               <Navigation className="h-3.5 w-3.5 text-gold" />
//               <span>{lang === "ta" ? "இருப்பிடம்" : "Location"}</span>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* 2. WELCOME / ABOUT SECTION */}
//       <section className="section-padding bg-background">
//         <div className="container-x">
//           <div className="grid gap-10 md:grid-cols-2 md:items-center">
//             <Reveal>
//               <div>
//                 <span className="text-xs font-bold uppercase tracking-widest text-gold">
//                   {t.nav.about}
//                 </span>
//                 <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl">
//                   {t.about.title}
//                 </h2>
//                 <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
//                   {t.about.body1}
//                 </p>
//                 <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
//                   {t.about.body2}
//                 </p>

//                 <div className="mt-6 flex flex-wrap gap-2">
//                   <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
//                     ✓ {t.amenities.temple}
//                   </span>
//                   <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
//                     ✓ {t.amenities.ac}
//                   </span>
//                   <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
//                     ✓ {t.amenities.desk}
//                   </span>
//                 </div>
//               </div>
//             </Reveal>

//             <Reveal delay={100}>
//               <div className="overflow-hidden rounded-2xl border border-border shadow-md">
//                 <img
//                   src={common.src}
//                   alt={
//                     lang === "ta"
//                       ? "வீரபாண்டியார் கெஸ்ட் ஹவுஸ் முகப்பு வரவேற்பு தோற்றம்"
//                       : "Guest house corridor and common space"
//                   }
//                   loading="lazy"
//                   width={1280}
//                   height={960}
//                   className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
//                 />
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* 3. ROOMS SECTION */}
//       <section className="section-padding bg-secondary/50">
//         <div className="container-x">
//           <SectionHeading
//             eyebrow={t.rooms.title}
//             title={t.rooms.subtitle}
//             description={t.rooms.capacityNote}
//           />

//           <div className="mt-10 grid gap-6 md:grid-cols-2">
//             <RoomCard
//               type="ac"
//               name={t.rooms.acTitle}
//               capacity={t.rooms.capacity}
//               desc={t.rooms.acDesc}
//               features={[t.amenities.ac, t.amenities.family, t.amenities.desk]}
//               onBook={scrollToBook}
//             />
//             <RoomCard
//               type="nonac"
//               name={t.rooms.nonacTitle}
//               capacity={t.rooms.capacity}
//               desc={t.rooms.nonacDesc}
//               features={[t.rooms.nonacTitle, t.amenities.family, t.amenities.desk]}
//               onBook={scrollToBook}
//             />
//           </div>
//         </div>
//       </section>

//       {/* 4. GALLERY PREVIEW SECTION */}
//       <section className="section-padding bg-background">
//         <div className="container-x">
//           <SectionHeading
//             eyebrow={t.nav.gallery}
//             title={t.gallery.title}
//             description={t.gallery.subtitle}
//           />

//           <div className="mt-8">
//             <GalleryGrid images={galleryImages.slice(0, 8)} />
//           </div>

//           <div className="mt-8 text-center">
//             <Link
//               to="/gallery"
//               className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-ink px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink-foreground shadow-lg transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-gold/30"
//             >
//               <Camera className="h-4 w-4 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:text-ink" />
//               <span>{lang === "ta" ? "முழு கேலரியைப் பார்க்கவும்" : "View Full Gallery"}</span>
//               <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* 5. BOOKING FORM SECTION */}
//       <section id="book" className="section-padding bg-secondary/40 scroll-mt-20">
//         <div className="container-x">
//           <div className="mx-auto max-w-3xl">
//             <SectionHeading
//               eyebrow={t.booking.formTitle}
//               title={t.booking.formSubtitle}
//               description={t.hero.badge}
//             />

//             <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
//               <BookingForm />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 6. ABOVE FOOTER: LOCATION SECTION */}
//       <section className="border-t border-border bg-secondary/30 py-12">
//         <div className="container-x">
//           <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
//             <div className="max-w-2xl">
//               <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold">
//                 <MapPin className="h-3.5 w-3.5" />
//                 <span>{lang === "ta" ? "இருப்பிடம்" : "Location"}</span>
//               </span>
//               <h2 className="mt-1 font-serif text-xl sm:text-2xl font-semibold text-foreground">
//                 {lang === "ta" ? "பவானி அம்மன் கோவில் மிக அருகில்" : "Stay Close to Bhavani Amman Temple"}
//               </h2>
//               <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
//                 {lang === "ta"
//                   ? "பெரியபாளையம் பவானி அம்மன் கோவிலுக்கு மிக அருகில் அமைந்துள்ள எங்கள் கெஸ்ட் ஹவுஸ் — உங்கள் ஆன்மீக பயணத்திற்கு மிக வசதியான தங்குமிடம்."
//                   : "Near Bhavani Amman Temple, Periyapalayam. Our guest house is located right next to the temple — a convenient base for your visit."}
//               </p>
//             </div>

//             <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
//               <a
//                 href="#book"
//                 onClick={scrollToBook}
//                 className="group inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
//               >
//                 <span>{lang === "ta" ? "முன்பதிவு / விசாரணை" : "Enquire Now"}</span>
//                 <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
//               </a>

//               <a
//                 href={siteConfig.mapsUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold via-[#F6E7B4] to-gold bg-[length:200%_auto] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[0_4px_18px_rgba(212,175,55,0.4)] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
//               >
//                 <Navigation className="h-4 w-4 fill-current shrink-0 transition-transform group-hover:rotate-45" />
//                 <span>{lang === "ta" ? "இருப்பிடம்" : "Location"}</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }





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
import { Reveal, SectionHeading } from "@/components/site/ui";
import { RoomCard } from "@/components/site/sections";
import { GalleryGrid } from "@/components/site/Gallery";
import { BookingForm } from "@/components/site/BookingForm";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title:
        "Periyapalayam Veerapandiyaar Guest House | AC & Non-AC Rooms Near Temple",
      description:
        "Comfortable AC and Non-AC rooms at Periyapalayam Veerapandiyaar Guest House, located right near Bhavani Amman Temple. Call +91 84283 38999 for instant booking & enquiry.",
      path: "/",
      image: "/building.jpg",
    }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const common =
    galleryImages.find((g) => g.key === "common") || galleryImages[0];

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
          className="absolute inset-0 h-full w-full object-cover object-top brightness-105 contrast-105 sm:object-center"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 via-32% to-transparent" />

        <div className="container-x page-in relative z-10 w-full">
          <div className="mb-3.5 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/80 px-2.5 py-1 text-[0.68rem] font-medium text-ink-foreground backdrop-blur-md">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span>
                <strong className="text-gold">4.5</strong> Rating
              </span>
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

          <h1
            className={cn(
              "font-serif font-normal tracking-tight text-ink-foreground",
              lang === "ta"
                ? "max-w-2xl text-[1.75rem] leading-[1.25] sm:text-4xl md:text-5xl"
                : "max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            )}
          >
            {lang === "ta" ? (
              <>
                <span className="block font-medium">பெரியபாளையத்தில்</span>
                <span className="block text-gold">வசதியான தங்குமிடம்</span>
              </>
            ) : (
              t.home.heroTitle
            )}
          </h1>

          <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-ink-foreground/85 sm:text-sm md:text-base">
            {t.home.heroText}
          </p>

          <div className="mt-5 hidden sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <a
              href="#book"
              onClick={scrollToBook}
              className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink shadow-md transition-all hover:bg-gold-light hover:shadow-lg active:scale-95"
            >
              {t.nav.book}
            </a>

            <a
              href={telHref()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-ink/70 px-5 py-2.5 text-xs font-semibold text-ink-foreground backdrop-blur-md transition-all hover:border-gold hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              <span>{siteConfig.phoneDisplay}</span>
            </a>

            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-ink/70 px-4 py-2.5 text-xs font-semibold text-ink-foreground backdrop-blur-md transition-all hover:border-gold hover:text-gold"
            >
              <Navigation className="h-3.5 w-3.5 text-gold" />
              <span>{lang === "ta" ? "இருப்பிடம்" : "Location"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. WELCOME / ABOUT SECTION */}
      <section className="section-padding bg-background">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  {t.nav.about}
                </span>

                <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl">
                  {t.about.title}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t.about.intro1}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t.about.intro2}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    ✓ {t.common.nearTemple}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    ✓ {t.rooms.ac}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    ✓ {t.about.comfortTitle}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="overflow-hidden rounded-2xl border border-border shadow-md">
                {common && (
                  <img
                    src={common.src}
                    alt={
                      lang === "ta"
                        ? "வீரபாண்டியார் கெஸ்ட் ஹவுஸ் முகப்பு வரவேற்பு தோற்றம்"
                        : "Guest house corridor and common space"
                    }
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. ROOMS SECTION */}
      <section className="section-padding bg-secondary/50">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.home.roomsEyebrow}
            title={t.home.roomsTitle}
            description={t.roomsPage.sub}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <RoomCard
              type="ac"
              name={t.rooms.ac}
              capacity=""
              desc={t.rooms.acDesc}
              features={[
                t.rooms.ac,
                t.about.comfortTitle,
                t.common.nearTemple,
              ]}
              onBook={scrollToBook}
            />

            <RoomCard
              type="nonac"
              name={t.rooms.nonac}
              capacity=""
              desc={t.rooms.nonacDesc}
              features={[
                t.rooms.nonac,
                t.about.comfortTitle,
                t.common.nearTemple,
              ]}
              onBook={scrollToBook}
            />
          </div>
        </div>
      </section>

      {/* 4. GALLERY PREVIEW SECTION */}
      <section className="section-padding bg-background">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.home.galleryEyebrow}
            title={t.home.galleryTitle}
            description={t.home.galleryText || t.home.galleryCta}
          />

          <div className="mt-8">
            <GalleryGrid images={galleryImages.slice(0, 8)} />
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-gold/30 bg-ink px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-ink hover:shadow-xl active:translate-y-0"
            >
              <Camera className="h-4 w-4 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:text-ink" />
              <span>
                {lang === "ta"
                  ? "முழு கேலரியைப் பார்க்கவும்"
                  : "View Full Gallery"}
              </span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BOOKING FORM SECTION */}
      <section
        id="book"
        className="section-padding scroll-mt-20 bg-secondary/40"
      >
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow={t.booking.title}
              title={t.booking.sub}
              description={t.common.nearTemple}
            />

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* 6. LOCATION SECTION */}
      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {lang === "ta" ? "இருப்பிடம்" : "Location"}
                </span>
              </span>

              <h2 className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
                {t.home.locTitle}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t.home.locText}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="#book"
                onClick={scrollToBook}
                className="group inline-flex w-full items-center justify-center rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold active:translate-y-0 sm:w-auto"
              >
                <span>
                  {lang === "ta" ? "முன்பதிவு / விசாரணை" : "Enquire Now"}
                </span>
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold via-[#F6E7B4] to-gold bg-[length:200%_auto] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[0_4px_18px_rgba(212,175,55,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] active:translate-y-0 sm:w-auto"
              >
                <Navigation className="h-4 w-4 shrink-0 fill-current transition-transform group-hover:rotate-45" />
                <span>
                  {lang === "ta" ? "இருப்பிடம்" : "Location"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
