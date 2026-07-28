import { Archivo, Noto_Sans_Bengali, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import "../hover.css";
import "../responsive.css";
import { LOCALES } from "../../lib/i18n";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  display: "swap",
  variable: "--font-noto-bengali",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata = {
  metadataBase: new URL("https://dakio.io"),
};

// Both locales prerender at build time; middleware maps the bare English paths
// onto /en so no already-indexed URL moves.
export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export const dynamicParams = false;

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${archivo.variable} ${notoSansBengali.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <main style={{ display: "block" }}>{children}</main>
      </body>
    </html>
  );
}
