// ============================================================
// pages/About.jsx
// Static informational page.
// ============================================================

import "./About.css";

function About() {
  return (
    <section className="page about-page">
      <h1 className="page__title">ℹ️ About Page</h1>

      <p className="page__desc">
        This demo shows how to build a multi-page app using React Router v6.
        Each page is a plain React component.
      </p>

      <ul className="about-list">
        <li>🏠 Home</li>
        <li>ℹ️ About</li>
        <li>📞 Contact (with programmatic navigation)</li>
        <li>📊 Dashboard with nested routes</li>
        <li>👤 User page by dynamic ID</li>
        <li>🚫 404 Not Found fallback</li>
      </ul>
    </section>
  );
}

export default About;
