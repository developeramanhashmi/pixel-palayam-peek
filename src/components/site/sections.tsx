import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { btn, Reveal, SectionHeading } from "./ui";
import { galleryImages } from "@/lib/images";
import { cn } from "@/lib/utils";

export type RoomType = "ac" | "nonac";

export function RoomCard({ type }: { type: RoomType }) {
  const { t } = useI18n();
  const img = galleryImages.find((g) => g.key === type)!;
  return (
    <Reveal className="group flex flex-col bg-card">
      <div className="overflow-hidden">
        <img src={img.src} alt={t.images[img.key]} loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col border border-t-0 p-7 md:p-9">
        <h3 className="text-3xl">{t.rooms[type]}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{type === "ac" ? t.rooms.acDesc : t.rooms.nonacDesc}</p>
        <Link to="/booking" search={{ room: type }} className={btn("outline", "mt-7 self-start")}>
          {type === "ac" ? t.rooms.acCta : t.rooms.nonacCta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Reveal>
  );
}

export function RoomDetail({ type, reverse }: { type: RoomType; reverse?: boolean }) {
  const { t } = useI18n();
  const img = galleryImages.find((g) => g.key === type)!;
  const feats = type === "ac" ? t.rooms.acFeatures : t.rooms.nonacFeatures;
  return (
    <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <img src={img.src} alt={t.images[img.key]} loading="lazy" width={1280} height={960} className={cn("aspect-[4/3] w-full object-cover", reverse && "lg:order-2")} />
      <div>
        <h2 className="text-4xl md:text-5xl">{t.rooms[type]}</h2>
        <div className="my-5 h-px w-16 bg-gold" />
        <p className="text-lg leading-relaxed text-muted-foreground">{type === "ac" ? t.rooms.acDesc : t.rooms.nonacDesc}</p>
        <p className="eyebrow mt-8 mb-3">{t.roomsPage.features}</p>
        <ul className="space-y-2.5">
          {feats.map((f) => <li key={f} className="flex items-center gap-3"><Check className="h-4 w-4 text-gold" />{f}</li>)}
        </ul>
        <p className="mt-6 text-sm italic text-muted-foreground">{t.rooms.pricing}</p>
        <Link to="/booking" search={{ room: type }} className={btn("primary", "mt-8")}>{type === "ac" ? t.rooms.acCta : t.rooms.nonacCta}</Link>
      </div>
    </Reveal>
  );
}

export function LocationSection() {
  const { t } = useI18n();
  const temple = galleryImages.find((g) => g.key === "temple")!;
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px]">
          <img src={temple.src} alt={t.images.temple} loading="lazy" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="px-6 py-16 md:px-14 md:py-24">
          <Reveal>
            <SectionHeading eyebrow={t.home.locEyebrow} title={t.home.locTitle} light />
            <p className="flex items-start gap-3 text-lg"><MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />{t.common.address}</p>
            <p className="mt-4 max-w-md leading-relaxed text-ink-foreground/70">{t.home.locText}</p>
            <div className="mt-8 aspect-[16/9] w-full overflow-hidden border border-ink-foreground/15">
              <iframe title={t.contact.mapTitle} src={siteConfig.mapsEmbedUrl} className="h-full w-full grayscale-[40%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn("gold", "mt-8")}>{t.common.directions} <ArrowRight className="h-4 w-4" /></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const { t } = useI18n();
  const img = galleryImages.find((g) => g.key === "corridor")!;
  return (
    <section className="relative overflow-hidden bg-ink">
      <img src={img.src} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="hero-overlay absolute inset-0" />
      <Reveal className="container-x relative py-24 text-center md:py-32">
        <p className="eyebrow mb-4">{t.common.nearTemple}</p>
        <h2 className="mx-auto max-w-3xl text-4xl leading-tight text-ink-foreground md:text-6xl">{t.home.ctaTitle}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-foreground/80">{t.home.ctaText}</p>
        <Link to="/booking" className={btn("gold", "mt-10")}>{t.common.enquireNow}</Link>
      </Reveal>
    </section>
  );
}
