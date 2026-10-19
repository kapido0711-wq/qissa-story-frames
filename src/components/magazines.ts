import anniversaryCover from "@/assets/anniversary-cover.jpeg.asset.json";
import birthdayCover from "@/assets/magazine-cover.png.asset.json";

type Pointer = { url: string };
const pagePointers = import.meta.glob<Pointer>("@/assets/magazines/*.asset.json", { eager: true, import: "default" });

function pagesFor(prefix: string) {
  return Object.entries(pagePointers)
    .filter(([path]) => path.includes(`/${prefix}-`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, p]) => p.url);
}

export type Magazine = {
  id: string;
  title: string;
  kind: string;
  description: string;
  cover?: string;
  /** Page width ÷ height, taken from the original PDF. */
  aspect: number;
  pages: string[];
};

export const magazines: Magazine[] = [
  { id: "anniversary", title: "The Anniversary Magazine", kind: "Love Qissa", description: "Twenty-two and together — a love story told in twelve pages.", cover: anniversaryCover.url, aspect: 595.5 / 842.25, pages: pagesFor("anniv") },
  { id: "birthday", title: "The Birthday Edition", kind: "Custom Qissa", description: "A limited-edition cover story for a 19th birthday bash.", cover: birthdayCover.url, aspect: 612 / 792, pages: pagesFor("story") },
  { id: "travel", title: "The Travel Journal", kind: "Travel Qissa", description: "A new journey is being bound. This edition is coming soon.", aspect: 1 / Math.SQRT2, pages: [] },
];
