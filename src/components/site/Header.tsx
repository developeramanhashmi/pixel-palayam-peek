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
          "inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-semibold tracking-widest transition-colors",
          light ? "text-ink-foreground hover:text-gold" : "text-foreground hover:text-gold"
        )}
      >
        {lang.toUpperCase()} <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <ul
          role="listbox"
          className={cn(
            "absolute right-0 z-50 w-36 overflow-hidden rounded-sm border bg-popover py-1 text-sm text-popover-foreground shadow-lg",
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { to: "/", l: t.nav.home },
    { to: "/rooms", l: t.nav.rooms },
    { to: "/gallery", l: t.nav.gallery },
    { to: "/about", l: t.nav.about },
    { to: "/contact", l: t.nav.contact },
  ] as const;

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const solid = scrolled || open || !isHome;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          solid
            ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-md"
            : "border-b border-white/10 bg-black/40 shadow-sm backdrop-blur-md"
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-3 sm:gap-4 md:h-20">
          {/* Logo & Prominent Brand Text */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="Veerapandiyaar Guest House Logo"
              className="h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full object-cover object-center border-2 border-gold/70 shadow-md transition-transform"
            />
            <div className="flex flex-col items-start leading-none">
              <span
                className={cn(
                  "whitespace-nowrap font-serif text-xl sm:text-2xl md:text-[1.7rem] font-bold tracking-tight sm:tracking-normal drop-shadow-sm transition-colors",
                  solid ? "text-foreground" : "text-white"
                )}
              >
                Veerapandiyaar
              </span>
              <span className="whitespace-nowrap text-[0.68rem] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-gold mt-1">
                Guest House
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "!text-gold font-semibold" }}
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider transition-colors hover:text-gold",
                  solid ? "text-foreground/80" : "text-ink-foreground/90"
                )}
              >
                {l.l}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSelector light={!solid} />
            <Link to="/booking" className={btn("gold", "text-xs px-4 py-2")}>
              {t.nav.book}
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector light={!solid} />
            <button
              type="button"
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "p-2 transition-colors",
                solid ? "text-foreground" : "text-ink-foreground"
              )}
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
          "fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
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
          "fixed inset-y-0 right-0 z-50 flex w-3/4 max-w-xs flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden",
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
                className="flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                {l.l}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t p-4 flex flex-col gap-3">
          <Link
            to="/booking"
            onClick={() => setOpen(false)}
            className={btn("gold", "w-full justify-center py-2.5 text-xs font-bold uppercase tracking-wider")}
          >
            {t.nav.book}
          </Link>
        </div>
      </nav>
    </>
  );
}
