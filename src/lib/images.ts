import hero from "@/assets/hero-bright.jpg";
import ac from "@/assets/WhatsApp Image 2026-09-30 at 08.54.12.jpeg";
import nonac from "@/assets/WhatsApp Image 2026-10-09 at 21.51.02.jpeg";
import common from "@/assets/WhatsApp Image 2026-09-30 at 08.54.14.jpeg";
import corridor from "@/assets/WhatsApp Image 2026-10-09 at 21.51.01.jpeg";
import surroundings from "@/assets/WhatsApp Image 2026-10-09 at 21.51.02.jpeg";

// Nayi uploaded photos (Batch 1)
import img1 from "@/assets/img1.jpeg";
import img2 from "@/assets/img2.jpeg";
import img3 from "@/assets/img3.jpeg";
import img4 from "@/assets/img4.jpeg";
import img5 from "@/assets/img5.jpeg";

// Nayi uploaded photos (Batch 2)
import image10 from "@/assets/image10.jpeg";
import img11 from "@/assets/img11.jpeg";
import img12 from "@/assets/img12.jpeg";
import img13 from "@/assets/img13.jpeg";
import img14 from "@/assets/img14.jpeg";
import img15 from "@/assets/img15.jpeg";
import img16 from "@/assets/img16.jpeg";
import img17 from "@/assets/img17.jpeg";
import img18 from "@/assets/img18.jpeg";
import img19 from "@/assets/img19.jpeg";
import img20 from "@/assets/img20.jpeg";
import img21 from "@/assets/img21.jpeg";

export type GalleryCategory = "exterior" | "acRooms" | "nonacRooms" | "common" | "surroundings";
export type ImageKey = "exterior" | "ac" | "nonac" | "common" | "corridor" | "temple" | "surroundings";

export const galleryImages: { key: ImageKey; src: string; cat: GalleryCategory }[] = [
  // Primary Exterior & Banner
  { key: "exterior", src: hero, cat: "exterior" },
  { key: "exterior", src: img5, cat: "exterior" },

  // AC Rooms
  { key: "ac", src: image10, cat: "acRooms" },
  { key: "ac", src: img11, cat: "acRooms" },
  { key: "ac", src: img4, cat: "acRooms" },
  { key: "ac", src: ac, cat: "acRooms" },

  // Non-AC / Standard Rooms
  { key: "nonac", src: img12, cat: "nonacRooms" },
  { key: "nonac", src: img16, cat: "nonacRooms" },
  { key: "nonac", src: img18, cat: "nonacRooms" },
  { key: "nonac", src: img19, cat: "nonacRooms" },
  { key: "nonac", src: img20, cat: "nonacRooms" },
  { key: "nonac", src: img3, cat: "nonacRooms" },
  { key: "nonac", src: nonac, cat: "nonacRooms" },

  // Common Areas, Lobby, Hallways & Facilities
  { key: "corridor", src: img13, cat: "common" },
  { key: "common", src: img14, cat: "common" },
  { key: "common", src: img15, cat: "common" },
  { key: "common", src: img1, cat: "common" },
  { key: "common", src: img2, cat: "common" },
  { key: "common", src: img17, cat: "common" },
  { key: "common", src: img21, cat: "common" },
  { key: "common", src: common, cat: "common" },
  { key: "corridor", src: corridor, cat: "common" },

  // Surroundings
  { key: "surroundings", src: surroundings, cat: "surroundings" },
];

export const heroImage = hero;
