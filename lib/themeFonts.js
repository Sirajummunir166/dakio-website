// The typefaces of the themes' wordmarks, so each theme's name on /themes is
// set the way its own storefront sets it. Used by the /themes pages and the
// home ThemesBand; not preloaded, since they sit below the fold and fall back
// to Georgia.

import { Cormorant_Garamond, Bricolage_Grotesque, DM_Sans, Plus_Jakarta_Sans, Lexend, Newsreader } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"], display: "swap", preload: false, variable: "--tf-cormorant" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600"], display: "swap", preload: false, variable: "--tf-bricolage" });
const dmsans = DM_Sans({ subsets: ["latin"], weight: ["700"], display: "swap", preload: false, variable: "--tf-dmsans" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["800"], display: "swap", preload: false, variable: "--tf-jakarta" });
const lexend = Lexend({ subsets: ["latin"], weight: ["600"], display: "swap", preload: false, variable: "--tf-lexend" });
const newsreader = Newsreader({ subsets: ["latin"], weight: ["500"], display: "swap", preload: false, variable: "--tf-newsreader" });

export const themeFontVars = [cormorant, bricolage, dmsans, jakarta, lexend, newsreader].map(f => f.variable).join(" ");
