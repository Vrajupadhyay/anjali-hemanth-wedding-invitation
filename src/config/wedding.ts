/**
 * WEDDING CONFIG — edit everything here. The layout reads from this file only.
 */
import coupleImage from "@/assets/couple.png";
import venueImage from "@/assets/venue.png";
import logoAsset from "@/assets/logo.png";
import heroNight from "@/assets/hero-night.jpg";
import heroDay from "@/assets/hero-day.jpg";

export const wedding = {
  bride: { first: "Anjali", full: "Anjali Motiramani", father: "Narendra Motiramani", mother: "Madhu Motiramani" },
  groom: { first: "Hemanth", full: "Hemanth Peswani", father: "Dinesh Peswani", mother: "Karishma Peswani" },
  hashtag: "#FromTheirBondToOurForever",
  dateLabel: "24 & 25 November, 2026",
  framedDateLabel: "24 & 25 NOVEMBER, 2026",
  /** ISO date/time used by the countdown (IST) */
  countdownTarget: "2026-11-24T17:30:00+05:30",
  welcome: [
    "A celebration of love,",
    "togetherness,",
    "and the beautiful",
    "journey ahead",
  ],
  events: [
    { name: "Welcome Dinner", date: "22nd November, 2026", time: "8:00 PM" },
    { name: "Royal Rang Bazaar (Carnival)", date: "23rd November, 2026", time: "11:00 AM" },
    { name: "Silver Soirée", date: "23rd November, 2026", time: "7:00 PM" },
    { name: "Baraat", date: "24th November, 2026", time: "4:00 PM" },
    { name: "Enchanted Garden Palace", date: "24th November, 2026", time: "5:30 PM" },
    { name: "Sufi Evening", date: "24th November, 2026", time: "7:00 PM" },
    { name: "Midnight Pheras", date: "24th November, 2026", time: "Midnight 12:30 AM" },
  ],
  venue: {
    name: "The Cube Club",
    address: "Kerela Nalsarovar Road, Baldana, Ahmedabad - Rajkot Highway, Bavla, Gujarat - 382240",
    mapsUrl: "https://maps.app.goo.gl/u6rwRvnzj7J3A4vX7",
  },
  dressCode: [
    { icon: "🎪", fn: "Haldi & Mehendi", theme: "Royal Rang Bazaar", colors: ["Fuchsia", "Emerald", "Cobalt", "Mustard", "Orange", "Plum"], swatches: ["#c2185b", "#2e7d5b", "#2f4fa2", "#d4a017", "#e07a2e", "#6b2d5c"] },
    { icon: "🪩", fn: "Sangeet & Ring Ceremony", theme: "Silver Soirée", colors: ["Black", "Burgundy", "Emerald", "Navy", "Plum", "Gunmetal"], swatches: ["#1b1b1b", "#6d1a2b", "#2e7d5b", "#1f2a4d", "#6b2d5c", "#4a4f55"] },
    { icon: "🌸", fn: "Baarat, Varmala & Reception", theme: "Enchanted Garden Palace", colors: ["Powder blue", "Sage", "Lilac", "Peach", "Ivory", "Muted gold"], swatches: ["#b9d3e6", "#a9bfa1", "#c9b6d9", "#f2c4a8", "#f6f0e1", "#c2a463"] },
    { icon: "🌙", fn: "Midnight Pheras", theme: "Beige & Antique Gold", colors: ["Beige", "Ivory", "Champagne", "Taupe", "Antique gold", "Muted brown"], swatches: ["#e3d3b6", "#f6f0e1", "#efdcb5", "#a39383", "#b08d57", "#7a5c43"] },
  ],
  closing: {
    title: "Her First Home. Her Forever Blessings.",
    quote: [
      "From the hands that raised her",
      "to the hearts that grew alongside her,",
      "she steps into tomorrow carrying",
      "a lifetime of love with her.",
    ],
    family: [
      { names: "Shyamsunder Motiramani & Laxmi Motiramani", relation: "Grandfather & Grandmother" },
      { names: "Prakash Motiramani & Richa Motiramani", relation: "CHACHU & CHACHI" },
      { names: "Vansh Motiramani", relation: "Brother" },
      { names: "Khushbu Motiramani", relation: "SISTER" },
    ],
    signature: "The Motiramani Family",
    signoff: ["With love that began at home", "and blessings that follow wherever she goes."],
  },
  images: {
    couple: coupleImage,
    resort: venueImage,
    monogram: logoAsset,
    heroNight,
    heroDay,
  },
  /** YouTube video ID for background music */
  musicYoutubeId: "RoVWg3SZYds",
};
