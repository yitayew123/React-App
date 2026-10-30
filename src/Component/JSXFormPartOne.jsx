// Demonstrates a controlled form with basic validation.
import { useState } from "react";
import "./JSXFormPartOne.css";

function JSXFormPartOne() {
  // Keep the input value in React state.
  const [name, setName] = useState("");

  // Validate and handle form submission.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    alert(`Welcome ${name}`);
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Basic React Form</h1>
        <p className="form-subtitle">Enter your name and press Submit</p>

        <form className="form-body" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="fullname">
            Full Name
          </label>

          <input
            className="form-input"
            id="fullname"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="on"
          />

          <button className="form-btn" type="submit">
            Submit
          </button>
        </form>

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

export default JSXFormPartOne;
