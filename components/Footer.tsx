import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academy", label: "Academy" },
  { href: "/talents", label: "Talents" },
  { href: "/players", label: "Players" },
  { href: "/games", label: "Games" },
  { href: "/members", label: "Members" }
];

export default function Footer() {
  return (
    <footer className="siteFooter">
      <Link href="/" className="footerBrand" aria-label="VIP Connector home">
        <Image src="/vip-connector-logo-2.webp" alt="The VIP Connector" width={220} height={120} />
      </Link>

      <nav className="footerLinks" aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <Link href={link.href} key={link.href}>{link.label}</Link>
        ))}
      </nav>

      <p>© 2026 The VIP Connector. All rights reserved.</p>
    </footer>
  );
}
