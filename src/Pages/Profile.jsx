// ============================================================
// pages/Profile.jsx
// Renders inside the Dashboard's <Outlet /> when the URL is
// /dashboard/profile.
// ============================================================

import "./Profile.css";

function Profile() {
  return (
    <div className="sub-page">
      <h3 className="sub-page__title">👤 Profile Page</h3>
      <p className="sub-page__desc">
        This is a nested route rendered inside the Dashboard's{" "}
        <code>&lt;Outlet /&gt;</code>.
      </p>
    </div>
  );
}

export default Profile;
