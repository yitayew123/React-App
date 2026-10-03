// ============================================================
// ReactProp.jsx
// Parent component that demonstrates PROPS in React.
//
// KEY IDEA:
//   Props = inputs passed from a PARENT to a CHILD component.
//   The parent owns the data → passes it down as attributes.
//   The child receives it as a single read-only "props" object.
//
// WHAT THIS FILE SHOWS:
//   1. Passing string props:     name={student1.name}
//   2. Passing number props:     age={student1.age}
//   3. Passing array props:      skills={student1.skills}
//   4. Passing function props:   onSelect={handleSelect}
//   5. Reusing one child with different data
//   6. Importing a sibling CSS file for layout
//   7. Importing a child component from another file
// ============================================================

// Side-effect CSS import for this parent component.
// Loads the styles used by className values below.
import "./ReactProp.css";

// Import the CHILD component.
// Named "PropStudentCard" (not "StudentCard") to avoid a
// clash with the existing StudentCard in this project.
import PropStudentCard from "./PropStudentCard.jsx";

// ============================================================
// Parent component: ReactProp
// ============================================================
function ReactProp() {
  // ---------- Student 1 data ----------
  // A plain JavaScript object holding all fields we want to
  // pass down. Keeping data in the parent is called "lifting
  // state up" — the parent is the single source of truth.
  const student1 = {
    name: "Abebe", // string prop
    age: 22, // number prop
    department: "Software Engineering", // string prop
    skills: ["React", "Python", "SQL"], // array prop
  };

  // ---------- Student 2 data ----------
  // Same shape as student1 → reuse the same child with
  // different values. This is the power of props.
  const student2 = {
    name: "Sara",
    age: 23,
    department: "Computer Science",
    skills: ["React", "JavaScript", "MongoDB"],
  };

  // ---------- Callback passed as a prop ----------
  // This is a FUNCTION REFERENCE (no parentheses).
  // Writing handleSelect() here would CALL it immediately.
  // Passing handleSelect lets the child invoke it later
  // (e.g., when the "Select" button is clicked).
  const handleSelect = () => {
    alert("Student Selected");
  };

  // ============================================================
  // JSX returned by the parent component.
  // ============================================================
  return (
    // Outer wrapper; className links to .container in ReactProp.css
    <div className="container">
      {/* Page heading — static text, no expression needed */}
      <h1 className="title">React Props Example</h1>

      {/* ------------------------------------------------
          FIRST STUDENT
          Each attribute becomes a KEY on the "props"
          object inside <PropStudentCard />.
         ------------------------------------------------ */}
      <PropStudentCard
        name={student1.name} /* string prop */
        age={student1.age} /* number prop */
        department={student1.department} /* string prop */
        skills={student1.skills} /* array prop */
        onSelect={handleSelect} /* function prop (no ()) */
      />

      {/* ------------------------------------------------
          SECOND STUDENT
          Same child, different prop values.
          "Components are functions of props."
         ------------------------------------------------ */}
      <PropStudentCard
        name={student2.name}
        age={student2.age}
        department={student2.department}
        skills={student2.skills}
        onSelect={handleSelect}
      />
    </div>
  );
}

// ============================================================
// Default export so App.jsx can import it:
//     import ReactProp from "./Components/ReactProp.jsx";
//     <ReactProp />
// ============================================================
export default ReactProp;
