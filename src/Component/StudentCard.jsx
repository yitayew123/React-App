// ============================================================
// StudentCard.jsx
// Displays a single student's information inside a styled card.
//
// CONCEPTS COVERED IN THIS FILE:
//   1.  Presentational component (only shows data)
//   2.  JSX expressions: {value}
//   3.  Dynamic attributes: src={url}, alt={name}
//   4.  className with modifiers: "badge badge--active"
//   5.  Ternary conditional: status ? "Active" : "Inactive"
//   6.  AND operator (&&) for optional sections
//   7.  Array .map() with key for lists (courses)
//   8.  Custom data-* attributes
//   9.  Boolean attribute (disabled / hidden)
//   10. Inline style as a JS object
// ============================================================

// Side-effect CSS import for this component.
import "./StudentCard.css";

// ============================================================
// StudentCard component
// ============================================================
function StudentCard() {
  // ---------- 1. Student data (hardcoded for demo) ----------
  // In a real app, these would come in as props.
  const student = {
    id: "STU-2026-014",
    name: "Abebe Kebede",
    department: "Software Engineering",
    year: 3,
    gpa: 3.75,
    isActive: true,
    avatar: "https://i.pravatar.cc/120?img=12",
    email: "abebe@example.com",
  };

  // ---------- 2. Array of courses (for list rendering) ----------
  const courses = [
    { code: "SE-301", title: "React Fundamentals" },
    { code: "SE-302", title: "Advanced JavaScript" },
    { code: "SE-303", title: "Web APIs" },
  ];

  // ---------- 3. Expression: compute status once ----------
  // Ternary returns one of two strings.
  const statusLabel = student.isActive ? "Active" : "Inactive";

  // ---------- 4. Expression: compute GPA color ----------
  // Helps us demonstrate style attribute with dynamic values.
  const gpaColor =
    student.gpa >= 3.5 ? "#166534" : student.gpa >= 3.0 ? "#92400e" : "#991b1b";

  return (
    // Outer card wrapper.
    // data-* attributes are custom attributes readable in JS:
    //   element.dataset.studentId  → "STU-2026-014"
    <div
      className="student-card"
      data-student-id={student.id}
      data-active={student.isActive}
    >
      {/* ============================================================
          HEADER: avatar + name + status badge
         ============================================================ */}
      <div className="student-card__header">
        {/* Dynamic attribute: src={student.avatar}, alt={student.name} */}
        <img
          className="student-card__avatar"
          src={student.avatar}
          alt={student.name}
          width="64"
          height="64"
        />

        <div className="student-card__identity">
          <h3 className="student-card__name">{student.name}</h3>

          {/* Dynamic className with modifier (ternary) */}
          <span
            className={
              student.isActive
                ? "student-card__badge student-card__badge--active"
                : "student-card__badge student-card__badge--inactive"
            }
          >
            {/* Ternary: shows "Active" or "Inactive" */}
            {statusLabel}
          </span>
        </div>
      </div>

      {/* ============================================================
          BODY: student details (definition list)
         ============================================================ */}
      <ul className="student-card__details">
        {/* Variable expression */}
        <li>
          <span className="student-card__label">ID:</span> {student.id}
        </li>

        {/* Variable expression */}
        <li>
          <span className="student-card__label">Department:</span>{" "}
          {student.department}
        </li>

        {/* Math expression: year + ordinal */}
        <li>
          <span className="student-card__label">Year:</span> Year {student.year}
        </li>

        {/* Inline style as a JS object + dynamic color */}
        <li>
          <span className="student-card__label">GPA:</span>{" "}
          <span style={{ color: gpaColor, fontWeight: 700 }}>
            {student.gpa.toFixed(2)}
          </span>
        </li>

        {/* Optional field: only render if email exists (AND operator) */}
        {student.email && (
          <li>
            <span className="student-card__label">Email:</span>{" "}
            <a className="student-card__link" href={`mailto:${student.email}`}>
              {student.email}
            </a>
          </li>
        )}
      </ul>

      {/* ============================================================
          COURSES: list rendering with .map() and key
         ============================================================ */}
      <div className="student-card__section">
        <h4 className="student-card__section-title">Enrolled Courses</h4>

        <ul className="student-card__course-list">
          {/* key must be unique and stable (use course.code) */}
          {courses.map((course) => (
            <li key={course.code} className="student-card__course">
              <span className="student-card__course-code">{course.code}</span>
              <span className="student-card__course-title">{course.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ============================================================
          FOOTER: action button (event attribute + boolean)
         ============================================================ */}
      <div className="student-card__footer">
        {/* Event attribute: onClick passes a function reference */}
        <button
          className="student-card__btn student-card__btn--primary"
          onClick={() => alert(`Viewing ${student.name}'s profile`)}
        >
          View Profile
        </button>

        {/* Boolean attribute — button disabled when student is inactive */}
        <button
          className="student-card__btn student-card__btn--ghost"
          disabled={!student.isActive}
        >
          Message
        </button>
      </div>
    </div>
  );
}

// Default export so App.jsx can import it:
//     import StudentCard from "./Component/StudentCard.jsx";
export default StudentCard;
