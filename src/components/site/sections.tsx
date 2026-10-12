import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Snowflake,
  Users,
  Wind,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, telHref } from "@/lib/site-config";
import { btn, Reveal, SectionHeading } from "./ui";
import { galleryImages } from "@/lib/images";
import { cn } from "@/lib/utils";

export type RoomType = "ac" | "nonac";

export function RoomCard({ type }: { type: RoomType }) {
  const { t } = useI18n();
  const img = galleryImages.find((g) => g.key === type) || galleryImages[0];
  const isAc = type === "ac";

  const amenities = isAc
    ? [
        { label: "Up to 8 Guests / Room", icon: Users },
        { label: "Split Air Conditioning", icon: Snowflake },
        { label: "Attached Clean Bath", icon: Sparkles },
        { label: "24/7 Water & Power", icon: ShieldCheck },
      ]
    : [
        { label: "Up to 8 Guests / Room", icon: Users },
        { label: "Ceiling Fans & Airy", icon: Wind },
        { label: "Attached Clean Bath", icon: Sparkles },
        { label: "24/7 Water Facility", icon: ShieldCheck },
      ];

  return (
    <Reveal className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl">
      {/* Clean photo without any overlay tags or badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={img.src}
          alt={t.images[img.key] || t.rooms[type]}
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div>
          <h3 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {t.rooms[type]}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gold">
            Periyapalayam Bhavani Amman Temple Stay
          </p>
        </div>

        <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
          {type === "ac" ? t.rooms.acDesc : t.rooms.nonacDesc}
        </p>

        {/* Key Amenities Grid */}
        <div className="my-5 grid grid-cols-2 gap-2.5 rounded-xl border border-border/60 bg-muted/30 p-3 sm:p-3.5">
          {amenities.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 text-xs font-medium text-foreground/90">
              <Icon className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <Link
            to="/booking"
            search={{ room: type }}
            className={btn("gold", "w-full sm:flex-1 justify-center py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm")}
          >
            {type === "ac" ? t.rooms.acCta : t.rooms.nonacCta}
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
          <a
            href={telHref()}
            className={btn("outline", "w-full sm:w-auto px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-border/80 hover:border-gold")}
            title="Direct Reception Call"
          >
            <Phone className="h-3.5 w-3.5 mr-1 text-gold" />
            Call
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function RoomDetail({ type, reverse }: { type: RoomType; reverse?: boolean }) {
  const { t } = useI18n();
  const img = galleryImages.find((g) => g.key === type) || galleryImages[0];
  const isAc = type === "ac";
  const feats = isAc ? t.rooms.acFeatures : t.rooms.nonacFeatures;

  return (
    <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn("relative overflow-hidden rounded-2xl border border-border/80 shadow-lg", reverse && "lg:order-2")}>
        <img
          src={img.src}
          alt={t.images[img.key] || t.rooms[type]}
          loading="lazy"
          width={1280}
          height={960}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold mb-2">
          <span>Veerapandiyar Guest House</span>
          <span>·</span>
          <span>Max 8 Guests</span>
        </div>
        <h2 className="text-3xl font-serif md:text-5xl">{t.rooms[type]}</h2>
        <div className="my-5 h-px w-16 bg-gold" />
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">{type === "ac" ? t.rooms.acDesc : t.rooms.nonacDesc}</p>
        <p className="eyebrow mt-8 mb-3">{t.roomsPage.features}</p>
        <ul className="space-y-3">
          {feats.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm sm:text-base">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{f}</span>
            </li>
          ))}
          <li className="flex items-center gap-3 text-sm sm:text-base text-foreground font-medium">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
              <Users className="h-3.5 w-3.5" />
            </span>
            <span>Accommodates up to 8 devotees / family members per room</span>
          </li>
        </ul>
        <p className="mt-6 text-sm italic text-muted-foreground">{t.rooms.pricing}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/booking" search={{ room: type }} className={btn("gold")}>
            {type === "ac" ? t.rooms.acCta : t.rooms.nonacCta}
          </Link>
          <a href={telHref()} className={btn("outline")}>
            <Phone className="h-4 w-4 mr-2 text-gold" />
            {t.common.call}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function LocationSection() {
  const { t } = useI18n();
  const temple = galleryImages.find((g) => g.key === "temple") || galleryImages.find((g) => g.key === "surroundings") || galleryImages[0];

  return (
    <section className="bg-ink text-ink-foreground">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px]">
          <img
            src={temple.src}
            alt={t.images[temple.key] || "Near Bhavani Amman Temple"}
            loading="lazy"
            width={1280}
            height={960}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="px-6 py-16 md:px-14 md:py-24">
          <Reveal>
            <SectionHeading eyebrow={t.home.locEyebrow} title={t.home.locTitle} light />
            <p className="flex items-start gap-3 text-lg">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
              {t.common.address}
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-ink-foreground/70">
              {t.home.locText}
            </p>
            <div className="mt-8 aspect-[16/9] w-full overflow-hidden border border-ink-foreground/15 rounded-xl">
              <iframe
                title={t.contact.mapTitle}
                src={siteConfig.mapsEmbedUrl}
                className="h-full w-full grayscale-[40%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btn("gold", "mt-8")}
            >
              {t.common.directions} <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const { t } = useI18n();
  const img = galleryImages.find((g) => g.key === "corridor") || galleryImages[0];

  return (
    <section className="relative overflow-hidden bg-ink">
      <img
        src={img.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="hero-overlay absolute inset-0" />
      <Reveal className="container-x relative py-24 text-center md:py-32">
        <p className="eyebrow mb-4">{t.common.nearTemple}</p>
        <h2 className="mx-auto max-w-3xl text-4xl leading-tight text-ink-foreground md:text-6xl">
          {t.home.ctaTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-foreground/80">
          {t.home.ctaText}
        </p>
        <Link to="/booking" className={btn("gold", "mt-10")}>
          {t.common.enquireNow}
        </Link>
      </Reveal>
    </section>
  );
}
