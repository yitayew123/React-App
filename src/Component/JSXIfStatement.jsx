// ============================================================
// JSXIfStatement.jsx
// Demonstrates CONDITIONAL RENDERING in JSX.
//
// KEY IDEA:
//   You CANNOT write an `if` statement inside JSX { }.
//   JSX only accepts EXPRESSIONS (things that return a value).
//
// THREE COMMON PATTERNS:
//   1. Ternary  →  condition ? <A /> : <B />
//   2. AND (&&) →  condition && <A />
//   3. Variable →  compute value BEFORE return, then {variable}
//
// You may also use if / else OUTSIDE the JSX (in the function body).
// ============================================================

import React from "react";

// Side-effect CSS import for this component.
import "./JSXIfStatement.css";

// ============================================================
// Child Component: Login
// Rendered when the user is NOT logged in.
// ============================================================
function Login() {
  return <h2 className="login-box">Please Login</h2>;
}

// ============================================================
// Child Component: Dashboard
// Rendered when the user IS logged in.
// ============================================================
function Dashboard() {
  return <h2 className="dashboard-box">Welcome to Dashboard</h2>;
}

// ============================================================
// Parent Component: JSXIfStatement
// ============================================================
function JSXIfStatement() {
  // ---------- Boolean flags for conditions ----------
  const isLoggedIn = true; // controls Login vs Dashboard
  const isAdmin = true; // controls Admin Panel visibility
  const score = 85; // used to compute the grade
  const showNotification = true; // controls notification message

  // ---------- if / else OUTSIDE JSX ----------
  // An `if` statement is NOT allowed inside { } in JSX.
  // Solution: run it HERE, before return, and store the result.
  let grade;
  if (score >= 90) {
    grade = "A";
  } else if (score >= 70) {
    grade = "B";
  } else {
    grade = "C";
  }

  return (
    // Outer wrapper; className links to JSXIfStatement.css
    <div className="container">
      {/* Static heading — plain text, no condition needed. */}
      <h1 className="title">React JSX If Statements</h1>
      {/* ------------------------------------------------
          PATTERN 1: Ternary Operator
          Syntax: condition ? <TrueBranch /> : <FalseBranch />
          Use when you need to render ONE of TWO options.
         ------------------------------------------------ */}
      {isLoggedIn ? (
        <Dashboard /> /* shown when isLoggedIn === true */
      ) : (
        <Login />
      )}{" "}
      /* shown when isLoggedIn === false */
      {/* ------------------------------------------------
          PATTERN 2: AND (&&) Operator
          Syntax: condition && <Something />
          Renders the element ONLY if condition is truthy.
          If condition is false → nothing renders.
         ------------------------------------------------ */}
      {isAdmin && <h3 className="admin-panel">Admin Panel</h3>}
      {/* ------------------------------------------------
          PATTERN 3: Variable Rendering
          The `grade` variable was computed with if / else
          OUTSIDE the JSX. Here we simply insert its value.
         ------------------------------------------------ */}
      <h3 className="grade-text">Grade: {grade}</h3>
      {/* ------------------------------------------------
          PATTERN 4: Ternary returning null
          When you have NO false branch, return null.
          React renders nothing for null.
         ------------------------------------------------ */}
      {showNotification ? (
        <p className="notification">New Notification Available</p>
      ) : null}
    </div>
  );
}

// Default export so App.jsx can import this component.
export default JSXIfStatement;
