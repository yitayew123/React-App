// ============================================================
// JSXFormPartOne.jsx
// Demonstrates a BASIC CONTROLLED FORM in React.
//
// KEY IDEAS:
//   - A controlled input stores its value in React state.
//   - The `value` prop is bound to the state variable.
//   - The `onChange` handler updates that state on every keystroke.
//   - A form's `onSubmit` handler calls event.preventDefault() to
//     stop the browser from reloading the page.
//   - Validation happens inside the submit handler BEFORE processing.
//
// CONTROLLED vs UNCONTROLLED:
//   Controlled   → React state owns the value (this file).
//   Uncontrolled → DOM owns the value (used via useRef).
// ============================================================

// Import the useState hook from React.
// useState returns [currentValue, setterFunction].
import { useState } from "react";

// Side-effect CSS import for this component.
import "./JSXFormPartOne.css";

// ============================================================
// JSXFormPartOne component
// ============================================================
function JSXFormPartOne() {
  // ---------- State: the input's current value ----------
  // "" means the input starts empty.
  // setName(newValue) tells React to re-render with the new value.
  const [name, setName] = useState("");

  // ---------- Submit handler ----------
  // Runs when the user clicks Submit or presses Enter inside the input.
  const handleSubmit = (event) => {
    // Stop the browser's default "reload page" behavior for forms.
    event.preventDefault();

    // ---------- Validation ----------
    // name.trim() removes leading/trailing spaces.
    // If the trimmed string is empty → show error and stop.
    if (!name.trim()) {
      alert("Name is required");
      return; // exit the function early
    }

    // ---------- Success path ----------
    // The name is valid → greet the user.
    alert(`Welcome ${name}`);
  };

  // ============================================================
  // JSX returned by the component.
  // ============================================================
  return (
    // Outer wrapper; className links to .form-page in CSS.
    <div className="form-page">
      {/* Card container for the form */}
      <div className="form-card">
        {/* Page heading */}
        <h1 className="form-title">Basic React Form</h1>
        <p className="form-subtitle">Enter your name and press Submit</p>

        {/* The form. onSubmit calls handleSubmit. */}
        <form className="form-body" onSubmit={handleSubmit}>
          {/* ---------- Name field ---------- */}
          <label className="form-label" htmlFor="fullname">
            Full Name
          </label>

          <input
            className="form-input"
            id="fullname"
            type="text"
            placeholder="Enter your name"
            /* Controlled input: value is bound to state */
            value={name}
            /* onChange updates state on every keystroke */
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
          />

          {/* ---------- Submit button ---------- */}
          <button className="form-btn" type="submit">
            Submit
          </button>
        </form>

        {/* Live preview: shows what's currently typed */}
        <p className="form-preview">
          Live preview:{" "}
          <span className="form-preview__value">
            {name.trim() ? name : "—"}
          </span>
        </p>
      </div>
    </div>
  );
}

// Default export so App.jsx can import it:
//     import JSXFormPartOne from "./Component/JSXFormPartOne.jsx";
export default JSXFormPartOne;
