// ============================================================
// Component/Navbar.jsx
// Top navigation bar shared across every page.
//
// KEY IDEAS:
//   - NavLink adds an "active" class when its `to` matches
//     the current URL → we style .navbar__link.active.
//   - Link is used for internal links without active state.
//   - <a href> would cause a full page reload — wrong in a SPA.
// ============================================================

import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      {/* Brand — clicking returns to Home */}
      <Link to="/" className="navbar__brand">
        <span className="navbar__icon">⚛️</span>
        React Router Demo
      </Link>

      {/* Main navigation */}
      <nav className="navbar__nav">
        {/* `end` prevents "/" from being active on every route */}
        <NavLink to="/" end className="navbar__link">
          Home
        </NavLink>

        <NavLink to="/about" className="navbar__link">
          About
        </NavLink>

        <NavLink to="/contact" className="navbar__link">
          Contact
        </NavLink>

        <NavLink to="/dashboard" className="navbar__link">
          Dashboard
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
