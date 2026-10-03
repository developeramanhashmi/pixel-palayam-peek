import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import { WhatsAppIcon } from "./ui";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t, lang, setLang } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl leading-tight">{siteConfig.name}</p>
          <div className="my-4 h-px w-12 bg-gold" />
          <p className="text-sm leading-relaxed text-ink-foreground/70">{t.footer.about}</p>
        </div>
        <div>
          <h2 className="eyebrow mb-4 font-sans">{t.footer.links}</h2>
          <ul className="space-y-2.5 text-sm">
            {([["/", t.nav.home], ["/about", t.nav.about], ["/rooms", t.nav.rooms], ["/gallery", t.nav.gallery], ["/contact", t.nav.contact]] as const).map(([to, l]) => (
              <li key={to}><Link to={to} className="text-ink-foreground/80 hover:text-gold">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-4 font-sans">{t.footer.contact}</h2>
          <ul className="space-y-3 text-sm text-ink-foreground/80">
            <li><a href={telHref()} className="flex items-center gap-2 hover:text-gold"><Phone className="h-4 w-4 text-gold" />{siteConfig.phoneDisplay}</a></li>
            <li><a href={whatsappHref(t.common.waGreeting)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold"><WhatsAppIcon className="h-4 w-4 text-gold" />{t.common.whatsapp}</a></li>
            <li><a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-gold"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t.common.address}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-4 font-sans">{t.footer.language}</h2>
          <div className="flex gap-2 text-sm">
            {(["en", "te"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
                className={cn("rounded-sm border px-3 py-1.5 transition-colors", lang === l ? "border-gold text-gold" : "border-ink-foreground/25 text-ink-foreground/70 hover:text-ink-foreground")}>
                {l === "en" ? "English" : "తెలుగు"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="container-x py-6 text-xs text-ink-foreground/55">© {year} {siteConfig.name}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
