import { Archivo, Noto_Sans_Bengali, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./hover.css";
import "./responsive.css";

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${notoSansBengali.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <main style={{ display: "block" }}>{children}</main>
      </body>
    </html>
  );
}
