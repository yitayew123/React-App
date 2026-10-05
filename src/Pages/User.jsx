// ============================================================
// pages/User.jsx
// Demonstrates DYNAMIC ROUTE PARAMS with useParams.
//
// KEY IDEA:
//   A route like "/user/:id" makes "id" a URL parameter.
//   useParams() returns { id: "101" } for /user/101.
// ============================================================

import { useParams, Link } from "react-router-dom";
import "./User.css";

function User() {
  // Read the :id value from the URL.
  const { id } = useParams();

  return (
    <section className="page user-page">
      <h1 className="page__title">👤 User Profile</h1>

      <div className="user-card">
        <div className="user-card__avatar">#{id}</div>

        <div className="user-card__info">
          <span className="user-card__label">User ID</span>
          <span className="user-card__value">{id}</span>
        </div>
      </div>

      <p className="page__desc">
        This ID came from the URL: <code>/user/{id}</code>
      </p>

      <Link to="/contact" className="page__cta">
        ← Back to Contact
      </Link>
    </section>
  );
}

export default User;
