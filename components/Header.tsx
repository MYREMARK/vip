import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/academy", label: "Academy" },
  { href: "/talents", label: "Talents" }
];

export default function Header() {
  return (
    <header className="siteHeader">
      <Link href="/" className="brand" aria-label="VIP Connector home">
        <Image src="/vip-connector-logo.png" alt="The VIP Connector" width={150} height={150} priority />
      </Link>

      <nav className="navLinks" aria-label="Main navigation">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>{link.label}</Link>
        ))}
      </nav>
    </header>
  );
}
