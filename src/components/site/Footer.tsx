import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { WhatsAppIcon } from "./ui";
import { cn } from "@/lib/utils";
import logo from "@/assets/client-logo.jpeg";

export function Footer() {
  const { t, lang, setLang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-ink-foreground overflow-hidden">
      {/* Top Gold Gradient Glow Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Main 4-Column Grid */}
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand & Identity */}
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <img
              src={logo}
              alt="Veerapandiyaar Guest House Logo"
              className="h-12 w-12 rounded-full object-cover object-center border border-gold/50 shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-xl tracking-wide text-ink-foreground font-semibold">
                Veerapandiyaar
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold">
                Guest House
              </span>
            </div>
          </Link>

          <p className="text-sm leading-relaxed text-ink-foreground/75">
            {t.footer.about}
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs text-ink-foreground/80">
            <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2.5 py-1 border border-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              Family Friendly
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2.5 py-1 border border-white/10">
              <Clock className="h-3.5 w-3.5 text-gold" />
              24/7 Check-in
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="eyebrow mb-4 font-sans tracking-wider text-gold">{t.footer.links}</h2>
          <ul className="space-y-2.5 text-sm">
            {(
              [
                ["/", t.nav.home],
                ["/rooms", t.nav.rooms],
                ["/gallery", t.nav.gallery],
                ["/about", t.nav.about],
                ["/contact", t.nav.contact],
              ] as const
            ).map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="inline-flex items-center gap-1.5 text-ink-foreground/75 transition-colors hover:text-gold hover:translate-x-0.5 duration-200"
                >
                  <ArrowRight className="h-3 w-3 text-gold/60" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Stay & Rooms (Local SEO anchors) */}
        <div>
          <h2 className="eyebrow mb-4 font-sans tracking-wider text-gold">
            {lang === "ta" ? "தங்குமிடம் & அறைகள்" : "Stay & Rooms"}
          </h2>
          <ul className="space-y-2.5 text-sm text-ink-foreground/75 mb-5">
            <li>
              <Link to="/rooms" className="hover:text-gold transition-colors inline-flex items-center gap-1.5">
                <span className="text-gold">•</span>
                {lang === "ta" ? "ஏசி டீலக்ஸ் அறைகள்" : "AC Deluxe Rooms"}
              </Link>
            </li>
            <li>
              <Link to="/rooms" className="hover:text-gold transition-colors inline-flex items-center gap-1.5">
                <span className="text-gold">•</span>
                {lang === "ta" ? "நான்-ஏசி ஸ்டாண்டர்ட் அறைகள்" : "Non-AC Standard Rooms"}
              </Link>
            </li>
            <li>
              <span className="text-ink-foreground/65 inline-flex items-center gap-1.5">
                <span className="text-gold">•</span>
                {lang === "ta" ? "பவானி அம்மன் கோவில் அருகில்" : "Near Bhavani Amman Temple"}
              </span>
            </li>
          </ul>

          <Link
            to="/booking"
            className="inline-flex items-center justify-center rounded-sm bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink transition-all hover:brightness-110 shadow-sm"
          >
            {t.nav.book}
          </Link>
        </div>

        {/* Column 4: Contact & Location */}
        <div>
          <h2 className="eyebrow mb-4 font-sans tracking-wider text-gold">{t.footer.contact}</h2>
          <ul className="space-y-3 text-sm text-ink-foreground/80">
            <li>
              <a
                href={telHref()}
                className="group flex items-center gap-2.5 transition-colors hover:text-gold"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-gold/50 transition-colors">
                  <Phone className="h-3.5 w-3.5 text-gold" />
                </span>
                <span className="font-medium">{siteConfig.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(t.common.waGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 transition-colors hover:text-gold"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/10 border border-[#25D366]/30 group-hover:border-[#25D366] transition-colors">
                  <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                </span>
                <span>{t.common.whatsapp}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-2.5 transition-colors hover:text-gold"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-gold/50 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-gold" />
                </span>
                <span className="text-xs break-all">{siteConfig.email}</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 transition-colors hover:text-gold"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-gold/50 transition-colors">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                </span>
                <span className="flex flex-col text-xs leading-relaxed">
                  <span>{t.common.address}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-[0.7rem] text-gold underline-offset-2 hover:underline">
                    {t.common.directions} <ExternalLink className="h-2.5 w-2.5" />
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* SEO Local Authority & Popular Searches Strip */}
      <div className="border-t border-white/10 bg-black/20 py-4">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 text-xs text-ink-foreground/70">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-3 w-3" />
              Periyapalayam Stays:
            </span>
            <span className="rounded bg-white/5 px-2 py-0.5 text-[0.72rem] text-ink-foreground/80 border border-white/10">
              Periyapalayam Rooms
            </span>
            <span className="rounded bg-white/5 px-2 py-0.5 text-[0.72rem] text-ink-foreground/80 border border-white/10">
              Bhavani Amman Temple Lodge
            </span>
            <span className="rounded bg-white/5 px-2 py-0.5 text-[0.72rem] text-ink-foreground/80 border border-white/10">
              AC & Non-AC Guest House
            </span>
            <span className="rounded bg-white/5 px-2 py-0.5 text-[0.72rem] text-ink-foreground/80 border border-white/10">
              Family Pilgrim Accommodation
            </span>
          </div>
          <p className="text-[0.7rem] text-ink-foreground/50">
            Near Arulmigu Bhavani Amman Temple, Periyapalayam • 24/7 Front Desk
          </p>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Devgronix Branding, and Language Selector */}
      <div className="border-t border-ink-foreground/10 py-6 pb-28 sm:pb-6">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-xs text-ink-foreground/60 md:flex-row">
          {/* Copyright */}
          <p className="text-center md:text-left">
            © {year} {siteConfig.name}. {t.footer.rights}
          </p>

          {/* Devgronix Agency Credit */}
          <div className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3.5 py-1.5 border border-white/10 shadow-sm hover:border-gold/40 transition-colors">
            <span className="text-[0.72rem] text-ink-foreground/75">Website Designed & Developed by</span>
            <a
              href="https://devgronix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-gold transition-all hover:text-white hover:underline underline-offset-2"
              title="Devgronix Tech - Professional Web Design & SEO"
            >
              <span>Devgronix</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[0.7rem] uppercase tracking-wider text-ink-foreground/50">
              {t.footer.language}:
            </span>
            {(["en", "ta"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "rounded px-2.5 py-1 text-xs font-medium transition-colors border",
                  lang === l
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-white/10 text-ink-foreground/60 hover:text-ink-foreground hover:border-white/20"
                )}
              >
                {l === "en" ? "English" : "தமிழ்"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
