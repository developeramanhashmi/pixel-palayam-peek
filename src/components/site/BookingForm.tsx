import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, BedDouble, Snowflake, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappHref } from "@/lib/site-config";
import { btn, WhatsAppIcon } from "./ui";
import type { RoomType } from "./sections";
import { cn } from "@/lib/utils";
import { submitEnquiry } from "@/lib/enquiries.functions";

export type Enquiry = { name: string; address: string; contact: string; room: RoomType | ""; rooms: string; guests: string; notes: string };
type Errors = Partial<Record<keyof Enquiry, string>>;

const fieldClass = "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold";

export function BookingForm({ initialRoom }: { initialRoom?: RoomType | undefined }) {
  const { t } = useI18n();
  const b = t.booking;
  const [v, setV] = useState<Enquiry>({ name: "", address: "", contact: "", room: initialRoom ?? "", rooms: "1", guests: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const submitEnquiryFn = useServerFn(submitEnquiry);
  const set = (k: keyof Enquiry) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = b.errName;
    if (!v.address.trim()) e.address = b.errAddress;
    if (!/^\+?[0-9\s-]{10,15}$/.test(v.contact.trim())) e.contact = b.errContact;
    if (v.room !== "ac" && v.room !== "nonac") e.room = b.errRoom;
    if (!Number.isInteger(Number(v.rooms)) || Number(v.rooms) < 1 || Number(v.rooms) > 50) e.rooms = b.errRooms;
    if (!Number.isInteger(Number(v.guests)) || Number(v.guests) < 1 || Number(v.guests) > 500) e.guests = b.errGuests;
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
    try {
      const result = await submitEnquiryFn({
        data: {
          guest_name: v.name.trim(),
          address: v.address.trim(),
          contact_number: v.contact.trim(),
          room_type: v.room === "ac" ? "AC" : "NON_AC",
          number_of_rooms: Number(v.rooms),
          total_guests: Number(v.guests),
          additional_requirements: v.notes.trim() || undefined,
        },
      });
      if (!result.success) {
        setSubmitFailed(true);
        return;
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    const msg = [t.common.waGreeting, "", `${b.name}: ${v.name}`, `${b.address}: ${v.address}`, `${b.contact}: ${v.contact}`,
      `${b.roomType}: ${v.room ? t.rooms[v.room] : ""}`, `${b.numRooms}: ${v.rooms}`, `${b.numGuests}: ${v.guests}`, v.notes ? `${b.notes}: ${v.notes}` : ""]
      .filter(Boolean).join("\n");
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border/80 bg-card p-8 text-center shadow-2xl md:p-14 page-in" role="status">
        <CheckCircle2 className="mx-auto h-16 w-16 text-gold" strokeWidth={1.25} />
        <h2 className="mt-6 font-serif text-3xl md:text-4xl text-foreground">{b.thanks}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{b.success}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappHref(msg)} target="_blank" rel="noopener noreferrer" className={btn("primary", "px-6 py-3")}>
            <WhatsAppIcon className="h-4 w-4 mr-2" />{t.common.whatsapp}
          </a>
          <Link to="/" className={btn("outline", "px-6 py-3")}>{t.common.backHome}</Link>
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
          {/* Deluxe AC Card */}
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
              {v.room === "ac" && <span className="rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-bold text-ink">Selected</span>}
            </div>
            <span className="mt-3 text-sm font-bold text-foreground">{t.rooms.ac}</span>
            <span className="mt-1 text-[0.7rem] text-muted-foreground">Attached Bath · TV · WiFi</span>
          </button>

          {/* Standard Non-AC Card */}
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
              {v.room === "nonac" && <span className="rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-bold text-ink">Selected</span>}
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
          className="w-full rounded-xl bg-gold py-3.5 text-xs font-bold uppercase tracking-wider text-ink shadow-lg transition-transform active:scale-[0.99] disabled:opacity-50"
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
