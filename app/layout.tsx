import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MagneticParticles from "@/components/MagneticParticles";

export const metadata: Metadata = {
  title: "The VIP Connector",
  description: "A participant-driven intelligence network supporting AI testing, behavioural research, product feedback and future-focused gaming innovation."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="backgroundGlow"></div>
        <MagneticParticles />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
