// ============================================================
// Footer.jsx
// Single-row footer — mirrors the Header layout:
//   LEFT   → brand
//   CENTER → links
//   RIGHT  → socials + copyright
// ============================================================

import "./Footer.css";

function Footer() {
  // Brand
  const brand = { name: "ReactLearn" };

  // Flat link list (horizontal)
  const links = [
    { label: "Home", href: "#home" },
    { label: "Courses", href: "#courses" },
    { label: "Students", href: "#students" },
    { label: "About", href: "#about" },
  ];

  // Socials
  const socials = [
    { id: "gh", label: "GitHub", icon: "🐙", href: "https://github.com" },
    { id: "tw", label: "Twitter", icon: "🐦", href: "https://twitter.com" },
    { id: "li", label: "LinkedIn", icon: "💼", href: "https://linkedin.com" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* LEFT: brand */}
      <div className="site-footer__brand">{brand.name}</div>

      {/* CENTER: links */}
      <nav className="site-footer__nav" aria-label="Footer navigation">
        <ul className="site-footer__links">
          {links.map((link) => (
            <li key={link.label}>
              <a className="site-footer__link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* RIGHT: socials + copyright */}
      <div className="site-footer__actions">
        <ul className="site-footer__socials">
          {socials.map((s) => (
            <li key={s.id}>
              <a
                className="site-footer__social"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <span aria-hidden="true">{s.icon}</span>
              </a>
            </li>
          ))}
        </ul>
        <span className="site-footer__copy">© {year}</span>
      </div>
    </footer>
  );
}

export default Footer;
