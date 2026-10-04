import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { galleryImages } from "@/lib/images";
import { cn } from "@/lib/utils";

type Img = (typeof galleryImages)[number];

export function GalleryGrid({ images }: { images: Img[] }) {
  const { t } = useI18n();
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((img, i) => (
          <li key={img.key} className={cn(i === 0 && "col-span-2 row-span-2")}>
            <button onClick={() => setIdx(i)} className="group block h-full w-full overflow-hidden" aria-label={t.images[img.key]}>
              <img src={img.src} alt={t.images[img.key]} loading="lazy" width={1280} height={960}
                className="aspect-[4/3] h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-90" />
            </button>
          </li>
        ))}
      </ul>
      {idx !== null && <Lightbox images={images} index={idx} setIndex={setIdx} />}
    </>
  );
}

function Lightbox({ images, index, setIndex }: { images: Img[]; index: number; setIndex: (i: number | null) => void }) {
  const { t } = useI18n();
  const touch = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => setIndex((index + d + images.length) % images.length), [index, images.length, setIndex]);
  useEffect(() => {
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [go, setIndex]);
  const img = images[index]!;
  const ctl = "absolute z-10 rounded-full bg-ink/60 p-3 text-ink-foreground transition-colors hover:bg-gold hover:text-ink";
  return (
    <div role="dialog" aria-modal="true" aria-label={t.images[img.key]}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 animate-in fade-in duration-200"
      onClick={() => setIndex(null)}
      onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}>
      <button ref={closeRef} className={cn(ctl, "right-4 top-4")} aria-label={t.galleryPage.close} onClick={() => setIndex(null)}><X className="h-5 w-5" /></button>
      <button className={cn(ctl, "left-3 md:left-6")} aria-label={t.galleryPage.prev} onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft className="h-5 w-5" /></button>
      <figure className="max-h-full max-w-6xl px-4" onClick={(e) => e.stopPropagation()}>
        <img key={img.key} src={img.src} alt={t.images[img.key]} className="max-h-[82vh] w-auto object-contain animate-in fade-in zoom-in-95 duration-300" />
        <figcaption className="mt-4 text-center text-sm text-ink-foreground/75">{t.images[img.key]} · {index + 1}/{images.length}</figcaption>
      </figure>
      <button className={cn(ctl, "right-3 md:right-6")} aria-label={t.galleryPage.next} onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight className="h-5 w-5" /></button>
    </div>
  );
}
