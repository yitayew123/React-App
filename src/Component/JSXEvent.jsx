// ============================================================
// JSXEvent.jsx
// Demonstrates EVENT HANDLING in React JSX.
//
// KEY IDEAS:
//   - Event props in JSX are camelCase: onClick, onChange,
//     onSubmit, onKeyDown, onDoubleClick, onMouseOver, etc.
//   - You pass a FUNCTION REFERENCE, not a function call.
//       ✅ onClick={handleClick}      (reference)
//       ❌ onClick={handleClick()}    (called immediately)
//   - To pass arguments, wrap in an arrow function:
//       onClick={() => showStudent("Abebe")}
//   - React passes a Synthetic Event object to handlers.
//   - Forms: call event.preventDefault() to stop page reload.
// ============================================================

// Side-effect CSS import for this component.
import "./JSXEvent.css";

// ============================================================
// JSXEvent component
// ============================================================
function JSXEvent() {
  // ---------- 1. Simple click handler ----------
  // No arguments needed → pass the function reference directly.
  const handleClick = () => {
    alert("Button Clicked");
  };

  // ---------- 2. Input change handler ----------
  // React passes the event object automatically.
  // event.target.value = the current text in the input.
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  // ---------- 3. Form submit handler ----------
  // preventDefault() stops the browser from reloading the page
  // when the form is submitted.
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form Submitted");
  };

  // ---------- 4. Handler WITH an argument ----------
  // We cannot write onClick={showStudent("Abebe")} because that
  // would call the function during render. Wrap in an arrow:
  //     onClick={() => showStudent("Abebe")}
  const showStudent = (name) => {
    alert(`Student: ${name}`);
  };

  // ---------- 5. Keyboard handler ----------
  // event.key = the name of the key that was pressed ("Enter", "a", etc.)
  const handleKeyDown = (event) => {
    console.log("Key:", event.key);
  };

  return (
    // Outer wrapper; className links to JSXEvent.css
    <div className="event-container">
      {/* Page heading — static text */}
      <h1 className="event-title">React Events Example</h1>

      {/* ============================================================
          1) CLICK EVENT
          onClick receives the function reference (no parentheses).
         ============================================================ */}
      <div className="event-row">
        <button className="event-btn" onClick={handleClick}>
          Click Me
        </button>
      </div>

      {/* ============================================================
          2) CHANGE EVENT
          Fires on every keystroke. event.target.value gives text.
         ============================================================ */}
      <div className="event-row">
        <input
          className="event-input"
          type="text"
          placeholder="Enter Name"
          onChange={handleChange}
        />
      </div>

      {/* ============================================================
          3) DOUBLE CLICK EVENT
          Inline arrow function so we can call alert directly.
         ============================================================ */}
      <div className="event-row">
        <button
          className="event-btn event-btn--secondary"
          onDoubleClick={() => alert("Double Clicked")}
        >
          Double Click
        </button>
      </div>

      {/* ============================================================
          4) MOUSE EVENT
          onMouseOver fires when the pointer enters the element.
         ============================================================ */}
      <div className="event-row">
        <h3
          className="event-hover"
          onMouseOver={() => console.log("Mouse Over")}
        >
          Hover Over Me
        </h3>
      </div>

      {/* ============================================================
          5) KEYBOARD EVENT
          onKeyDown fires on each key press; event.key tells which.
         ============================================================ */}
      <div className="event-row">
        <input
          className="event-input"
          placeholder="Press Any Key"
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* ============================================================
          6) PASSING ARGUMENTS
          Wrap the call in an arrow function so it runs only on click.
         ============================================================ */}
      <div className="event-row">
        <button
          className="event-btn event-btn--accent"
          onClick={() => showStudent("Abebe")}
        >
          Show Student
        </button>
      </div>

      {/* ============================================================
          7) FORM SUBMIT
          onSubmit={handleSubmit} → calls event.preventDefault()
          inside the handler to stop the page refresh.
         ============================================================ */}
      <form className="event-form" onSubmit={handleSubmit}>
        <button className="event-btn event-btn--primary" type="submit">
          Submit Form
        </button>
      </form>
    </div>
  );
}

// Default export so App.jsx can import it:
//     import JSXEvent from "./Component/JSXEvent.jsx";
export default JSXEvent;
