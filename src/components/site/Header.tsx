import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, Check } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { btn } from "./ui";
import { cn } from "@/lib/utils";
import logo from "@/assets/client-logo.jpeg";

export function LanguageSelector({ light, drop = "down" }: { light?: boolean; drop?: "up" | "down" }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("keydown", k);
    };
  }, []);

  const opts: { v: Lang; l: string }[] = [{ v: "en", l: "English" }, { v: "ta", l: "தமிழ்" }];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-semibold tracking-wider transition-colors hover:bg-white/10",
          light ? "text-white hover:text-gold" : "text-foreground hover:text-gold"
        )}
      >
        {lang.toUpperCase()} <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <ul
          role="listbox"
          className={cn(
            "absolute right-0 z-50 w-36 overflow-hidden rounded-xl border border-border bg-popover py-1 text-sm text-popover-foreground shadow-2xl backdrop-blur-xl",
            drop === "up" ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {opts.map((o) => (
            <li key={o.v}>
              <button
                role="option"
                aria-selected={lang === o.v}
                onClick={() => { setLang(o.v); setOpen(false); }}
                className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-muted"
              >
                {o.l} {lang === o.v && <Check className="h-3.5 w-3.5 text-gold" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const links = [
    { to: "/", l: t.nav.home },
    { to: "/rooms", l: t.nav.rooms },
    { to: "/gallery", l: t.nav.gallery },
    { to: "/about", l: t.nav.about },
    { to: "/contact", l: t.nav.contact },
  ] as const;

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <header className="fixed inset-x-3 top-3 z-50 mx-auto max-w-6xl transition-all duration-300">
        {/* V10 Floating Frosted Glass Capsule */}
        <div className="flex h-14 items-center justify-between gap-2 rounded-full border border-white/20 bg-black/45 px-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-xl sm:h-16 sm:gap-4 sm:px-5">
          
          {/* Logo & Brand Text */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="Veerapandiyaar Guest House Logo"
              className="h-9 w-9 rounded-full border border-gold/70 object-cover object-center shadow-md transition-transform sm:h-11 sm:w-11"
            />
            <div className="flex flex-col items-start leading-none">
              <span className="whitespace-nowrap font-serif text-sm font-bold text-white sm:text-lg">
                Veerapandiyaar
              </span>
              <span className="mt-0.5 whitespace-nowrap text-[0.55rem] font-bold uppercase tracking-[0.18em] text-gold sm:text-[0.62rem]">
                Guest House
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Pill Container) */}
          <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-white/80 transition-all hover:bg-white/10 hover:text-white",
                  (pathname === l.to || (l.to !== "/" && pathname.startsWith(`${l.to}/`)))
                    ? "bg-white/20 !text-gold shadow-sm"
                    : ""
                )}
              >
                {l.l}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions (Glowing Pill Button like Services in V10) */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSelector light />
            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all hover:scale-105 hover:brightness-110 active:scale-95"
            >
              {t.nav.book}
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector light />
            <button
              type="button"
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
              className="rounded-full border border-white/15 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 hover:text-gold"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Side mobile drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-3/4 max-w-xs flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <span className="eyebrow">{t.nav.menu}</span>
          <button
            type="button"
            aria-label={t.nav.close}
            onClick={() => setOpen(false)}
            className="p-2 text-foreground hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 p-4">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "!text-gold !bg-gold/10 font-bold" }}
                onClick={() => setOpen(false)}
                className="flex rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-gold"
              >
                {l.l}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t p-4 flex flex-col gap-3">
          <div className="flex justify-end">
            <LanguageSelector drop="up" />
          </div>
          <Link
            to="/booking"
            onClick={() => setOpen(false)}
            className={btn("gold", "w-full justify-center !rounded-full py-2.5 text-xs font-bold uppercase tracking-wider")}
          >
            {t.nav.book}
          </Link>
        </div>
      </nav>
    </>
  );
}
