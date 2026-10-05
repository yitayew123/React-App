// ============================================================
// App.jsx
// Root component — DEMO SWITCHER for all JSX demos.
// Renders ONE demo at a time from a sidebar menu.
//
// ⭐ SUSPENSE STRATEGY
//   - Only StudentDashboard and StudentReports are lazy-loaded
//     (using a slowLazy helper so the fallback is VISIBLE).
//   - Every other demo uses a normal static import — no spinner.
//   - The <Suspense> wrapper is harmless for non-lazy children.
// ============================================================

import React, { useState, lazy, Suspense } from "react";
import "./App.css";

// ============================================================
// STATIC IMPORTS — these load instantly, no Suspense fallback.
// ============================================================

// ---------- Core JSX demos ----------
import JSXExample from "./Component/JSXExample";
import JSXExpresion from "./Component/JSXExpresion";
import JSXAtribute from "./Component/JSXAtribute";
import JSXIfStatement from "./Component/JSXIfStatement";
import JSXEvent from "./Component/JSXEvent";

// ---------- Layout components ----------
import Header from "./Component/Header";
import StudentCard from "./Component/StudentCard";
import Footer from "./Component/Footer";

// ---------- Props demos ----------
import PropStudentCard from "./Component/PropStudentCard";
import ReactProp from "./Component/ReactProp";

// ---------- Forms ----------
import JSXFormPartOne from "./Component/JSXFormPartOne";
import JSXFormPartTwo from "./Component/JSXFormPartTwo";
import JSXFormPartThree from "./Component/JSXFormPartThree";

// ---------- Modals ----------
import ModalExample from "./Component/ModalExample";
import ModalExample2 from "./Component/ModalExample2";

//  ⭐ NEW: import the router demo (static — no Suspense needed)
import RouterDemo from "./Component/RouterDemo";

// At the top of App.jsx, with the other static imports:
import HookDemo from "./Component/Hook";

// ============================================================
// SLOW LAZY HELPER
//
// WHAT IT DOES:
//   Wraps a dynamic import with a minimum delay so the
//   Suspense fallback stays visible for a fixed time.
//
// WHY:
//   On a fast machine a chunk loads in <20 ms and the
//   fallback becomes invisible. This guarantees the spinner
//   shows for at least `ms` milliseconds.
//
// USE:
//   Teaching / demo purposes ONLY. In production you would
//   use plain `lazy(() => import(...))`.
// ============================================================
function slowLazy(importFn, ms = 1200) {
  return lazy(() =>
    Promise.all([
      importFn(),
      new Promise((resolve) => setTimeout(resolve, ms)),
    ]).then(([moduleExports]) => moduleExports),
  );
}

// ============================================================
// LAZY IMPORTS — only the two dashboards.
// These are the ONLY demos that will show the spinner.
// ============================================================
const StudentDashboard = slowLazy(
  () => import("./Component/StudentDashboard"),
  1200,
);

const StudentReports = slowLazy(
  () => import("./Component/StudentReports"),
  1200,
);

// ============================================================
// LOADING FALLBACK
// Shown by <Suspense> while a lazy chunk is downloading.
// ============================================================
function LoadingFallback({ label }) {
  return (
    <div className="loading-fallback">
      <div className="loading-spinner" aria-hidden="true" />
      <p className="loading-text">
        Loading <strong>{label}</strong>…
      </p>
    </div>
  );
}

// ============================================================
// ERROR BOUNDARY
// Catches errors thrown while a lazy chunk is loading.
// Without it, one error unmounts the entire React tree.
// ============================================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Demo crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <h3>Something went wrong.</h3>
          <p>{String(this.state.error)}</p>
          <button
            className="launcher-btn launcher-btn--primary"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// LAUNCHER WRAPPERS
//
// WHY:
//   Some components (modals, PropStudentCard) need props or
//   a parent that controls open/close state. The launchers
//   supply those so the components can be previewed as demos.
// ============================================================

