// ============================================================
// pages/Home.jsx
// Landing page — the "/" route.
// ============================================================

import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="page home-page">
      <h1 className="page__title">🏠 Home Page</h1>

      <p className="page__desc">
        Welcome to the React Router demo. Use the navigation above to explore
        each page.
      </p>

      {/* Call-to-action using <Link> (client-side navigation) */}
      <Link to="/dashboard" className="page__cta">
        Go to Dashboard →
      </Link>
    </section>
  );
}

export default Home;
