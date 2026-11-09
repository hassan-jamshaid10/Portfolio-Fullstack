import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { site } from "@/content/site";
import "./globals.css";

const display = localFont({
  src: "../fonts/space-grotesk-latin.woff2",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["Arial", "sans-serif"],
});

const body = localFont({
  src: "../fonts/inter-latin.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["Arial", "sans-serif"],
});

const mono = localFont({
  src: "../fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["ui-monospace", "monospace"],
});

const baseUrl = site.website.replace(/\/$/, "");

const themeBoot = `(function(){try{var stored=localStorage.getItem("theme");var theme=stored||"system";var system=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var resolved=theme==="light"||theme==="dark"?theme:system;var root=document.documentElement;root.setAttribute("data-theme",resolved);root.style.colorScheme=resolved;if(matchMedia("(prefers-reduced-motion: reduce)").matches){root.classList.add("intro-done");}else{root.classList.add("is-intro");setTimeout(function(){root.classList.remove("is-intro");root.classList.add("intro-done");},4200);}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: site.seo.title,
    template: `%s | ${site.fullName}`,
  },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.fullName, url: baseUrl }],
  creator: site.fullName,
  publisher: site.fullName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: `${site.fullName} Portfolio`,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    creator: "@hassanjamshaid10",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <Script id="theme-boot" strategy="beforeInteractive">
          {themeBoot}
        </Script>
        <ThemeProvider>
          <JsonLd />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
