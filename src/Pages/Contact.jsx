// ============================================================
// pages/Contact.jsx
// Demonstrates PROGRAMMATIC NAVIGATION with useNavigate.
//
// KEY IDEA:
//   useNavigate() returns a function you can call from any
//   event handler to change the URL — no <Link> needed.
// ============================================================

import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {
  // useNavigate returns the navigate function.
  const navigate = useNavigate();

  return (
    <section className="page contact-page">
      <h1 className="page__title">📞 Contact Page</h1>

      <p className="page__desc">
        Click the button below to navigate to a user page using the{" "}
        <code>useNavigate</code> hook.
      </p>

      <div className="contact-actions">
        {/* Forward navigation to a dynamic route */}
        <button
          className="btn btn--primary"
          onClick={() => navigate("/user/101")}
        >
          View User #101
        </button>

        {/* Back navigation — like the browser back button */}
        <button className="btn btn--ghost" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    </section>
  );
}

export default Contact;
