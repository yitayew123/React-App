// ============================================================
// StudentReports.jsx
// A report card showing pass/fail/pending analytics.
//
// PURPOSE:
//   - Presentational component — only displays data.
//   - Same visual family as <StudentDashboard /> (same card
//     language, same colors, same spacing).
//   - Designed to be loaded LAZILY by the parent (App.jsx),
//     so React Suspense can show a fallback while the module
//     is downloading.
//
// SUSPENSE INTEGRATION:
//   - No internal loading state.
//   - The parent wraps this component in <Suspense> with a
//     fallback; the fallback is shown until the chunk loads.
//   - Use a slowLazy helper or DevTools throttling to observe
//     the fallback during development.
//
// CONCEPTS COVERED IN THIS FILE:
//   1. Derived values (total, passRate) computed from data
//   2. CSS-only bar chart (no charting library)
//   3. Multiple .map() loops in one component
//   4. Dynamic className modifier driven by data
//      (e.g. "bar--green", "report-item__status--published")
//   5. Inline style for dynamic widths
// ============================================================

// Side-effect CSS import for this component.
import "./StudentReports.css";

// ============================================================
// REPORT_DATA — the three bars shown in the chart.
//   value → the number for this bar
//   color → modifier suffix (green, red, amber)
// ============================================================
const REPORT_DATA = [
  { id: "passed", label: "Passed Students", value: 90, color: "green" },
  { id: "failed", label: "Failed Students", value: 15, color: "red" },
  { id: "pending", label: "Pending Results", value: 15, color: "amber" },
];

// ============================================================
// RECENT_REPORTS — small activity feed at the bottom.
//   status → used as a modifier (published / draft / pending)
// ============================================================
const RECENT_REPORTS = [
  { id: 1, term: "Fall 2025", status: "Published", date: "2025-12-20" },
  { id: 2, term: "Spring 2026", status: "Draft", date: "2026-04-10" },
  { id: 3, term: "Summer 2026", status: "Pending", date: "2026-07-05" },
];

// ============================================================
// StudentReports component
// ============================================================
function StudentReports() {
  // ---------- Derived values ----------
  // Total of all report counts.
  const total = REPORT_DATA.reduce((sum, item) => sum + item.value, 0);

  // Pass rate as a percentage (0 if total is 0 — avoids NaN).
  const passRate = total ? Math.round((REPORT_DATA[0].value / total) * 100) : 0;

  // Largest value — used to scale bar widths so the tallest = 100%.
  const maxValue = Math.max(...REPORT_DATA.map((d) => d.value));

  return (
    // Outer wrapper; className links to .reports-card in CSS.
    <div className="reports-card">
      {/* ---------- HEADER: title + pass-rate badge ---------- */}
      <header className="reports-card__header">
        <div>
          <h2 className="reports-card__title">Student Reports</h2>
          <p className="reports-card__subtitle">
            Term summary · {total} results processed
          </p>
        </div>
        <span className="reports-card__passrate">
          {passRate}% <small>pass rate</small>
        </span>
      </header>

      {/* ---------- BAR CHART (CSS-only) ---------- */}
      <div className="reports-chart">
        {REPORT_DATA.map((item) => {
          // Each bar's width = value / maxValue (so the tallest = 100%).
          const width = `${(item.value / maxValue) * 100}%`;

          return (
            <div
              key={item.id}
              /* Dynamic modifier: "bar bar--green", "bar bar--red", … */
              className={`bar bar--${item.color}`}
            >
              <span className="bar__label">{item.label}</span>

              <div className="bar__track">
                {/* Inline width — value depends on runtime data */}
                <div className="bar__fill" style={{ width }} />
              </div>

              <span className="bar__value">{item.value}</span>
            </div>
          );
        })}
      </div>

      {/* ---------- RECENT REPORTS LIST ---------- */}
      <div className="reports-list">
        <h3 className="reports-list__title">Recent Reports</h3>

        <ul className="reports-list__items">
          {RECENT_REPORTS.map((report) => (
            <li key={report.id} className="report-item">
              <span className="report-item__term">{report.term}</span>

              {/* Dynamic status pill — modifier comes from status.toLowerCase() */}
              <span
                className={
                  "report-item__status report-item__status--" +
                  report.status.toLowerCase()
                }
              >
                {report.status}
              </span>

              <span className="report-item__date">{report.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Default export so App.jsx can lazily import it:
//     const StudentReports = lazy(() =>
//       import("./Component/StudentReports")
//     );
export default StudentReports;
