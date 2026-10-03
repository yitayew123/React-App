// ============================================================
// App.jsx
// Root component — a DEMO SWITCHER that renders ONE demo at a time.
//
// WHY A SWITCHER?
//   - Multiple demos cannot render together (CSS clashes, portals
//     overlap, layouts fight).
//   - A switcher lets you preview each demo independently while
//     keeping a single App.jsx.
//
// HOW IT WORKS:
//   - `active` state stores the current demo key.
//   - DEMOS array maps keys → labels → rendered component.
//   - Clicking a sidebar item updates `active` and re-renders.
// ============================================================

import { useState } from "react";
import "./App.css";

// ---------- Core JSX demos ----------
import JSXExample from "./Component/JSXExample.jsx";
import JSXExpresion from "./Component/JSXExpresion.jsx";
import JSXAtribute from "./Component/JSXAtribute.jsx";
import JSXIfStatement from "./Component/JSXIfStatement.jsx";
import JSXEvent from "./Component/JSXEvent.jsx";

// ---------- Forms ----------
import JSXFormPartOne from "./Component/JSXFormPartOne.jsx";
import JSXFormPartTwo from "./Component/JSXFormPartTwo.jsx";
import JSXFormPartThree from "./Component/JSXFormPartThree.jsx";

// ---------- Components ----------
import Header from "./Component/Header.jsx";
import StudentCard from "./Component/StudentCard.jsx";
import Footer from "./Component/Footer.jsx";

// ---------- Props ----------
import ReactProp from "./Component/ReactProp.jsx";
import PropStudentCard from "./Component/PropStudentCard.jsx";

// ---------- Modals ----------
import ModalExample from "./Component/ModalExample.jsx";
import ModalExample2 from "./Component/ModalExample2.jsx";

// ============================================================
// LAUNCHER WRAPPERS
// Modals need a parent that controls open/close state.
// These tiny wrappers let the modal be its own "demo".
// ============================================================

// ---------- Launcher 1: success modal ----------
function ModalExampleLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="launcher">
      <h2 className="launcher-title">Modal Example 1 — Success</h2>
      <p className="launcher-desc">
        Simple confirmation modal rendered via portal.
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

// ---------- Launcher 2: real-world delete confirmation ----------
function ModalExample2Launcher() {
  // ---------- Mini student list ----------
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
      <h2 className="launcher-title">Modal Example 2 — Delete Confirmation</h2>
      <p className="launcher-desc">
        Real-world destructive action: type DELETE to confirm.
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

// ---------- Launcher for the classic Header + Card + Footer layout ----------
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

// ============================================================
// DEMO REGISTRY
// Every entry: { key, label, Component }
// Add new demos here — they appear in the sidebar automatically.
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
  { key: "prop-card", label: "Prop Student Card", Component: PropStudentCard },
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
];

// ============================================================
// App component — renders the sidebar + the active demo
// ============================================================
function App() {
  // Which demo is currently visible
  const [active, setActive] = useState(DEMOS[0].key);

  // Find the matching demo entry
  const current = DEMOS.find((d) => d.key === active);

  // Component to render (capital letter → JSX component)
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
        {/* Breadcrumb / current demo label */}
        <div className="app-content__header">
          <span className="app-content__badge">Current</span>
          <h2 className="app-content__title">{current.label}</h2>
        </div>

        {/* The active demo */}
        <div className="app-content__body">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
