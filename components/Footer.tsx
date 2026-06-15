import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/talent", label: "Talent" },
  { href: "/learning", label: "Learning" },
  { href: "/operators", label: "Operators" }
];

export default function Footer() {
  return (
    <footer className="siteFooter">
      <Link href="/" className="footerBrand" aria-label="The VIP Connector — home">
        <Image src="/vip-connector-logo-2.webp" alt="The VIP Connector" width={220} height={120} />
      </Link>

      <nav className="footerLinks" aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <Link href={link.href} key={link.href}>{link.label}</Link>
        ))}
      </nav>

      <p>© 2025 The VIP Connector. All rights reserved.</p>
    </footer>
  );
}
