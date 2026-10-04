import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, Check } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { btn } from "./ui";
import { cn } from "@/lib/utils";

export function LanguageSelector({ light, drop = "down" }: { light?: boolean; drop?: "up" | "down" }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, []);
  const opts: { v: Lang; l: string }[] = [{ v: "en", l: "English" }, { v: "te", l: "తెలుగు" }];
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        onClick={() => setOpen((o) => !o)}
        className={cn("inline-flex items-center gap-1 rounded-sm px-2 py-1.5 text-xs font-semibold tracking-widest transition-colors", light ? "text-ink-foreground hover:text-gold" : "text-foreground hover:text-gold")}
      >
        {lang.toUpperCase()} <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <ul role="listbox" className={cn("absolute right-0 z-50 w-36 overflow-hidden rounded-sm border bg-popover py-1 text-sm text-popover-foreground shadow-lg", drop === "up" ? "bottom-full mb-2" : "top-full mt-2")}>
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
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const links = [
    { to: "/", l: t.nav.home },
    { to: "/about", l: t.nav.about },
    { to: "/rooms", l: t.nav.rooms },
    { to: "/gallery", l: t.nav.gallery },
    { to: "/contact", l: t.nav.contact },
  ] as const;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const solid = scrolled || open || pathname.startsWith("/booking");

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-40 transition-all duration-300", solid ? "border-b bg-background/95 backdrop-blur" : "bg-transparent")}>
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" className="flex min-w-0 flex-col leading-none" onClick={() => setOpen(false)}>
            <span className={cn("truncate font-serif text-xl md:text-2xl", solid ? "text-foreground" : "text-ink-foreground")}>Veerapandiyar</span>
            <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-gold">Guest House · Periyapalayam</span>
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={cn("whitespace-nowrap text-sm font-medium transition-colors hover:text-gold", solid ? "text-foreground" : "text-ink-foreground")}
                activeProps={{ className: "!text-gold" }}
              >
                {l.l}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSelector light={!solid} />
            <Link to="/booking" className={btn("gold", "hidden px-5 py-2.5 sm:inline-flex")}>{t.nav.book}</Link>
            <button
              type="button"
              className={cn("p-2 lg:hidden", solid ? "text-foreground" : "text-ink-foreground")}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop — tapping it closes the drawer */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn("fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}
      />

      {/* Side drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-3/4 max-w-xs flex-col border-l bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:h-20">
          <span className="eyebrow">{t.nav.menu}</span>
          <button
            type="button"
            aria-label={t.nav.close}
            onClick={() => setOpen(false)}
            className="-mr-2 p-2 text-foreground/80 transition-colors hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-4">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "!text-gold" }}
                className="block border-b border-border/60 py-3 text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold"
              >
                {l.l}
              </Link>
            </li>
          ))}
        </ul>

        <div className="shrink-0 border-t px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.nav.language}</span>
            <LanguageSelector drop="up" />
          </div>
          <Link to="/booking" onClick={() => setOpen(false)} className={btn("gold", "mt-4 w-full px-4 py-2.5")}>
            {t.nav.book}
          </Link>
        </div>
      </nav>
    </>
  );
}
