import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Landmark, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { galleryImages } from "@/lib/images";
import { PageHero, Reveal, SectionHeading } from "@/components/site/ui";
import { CTASection } from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us | Veerapandiyar Guest House, Periyapalayam", "Learn about Periyapalayam Veerapandiyar Guest House — comfortable accommodation near Bhavani Amman Temple."),
  component: About,
});

function About() {
  const { t } = useI18n();
  const img = (k: string) => galleryImages.find((g) => g.key === k)!.src;
  return (
    <>
      <PageHero title={t.about.title} sub={t.about.sub} image={img("exterior")} alt={t.images.exterior} />
      <section className="container-x grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow={t.nav.about} title={t.about.introTitle} />
          <p className="text-lg leading-relaxed text-muted-foreground">{t.about.intro1}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.about.intro2}</p>
        </Reveal>
        <Reveal><img src={img("corridor")} alt={t.images.corridor} loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover" /></Reveal>
      </section>
      <section className="bg-secondary py-24">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {[{ I: Landmark, h: t.about.locTitle, p: t.about.locText }, { I: BedDouble, h: t.about.comfortTitle, p: t.about.comfortText }].map(({ I, h, p }) => (
            <Reveal key={h} className="border bg-background p-10">
              <I className="h-8 w-8 text-gold" strokeWidth={1.25} />
              <h2 className="mt-5 text-3xl">{h}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="container-x py-24">
        <SectionHeading eyebrow={t.home.whyEyebrow} title={t.home.whyTitle} center />
        <ul className="mx-auto grid max-w-4xl gap-x-12 gap-y-6 sm:grid-cols-2">
          {t.features.map((f) => (
            <li key={f.t} className="flex gap-4 border-b pb-6">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <div><h3 className="text-xl">{f.t}</h3><p className="text-muted-foreground">{f.d}</p></div>
            </li>
          ))}
        </ul>
      </section>
      <CTASection />
    </>
  );
}
