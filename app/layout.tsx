import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "The VIP Connector",
  description: "VIP player intelligence for premium gaming studios"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="backgroundGlow"></div>
        <Header />
        {children}
      </body>
    </html>
  );
}
