import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappHref } from "@/lib/site-config";
import { btn, WhatsAppIcon } from "./ui";
import type { RoomType } from "./sections";
import { cn } from "@/lib/utils";
import { submitEnquiry } from "@/lib/enquiries.functions";

export type Enquiry = { name: string; address: string; contact: string; room: RoomType | ""; rooms: string; guests: string; notes: string };
type Errors = Partial<Record<keyof Enquiry, string>>;

const field = "w-full rounded-sm border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold";

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
      <div className="border bg-card p-10 text-center md:p-16 page-in" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" strokeWidth={1.25} />
        <h2 className="mt-6 text-4xl md:text-5xl">{b.thanks}</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">{b.success}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappHref(msg)} target="_blank" rel="noopener noreferrer" className={btn("primary")}><WhatsAppIcon className="h-4 w-4" />{t.common.whatsapp}</a>
          <Link to="/" className={btn("outline")}>{t.common.backHome}</Link>
        </div>
      </div>
    );
  }

  const aria = (k: keyof Enquiry) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined, className: cn(field, errors[k] && "border-destructive") });

  return (
    <form noValidate onSubmit={submit} className="space-y-12 border bg-card p-6 md:p-12">
      <fieldset className="space-y-5">
        <legend className="mb-6 font-serif text-2xl">{b.guestInfo}</legend>
        <Field errors={errors} b={b} k="name" label={b.name}><input {...aria("name")} autoComplete="name" maxLength={100} value={v.name} onChange={set("name")} /></Field>
        <Field errors={errors} b={b} k="address" label={b.address}><input {...aria("address")} autoComplete="street-address" maxLength={500} value={v.address} onChange={set("address")} /></Field>
        <Field errors={errors} b={b} k="contact" label={b.contact}><input {...aria("contact")} type="tel" inputMode="tel" autoComplete="tel" maxLength={16} value={v.contact} onChange={set("contact")} /></Field>
      </fieldset>
      <fieldset className="space-y-5">
        <legend className="mb-6 font-serif text-2xl">{b.roomReq}</legend>
        <Field errors={errors} b={b} k="room" label={b.roomType}>
          <select {...aria("room")} value={v.room} onChange={set("room")}>
            <option value="">{b.selectRoom}</option>
            <option value="ac">{t.rooms.ac}</option>
            <option value="nonac">{t.rooms.nonac}</option>
          </select>
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field errors={errors} b={b} k="rooms" label={b.numRooms}><input {...aria("rooms")} type="number" min={1} max={50} step={1} inputMode="numeric" value={v.rooms} onChange={set("rooms")} /></Field>
          <Field errors={errors} b={b} k="guests" label={b.numGuests}><input {...aria("guests")} type="number" min={1} max={500} step={1} inputMode="numeric" value={v.guests} onChange={set("guests")} /></Field>
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-6 font-serif text-2xl">{b.additional}</legend>
        <Field errors={errors} b={b} k="notes" label={b.notes} optional><textarea {...aria("notes")} rows={4} maxLength={2000} placeholder={b.notesPh} value={v.notes} onChange={set("notes")} /></Field>
      </fieldset>
      {submitFailed && <p className="text-sm text-destructive" role="alert">{b.errorSubmit}</p>}
      <button type="submit" disabled={submitting} className={btn("primary", "w-full sm:w-auto sm:px-12")}>{submitting ? b.sending : b.submit}</button>
    </form>
  );
}

function Field({ k, label, children, optional, errors, b }: { k: keyof Enquiry; label: string; children: React.ReactNode; optional?: boolean; errors: Errors; b: { optional: string } }) {
  return (
    <div>
      <label htmlFor={`f-${k}`} className="mb-2 block text-sm font-semibold">
        {label} {optional ? <span className="font-normal text-muted-foreground">({b.optional})</span> : <span className="text-gold" aria-hidden="true">*</span>}
      </label>
      {children}
      {errors[k] && <p id={`e-${k}`} className="mt-1.5 text-sm text-destructive">{errors[k]}</p>}
    </div>
  );
}
