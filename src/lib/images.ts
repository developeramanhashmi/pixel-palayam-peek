import hero from "@/assets/hero.jpg";
import ac from "@/assets/ac-room.jpg";
import nonac from "@/assets/nonac-room.jpg";
import temple from "@/assets/temple.jpg";
import common from "@/assets/common.jpg";
import corridor from "@/assets/corridor.jpg";
import surroundings from "@/assets/surroundings.jpg";

export type GalleryCategory = "exterior" | "acRooms" | "nonacRooms" | "common" | "surroundings";
export type ImageKey = "exterior" | "ac" | "nonac" | "common" | "corridor" | "temple" | "surroundings";

export const galleryImages: { key: ImageKey; src: string; cat: GalleryCategory }[] = [
  { key: "exterior", src: hero, cat: "exterior" },
  { key: "ac", src: ac, cat: "acRooms" },
  { key: "nonac", src: nonac, cat: "nonacRooms" },
  { key: "common", src: common, cat: "common" },
  { key: "corridor", src: corridor, cat: "common" },
  { key: "temple", src: temple, cat: "surroundings" },
  { key: "surroundings", src: surroundings, cat: "surroundings" },
];

export const heroImage = hero;
