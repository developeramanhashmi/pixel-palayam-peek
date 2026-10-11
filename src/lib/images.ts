import hero from "@/assets/hero-bright.jpg";
import ac from "@/assets/WhatsApp Image 2026-09-30 at 08.54.12.jpeg";
import nonac from "@/assets/WhatsApp Image 2026-10-09 at 21.51.02.jpeg";
import common from "@/assets/WhatsApp Image 2026-09-30 at 08.54.14.jpeg";
import corridor from "@/assets/WhatsApp Image 2026-10-09 at 21.51.01.jpeg";
import surroundings from "@/assets/WhatsApp Image 2026-10-09 at 21.51.02.jpeg";

// Nayi uploaded photos
import img1 from "@/assets/img1.jpeg";
import img2 from "@/assets/img2.jpeg";
import img3 from "@/assets/img3.jpeg";
import img4 from "@/assets/img4.jpeg";
import img5 from "@/assets/img5.jpeg";

export type GalleryCategory = "exterior" | "acRooms" | "nonacRooms" | "common" | "surroundings";
export type ImageKey = "exterior" | "ac" | "nonac" | "common" | "corridor" | "temple" | "surroundings";

export const galleryImages: { key: ImageKey; src: string; cat: GalleryCategory }[] = [
  { key: "exterior", src: hero, cat: "exterior" },
  { key: "ac", src: ac, cat: "acRooms" },
  { key: "nonac", src: nonac, cat: "nonacRooms" },
  { key: "common", src: common, cat: "common" },
  { key: "corridor", src: corridor, cat: "common" },
  { key: "surroundings", src: surroundings, cat: "surroundings" },

  // Nayi images categorized
  { key: "common", src: img1, cat: "common" },         // Lobby / Seating area
  { key: "common", src: img2, cat: "common" },         // Kitchen & Wash facility
  { key: "nonac", src: img3, cat: "nonacRooms" },      // Room entrance & marble floor
  { key: "ac", src: img4, cat: "acRooms" },            // Spacious AC room layout
  { key: "exterior", src: img5, cat: "exterior" },     // Official guest house banner & exterior
];

export const heroImage = hero;
