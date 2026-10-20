import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { magazines, type Magazine } from "@/components/magazines";
import curator from "@/assets/curator.jpeg.asset.json";

const Flipbook = lazy(() => import("@/components/Flipbook"));
import { ArrowUpRight, ArrowDown, Menu, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/original-hero.jpg.asset.json";
import travel from "@/assets/IMG_6301.jpeg.asset.json";
import family from "@/assets/IMG_6318.jpeg.asset.json";
import love from "@/assets/IMG_6317.jpeg.asset.json";
import custom from "@/assets/IMG_6319.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Qissa, a chapter. — Memories Worth Holding" },
    { name: "description", content: "Discover travel, love, family and custom Qissa photobooks. Your digital memories, thoughtfully curated and beautifully bound." },
    { property: "og:title", content: "Qissa, a chapter. — Memories Worth Holding" },
    { property: "og:description", content: "Travel, love, family and custom photobooks. Your digital memories, bound into physical chapters." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const chapters = [
  { name: "Travel", image: travel.url, description: "For the paths walked and horizons that changed you.", formats: ["Pocket Softcover (6×6”)", "Classic Hardbound (8×8”)", "Panoramic (A4)"], best: "Road trips and solo journals." },
  { name: "Love", image: love.url, description: "For the quiet looks and chapters built together.", formats: ["Classic Square (8×8”)", "Heirloom Clothbound (10×10”)"], best: "Anniversaries and milestones." },
  { name: "Family", image: family.url, description: "For the generations in one frame and archives of home.", formats: ["Classic Hardbound (8×8”)", "The Heavy Heirloom (10×10”)"], best: "Baby milestones and year-in-review." },
  { name: "Custom", image: custom.url, description: "For the spaces you curate—from cafes to wedding heirlooms.", formats: ["Exhibition Hardcover (10×10”)", "Grand Lay-Flat (12×12”)"], best: "Studios and luxury events." },
];

function Wordmark({ comma = false }: { comma?: boolean }) {
  return <span className="wordmark">qissa{comma ? "," : ""}</span>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [chapter, setChapter] = useState("");
  const [openMag, setOpenMag] = useState<Magazine | null>(null);
  const links = [{ id: "idea", label: "The Idea" }, { id: "magazines", label: "Magazines" }, { id: "chapters", label: "The Chapters" }, { id: "process", label: "How It Works" }, { id: "story", label: "Our Story" }];
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("main section:not(.qissa-hero) :is(.eyebrow, h2, blockquote, .section-heading p, .idea-details > div, .magazine-card, .chapter, .process-step, .story-signature, .curator-photo, .begin-description, .enquiry-form)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el, i) => { el.classList.add("reveal"); el.style.setProperty("--reveal-delay", `${(i % 4) * 90}ms`); io.observe(el); });
    return () => io.disconnect();
  }, []);
  const selectChapter = (name: string) => {
    setChapter(name);
    document.getElementById("begin")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="qissa-site" id="top">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Qissa, a chapter. Home"><Wordmark comma /><span className="brand-subtitle">a chapter.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(link => <a key={link.id} href={`#${link.id}`}>{link.label}</a>)}
          <Button variant="qissa" asChild><a href="#begin">Begin your Qissa <ArrowUpRight /></a></Button>
        </nav>
        <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)}>{link.label}</a>)}<a href="#begin" onClick={() => setMenuOpen(false)}>Begin your Qissa <ArrowUpRight size={16} /></a></nav>}
      </header>

      <main>
        <section className="qissa-hero" aria-label="Qissa, a chapter">
          <img className="hero-photo" src={hero.url} alt="Open memory photobook, burgundy linen cover, and treasured travel photographs" fetchPriority="high" />
          <div className="hero-wash" />
          <div className="hero-copy">
            <p className="eyebrow">Some stories deserve more than a screen.</p>
            <h1><Wordmark comma /><span className="hero-subtitle">a chapter.</span></h1>
            <p className="hindi-word">किस्सा</p>
            <p className="hero-description">Your digital memories, bound into<br /> physical chapters.</p>
            <Button variant="editorial" asChild><a href="#chapters">Explore the chapters <ArrowUpRight /></a></Button>
          </div>
          <div className="hero-footnotes"><span>Thoughtfully curated. Beautifully bound.</span><a href="#idea">A story worth holding <ArrowDown size={13} /></a></div>
        </section>

        <section className="idea-section section-inner" id="idea">
          <div className="idea-copy"><p className="eyebrow">01 / A return to the tangible</p><h2>The Idea</h2>
            <blockquote>“We live in an age of digital abundance and physical scarcity. Our phone galleries are crowded with thousands of beautiful moments—trapped behind a screen, rarely looked at again.”</blockquote>
            <dl className="idea-details"><div><dt>Curate</dt><dd>We sift through the chaos to select your best shots.</dd></div><div><dt>Design</dt><dd>Minimalist, high-end editorial layouts.</dd></div><div><dt>Craft</dt><dd>Premium keepsakes delivered to your door.</dd></div></dl>
          </div>
          
        </section>
        <section className="magazines-section section-inner" id="magazines" aria-labelledby="magazines-title">
          <p className="eyebrow">A peek inside</p><div className="section-heading"><h2 id="magazines-title">The Magazines</h2><p>Turn the pages of chapters we’ve already bound.</p></div>
          <div className="magazine-grid">{magazines.map(mag => <article className="magazine-card" key={mag.id}>
            <div className="magazine-cover">{mag.cover ? <img src={mag.cover} alt={`${mag.title} cover`} loading="lazy" /> : <div className="magazine-placeholder"><Wordmark /><span>Coming soon</span></div>}</div>
            <p className="eyebrow">{mag.kind}</p><h3>{mag.title}</h3><p className="chapter-description">{mag.description}</p>
            {mag.pages.length ? <Button variant="editorial" onClick={() => setOpenMag(mag)}>Open the magazine <ArrowUpRight /></Button> : <p className="magazine-unavailable">This magazine isn’t available to preview yet.</p>}
          </article>)}</div>
        </section>
        <Dialog.Root open={!!openMag} onOpenChange={open => !open && setOpenMag(null)}>
          <Dialog.Portal><Dialog.Overlay className="flip-overlay" /><Dialog.Content className="flip-modal" aria-describedby={undefined}>
            <Dialog.Title className="sr-only">{openMag?.title ?? "Magazine"}</Dialog.Title>
            {openMag && <Suspense fallback={<div className="flip-loading" role="status"><span className="flip-spinner" />Opening the magazine…</div>}><Flipbook magazine={openMag} onClose={() => setOpenMag(null)} /></Suspense>}
          </Dialog.Content></Dialog.Portal>
        </Dialog.Root>
        <div className="memory-ribbon" aria-hidden="true"><span>✳ &nbsp; Digital moments, physical chapters &nbsp; ✳ &nbsp; Made to hold, made to keep &nbsp; ✳ &nbsp; Your memories, your stories, your Qissa &nbsp; ✳ &nbsp; Digital moments, physical chapters &nbsp; ✳ &nbsp; Made to hold, made to keep</span></div>

        <section className="chapters-section section-inner" id="chapters">
          <p className="eyebrow">02 / A book for every kind of story</p><div className="section-heading"><h2>The Chapters</h2><p>Every story deserves its own kind of book.</p></div>
          <div className="chapters-grid">{chapters.map((item, i) => <article className="chapter" key={item.name}>
            <div className="chapter-photo"><img src={item.image} alt={`${item.name} Qissa photobooks`} loading="lazy" /><span className="chapter-number">0{i + 1}</span></div>
            <h3>The {item.name} <Wordmark /></h3><p className="chapter-description">{item.description}</p>
            <Button className="chapter-discover" variant="link" aria-expanded={expanded === item.name} onClick={() => setExpanded(expanded === item.name ? null : item.name)}>Discover this chapter {expanded === item.name ? <Minus /> : <Plus />}</Button>
            {expanded === item.name && <div className="chapter-details"><p className="eyebrow">Available formats</p><ul>{item.formats.map(format => <li key={format}>{format}</li>)}</ul><p className="eyebrow">Best for</p><p>{item.best}</p><Button variant="editorial" onClick={() => selectChapter(item.name)}>Select {item.name} <ArrowUpRight /></Button></div>}
          </article>)}</div>
        </section>

        <section className="process-section" id="process"><div className="section-inner"><p className="eyebrow">03 / From your gallery to your bookshelf</p><h2>Three simple steps.</h2><div className="steps-grid">{[{ title: "Choose", text: "Select your theme and book size." }, { title: "Drop your gallery", text: "Share your raw Google Drive link. We do the layout." }, { title: "Hold the chapter", text: "Professionally bound and shipped to your door." }].map((step, i) => <div className="process-step" key={step.title}><span>0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>

        <section className="story-section section-inner" id="story"><div><p className="eyebrow">04 / The person behind the pages</p><h2>The story behind<br />the chapters.</h2><blockquote>“Hi, I’m the curator behind Qissa. I work a full-time job, but my favorite weekends are spent bringing memories back into the physical world.”</blockquote><p className="story-signature">With love, <Wordmark />.</p></div><img className="curator-photo" src={curator.url} alt="The curator behind Qissa, smiling by candlelight" loading="lazy" /></section>

        <section className="begin-section" id="begin"><div className="section-inner begin-inner"><div><p className="eyebrow">A new chapter starts here</p><h2>Begin your<br /><Wordmark />.</h2><p className="begin-description">A journey, a person, a little piece of life.<br />Tell us what you’d like to keep.</p></div><form className="enquiry-form" onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); const text = `Hello Qissa!\nName: ${data.get("name")}\nContact: ${data.get("contact")}\nChapter: ${chapter}\nMemories: ${data.get("memories")}`; window.open(`https://wa.me/919321389128?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer"); }}>
          <div className="form-row"><label>Your name<input name="name" autoComplete="name" required /></label><label>Email or phone<input name="contact" autoComplete="email" required /></label></div>
          <label>Your chapter<select value={chapter} onChange={event => setChapter(event.target.value)} required><option value="">Select your chapter</option>{chapters.map(item => <option value={item.name} key={item.name}>The {item.name} Qissa</option>)}</select></label>
          <label>Your memories<textarea name="memories" rows={3} /></label><Button variant="qissa" type="submit">Send enquiry via WhatsApp <ArrowUpRight /></Button>
        </form></div></section>
      </main>
      <footer className="site-footer section-inner"><div className="footer-main"><div><p className="footer-brand"><Wordmark comma /> a chapter.</p><p>Your digital memories, bound into physical chapters.</p><p className="footer-contact"><a href="https://wa.me/919321389128" target="_blank" rel="noopener noreferrer">WhatsApp: +91 93213 89128</a><br /><a href="mailto:dhruvinanavati@gmail.com">dhruvinanavati@gmail.com</a></p></div><a href="#top">Back to top ↑</a></div><div className="footer-bottom"><span>© 2026 Qissa. All rights reserved.</span><span>Digital moments. Physical chapters.</span></div></footer>
    </div>
  );
}
