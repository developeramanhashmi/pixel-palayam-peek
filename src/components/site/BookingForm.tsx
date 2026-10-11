import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  BedDouble,
  Snowflake,
  ShieldCheck,
  Phone,
  Calendar,
  Clock,
  Users,
  Sparkles,
  AlertCircle,
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
  rooms: string;
  guests: string;
  room: RoomType | "";
  checkIn: string;
  checkInTime: string;
  checkOut: string;
  checkOutTime: string;
  notes: string;
};

type Errors = Partial<Record<keyof Enquiry, string>>;

const fieldClass =
  "w-full rounded-xl border border-border/80 bg-background px-3.5 py-3 text-base sm:text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/20";

// Client-specified guest options
const GUEST_OPTIONS = [8, 16, 24, 32, 40, 48, 56];

export function BookingForm({ initialRoom }: { initialRoom?: RoomType | undefined }) {
  const { t } = useI18n();
  const b = t.booking;

  const todayStr = new Date().toISOString().split("T")[0];

  const [v, setV] = useState<Enquiry>({
    name: "",
    address: "",
    contact: "",
    rooms: "1",
    guests: "8",
    room: initialRoom ?? "ac",
    checkIn: todayStr,
    checkInTime: "12:00",
    checkOut: "",
    checkOutTime: "11:00",
    notes: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const submitEnquiryFn = useServerFn(submitEnquiry);

  const set = (k: keyof Enquiry) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = b.errName;
    if (!v.address.trim()) e.address = b.errAddress;
    if (!/^\+?[0-9\s-]{10,15}$/.test(v.contact.trim())) e.contact = b.errContact;

    const numRooms = Number(v.rooms);
    const numGuests = Number(v.guests);

    if (!Number.isInteger(numRooms) || numRooms < 1 || numRooms > 50) {
      e.rooms = b.errRooms;
    }

    if (!Number.isInteger(numGuests) || !GUEST_OPTIONS.includes(numGuests)) {
      e.guests = "Please select a valid guest count.";
    } else if (numGuests > numRooms * 8) {
      // 1 room accommodates up to 8 guests rule
      const minRoomsNeeded = Math.ceil(numGuests / 8);
      e.guests = `For ${numGuests} guests, minimum ${minRoomsNeeded} room(s) required (1 room accommodates up to 8 guests).`;
    }

    if (v.room !== "ac" && v.room !== "nonac") e.room = b.errRoom;

    return e;
  };

  const formatTime12 = (timeStr: string) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const numH = parseInt(h, 10);
    if (isNaN(numH)) return timeStr;
    const ampm = numH >= 12 ? "PM" : "AM";
    const h12 = numH % 12 || 12;
    return `${h12}:${m} ${ampm}`;
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

    const checkInDisplay = v.checkIn
      ? `${v.checkIn}${v.checkInTime ? ` (Time: ${formatTime12(v.checkInTime)})` : ""}`
      : "Immediate / Today";
    const checkOutDisplay = v.checkOut
      ? `${v.checkOut}${v.checkOutTime ? ` (Time: ${formatTime12(v.checkOutTime)})` : ""}`
      : "Flexible / Not specified";

    try {
      // 1. Submit to Web3Forms
      if (siteConfig.web3FormsKey && siteConfig.web3FormsKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
        const payload = {
          access_key: siteConfig.web3FormsKey,
          subject: `🛎️ New Booking: ${v.name.trim()} • ${roomTitle} (${v.rooms} Room, ${v.guests} Guests)`,
          from_name: "Veerapandiyar Guest House Reception",
          "Guest Name": v.name.trim(),
          "City & Address": v.address.trim(),
          "Phone / Mobile": v.contact.trim(),
          "Number of Rooms": `${v.rooms} Room(s)`,
          "Total Number of Guests": `${v.guests} Guests (1 room accommodates up to 8 guests)`,
          "Room Type": roomTitle,
          "Check-In Schedule": checkInDisplay,
          "Check-Out Schedule": checkOutDisplay,
          "Additional Requirements": v.notes.trim() || "None",
        };

        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => console.warn("Web3Forms notice:", err));
      }

      // 2. Submit to Supabase enquiries table
      const combinedNotes = [
        `Check-In: ${checkInDisplay}`,
        `Check-Out: ${checkOutDisplay}`,
        v.notes.trim() ? `Special Requests: ${v.notes.trim()}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      await submitEnquiryFn({
        data: {
          guest_name: v.name.trim(),
          address: v.address.trim(),
          contact_number: cleanPhone || v.contact.trim(),
          room_type: v.room === "ac" ? "AC" : "NON_AC",
          number_of_rooms: Number(v.rooms),
          total_guests: Number(v.guests),
          additional_requirements: combinedNotes || undefined,
        },
      }).catch((err) => console.warn("Supabase record note:", err));

      setDone(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedRoomLabel = v.room === "ac" ? "Deluxe AC Room" : "Standard Non-AC Room";

  const waSummary = `*Booking Enquiry - Veerapandiyar Guest House*
• *Guest Name:* ${v.name}
• *Address:* ${v.address}
• *Phone:* ${v.contact}
• *Rooms:* ${v.rooms} Room(s)
• *Guests:* ${v.guests} Guests
• *Room Type:* ${selectedRoomLabel}
• *Check-in:* ${v.checkIn || "Today"} (${formatTime12(v.checkInTime) || "Flexible"})
• *Check-out:* ${v.checkOut || "Flexible"} (${formatTime12(v.checkOutTime) || "Flexible"})
${v.notes.trim() ? `• *Requirements:* ${v.notes}` : ""}`;

  if (done) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-card p-6 text-card-foreground shadow-xl sm:p-10 page-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold">
            <Sparkles className="h-3 w-3" /> Booking Enquiry Sent
          </span>
          <h3 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">{b.thanks}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{b.success}</p>
        </div>

        <div className="mt-6 rounded-xl border border-border/80 bg-muted/40 p-4 sm:p-5 text-sm">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <span className="text-xs text-muted-foreground">Guest</span>
              <p className="font-semibold">{v.name}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Contact</span>
              <p className="font-semibold">{v.contact}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Rooms & Guests</span>
              <p className="font-semibold">{v.rooms} Room(s) • {v.guests} Guests</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Room Selected</span>
              <p className="font-semibold text-gold">{selectedRoomLabel}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Check-in</span>
              <p className="font-semibold">{v.checkIn || "Today"} ({formatTime12(v.checkInTime)})</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Check-out</span>
              <p className="font-semibold">{v.checkOut || "Flexible"} ({formatTime12(v.checkOutTime)})</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={whatsappHref(waSummary)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#20ba5a]"
          >
            <WhatsAppIcon className="h-4 w-4 text-white" />
            Send Details to Reception on WhatsApp
          </a>
          <a
            href={telHref()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-gold"
          >
            <Phone className="h-4 w-4 text-gold" />
            Direct Call Reception
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-2xl">
      <div className="relative border-b border-border/70 bg-gradient-to-r from-ink via-ink/95 to-ink/90 px-6 py-6 text-ink-foreground sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-gold">
          <span className="flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1">
            <Sparkles className="h-3 w-3" />
            Instant Reception Alert
          </span>
          <span className="text-ink-foreground/75">Near Bhavani Amman Temple</span>
        </div>
        <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight sm:text-3xl text-white">
          {b.title}
        </h2>
        <p className="mt-1 text-xs text-ink-foreground/80 sm:text-sm">{b.sub}</p>
      </div>

      <form onSubmit={submit} noValidate className="p-5 sm:p-8 space-y-5">
        {submitFailed && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{b.errorSubmit}</p>
              <a href={telHref()} className="mt-1 inline-block underline font-medium">
                Click here to call reception directly: {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        )}

        {/* 1. Guest Name */}
        <div>
          <label htmlFor="f-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {b.name} <span className="text-destructive">*</span>
          </label>
          <input
            id="f-name"
            type="text"
            required
            placeholder="e.g. Ramesh Kumar"
            value={v.name}
            onChange={set("name")}
            className={cn(fieldClass, errors.name && "border-destructive focus:border-destructive")}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        {/* 2. Address */}
        <div>
          <label htmlFor="f-address" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {b.address} <span className="text-destructive">*</span>
          </label>
          <input
            id="f-address"
            type="text"
            required
            placeholder="e.g. Chennai, Tamil Nadu"
            value={v.address}
            onChange={set("address")}
            className={cn(fieldClass, errors.address && "border-destructive focus:border-destructive")}
          />
          {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
        </div>

        {/* 3. Contact Number */}
        <div>
          <label htmlFor="f-contact" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {b.contact} <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <input
              id="f-contact"
              type="tel"
              required
              placeholder="e.g. 9876543210"
              value={v.contact}
              onChange={set("contact")}
              className={cn(fieldClass, errors.contact && "border-destructive focus:border-destructive")}
            />
            <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
          </div>
          {errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact}</p>}
        </div>

        {/* 4. Number of Rooms (Placed above Room Type) */}
        <div>
          <label htmlFor="f-rooms" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {b.numRooms} <span className="text-destructive">*</span>
          </label>
          <input
            id="f-rooms"
            type="number"
            min={1}
            max={50}
            required
            value={v.rooms}
            onChange={set("rooms")}
            className={cn(fieldClass, errors.rooms && "border-destructive focus:border-destructive")}
          />
          {errors.rooms && <p className="mt-1 text-xs text-destructive">{errors.rooms}</p>}
        </div>

        {/* 5. Total Number of Guests (Immediately below Number of Rooms, options: 8, 16, 24, 32, 40, 48, 56) */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="f-guests" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {b.numGuests} <span className="text-destructive">*</span>
            </label>
            <span className="text-[0.7rem] text-muted-foreground">Max 8 guests per room</span>
          </div>
          <div className="relative">
            <select
              id="f-guests"
              value={v.guests}
              onChange={set("guests")}
              className={cn(fieldClass, "appearance-none pr-10", errors.guests && "border-destructive focus:border-destructive")}
            >
              {GUEST_OPTIONS.map((num) => (
                <option key={num} value={num}>
                  {num} Guests {num === 8 ? "(Single room capacity)" : `(Requires ${Math.ceil(num / 8)} rooms)`}
                </option>
              ))}
            </select>
            <Users className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          {errors.guests ? (
            <p className="mt-1.5 text-xs font-medium text-destructive">{errors.guests}</p>
          ) : (
            <p className="mt-1 text-[0.72rem] text-muted-foreground">
              1 room accommodates up to 8 guests. For {v.guests} guests, you have selected {v.rooms} room(s).
            </p>
          )}
        </div>

        {/* 6. Room Type (AC / NON-AC) */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {b.roomType} <span className="text-destructive">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setV((p) => ({ ...p, room: "ac" }));
                if (errors.room) setErrors((prev) => ({ ...prev, room: undefined }));
              }}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all cursor-pointer",
                v.room === "ac"
                  ? "border-gold bg-gold/10 shadow-sm ring-2 ring-gold/30"
                  : "border-border/80 bg-background hover:border-gold/40 hover:bg-muted/30"
              )}
            >
              <div className={cn("mb-2 flex h-10 w-10 items-center justify-center rounded-full", v.room === "ac" ? "bg-gold text-ink" : "bg-muted text-muted-foreground")}>
                <Snowflake className="h-5 w-5" />
              </div>
              <span className="font-semibold text-sm">Deluxe AC Room</span>
              <span className="text-[0.7rem] text-muted-foreground mt-0.5">Air Conditioned Comfort</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setV((p) => ({ ...p, room: "nonac" }));
                if (errors.room) setErrors((prev) => ({ ...prev, room: undefined }));
              }}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all cursor-pointer",
                v.room === "nonac"
                  ? "border-gold bg-gold/10 shadow-sm ring-2 ring-gold/30"
                  : "border-border/80 bg-background hover:border-gold/40 hover:bg-muted/30"
              )}
            >
              <div className={cn("mb-2 flex h-10 w-10 items-center justify-center rounded-full", v.room === "nonac" ? "bg-gold text-ink" : "bg-muted text-muted-foreground")}>
                <BedDouble className="h-5 w-5" />
              </div>
              <span className="font-semibold text-sm">Standard Non-AC</span>
              <span className="text-[0.7rem] text-muted-foreground mt-0.5">Ceiling Fan & Spacious</span>
            </button>
          </div>
          {errors.room && <p className="mt-1 text-xs text-destructive">{errors.room}</p>}
        </div>

        {/* 7. Check-In & Check-Out Schedule (Date & Time for both, right before Additional Requirements) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Check-In Card */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-gold" /> Check-in Schedule
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="f-checkIn" className="mb-1 block text-[11px] font-medium text-muted-foreground">
                  Date
                </label>
                <input
                  id="f-checkIn"
                  type="date"
                  min={todayStr}
                  value={v.checkIn}
                  onChange={set("checkIn")}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="f-checkInTime" className="mb-1 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                  <Clock className="h-3 w-3 text-gold" /> Time
                </label>
                <input
                  id="f-checkInTime"
                  type="time"
                  value={v.checkInTime}
                  onChange={set("checkInTime")}
                  className={fieldClass}
                />
              </div>
            </div>
          </div>

          {/* Check-Out Card */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-gold" /> Check-out Schedule
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="f-checkOut" className="mb-1 block text-[11px] font-medium text-muted-foreground">
                  Date
                </label>
                <input
                  id="f-checkOut"
                  type="date"
                  min={v.checkIn || todayStr}
                  value={v.checkOut}
                  onChange={set("checkOut")}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="f-checkOutTime" className="mb-1 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                  <Clock className="h-3 w-3 text-gold" /> Time
                </label>
                <input
                  id="f-checkOutTime"
                  type="time"
                  value={v.checkOutTime}
                  onChange={set("checkOutTime")}
                  className={fieldClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 8. Additional Requirements */}
        <div>
          <label htmlFor="f-notes" className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>{b.notes}</span>
            <span className="font-normal lowercase tracking-normal text-muted-foreground/70">{b.optional}</span>
          </label>
          <textarea
            id="f-notes"
            rows={2}
            placeholder={b.notesPh}
            value={v.notes}
            onChange={set("notes")}
            className={fieldClass}
          />
        </div>

        {/* 9. Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gold py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-lg transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {submitting ? b.sending : b.submit}
        </button>

        <div className="flex items-center justify-center gap-2 pt-1 text-[0.72rem] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          <span>Your information is sent securely directly to reception.</span>
        </div>
      </form>
    </div>
  );
}
