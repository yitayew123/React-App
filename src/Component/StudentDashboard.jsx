// ============================================================
// StudentDashboard.jsx
// A compact KPI dashboard card showing student statistics.
//
// PURPOSE:
//   - Presentational component — only displays data.
//   - Designed to be loaded LAZILY by the parent (App.jsx),
//     so React Suspense can show a fallback while this module
//     is downloading.
//
// SUSPENSE INTEGRATION:
//   - This component does NOT include its own loading state.
//   - The parent wraps <StudentDashboard /> in <Suspense> with
//     a fallback; React shows the fallback until the code
//     chunk finishes loading.
//   - To see the fallback during development, the parent can
//     use a "slowLazy" helper (see App.jsx) or throttle the
//     network in DevTools.
//
// CONCEPTS COVERED IN THIS FILE:
//   1. Array + .map() with key
//   2. Dynamic className modifier via a template literal
//      (e.g. "stat stat--blue")
//   3. Derived value (activePercent) computed from base data
//   4. Inline style for a dynamic progress bar width
//   5. Accessibility: role="progressbar" + aria attributes
// ============================================================

// Side-effect CSS import for this component.
import "./StudentDashboard.css";

// ============================================================
// STATS — one object per KPI card.
//   id    → unique key for .map()
//   label → text shown under the number
//   value → the main number
//   color → modifier suffix used in className (blue, green, …)
// ============================================================
const STATS = [
  { id: "total", label: "Total Students", value: 120, color: "blue" },
  { id: "active", label: "Active Students", value: 105, color: "green" },
  { id: "depts", label: "Departments", value: 4, color: "purple" },
  { id: "pending", label: "Pending Reviews", value: 18, color: "amber" },
];

// ============================================================
// StudentDashboard component
// ============================================================
function StudentDashboard() {
  // ---------- Derived values ----------
  // We look up the total and active counts from STATS.
  // Deriving them here avoids duplicating numbers.
  const total = STATS[0].value;
  const active = STATS[1].value;

  // Percentage of active students (used by the progress bar).
  // Math.round prevents long decimals.
  const activePercent = Math.round((active / total) * 100);

  return (
    // Outer wrapper; className links to .dashboard-card in CSS.
    <div className="dashboard-card">
      {/* ---------- HEADER: title + subtitle + live badge ---------- */}
      <header className="dashboard-card__header">
        <div>
          <h2 className="dashboard-card__title">Student Dashboard</h2>
          <p className="dashboard-card__subtitle">
            Overview · 2025/2026 Academic Year
          </p>
        </div>
        <span className="dashboard-card__badge">Live</span>
      </header>

      {/* ---------- KPI GRID: 4 stat cards ---------- */}
      <div className="dashboard-card__grid">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            /* Dynamic modifier: "stat stat--blue", "stat stat--green" …
               The suffix comes from `stat.color`. */
            className={`stat stat--${stat.color}`}
          >
            <span className="stat__value">{stat.value}</span>
            <span className="stat__label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ---------- PROGRESS BAR: active students ---------- */}
      <div className="dashboard-card__progress">
        <div className="progress-row">
          <span className="progress-label">Active students</span>
          <span className="progress-value">{activePercent}%</span>
        </div>

        {/* The bar's width is set inline (dynamic value from JS).
            role + aria attributes improve screen-reader support. */}
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${activePercent}%` }}
            role="progressbar"
            aria-valuenow={activePercent}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Active students percentage"
          />
        </div>
      </div>
    </div>
  );
}

// Default export so App.jsx can lazily import it:
//     const StudentDashboard = lazy(() =>
//       import("./Component/StudentDashboard")
//     );
export default StudentDashboard;
