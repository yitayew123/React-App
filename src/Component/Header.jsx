// ============================================================
// Header.jsx
// Top navigation bar for the React Components Demo.
//
// CONCEPTS COVERED IN THIS FILE:
//   1.  Presentational component
//   2.  Variables for data (navItems, user)
//   3.  Dynamic attributes: href={item.href}
//   4.  className with ternary (active link)
//   5.  AND operator (&&) for optional greeting
//   6.  Array .map() with key for nav links
//   7.  Event attribute: onClick={handleToggle}
//   8.  Inline style object (optional)
//   9.  Custom data-* attributes
// ============================================================

// Side-effect CSS import for this component.
import "./Header.css";

// ============================================================
// Header component
// ============================================================
function Header() {
  // ---------- 1. Brand info ----------
  const brand = {
    name: "ReactLearn",
    tagline: "Components Demo",
    logo: "⚛️",
  };

  // ---------- 2. Navigation items (for list rendering) ----------
  const navItems = [
    { id: 1, label: "Home", href: "#home" },
    { id: 2, label: "Students", href: "#students" },
    { id: 3, label: "Courses", href: "#courses" },
    { id: 4, label: "About", href: "#about" },
  ];

  // ---------- 3. Current active link (for ternary className) ----------
  const activeLink = "#students"; // change to see active styling move

  // ---------- 4. Optional logged-in user (AND operator demo) ----------
  const user = { name: "Yitayew", role: "Admin" };
  // Set to null to hide the greeting:
  // const user = null;

  // ---------- 5. Event handler (event attribute) ----------
  const handleThemeToggle = () => {
    alert("Theme toggle clicked!");
  };

  return (
    // Custom data-* attributes readable in JS via element.dataset.*
    <header className="site-header" data-brand={brand.name}>
      {/* ============================================================
          LEFT: logo + brand name
         ============================================================ */}
      <div className="site-header__brand">
        {/* Expression: {brand.logo} renders an emoji */}
        <span className="site-header__logo" aria-hidden="true">
          {brand.logo}
        </span>

        <div className="site-header__brand-text">
          <h1 className="site-header__title">{brand.name}</h1>
          <p className="site-header__tagline">{brand.tagline}</p>
        </div>
      </div>

      {/* ============================================================
          CENTER: navigation links (.map with key)
         ============================================================ */}
      <nav className="site-header__nav" aria-label="Main navigation">
        <ul className="site-header__nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              {/* Dynamic attribute + dynamic className (ternary) */}
              <a
                href={item.href}
                className={
                  item.href === activeLink
                    ? "site-header__link site-header__link--active"
                    : "site-header__link"
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ============================================================
          RIGHT: greeting + theme button
         ============================================================ */}
      <div className="site-header__actions">
        {/* AND operator: greeting only renders if user exists */}
        {user && (
          <span className="site-header__greeting">
            Hi, <strong>{user.name}</strong>
            <span className="site-header__role">({user.role})</span>
          </span>
        )}

        {/* Event attribute: onClick passes function reference */}
        <button
          className="site-header__btn"
          onClick={handleThemeToggle}
          title="Toggle theme"
        >
          🌙 Theme
        </button>
      </div>
    </header>
  );
}

// Default export so App.jsx can import it:
//     import Header from "./Component/Header.jsx";
export default Header;
