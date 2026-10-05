// ============================================================
// pages/Dashboard.jsx
// Demonstrates NESTED ROUTES with <Outlet />.
//
// KEY IDEA:
//   Dashboard is the LAYOUT. It renders its own sub-nav plus
//   an <Outlet /> — that's where the matched CHILD route
//   (Profile or Settings) renders.
//
//   URL /dashboard          → Dashboard only
//   URL /dashboard/profile  → Dashboard + Profile
//   URL /dashboard/settings → Dashboard + Settings
// ============================================================

import { Link, NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="page dashboard-page">
      <h1 className="page__title">📊 Dashboard</h1>

      <p className="page__desc">
        Choose a sub-page. The child renders inside the same layout below.
      </p>

      {/* Sub-navigation inside the Dashboard */}
      <nav className="dashboard-nav">
        <NavLink to="profile" className="dashboard-nav__link">
          Profile
        </NavLink>
        <NavLink to="settings" className="dashboard-nav__link">
          Settings
        </NavLink>
      </nav>

      {/* Child route renders HERE */}
      <div className="dashboard-outlet">
        <Outlet />
      </div>

      <Link to="/" className="page__cta">
        ← Home
      </Link>
    </section>
  );
}

export default Dashboard;
