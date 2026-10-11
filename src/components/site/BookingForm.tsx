import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  BedDouble,
  Snowflake,
  ShieldCheck,
  Phone,
  Calendar,
  Users,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { WhatsAppIcon } from "./ui";
import type { RoomType } from "./sections";
import { cn } from "@/lib/utils";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { useServerFn } from "@tanstack/react-start";

export type Enquiry = {
  name: string;
  address: string;
  contact: string;
  room: RoomType | "";
  checkIn: string;
  checkOut: string;
  rooms: string;
  guests: string;
  notes: string;
};
type Errors = Partial<Record<keyof Enquiry, string>>;

const fieldClass =
  "w-full rounded-xl border border-border/80 bg-background px-3.5 py-3 text-base sm:text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/20";

export function BookingForm({ initialRoom }: { initialRoom?: RoomType | undefined }) {
  const { t } = useI18n();
  const b = t.booking;

  const todayStr = new Date().toISOString().split("T")[0];

  const [v, setV] = useState<Enquiry>({
    name: "",
    address: "",
    contact: "",
    room: initialRoom ?? "ac",
    checkIn: todayStr,
    checkOut: "",
    rooms: "1",
    guests: "2",
    notes: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const submitEnquiryFn = useServerFn(submitEnquiry);

  const set = (k: keyof Enquiry) => (e: { target: { value: string } }) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = b.errName;
    if (!v.address.trim()) e.address = b.errAddress;
    if (!/^\+?[0-9\s-]{10,15}$/.test(v.contact.trim())) e.contact = b.errContact;
    if (v.room !== "ac" && v.room !== "nonac") e.room = b.errRoom;
    if (!Number.isInteger(Number(v.rooms)) || Number(v.rooms) < 1 || Number(v.rooms) > 50)
      e.rooms = b.errRooms;
    if (!Number.isInteger(Number(v.guests)) || Number(v.guests) < 1 || Number(v.guests) > 500)
      e.guests = b.errGuests;
    return e;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setSubmitFailed(false);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }

    setSubmitting(true);
    const roomTitle = v.room === "ac" ? "Deluxe AC Room (Air Conditioned)" : "Standard Non-AC Room";
    const cleanPhone = v.contact.replace(/\D/g, "");
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://veerapandiyarguesthouse.com";

    // Clean human-readable message block for email body
    const formattedEmailCard = [
      "========================================",
      "VEERAPANDIYAR GUEST HOUSE - ROOM BOOKING",
      "Near Bhavani Amman Temple, Periyapalayam",
      "========================================",
      "",
      `GUEST NAME: ${v.name.trim()}`,
      `PHONE: ${v.contact.trim()}`,
      `CITY / ADDRESS: ${v.address.trim()}`,
      "",
      `ROOM CATEGORY: ${roomTitle}`,
      `CHECK-IN DATE: ${v.checkIn || "Immediate / Today"}`,
      `CHECK-OUT DATE: ${v.checkOut || "Not specified"}`,
      `NUMBER OF ROOMS: ${v.rooms} Room(s)`,
      `TOTAL GUESTS: ${v.guests} Guest(s)`,
      `SPECIAL NOTES: ${v.notes.trim() || "None"}`,
      "",
      "DIRECT ACTIONS FOR RECEPTION:",
      `• Call Guest: tel:${v.contact.trim()}`,
      `• WhatsApp Guest: https://wa.me/${cleanPhone}`,
      `• Temple Location: ${siteConfig.mapsUrl}`,
      "",
      "----------------------------------------",
      `Website: ${siteUrl}`,
      "Email powered by DevgronixTech (https://devgronixtech.com)",
      "========================================",
    ].join("\n");

    try {
      // 1. Submit to Web3Forms using clean, standard alphanumeric keys to pass spam filters
      if (siteConfig.web3FormsKey && siteConfig.web3FormsKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
        const payload = {
          access_key: siteConfig.web3FormsKey,
          subject: `New Booking: ${v.name.trim()} - ${v.room === "ac" ? "AC Deluxe" : "Non-AC"} (${v.rooms} Room)`,
          from_name: "Veerapandiyar Guest House",
          name: v.name.trim(),
          phone: v.contact.trim(),
          city_address: v.address.trim(),
          room_type: roomTitle,
          check_in_date: v.checkIn || "Today",
          check_out_date: v.checkOut || "Flexible",
          rooms_count: v.rooms,
          total_guests: v.guests,
          special_requests: v.notes.trim() || "None",
          direct_call_link: `tel:${v.contact.trim()}`,
          direct_whatsapp_link: `https://wa.me/${cleanPhone}`,
          powered_by: "DevgronixTech (https://devgronixtech.com)",
          message: formattedEmailCard,
        };

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });

        const resData = await res.json().catch(() => null);
        console.log("Web3Forms Response:", resData);
      }

      // 2. Also save to Supabase database (combining check-in/out in notes to avoid schema mismatch)
      await submitEnquiryFn({
        data: {
          guest_name: v.name.trim(),
          address: v.address.trim(),
          contact_number: v.contact.trim(),
          room_type: v.room === "ac" ? "AC" : "NON_AC",
          number_of_rooms: Number(v.rooms),
          total_guests: Number(v.guests),
          additional_requirements: [
            v.checkIn ? `Check-in: ${v.checkIn}` : "",
            v.checkOut ? `Check-out: ${v.checkOut}` : "",
            v.notes.trim() ? `Notes: ${v.notes.trim()}` : "",
          ]
            .filter(Boolean)
            .join(" | ") || undefined,
        },
      }).catch((dbErr) => console.warn("DB note:", dbErr));

      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Structured Interactive WhatsApp Receipt Message
  const waReceiptMessage = `✨ *VEERAPANDIYAR GUEST HOUSE* ✨
📍 _Near Bhavani Amman Temple, Periyapalayam_
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛎️ *NEW ROOM BOOKING ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *GUEST INFORMATION*
• *Name:* ${v.name.trim()}
• *Contact:* ${v.contact.trim()}
• *City / Address:* ${v.address.trim()}

📅 *STAY DATES & ROOMS*
• *Check-in Date:* ${v.checkIn || "Today / Immediate"}
• *Check-out Date:* ${v.checkOut || "Flexible"}
• *Category:* ${v.room === "ac" ? "❄️ Deluxe AC Room" : "🌿 Standard Non-AC Room"}
• *Rooms Required:* ${v.rooms} Room${Number(v.rooms) > 1 ? "s" : ""}
• *Total Guests:* ${v.guests} Person${Number(v.guests) > 1 ? "s" : ""}
• *Special Requests:* ${v.notes.trim() || "None"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🙏 _Hello! I have submitted this enquiry on your official website. Please confirm room availability and booking tariff._
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 _Powered by DevgronixTech_`;

  if (done) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-gold/40 bg-card p-6 text-center shadow-2xl md:p-10 page-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 border border-gold/40 text-gold shadow-inner">
          <CheckCircle2 className="h-9 w-9 text-gold" strokeWidth={2} />
        </div>
        <h2 className="mt-4 font-serif text-3xl md:text-4xl text-foreground font-medium">
          Enquiry Received!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you, <strong className="text-foreground">{v.name}</strong>. Your reservation request has been submitted.
        </p>

        {/* Voucher Preview Card */}
        <div className="my-6 rounded-xl border border-border/80 bg-muted/40 p-5 text-left text-xs space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 font-semibold text-foreground">
            <span className="text-sm font-serif text-gold">
              {v.room === "ac" ? "❄️ Deluxe AC Room" : "🌿 Standard Non-AC Room"}
            </span>
            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[0.68rem] text-gold border border-gold/30">
              {v.rooms} Room(s) • {v.guests} Guest(s)
            </span>
          </div>
          <div className="grid gap-1.5 text-muted-foreground">
            <p><strong className="text-foreground">Dates:</strong> Check-in: {v.checkIn || "Today"} {v.checkOut ? `→ Check-out: ${v.checkOut}` : ""}</p>
            <p><strong className="text-foreground">Contact:</strong> {v.contact}</p>
            <p><strong className="text-foreground">City/Address:</strong> {v.address}</p>
            {v.notes && <p><strong className="text-foreground">Notes:</strong> {v.notes}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <a
            href={whatsappHref(waReceiptMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:brightness-105 active:scale-95 transition-all"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>Confirm on WhatsApp</span>
          </a>

          <a
            href={telHref()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-background px-6 py-3.5 text-xs font-semibold text-foreground hover:bg-muted active:scale-95 transition-all"
          >
            <Phone className="h-4 w-4 text-gold" />
            <span>Call Guest House</span>
          </a>
        </div>

        {/* Branding Footer */}
        <div className="mt-8 pt-4 border-t border-border/50 flex flex-col items-center gap-1.5 text-[0.72rem] text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <a
              href="https://devgronixtech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold hover:underline inline-flex items-center gap-0.5"
            >
              DevgronixTech <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
          <Link to="/" className="text-muted-foreground hover:text-gold underline mt-1">
            {t.common.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      className="mx-auto max-w-2xl rounded-2xl border border-border/80 bg-card p-4.5 shadow-2xl sm:p-7 md:p-10"
    >
      {/* 1. ROOM TYPE RADIO BUTTON CARDS */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">
            1. Select Room Type
          </label>
          <span className="text-[0.7rem] text-muted-foreground">Bhavani Amman Temple View</span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Deluxe AC Radio Card */}
          <label
            className={cn(
              "relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all shadow-sm",
              v.room === "ac"
                ? "border-gold bg-gold/10 ring-1 ring-gold/40 shadow-gold/10"
                : "border-border/70 bg-card hover:border-gold/40 hover:bg-muted/20"
            )}
          >
            <input
              type="radio"
              name="room_type"
              value="ac"
              checked={v.room === "ac"}
              onChange={() => setV((p) => ({ ...p, room: "ac" }))}
              className="sr-only"
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 transition-all",
                    v.room === "ac" ? "border-gold bg-gold" : "border-muted-foreground/40 bg-transparent"
                  )}
                >
                  {v.room === "ac" && <div className="h-1.5 w-1.5 rounded-full bg-ink" />}
                </div>
                <span className="text-sm font-bold text-foreground">Deluxe AC Room</span>
              </div>
              <Snowflake className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-[0.72rem] text-muted-foreground leading-relaxed pl-7">
              Air Conditioned • Attached Bath • TV & WiFi
            </p>
          </label>

          {/* Standard Non-AC Radio Card */}
          <label
            className={cn(
              "relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all shadow-sm",
              v.room === "nonac"
                ? "border-gold bg-gold/10 ring-1 ring-gold/40 shadow-gold/10"
                : "border-border/70 bg-card hover:border-gold/40 hover:bg-muted/20"
            )}
          >
            <input
              type="radio"
              name="room_type"
              value="nonac"
              checked={v.room === "nonac"}
              onChange={() => setV((p) => ({ ...p, room: "nonac" }))}
              className="sr-only"
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 transition-all",
                    v.room === "nonac" ? "border-gold bg-gold" : "border-muted-foreground/40 bg-transparent"
                  )}
                >
                  {v.room === "nonac" && <div className="h-1.5 w-1.5 rounded-full bg-ink" />}
                </div>
                <span className="text-sm font-bold text-foreground">Standard Non-AC</span>
              </div>
              <BedDouble className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-[0.72rem] text-muted-foreground leading-relaxed pl-7">
              Airy & Clean • Ceiling Fan • Attached Bath
            </p>
          </label>
        </div>
        {errors.room && <p className="mt-1.5 text-xs text-destructive">{errors.room}</p>}
      </div>

      <div className="my-6 border-t border-border/60" />

      {/* 2. DATES & ROOM OCCUPANCY */}
      <div>
        <label className="block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold mb-3">
          2. Stay Dates & Rooms
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="f-checkin" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground">
              <Calendar className="h-3.5 w-3.5 text-gold" /> Check-in Date
            </label>
            <input
              id="f-checkin"
              type="date"
              min={todayStr}
              value={v.checkIn}
              onChange={set("checkIn")}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="f-checkout" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground">
              <Calendar className="h-3.5 w-3.5 text-gold" /> Check-out Date
            </label>
            <input
              id="f-checkout"
              type="date"
              min={v.checkIn || todayStr}
              value={v.checkOut}
              onChange={set("checkOut")}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="f-rooms" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground">
              <BedDouble className="h-3.5 w-3.5 text-gold" /> {b.numRooms}
            </label>
            <input
              id="f-rooms"
              type="number"
              min={1}
              max={50}
              value={v.rooms}
              onChange={set("rooms")}
              className={fieldClass}
            />
            {errors.rooms && <p className="mt-1 text-xs text-destructive">{errors.rooms}</p>}
          </div>

          <div>
            <label htmlFor="f-guests" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground">
              <Users className="h-3.5 w-3.5 text-gold" /> {b.numGuests}
            </label>
            <input
              id="f-guests"
              type="number"
              min={1}
              max={500}
              placeholder="e.g. 2"
              value={v.guests}
              onChange={set("guests")}
              className={cn(fieldClass, errors.guests && "border-destructive")}
            />
            {errors.guests && <p className="mt-1 text-xs text-destructive">{errors.guests}</p>}
          </div>
        </div>
      </div>

      <div className="my-6 border-t border-border/60" />

      {/* 3. GUEST CONTACT INFORMATION */}
      <div className="space-y-3.5">
        <label className="block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">
          3. Contact Information
        </label>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="f-name" className="mb-1.5 block text-xs font-medium text-foreground">
              {b.name} <span className="text-gold">*</span>
            </label>
            <input
              id="f-name"
              type="text"
              autoComplete="name"
              maxLength={100}
              placeholder="e.g. Ramesh Kumar"
              value={v.name}
              onChange={set("name")}
              className={cn(fieldClass, errors.name && "border-destructive")}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="f-contact" className="mb-1.5 block text-xs font-medium text-foreground">
              {b.contact} (WhatsApp) <span className="text-gold">*</span>
            </label>
            <input
              id="f-contact"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={16}
              placeholder="e.g. 9876543210"
              value={v.contact}
              onChange={set("contact")}
              className={cn(fieldClass, errors.contact && "border-destructive")}
            />
            {errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="f-address" className="mb-1.5 block text-xs font-medium text-foreground">
            {b.address} (City / Town) <span className="text-gold">*</span>
          </label>
          <input
            id="f-address"
            type="text"
            autoComplete="street-address"
            maxLength={500}
            placeholder="e.g. Chennai / Tiruvallur"
            value={v.address}
            onChange={set("address")}
            className={cn(fieldClass, errors.address && "border-destructive")}
          />
          {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="f-notes" className="mb-1.5 block text-xs font-medium text-foreground">
            {b.notes} <span className="text-muted-foreground font-normal">({b.optional})</span>
          </label>
          <textarea
            id="f-notes"
            rows={2}
            maxLength={2000}
            placeholder="e.g. Expected arrival time or special assistance needed"
            value={v.notes}
            onChange={set("notes")}
            className={fieldClass}
          />
        </div>
      </div>

      {submitFailed && (
        <p className="mt-4 text-xs text-destructive" role="alert">
          {b.errorSubmit}
        </p>
      )}

      {/* 4. SUBMIT BUTTON & TRUST BADGE */}
      <div className="mt-7 space-y-3">
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gold py-4 text-xs font-bold uppercase tracking-wider text-ink shadow-lg transition-transform active:scale-[0.99] disabled:opacity-50 hover:brightness-105 cursor-pointer"
        >
          {submitting ? "Sending Request..." : "Request Room Reservation"}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-center text-[0.72rem] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-gold shrink-0" />
          <span>Immediate response via WhatsApp & Call • No online payment required</span>
        </div>
      </div>
    </form>
  );
}
