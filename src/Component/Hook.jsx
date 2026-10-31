// Common React hooks and selected React 19 examples, not an exhaustive list.

import {
  createContext,
  memo,
  useActionState,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useOptimistic,
  useReducer,
  useRef,
  useState,
  useTransition,
} from "react";

import "./Hook.css";

const UserContext = createContext("Guest");
const SEARCH_ITEMS = Array.from({ length: 1000 }, (_, index) => `Entry ${index + 1}`);

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  // This label appears in React DevTools when inspecting the custom hook.
  useDebugValue(count, (value) => `Count: ${value}`);

  const increment = () => setCount((previous) => previous + 1);

  return { count, increment };
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

const FocusButton = memo(function FocusButton({ onClick }) {
  return (
    <button className="hook-btn hook-btn--primary" onClick={onClick}>
      Focus Input
    </button>
  );
});

function Child() {
  const user = useContext(UserContext);

  return (
    <div className="hook-child">
      <h3 className="hook-child__title">Child (useContext)</h3>
      <p className="hook-child__value">User: {user}</p>
    </div>
  );
}

function HookDemo() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const nameInputId = useId();
  const todoInputId = useId();
  const nextTodoId = useRef(0);
  const { count, increment } = useCounter();
  const [reducerState, dispatch] = useReducer(reducer, { count: 0 });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [query, setQuery] = useState("");
  // Keep the input responsive while the results can update later.
  const deferredQuery = useDeferredValue(query);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isTabPending, startTransition] = useTransition();
  const [todos, setTodos] = useState([]);
  // The pending todo appears immediately and is replaced by saved state.
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo) => [...currentTodos, newTodo],
  );

  const [todoMessage, submitTodo, isTodoPending] = useActionState(
    async (previousState, formData) => {
      const title = String(formData.get("todo") ?? "").trim();

      if (!title) {
        return {
          ...previousState,
          message: "Enter a task before submitting.",
        };
      }

      const newTodo = { id: nextTodoId.current++, title };
      addOptimisticTodo(newTodo);

      await new Promise((resolve) => window.setTimeout(resolve, 500));
      setTodos((currentTodos) => [...currentTodos, newTodo]);
      return { message: `Added: ${title}` };
    },
    { message: "" },
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    // Effects that start work should clean it up when they stop.
    return () => window.clearInterval(intervalId);
  }, []);

  const squared = useMemo(() => count * count, [count]);
  const focusInput = useCallback(() => inputRef.current?.focus(), []);
  const matchingItems = useMemo(
    () =>
      SEARCH_ITEMS.filter((item) =>
        item.toLowerCase().includes(deferredQuery.trim().toLowerCase()),
      ),
    [deferredQuery],
  );

  return (
    <UserContext.Provider value="Yitayew">
      <div className="hook-page">
        <h1 className="hook-title">React Hooks Demo</h1>

        <section className="hook-card">
          <h2 className="hook-card__title">State, refs, and IDs</h2>
          <div className="hook-row">
            <label htmlFor={nameInputId}>Name</label>
            <input
              id={nameInputId}
              ref={inputRef}
              className="hook-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter name"
            />
            <FocusButton onClick={focusInput} />
          </div>
          <p className="hook-preview">
            Live value: <strong>{name || "—"}</strong>
          </p>
        </section>

        <section className="hook-card">
          <h2 className="hook-card__title">Custom hook, useMemo, and useDebugValue</h2>
          <div className="hook-row">
            <span className="hook-badge">Count: {count}</span>
            <button className="hook-btn hook-btn--primary" onClick={increment}>
              Increment
            </button>
          </div>
          <p className="hook-preview">
            Square: <strong>{squared}</strong> · Mounted for{" "}
            <strong>{elapsedSeconds}s</strong>
          </p>
        </section>

        <section className="hook-card">
          <h2 className="hook-card__title">useReducer</h2>
          <div className="hook-row">
            <span className="hook-badge hook-badge--amber">
              Reducer count: {reducerState.count}
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

        <section className="hook-card">
          <h2 className="hook-card__title">Context</h2>
          <Child />
        </section>

        <section className="hook-card">
          <h2 className="hook-card__title">useTransition</h2>
          {/* Transitions are for non-urgent updates, not controlled inputs. */}
          <div className="hook-row">
            {["Overview", "Details"].map((tab) => (
              <button
                key={tab}
                className="hook-btn hook-btn--ghost"
                aria-pressed={activeTab === tab}
                onClick={() => startTransition(() => setActiveTab(tab))}
              >
                {tab}
              </button>
            ))}
            {isTabPending && <span>Updating tab…</span>}
          </div>
          <p className="hook-preview">Selected tab: {activeTab}</p>
        </section>

        <section className="hook-card">
          <h2 className="hook-card__title">useDeferredValue</h2>
          <div className="hook-row">
            <label htmlFor={`${nameInputId}-search`}>Search 1,000 entries</label>
            <input
              id={`${nameInputId}-search`}
              className="hook-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try 25"
            />
          </div>
          <p className="hook-preview">
            Matches: {matchingItems.length}. First results:{" "}
            {matchingItems.slice(0, 5).join(", ") || "none"}
          </p>
        </section>

        <section className="hook-card">
          <h2 className="hook-card__title">React 19 actions and optimistic UI</h2>
          <form action={submitTodo}>
            <div className="hook-row">
              <label htmlFor={todoInputId}>New task</label>
              <input
                id={todoInputId}
                className="hook-input"
                name="todo"
                placeholder="Enter a task"
              />
              <button
                className="hook-btn hook-btn--primary"
                type="submit"
                disabled={isTodoPending}
              >
                {isTodoPending ? "Adding…" : "Add task"}
              </button>
            </div>
          </form>
          {todoMessage.message && (
            <p className="hook-preview">{todoMessage.message}</p>
          )}
          <ul>
            {optimisticTodos.map((todo) => (
              <li key={todo.id}>
                {todo.title}
                {isTodoPending && !todos.some((saved) => saved.id === todo.id)
                  ? " (saving…)"
                  : ""}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </UserContext.Provider>
  );
}

export default HookDemo;
