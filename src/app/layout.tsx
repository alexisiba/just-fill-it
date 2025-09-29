import type { Metadata } from "next";
import {
  Archivo_Black,
  Rubik,
  Rubik_Mono_One,
  Shadows_Into_Light,
} from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo-black",
  subsets: ["latin"],
});

const rubikSans = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

const rubikMono = Rubik_Mono_One({
  weight: "400",
  variable: "--font-rubik-mono",
  subsets: ["latin"],
});

const shadowIntoLightSans = Shadows_Into_Light({
  weight: "400",
  variable: "--shadows-into-light",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Just Fill It!",
  description:
    "Crea documentos personalizados en segundos: rellena los campos de tus plantillas y descarga el resultado en PDF o su formato original.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${rubikSans.variable} ${rubikMono.variable} ${shadowIntoLightSans.variable} ${archivoBlack.variable} antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {process.env.GA_ID ? (
          <GoogleAnalytics gaId={process.env.GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
