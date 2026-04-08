import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import PageTransition from "@/components/layout/PageTransition/PageTransition";
import Navbar from "@/components/layout/Navbar/Navbar";
import PreloaderProvider from "@/components/layout/PreloaderProvider/PreloaderProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio Carlos Eduardo Aleixo - Desenvolvedor Web React & Next.js",
  description: "Portfolio profissional de Carlos Eduardo Aleixo. Desenvolvedor full-stack especializado em React, Next.js, WebGL e animações web interativas. Confira meus projetos!",
  keywords: ["portfolio", "carlos eduardo", "carlos aleixo", "desenvolvedor", "web developer", "react", "next.js", "webgl"],
  authors: [{ name: "Carlos Eduardo Aleixo" }],
  creator: "Carlos Eduardo Aleixo",
  openGraph: {
    title: "Portfolio Carlos Eduardo Aleixo - Desenvolvedor Web React & Next.js",
    description: "Portfolio profissional de Carlos Eduardo Aleixo. Desenvolvedor full-stack especializado em React, Next.js, WebGL e animações web interativas. Confira meus projetos!",
    url: "https://www.carlosaleixo.dev",
    siteName: "Portfolio Carlos Eduardo Aleixo",
    images: [
      {
        url: "https://www.carlosaleixo.dev/work-items/banner-1.png",
        width: 1200,
        height: 630,
        alt: "Carlos Eduardo Aleixo Portfolio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Carlos Eduardo Aleixo - Desenvolvedor Web React & Next.js",
    description: "Portfolio profissional de Carlos Eduardo Aleixo. Desenvolvedor full-stack especializado em React, Next.js, WebGL e animações web interativas.",
    images: ["https://www.carlosaleixo.dev/work-items/banner-1.png"],
  },
  alternates: {
    canonical: "https://www.carlosaleixo.dev",
  },
};

export default function RootLayout({ children }) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.carlosaleixo.dev/#person",
        name: "Carlos Eduardo Aleixo",
        jobTitle: "Desenvolvedor Full Stack",
        url: "https://www.carlosaleixo.dev",
        sameAs: [
          "https://www.linkedin.com/in/carlosealeixo/",
          "https://github.com/SAIKO9X"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.carlosaleixo.dev/#organization",
        name: "Carlos Eduardo Aleixo Portfolio",
        url: "https://www.carlosaleixo.dev",
        logo: "https://www.carlosaleixo.dev/logo.png"
      }
    ]
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PreloaderProvider>
          <PageTransition>{children}</PageTransition>
          <Navbar />
          {/* <PreloaderResetButton /> */}
        </PreloaderProvider>
      </body>
    </html>
  );
}
