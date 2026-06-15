"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/players", label: "Register" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const [isCompact, setIsCompact] = useState(false);
  const isCompactRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const shouldCompact = isCompactRef.current ? window.scrollY > 18 : window.scrollY > 96;
      if (shouldCompact !== isCompactRef.current) {
        isCompactRef.current = shouldCompact;
        setIsCompact(shouldCompact);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSrc = isCompact ? "/vip-connector-logo-2.webp" : "/vip-connector-logo.webp";

  return (
    <header className={`siteHeader ${isCompact ? "siteHeaderCompact" : "siteHeaderLarge"}`}>
      <Link href="/" className="brand" aria-label="The VIP Connector — home">
        <Image
          className="brandLogo"
          src={logoSrc}
          alt="The VIP Connector"
          width={320}
          height={320}
          priority
        />
      </Link>

      <nav className="navLinks" aria-label="Main navigation">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              href={link.href}
              key={link.href}
              className={isActive ? "navActive" : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
