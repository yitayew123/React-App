// ============================================================
// pages/Settings.jsx
// Renders inside the Dashboard's <Outlet /> when the URL is
// /dashboard/settings.
// ============================================================

import "./Settings.css";

function Settings() {
  return (
    <div className="sub-page settings-page">
      <h3 className="sub-page__title">⚙️ Settings Page</h3>
      <p className="sub-page__desc">
        Also a nested route — same layout, different content.
      </p>
    </div>
  );
}

export default Settings;
