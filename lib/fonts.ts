// Centralized font instances for the whole site.
// Adjust the relative "path" values if this file doesn't live in a top-level /lib folder.
import localFont from "next/font/local";

// Display font — used for section headings
export const nature = localFont({
  src: [
    { path: "../public/fonts/nature/ZTNature-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/nature/ZTNature-ExtraBold.ttf", weight: "700", style: "bold" },
  ],
  variable: "--font-nature",
  display: "swap",
});

// Accent script font — used sparingly for eyebrow labels / quotes
export const royal = localFont({
  src: [{ path: "../public/fonts/royale-brone/Royale Brone.otf", weight: "400", style: "normal" }],
  variable: "--font-royal",
  display: "swap",
});

// Decorative font — reserved for small badges / pull-quotes
export const tropical = localFont({
  src: [{ path: "../public/fonts/Tropical/Tropical Taste Demo.otf", weight: "400", style: "normal" }],
  variable: "--font-tropical",
  display: "swap",
});

// Body / UI font
export const roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});
