// Import the useState hook from React.
// We use it to add local state (the count) to this function component.
import { useState } from "react";

// Optional global App stylesheet (kept commented out).
// import "../App.css";

// Import the stylesheet specific to this component.
import "./JSXExample.css";

/**
 * JSXExample
 *
 * A single component that demonstrates the main features of JSX:
 *  1. Embedding JavaScript expressions inside JSX using `{ }`
 *  2. Using `useState` to add state to a function component
 *  3. Attaching event handlers (onClick) to elements
 *  4. Rendering a list with `.map()` and the required `key` prop
 *
 * @returns {JSX.Element} The rendered component.
 */
function JSXExample() {
  // ---- State ----
  // `count` starts at 0. `setCount` updates it and triggers a re-render.
  const [count, setCount] = useState(0);

  // ---- Plain JavaScript values ----
  // These are just regular variables — JSX will display them via { }.
  const name = "Yitayew";
  const course = "React JSX";

  // An array we'll render as a list below.
  const students = ["Abel", "Sara", "John"];

  // ---- Event handler ----
  // Fired when the "Click Me" button is pressed.
  function handleClick() {
    alert("Welcome to React JSX!");
  }

  // ---- JSX (the UI) ----
  return (
    // Wrapper div with a class for styling.
    <div className="jsx-container">
      {/* Curly braces let us embed any JS expression inside JSX. */}
      <h1>Welcome to {course}</h1>

      {/* Displaying a variable. */}
      <p>Hello, {name}!</p>

      {/* Displaying state — updates automatically when count changes. */}
      <p>Current Count: {count}</p>

      {/* Attaching a named function as the click handler. */}
      <button className="alert-btn" onClick={handleClick}>
        Click Me
      </button>

      {/* Using an inline arrow function to update state on click. */}
      <button className="count-btn" onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      <h2>Students</h2>

      {/*
        Rendering a list:
        - `.map()` transforms each array item into a <li>
        - `key` gives React a stable identity for each item
        - Using `index` as key is OK for static lists but not ideal
          for lists that can be reordered, filtered, or added to.
      */}
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
}

// Export the component so it can be imported and rendered elsewhere.
export default JSXExample;