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
  title: "Carlos Aleixo | Portfolio",
  description:
    "Portfolio de Carlos Eduardo, desenvolvedor Full Stack especializado em Java Spring, React e DevOps. Criando soluções digitais robustas e escaláveis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
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
