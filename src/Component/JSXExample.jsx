import { useState } from "react";
// import "../App.css";

import "./JSXExample.css";

function JSXExample() {
  const [count, setCount] = useState(0);

  const name = "Yitayew";
  const course = "React JSX";

  const students = ["Abel", "Sara", "John"];

  function handleClick() {
    alert("Welcome to React JSX!");
  }

  return (
    <div className="jsx-container">
      <h1>Welcome to {course}</h1>

      <p>Hello, {name}!</p>

      <p>Current Count: {count}</p>

      <button className="alert-btn" onClick={handleClick}>
        Click Me
      </button>

      <button className="count-btn" onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      <h2>Students</h2>

      <ul>
        {students.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
}

export default JSXExample;
