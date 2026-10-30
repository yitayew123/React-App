// Displays student statistics and an active-student progress bar.
import "./StudentDashboard.css";

// Data used to render the statistic cards.
const STATS = [
  { id: "total", label: "Total Students", value: 120, color: "blue" },
  { id: "active", label: "Active Students", value: 105, color: "green" },
  { id: "depts", label: "Departments", value: 4, color: "purple" },
  { id: "pending", label: "Pending Reviews", value: 18, color: "amber" },
];

function StudentDashboard() {
  // Read counts from the stats data to calculate the active percentage.
  const total = STATS[0].value;
  const active = STATS[1].value;

  const activePercent = Math.round((active / total) * 100);

  return (
    <div className="dashboard-card">
      <header className="dashboard-card__header">
        <div>
          <h2 className="dashboard-card__title">Student Dashboard</h2>
          <p className="dashboard-card__subtitle">
            Overview · 2025/2026 Academic Year
          </p>
        </div>
        <span className="dashboard-card__badge">Live</span>
      </header>

      <div className="dashboard-card__grid">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            className={`stat stat--${stat.color}`}
          >
            <span className="stat__value">{stat.value}</span>
            <span className="stat__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-card__progress">
        <div className="progress-row">
          <span className="progress-label">Active students</span>
          <span className="progress-value">{activePercent}%</span>
        </div>

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

export default StudentDashboard;