// ---------- Launcher 1: success modal ----------
function ModalExampleLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="launcher">
      <h2 className="launcher-title">Modal Example — Success</h2>
      <p className="launcher-desc">
        Simple confirmation modal rendered via React portal.
      </p>

      <button
        className="launcher-btn launcher-btn--primary"
        onClick={() => setOpen(true)}
      >
        Register Student
      </button>

      {open && (
        <ModalExample
          studentName="Abebe Kebede"
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

// ---------- Launcher 2: delete confirmation modal ----------
function ModalExample2Launcher() {
  const [students, setStudents] = useState([
    { id: 1, name: "Abebe Kebede", department: "Software Engineering" },
    { id: 2, name: "Sara Tesfaye", department: "Computer Science" },
    { id: 3, name: "Hanna Bekele", department: "Information Systems" },
  ]);
  const [toDelete, setToDelete] = useState(null);
  const [toast, setToast] = useState("");

  const handleConfirmDelete = (student) =>
    new Promise((resolve) => {
      setTimeout(() => {
        setStudents((prev) => prev.filter((s) => s.id !== student.id));
        setToDelete(null);
        setToast(`"${student.name}" was deleted.`);
        setTimeout(() => setToast(""), 3000);
        resolve();
      }, 1200);
    });

  return (
    <div className="launcher">
      <h2 className="launcher-title">Modal Example — Delete Confirmation</h2>
      <p className="launcher-desc">
        Destructive action: type DELETE to confirm.
      </p>

      <ul className="launcher-list">
        {students.map((s) => (
          <li key={s.id} className="launcher-list-item">
            <span>{s.name}</span>
            <button
              className="launcher-btn launcher-btn--danger"
              onClick={() => setToDelete(s)}
            >
              Delete
            </button>
          </li>
        ))}
        {students.length === 0 && (
          <li className="launcher-empty">No students left 🎉</li>
        )}
      </ul>

      {toDelete && (
        <ModalExample2
          student={toDelete}
          onClose={() => setToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {toast && <div className="launcher-toast">{toast}</div>}
    </div>
  );
}

// ---------- Launcher 3: layout demo ----------
function LayoutLauncher() {
  return (
    <div className="layout-demo">
      <Header />
      <main className="layout-main">
        <StudentCard />
      </main>
      <Footer />
    </div>
  );
}

// ---------- Launcher 4: PropStudentCard demo ----------
function PropStudentCardLauncher() {
  const student1 = {
    name: "Abebe Kebede",
    age: 22,
    department: "Software Engineering",
    skills: ["React", "Python", "SQL"],
  };

  const student2 = {
    name: "Sara Tesfaye",
    age: 23,
    department: "Computer Science",
    skills: ["React", "JavaScript", "MongoDB"],
  };

  const handleSelect = (name) => alert(`Student Selected: ${name}`);

  return (
    <div className="prop-launcher">
      <h2 className="launcher-title">Prop Student Card — Live Demo</h2>
      <p className="launcher-desc">
        The same child component reused with different props.
      </p>

      <div className="prop-launcher__grid">
        <PropStudentCard
          name={student1.name}
          age={student1.age}
          department={student1.department}
          skills={student1.skills}
          onSelect={() => handleSelect(student1.name)}
        />

        <PropStudentCard
          name={student2.name}
          age={student2.age}
          department={student2.department}
          skills={student2.skills}
          onSelect={() => handleSelect(student2.name)}
        />
      </div>
    </div>
  );
}

// ============================================================
// DEMO REGISTRY
//
// key       → unique id
// label     → sidebar text
// Component → the component to render
// lazy      → true for demos that use React.lazy (Suspense)
// ============================================================
const DEMOS = [
  { key: "jsx-example", label: "JSX Example", Component: JSXExample },
  { key: "jsx-expression", label: "JSX Expressions", Component: JSXExpresion },
  { key: "jsx-attribute", label: "JSX Attributes", Component: JSXAtribute },
  { key: "jsx-if", label: "JSX If Statement", Component: JSXIfStatement },
  { key: "jsx-event", label: "JSX Events", Component: JSXEvent },
  { key: "form-1", label: "Form Part 1 — Basic", Component: JSXFormPartOne },
  { key: "form-2", label: "Form Part 2 — Full", Component: JSXFormPartTwo },
  {
    key: "form-3",
    label: "Form Part 3 — Stepper",
    Component: JSXFormPartThree,
  },
  { key: "layout", label: "Header + Card + Footer", Component: LayoutLauncher },
  { key: "props", label: "Props", Component: ReactProp },
  {
    key: "prop-card",
    label: "Prop Student Card",
    Component: PropStudentCardLauncher,
  },
  {
    key: "modal-1",
    label: "Modal 1 — Success",
    Component: ModalExampleLauncher,
  },
  {
    key: "modal-2",
    label: "Modal 2 — Delete",
    Component: ModalExample2Launcher,
  },

  // ⭐ Only these two use lazy loading → only these show the spinner.
  { key: "dashboard", label: "Student Dashboard", Component: StudentDashboard },
  { key: "reports", label: "Student Reports", Component: StudentReports },
  { key: "router", label: "React Router", Component: RouterDemo },
  { key: "hooks", label: "React Hooks", Component: HookDemo },
];

// ============================================================
// App — the switcher
// ============================================================
function App() {
  const [active, setActive] = useState(DEMOS[0].key);

  const current = DEMOS.find((d) => d.key === active);
  const ActiveComponent = current.Component;

  return (
    <div className="app-shell">
      {/* ---------- SIDEBAR ---------- */}
      <aside className="app-sidebar">
        <h1 className="app-brand">
          <span className="app-brand__icon">⚛️</span>
          React Demos
        </h1>

        <nav className="app-nav">
          {DEMOS.map((demo) => (
            <button
              key={demo.key}
              className={
                "app-nav__item" + (demo.key === active ? " is-active" : "")
              }
              onClick={() => setActive(demo.key)}
            >
              {demo.label}
            </button>
          ))}
        </nav>

        <p className="app-sidebar__footer">
          {DEMOS.length} demos · click to switch
        </p>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="app-content">
        <div className="app-content__header">
          <span className="app-content__badge">Current</span>
          <h2 className="app-content__title">{current.label}</h2>
        </div>

        {/* ============================================================
            Suspense + ErrorBoundary only matter for lazy demos.
            Non-lazy demos render synchronously and skip the
            fallback entirely — no spinner for them.
           ============================================================ */}
        <div className="app-content__body">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback label={current.label} />}>
              <ActiveComponent key={current.key} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default App;
