// ============================================================
// JSXAtribute.jsx
// Demonstrates JSX ATTRIBUTES (also called "props" on elements).
//
// KEY IDEAS:
//   - Attributes in JSX look like HTML attributes
//     but use camelCase for DOM properties.
//   - Static attributes:  title="Hello"
//   - Dynamic attributes: src={imageUrl}, value={username}
//   - Special rules:
//       class      → className
//       for        → htmlFor
//       style      → {{ }} (object, camelCase keys)
//       events     → onClick, onChange, etc.
//       booleans   → disabled={true} or simply disabled
//       custom     → data-* and aria-* allowed as-is
//   - Props passed to components become the component's
//     "props" object: function Student(props) { props.name }
// ============================================================

// React import (needed in some setups, not required with new JSX transform).
import React from "react";

// Side-effect CSS import for this component.
import "./JSXAtribute.css";

// ============================================================
// Child Component: Student
// Receives attributes from the parent as "props".
//   <Student name="Abebe" department="Software Engineering" />
//   → props = { name: "Abebe", department: "Software Engineering" }
// ============================================================
function Student(props) {
  return (
    // className links to .student-card in JSXAtribute.css
    <div className="student-card">
      {/* props.name → value passed by parent */}
      <h2>Student Name: {props.name}</h2>

      {/* props.department → value passed by parent */}
      <p>Department: {props.department}</p>
    </div>
  );
}

// ============================================================
// Parent Component: JSXAtribute
// Renders examples of every common JSX attribute type.
// ============================================================
function JSXAtribute() {
  // ---------- Dynamic attribute values ----------
  // Used later as: src={imageUrl}
  const imageUrl = "https://via.placeholder.com/200";

  // Used later as: value={username}
  const username = "Yitayew Solomon";

  // ---------- Event handler function ----------
  // Used later as: onClick={handleClick}
  // NOTE: We pass the FUNCTION REFERENCE, not handleClick().
  const handleClick = () => {
    alert("Welcome to React JSX Attributes");
  };

  return (
    // Outer wrapper; className links to .container in CSS.
    <div className="container">
      {/* ------------------------------------------------
          className + title attributes
          - className replaces "class" (class is reserved in JS).
          - title is a normal HTML attribute (tooltip on hover).
         ------------------------------------------------ */}
      <h1 className="title" title="React JSX Attributes Example">
        React JSX Attributes
      </h1>

      {/* ------------------------------------------------
          Dynamic attribute: src={imageUrl}
          Curly braces inject a JavaScript VALUE.
          alt is required for accessibility.
          width="200" — static string attribute.
         ------------------------------------------------ */}
      <img src={imageUrl} alt="React Example" width="50" />

      <br />

      {/* ------------------------------------------------
          htmlFor attribute
          In JSX, use htmlFor instead of HTML's "for"
          because "for" is a reserved keyword in JavaScript.
         ------------------------------------------------ */}
      <label htmlFor="fullname">Full Name:</label>

      <input
        id="fullname"
        type="text"
        placeholder="Enter your name"
        value={username} /* controlled value from state/variable */
        readOnly /* boolean attribute shorthand */
      />

      <br />
      <br />

      {/* ------------------------------------------------
          style attribute
          In JSX, style takes a JavaScript OBJECT:
             style={{ color: "blue", fontSize: "20px" }}
          - Outer { } = JSX expression
          - Inner { } = JavaScript object
          - Keys are camelCase: fontSize (not font-size)
         ------------------------------------------------ */}
      <p
        style={{
          color: "blue",
          fontSize: "20px",
        }}
      >
        Learning React JSX Attributes
      </p>

      {/* ------------------------------------------------
          Boolean attribute
          disabled={true} is same as just "disabled".
          false → attribute omitted from DOM.
         ------------------------------------------------ */}
      <input type="text" disabled={true} placeholder="Disabled Input" />

      <br />
      <br />

      {/* ------------------------------------------------
          Event attribute
          onClick={handleClick} passes the function reference.
          NEVER write onClick={handleClick()} — that would
          call it immediately during render.
         ------------------------------------------------ */}
      <button onClick={handleClick}>Click Me</button>

      <br />
      <br />

      {/* ------------------------------------------------
          Custom data-* attributes
          Allowed in JSX exactly like HTML.
          Read in JS via: element.dataset.id / dataset.role
         ------------------------------------------------ */}
      <div data-id="101" data-role="student">
        Custom Data Attributes
      </div>

      <br />

      {/* ------------------------------------------------
          Component attributes (props)
          Anything you pass to <Student ... /> becomes
          a property of the "props" object inside Student.
         ------------------------------------------------ */}
      <Student name="Abebe" department="Software Engineering" />
    </div>
  );
}

// Default export so App.jsx can import this component.
export default JSXAtribute;
