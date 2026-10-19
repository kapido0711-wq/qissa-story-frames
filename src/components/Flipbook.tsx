import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";
import type { Magazine } from "./magazines";

const Page = forwardRef<HTMLDivElement, { src: string; n: number; title: string }>(({ src, n, title }, ref) => (
  <div ref={ref} className="flip-page">
    <img src={src} alt={`${title}, page ${n}`} draggable={false} decoding="async" loading={n <= 4 ? "eager" : "lazy"} />
  </div>
));
Page.displayName = "Page";

function useBookSize(aspect: number) {
  const [size, setSize] = useState<{ w: number; h: number; single: boolean } | null>(null);
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const single = vw < 768;
      const maxH = vh - (single ? 190 : 200);
      const maxW = (vw - (single ? 32 : 160)) / (single ? 1 : 2);
      let h = Math.min(maxH, 1100), w = h * aspect;
      if (w > maxW) { w = maxW; h = w / aspect; }
      setSize({ w: Math.floor(w), h: Math.floor(h), single });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [aspect]);
  return size;
}

export default function Flipbook({ magazine, onClose }: { magazine: Magazine; onClose: () => void }) {
  const book = useRef<any>(null);
  const size = useBookSize(magazine.aspect);
  const [page, setPage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const total = magazine.pages.length;

  useEffect(() => {
    let alive = true;
    Promise.all(magazine.pages.slice(0, 3).map(src => new Promise(res => { const i = new Image(); i.onload = i.onerror = res; i.src = src; })))
      .then(() => alive && setLoaded(true));
    return () => { alive = false; };
  }, [magazine]);

  const prev = useCallback(() => book.current?.pageFlip()?.flipPrev(), []);
  const next = useCallback(() => book.current?.pageFlip()?.flipNext(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const label = size && !size.single && page > 0 && page < total - 1
    ? `Pages ${page + 1}–${Math.min(page + 2, total)} of ${total}`
    : `Page ${page + 1} of ${total}`;

  const Book = HTMLFlipBook as any;
  return (
    <div className="flipbook-shell">
      <div className="flipbook-top">
        <div><p className="eyebrow">{magazine.kind}</p><p className="flipbook-title">{magazine.title}</p></div>
        <button className="flip-icon-btn" onClick={onClose} aria-label="Close magazine"><X /></button>
      </div>
      <div className="flipbook-stage">
        {(!loaded || !size) && <div className="flip-loading" role="status"><span className="flip-spinner" />Opening the magazine…</div>}
        {size && loaded && (
          <>
            <button className="flip-icon-btn flip-arrow" onClick={prev} disabled={page === 0} aria-label="Previous page"><ChevronLeft /></button>
            <Book key={`${size.single}-${size.w}`} ref={book} width={size.w} height={size.h} size="fixed"
              showCover usePortrait={size.single} mobileScrollSupport={false} maxShadowOpacity={0.35}
              flippingTime={750} drawShadow className="flip-book" startPage={page}
              onFlip={(e: { data: number }) => setPage(e.data)}>
              {magazine.pages.map((src, i) => <Page key={src} src={src} n={i + 1} title={magazine.title} />)}
            </Book>
            <button className="flip-icon-btn flip-arrow" onClick={next} disabled={page >= total - (size.single ? 1 : 2) && page !== 0 ? page >= total - 1 || !size.single && page >= total - 2 : false} aria-label="Next page"><ChevronRight /></button>
          </>
        )}
      </div>
      <div className="flipbook-bottom">
        <span aria-live="polite">{label}</span>
        <a className="flip-cta" href="#begin" onClick={onClose}>Create your own Qissa <ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}
