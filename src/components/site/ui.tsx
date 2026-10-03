import { useEffect, useRef, type ReactNode, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "outlineLight" | "ghost";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  gold: "bg-gold text-ink hover:brightness-105",
  outline: "border border-primary/30 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground",
  outlineLight: "border border-ink-foreground/50 text-ink-foreground hover:bg-ink-foreground hover:text-ink",
  ghost: "text-primary underline-offset-4 hover:underline",
};
export const btn = (v: Variant = "primary", extra?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300",
    variants[v],
    extra,
  );

export function Reveal({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref as never} className={cn("reveal", className)}>{children}</Tag>;
}

export function SectionHeading({ eyebrow, title, center, light }: { eyebrow?: string; title: string; center?: boolean; light?: boolean }) {
  return (
    <div className={cn("mb-10 md:mb-14", center && "text-center")}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={cn("text-3xl leading-tight md:text-5xl", light ? "text-ink-foreground" : "text-foreground")}>{title}</h2>
      <div className={cn("mt-5 h-px w-16 bg-gold", center && "mx-auto")} />
    </div>
  );
}

export function PageHero({ title, sub, image, alt }: { title: string; sub: string; image: string; alt: string }) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-ink">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
      <div className="hero-overlay absolute inset-0" />
      <div className="container-x relative pb-14 pt-32 page-in">
        <h1 className="max-w-3xl text-4xl leading-[1.08] text-ink-foreground md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-foreground/85 md:text-lg">{sub}</p>
      </div>
    </section>
  );
}

export function WhatsAppIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
