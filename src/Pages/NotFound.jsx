// ============================================================
// pages/NotFound.jsx
// Catch-all 404 page for unmatched URLs.
// The <Route path="*" /> in App.jsx matches anything else.
// ============================================================

import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="page notfound-page">
      <div className="notfound-card">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">
          The page you are looking for does not exist.
        </p>

        <Link to="/" className="page__cta">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
