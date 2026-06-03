"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/academy", label: "Academy" },
  { href: "/talents", label: "Talents" }
];

export default function Header() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsCompact(window.scrollY > 28);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSrc = isCompact ? "/vip-connector-logo-2.webp" : "/vip-connector-logo.webp";

  return (
    <header className={`siteHeader ${isCompact ? "siteHeaderCompact" : "siteHeaderLarge"}`}>
      <Link href="/" className="brand" aria-label="VIP Connector home">
        <Image className="brandLogo" src={logoSrc} alt="The VIP Connector" width={320} height={320} priority />
      </Link>

      <nav className="navLinks" aria-label="Main navigation">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>{link.label}</Link>
        ))}
      </nav>
    </header>
  );
}
