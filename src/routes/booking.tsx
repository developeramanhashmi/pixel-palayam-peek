import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
import { BookingForm } from "@/components/site/BookingForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/booking")({
  validateSearch: z.object({ room: z.enum(["ac", "nonac"]).optional() }),
  head: () => seo("Make an Enquiry | Veerapandiyar Guest House, Periyapalayam", "Send an accommodation enquiry for AC or Non-AC rooms near Bhavani Amman Temple, Periyapalayam."),
  component: Booking,
});

function Booking() {
  const { t } = useI18n();
  const { room } = Route.useSearch();
  return (
    <section className="bg-secondary pb-24 pt-32 md:pt-40">
      <div className="container-x max-w-3xl">
        <p className="eyebrow mb-3">{t.common.nearTemple}</p>
        <h1 className="text-4xl md:text-6xl">{t.booking.title}</h1>
        <p className="mt-4 mb-12 max-w-xl text-lg text-muted-foreground">{t.booking.sub}</p>
        <BookingForm key={room ?? "none"} initialRoom={room} />
      </div>
    </section>
  );
}
