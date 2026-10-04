import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { galleryImages } from "@/lib/images";
import { PageHero } from "@/components/site/ui";
import { CTASection, RoomDetail } from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/rooms")({
  head: () => seo("AC & Non-AC Rooms | Veerapandiyar Guest House, Periyapalayam", "Choose between comfortable AC and Non-AC rooms near Bhavani Amman Temple, Periyapalayam. Enquire today."),
  component: Rooms,
});

function Rooms() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t.roomsPage.title} sub={t.roomsPage.sub} image={galleryImages.find((g) => g.key === "ac")!.src} alt={t.images.ac} />
      <div className="container-x space-y-24 py-24 md:space-y-32 md:py-32">
        <RoomDetail type="ac" />
        <RoomDetail type="nonac" reverse />
      </div>
      <CTASection />
    </>
  );
}
