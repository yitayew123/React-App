// ============================================================
// PropStudentCard.jsx
// CHILD component that receives props from ReactProp parent.
//
// RENAMED from StudentCard → PropStudentCard to avoid a
// conflict with the existing StudentCard.jsx in this project.
//
// PROPS RECEIVED (destructured in the function signature):
//   name       (string)   → student name
//   age        (number)   → student age
//   department (string)   → department name
//   skills     (array)    → list of skill strings
//   onSelect   (function) → callback fired on button click
//
// CONCEPTS COVERED:
//   1. Destructuring props in the parameter list
//   2. Rendering string/number props with {value}
//   3. Rendering an array with .map() + unique key
//   4. Passing a function prop to an onClick handler
//   5. Scoped class names with "prop-student-card" prefix
// ============================================================

// Side-effect CSS import for this child component.
import "./PropStudentCard.css";

// ============================================================
// PropStudentCard component
// The destructured parameter list:
//     ({ name, age, department, skills, onSelect })
// is shorthand for receiving props and pulling fields out.
//
// Long form:
//     function PropStudentCard(props) {
//       const { name, age, department, skills, onSelect } = props;
//       ...
//     }
// ============================================================
function PropStudentCard({ name, age, department, skills, onSelect }) {
  return (
    // Outer wrapper. The BEM prefix "prop-student-card" keeps
    // these styles scoped and prevents clashes with StudentCard.
    <div className="prop-student-card">
      {/* ============================================================
          HEADER: name + age badge
         ============================================================ */}
      <div className="prop-student-card__header">
        {/* Expression: renders the "name" prop */}
        <h3 className="prop-student-card__name">{name}</h3>

        {/* Expression: renders the "age" prop inside a badge */}
        <span className="prop-student-card__badge">Age: {age}</span>
      </div>

      {/* ============================================================
          BODY: department
         ============================================================ */}
      <p className="prop-student-card__detail">
        {/* Static label + expression for the department prop */}
        <span className="prop-student-card__label">Department:</span>{" "}
        {department}
      </p>

      {/* ============================================================
          SKILLS: render array with .map() + key
         ============================================================ */}
      <div className="prop-student-card__section">
        <h4 className="prop-student-card__section-title">Skills</h4>

        <ul className="prop-student-card__skills">
          {/* ------------------------------------------------
              .map() turns each string into an <li>.
              key MUST be unique and stable — we use the skill
              string itself because skills are unique here.
             ------------------------------------------------ */}
          {skills.map((skill) => (
            <li key={skill} className="prop-student-card__skill">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* ============================================================
          FOOTER: button that triggers the parent's callback
         ============================================================ */}
      <div className="prop-student-card__footer">
        {/* onSelect is the function prop from the parent.
            We pass its reference — no parentheses! */}
        <button
          className="prop-student-card__btn prop-student-card__btn--primary"
          onClick={onSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Default export so the parent can import it:
//     import PropStudentCard from "./PropStudentCard.jsx";
// ============================================================
export default PropStudentCard;
