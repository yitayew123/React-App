// ============================================================
// JSXExpresion.jsx
// React component that demonstrates JSX EXPRESSIONS.
// JSX expressions are JavaScript code written inside { }.
// Only EXPRESSIONS (things that return a value) are allowed.
// ============================================================

// Side-effect CSS import (no variable, no name clash).
// This simply loads the stylesheet for this component.
import "./JSXExpresion.css";

// Functional component — a JS function that returns JSX.
// Component name MUST start with a capital letter (React rule).
function JSXExpresion() {
  // ---------- 1. Variable expression ----------
  // A string variable; rendered later as {name}.
  const name = "Yitayew";

  // ---------- 2. Numeric expression ----------
  // A number; can be used in math inside JSX, e.g. {age + 1}.
  const age = 30;

  // ---------- 3. Helper function returning a value ----------
  // Its return value can be injected with {getStatus()}.
  // Only EXPRESSIONS are allowed in {} — not statements.
  function getStatus() {
    // Ternary expression → returns "Adult" or "Minor".
    return age >= 18 ? "Adult" : "Minor";
  }

  // ============================================================
  // JSX returned by the component.
  // Everything inside ( ... ) is the UI this component renders.
  // ============================================================
  return (
    // Outer wrapper <div> — one parent element required.
    // className links to JSXExpresion.css.
    <div className="app-container">
      {/* Static heading — plain text, no expression needed. */}
      <h1 className="app-title" title="App Title">React JSX Expressions</h1>

      {/* ------------------------------------------------
          1) Variable expression: {name}
          Renders the value of the "name" variable.
         ------------------------------------------------ */}
      <p className="app-text">
        <span className="label">Name:</span> {name}
      </p>

      {/* ------------------------------------------------
          2) Math expression: {age + 1}
          JavaScript is evaluated at render time → 31.
         ------------------------------------------------ */}
      <p className="app-text">
        <span className="label">Age Next Year:</span> {age + 1}
      </p>

      {/* ------------------------------------------------
          3) Function call expression: {getStatus()}
          The function runs and its return value is rendered.
         ------------------------------------------------ */}
      <p className="app-text">
        <span className="label">Status:</span> {getStatus()}
      </p>

      {/* ------------------------------------------------
          4) String method expression: {name.toUpperCase()}
          Any JS expression that returns a value is allowed.
         ------------------------------------------------ */}
      <p className="app-text">
        <span className="label">Name Uppercase:</span> {name.toUpperCase()}
      </p>

      {/* ------------------------------------------------
          5) Ternary expression for conditional rendering.
          - Attribute expression: dynamic className based on age.
          - Child expression:     shows one of two strings.
         ------------------------------------------------ */}
      <p
        className={
          // Dynamic class: "status eligible" OR "status not-eligible".
          age >= 18 ? "status eligible" : "status not-eligible"
        }
      >
        {/* Ternary: condition ? valueIfTrue : valueIfFalse */}
        {age >= 18 ? "Eligible to Vote" : "Not Eligible to Vote"}
      </p>
    </div>
  );
}

// ============================================================
// Default export so it can be imported elsewhere.
// Example in App.jsx:
//     import JSXExpresion from "./Component/JSXExpresion.jsx";
//     <JSXExpresion />
// ============================================================
export default JSXExpresion;
