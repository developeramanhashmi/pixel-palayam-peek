import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { galleryImages } from "@/lib/images";
import { PageHero } from "@/components/site/ui";
import { GalleryGrid } from "@/components/site/Gallery";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => seo("Photo Gallery | Veerapandiyar Guest House, Periyapalayam", "See photos of our rooms, guest house and surroundings near Bhavani Amman Temple, Periyapalayam."),
  component: Gallery,
});

function Gallery() {
  const { t } = useI18n();
  const heroImg = galleryImages.find((g) => g.key === "common")?.src || galleryImages[0]?.src;

  return (
    <>
      <PageHero title={t.galleryPage.title} sub={t.galleryPage.sub} image={heroImg} alt="Photo Gallery" />
      <section className="container-x py-14 sm:py-20">
        <GalleryGrid images={galleryImages} />
      </section>
    </>
  );
}
