// ============================================================
// Component/Hook.jsx
// Demonstrates ALL CORE React hooks in ONE file.
//
// HOOKS COVERED:
//   1. useState       → simple state (count)
//   2. useEffect      → side effect on mount
//   3. useContext     → read a Context value
//   4. useRef         → reference a DOM element
//   5. useMemo        → memoize a computed value (square)
//   6. useCallback    → memoize a function reference
//   7. useReducer     → complex state via reducer
//   8. Custom hook    → useCounter (reusable logic)
//
// KEY IDEAS:
//   - Hooks must be called at the TOP LEVEL of a component
//     (never inside conditions, loops, or nested functions).
//   - Hooks run in the same order on every render.
//   - Custom hooks are just functions whose name starts with
//     "use" and which call other hooks internally.
// ============================================================

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from "react";

import "./Hook.css";

// ============================================================
// CONTEXT — shared value available to any descendant without
// prop-drilling. Here it stores the current user's name.
// ============================================================
const UserContext = createContext();

// ============================================================
// CUSTOM HOOK — useCounter
//
// A reusable piece of stateful logic. Its name starts with
// "use" (React rule for custom hooks). Any component can call
// it and get its own independent counter + increment function.
// ============================================================
function useCounter(initial = 0) {
  // useState inside a custom hook → the hook is "hooked in"
  // to the calling component's state lifecycle.
  const [count, setCount] = useState(initial);

  // The increment function uses the functional update form
  // (prev => prev + 1) to avoid stale state.
  const increment = () => setCount((prev) => prev + 1);

  // Return whatever the consumer needs.
  return { count, increment };
}

// ============================================================
// REDUCER — a pure function (state, action) → newState
//
// useReducer is preferred over useState when:
//   - state has multiple sub-values, OR
//   - the next state depends on the previous in complex ways.
// ============================================================
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      // NEVER mutate state — always return a new object.
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return { count: 0 };

    default:
      return state;
  }
}

// ============================================================
// CHILD — demonstrates useContext
//
// Instead of receiving `user` as a prop, it reads the value
// directly from UserContext. Any descendant of the Provider
// can do the same.
// ============================================================
function Child() {
  const user = useContext(UserContext);

  return (
    <div className="hook-child">
      <h3 className="hook-child__title">Child (using useContext)</h3>
      <p className="hook-child__value">User: {user}</p>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT — HookDemo
// ============================================================
function HookDemo() {
  // ---------- 1. useState — controlled input value ----------
  const [name, setName] = useState("");

  // ---------- 2. useRef — direct DOM access ----------
  // ref.current will point to the <input> after mount.
  const inputRef = useRef(null);

  // ---------- 3. Custom hook — reuse counter logic ----------
  const { count, increment } = useCounter();

  // ---------- 4. useReducer — reducer-based state ----------
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // ---------- 5. useEffect — run once after mount ----------
  // The empty dependency array [] means "run only once".
  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  // ---------- 6. useMemo — cache a derived value ----------
  // squared is recalculated ONLY when `count` changes.
  const squared = useMemo(() => count * count, [count]);

  // ---------- 7. useCallback — cache a function ----------
  // Without useCallback, focusInput would be a NEW function on
  // every render, causing unnecessary re-renders of children
  // that receive it as a prop.
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    // ---------- 8. Context Provider — supplies the value ----------
    <UserContext.Provider value="Yitayew">
      <div className="hook-page">
        <h1 className="hook-title">React Hooks Demo</h1>

        {/* ============================================================
            SECTION A — useState + useRef + useCallback
           ============================================================ */}
        <section className="hook-card">
          <h2 className="hook-card__title">
            1. useState + useRef + useCallback
          </h2>

          <div className="hook-row">
            {/* useRef is attached here; useCallback focuses it */}
            <input
              ref={inputRef}
              className="hook-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />

            <button className="hook-btn hook-btn--primary" onClick={focusInput}>
              Focus Input
            </button>
          </div>

          <p className="hook-preview">
            Live value: <strong>{name || "—"}</strong>
          </p>
        </section>

        {/* ============================================================
            SECTION B — Custom hook (useCounter)
           ============================================================ */}
        <section className="hook-card">
          <h2 className="hook-card__title">2. Custom Hook — useCounter</h2>

          <div className="hook-row">
            <span className="hook-badge">Count: {count}</span>

            <button className="hook-btn hook-btn--primary" onClick={increment}>
              Increment
            </button>
          </div>

          <p className="hook-preview">
            Square (via useMemo): <strong>{squared}</strong>
          </p>
        </section>

        {/* ============================================================
            SECTION C — useReducer
           ============================================================ */}
        <section className="hook-card">
          <h2 className="hook-card__title">3. useReducer</h2>

          <div className="hook-row">
            <span className="hook-badge hook-badge--amber">
              Reducer Count: {state.count}
            </span>

            <button
              className="hook-btn hook-btn--primary"
              onClick={() => dispatch({ type: "increment" })}
            >
              +
            </button>
            <button
              className="hook-btn hook-btn--ghost"
              onClick={() => dispatch({ type: "decrement" })}
            >
              −
            </button>
            <button
              className="hook-btn hook-btn--danger"
              onClick={() => dispatch({ type: "reset" })}
            >
              Reset
            </button>
          </div>
        </section>

        {/* ============================================================
            SECTION D — useContext
           ============================================================ */}
        <section className="hook-card">
          <h2 className="hook-card__title">4. useContext</h2>

          {/* Child reads the Context value; no props passed */}
          <Child />
        </section>
      </div>
    </UserContext.Provider>
  );
}

export default HookDemo;
