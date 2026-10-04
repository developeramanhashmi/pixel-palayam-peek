import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { galleryImages, type GalleryCategory } from "@/lib/images";
import { PageHero } from "@/components/site/ui";
import { GalleryGrid } from "@/components/site/Gallery";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => seo("Photo Gallery | Veerapandiyar Guest House, Periyapalayam", "See photos of our rooms, guest house and surroundings near Bhavani Amman Temple, Periyapalayam."),
  component: Gallery,
});

const cats: ("all" | GalleryCategory)[] = ["all", "exterior", "acRooms", "nonacRooms", "common", "surroundings"];

function Gallery() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof cats)[number]>("all");
  const imgs = cat === "all" ? galleryImages : galleryImages.filter((g) => g.cat === cat);
  return (
    <>
      <PageHero title={t.galleryPage.title} sub={t.galleryPage.sub} image={galleryImages.find((g) => g.key === "common")!.src} alt={t.images.common} />
      <section className="container-x py-20">
        <div className="mb-10 flex flex-wrap gap-2" role="group">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={cn("rounded-sm border px-4 py-2 text-sm transition-colors", cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary")}>
              {t.galleryPage[c]}
            </button>
          ))}
        </div>
        <GalleryGrid key={cat} images={imgs} />
      </section>
    </>
  );
}
