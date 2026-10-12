import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { galleryImages } from "@/lib/images";
import { cn } from "@/lib/utils";

type Img = (typeof galleryImages)[number];

export function GalleryGrid({ images = galleryImages, limit }: { images?: Img[]; limit?: number }) {
  const { t } = useI18n();
  const [idx, setIdx] = useState<number | null>(null);
  const items = Array.isArray(images) && images.length > 0 ? images : galleryImages;
  const list = limit && limit > 0 ? items.slice(0, limit) : items;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {list.map((img, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl"
          >
            <button
              type="button"
              onClick={() => setIdx(i)}
              className="relative block h-full w-full overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-gold/60"
              aria-label="View guest house photo"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black/10">
                <img
                  src={img.src}
                  alt="Veerapandiyar Guest House photo"
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                />
              </div>

              {/* Clean Smooth Hover Overlay with Center Zoom Button */}
              <div className="absolute inset-0 bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Maximize2 className="h-5 w-5 stroke-[2.5]" />
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>

      {idx !== null && <Lightbox images={list} index={idx} setIndex={setIdx} />}
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
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [go, setIndex]);

  const img = images[index]!;
  const ctl = "absolute z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-ink/70 border border-white/20 text-white backdrop-blur-md transition-all duration-200 hover:bg-gold hover:text-ink hover:scale-105";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg animate-in fade-in duration-200"
      onClick={() => setIndex(null)}
      onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <button ref={closeRef} className={cn(ctl, "right-4 top-4")} aria-label={t.galleryPage.close} onClick={() => setIndex(null)}>
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button className={cn(ctl, "left-3 sm:left-6")} aria-label={t.galleryPage.prev} onClick={(e) => { e.stopPropagation(); go(-1); }}>
        <ChevronLeft className="h-6 w-6" />
      </button>

      <figure className="max-h-full max-w-5xl px-4 py-8 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <img
            key={index}
            src={img.src}
            alt="Veerapandiyar Guest House photo"
            className="max-h-[80vh] w-auto max-w-full object-contain animate-in fade-in zoom-in-95 duration-200"
          />
        </div>

        <figcaption className="mt-4 flex items-center justify-center gap-2 text-center text-sm">
          <span className="rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button className={cn(ctl, "right-3 sm:right-6")} aria-label={t.galleryPage.next} onClick={(e) => { e.stopPropagation(); go(1); }}>
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
