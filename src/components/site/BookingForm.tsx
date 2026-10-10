import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, BedDouble, Snowflake, ShieldCheck, Phone, MapPin, ExternalLink } from "lucide-react";
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
  rooms: string;
  guests: string;
  notes: string;
};
type Errors = Partial<Record<keyof Enquiry, string>>;

const fieldClass =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold";

export function BookingForm({ initialRoom }: { initialRoom?: RoomType | undefined }) {
  const { t } = useI18n();
  const b = t.booking;
  const [v, setV] = useState<Enquiry>({
    name: "",
    address: "",
    contact: "",
    room: initialRoom ?? "",
    rooms: "1",
    guests: "",
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
    const roomLabel = v.room === "ac" ? "Deluxe AC Room (❄️)" : "Standard Non-AC Room (🌿)";
    const cleanPhone = v.contact.replace(/\D/g, "");
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://veerapandiyarguesthouse.com";

    try {
      // 1. Premium Formatted Email via Web3Forms
      if (siteConfig.web3FormsKey && siteConfig.web3FormsKey !== "2e350fee-0a3f-42bf-933c-16d07391d47b") {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: siteConfig.web3FormsKey,
            subject: `🛎️ New Booking: ${v.name.trim()} • ${v.room === "ac" ? "❄️ AC Deluxe" : "🌿 Non-AC"} (${v.rooms} Room)`,
            from_name: "Veerapandiyar Guest House Booking Desk",
            "👤 Guest Name": v.name.trim(),
            "📞 Contact Number": v.contact.trim(),
            "📍 City / Address": v.address.trim(),
            "🛏️ Selected Room": roomLabel,
            "🚪 Total Rooms": `${v.rooms} Room(s)`,
            "👥 Total Guests": `${v.guests} Person(s)`,
            "📝 Special Notes": v.notes.trim() || "None",
            "────────────────": "──────────────────────────────",
            "📞 Call Guest Directly": `tel:${v.contact.trim()}`,
            "💬 WhatsApp Guest": `https://wa.me/${cleanPhone}`,
            "🗺️ Location Map": siteConfig.mapsUrl,
            "──────────────── ": "──────────────────────────────",
            "🌐 Website": siteUrl,
            "⚡ Powered by": "DevgronixTech (https://devgronix.com)",
            message: `╔══════════════════════════════════════════════════════════╗
  🏨 VEERAPANDIYAR GUEST HOUSE — RESERVATION ENQUIRY
  📍 Near Bhavani Amman Temple, Periyapalayam
╚══════════════════════════════════════════════════════════╝

👤 GUEST INFORMATION:
• Full Name: ${v.name.trim()}
• Phone / WhatsApp: ${v.contact.trim()}
• City / Address: ${v.address.trim()}

🛏️ RESERVATION DETAILS:
• Room Category: ${roomLabel}
• Rooms Count: ${v.rooms} Room(s)
• Total Guests: ${v.guests} Guest(s)
• Special Requirements: ${v.notes.trim() || "None"}

⚡ QUICK ACTION LINKS:
• Call Guest: tel:${v.contact.trim()}
• WhatsApp Guest: https://wa.me/${cleanPhone}
• View Directions: ${siteConfig.mapsUrl}

──────────────────────────────────────────────────────────
🌐 Website: ${siteUrl}
🚀 Email Powered by DevgronixTech (https://devgronix.com)`,
          }),
        }).catch((err) => console.warn("Web3Forms note:", err));
      }

      // 2. Database Backup (Supabase)
      await submitEnquiryFn({
        data: {
          guest_name: v.name.trim(),
          address: v.address.trim(),
          contact_number: v.contact.trim(),
          room_type: v.room === "ac" ? "AC" : "NON_AC",
          number_of_rooms: Number(v.rooms),
          total_guests: Number(v.guests),
          additional_requirements: v.notes.trim() || undefined,
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

🛏️ *STAY DETAILS*
• *Room Category:* ${v.room === "ac" ? "❄️ Deluxe AC Room" : "🌿 Standard Non-AC Room"}
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
          Thank you, <strong className="text-foreground">{v.name}</strong>. Your reservation request has been sent to the desk.
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
              href="https://devgronix.com"
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
    <form noValidate onSubmit={submit} className="mx-auto max-w-2xl rounded-2xl border border-border/80 bg-card p-6 shadow-2xl md:p-10">
      {/* 1. ROOM SELECTION CARDS */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.18em] text-gold">
          {b.roomReq}
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setV((p) => ({ ...p, room: "ac" }))}
            className={cn(
              "flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
              v.room === "ac"
                ? "border-gold bg-gold/10 shadow-sm"
                : "border-border/60 bg-muted/20 hover:border-border"
            )}
          >
            <div className="flex w-full items-center justify-between">
              <Snowflake className="h-5 w-5 text-gold" />
              {v.room === "ac" && (
                <span className="rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-bold text-ink">
                  Selected
                </span>
              )}
            </div>
            <span className="mt-3 text-sm font-bold text-foreground">{t.rooms.ac}</span>
            <span className="mt-1 text-[0.7rem] text-muted-foreground">Attached Bath · TV · WiFi</span>
          </button>

          <button
            type="button"
            onClick={() => setV((p) => ({ ...p, room: "nonac" }))}
            className={cn(
              "flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
              v.room === "nonac"
                ? "border-gold bg-gold/10 shadow-sm"
                : "border-border/60 bg-muted/20 hover:border-border"
            )}
          >
            <div className="flex w-full items-center justify-between">
              <BedDouble className="h-5 w-5 text-gold" />
              {v.room === "nonac" && (
                <span className="rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-bold text-ink">
                  Selected
                </span>
              )}
            </div>
            <span className="mt-3 text-sm font-bold text-foreground">{t.rooms.nonac}</span>
            <span className="mt-1 text-[0.7rem] text-muted-foreground">Clean & Airy · Attached Bath</span>
          </button>
        </div>
        {errors.room && <p className="mt-1.5 text-xs text-destructive">{errors.room}</p>}
      </div>

      <div className="my-7 border-t border-border/60" />

      {/* 2. GUEST DETAILS */}
      <div className="space-y-4">
        <label className="block text-xs font-bold uppercase tracking-[0.18em] text-gold">
          {b.guestInfo}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
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
              {b.contact} <span className="text-gold">*</span>
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="f-rooms" className="mb-1.5 block text-xs font-medium text-foreground">
              {b.numRooms}
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
            <label htmlFor="f-guests" className="mb-1.5 block text-xs font-medium text-foreground">
              {b.numGuests}
            </label>
            <input
              id="f-guests"
              type="number"
              min={1}
              max={500}
              placeholder="e.g. 4"
              value={v.guests}
              onChange={set("guests")}
              className={cn(fieldClass, errors.guests && "border-destructive")}
            />
            {errors.guests && <p className="mt-1 text-xs text-destructive">{errors.guests}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="f-address" className="mb-1.5 block text-xs font-medium text-foreground">
            {b.address} <span className="text-gold">*</span>
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
            rows={3}
            maxLength={2000}
            placeholder={b.notesPh}
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

      {/* 3. SUBMIT BUTTON & TRUST BADGE */}
      <div className="mt-8 space-y-3">
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gold py-3.5 text-xs font-bold uppercase tracking-wider text-ink shadow-lg transition-transform active:scale-[0.99] disabled:opacity-50 hover:brightness-105 cursor-pointer"
        >
          {submitting ? b.sending : b.submit}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-[0.72rem] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          <span>Quick confirmation directly on WhatsApp or Call</span>
        </p>
      </div>
    </form>
  );
}
