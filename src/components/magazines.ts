import anniversaryCover from "@/assets/anniversary-cover.jpeg.asset.json";
import customCover from "@/assets/custom-cover.png.asset.json";
import spitiCover from "@/assets/spiti-cover.png.asset.json";

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
  { id: "custom", title: "The Lifestyle Magazine", kind: "Custom Qissa", description: "A limited-edition cover story for a birthday bash.", cover: customCover.url, aspect: 594.96 / 842.25, pages: pagesFor("custom") },
  { id: "spiti", title: "Spiti", kind: "Travel Qissa", description: "Higher roads, quieter places — a journey in pictures.", cover: spitiCover.url, aspect: 792 / 594, pages: pagesFor("spiti") },
];
