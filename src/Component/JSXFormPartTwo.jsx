// ============================================================
// JSXFormPartTwo.jsx
// Student Registration Form — a more advanced CONTROLLED FORM.
//
// KEY IDEAS:
//   - All form fields are stored in ONE state object.
//   - handleChange uses event.target.name + value + computed keys
//     to update the right field generically.
//   - Checkbox groups store an ARRAY of selected values.
//   - Radio buttons store a SINGLE string value.
//   - Select dropdown uses the same handleChange as text inputs.
//   - On submit: preventDefault + validate + process.
//
// WHY ONE STATE OBJECT?
//   Simpler to reset, submit, and validate as a single unit.
// ============================================================

import { useState } from "react";
import "./JSXFormPartTwo.css";

// ============================================================
// JSXFormPartTwo component
// ============================================================
function JSXFormPartTwo() {
  // ---------- One state object for all form fields ----------
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    department: "",
    gender: "",
    address: "",
    skills: [], // array (multiple checkboxes)
  });

  // ---------- Generic change handler ----------
  // Handles text, email, number, select, and radio inputs.
  // Uses the "name" attribute to know which field to update.
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Computed property key [name] updates only that field.
    // Spread ...formData keeps all other fields intact.
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ---------- Checkbox handler (special case) ----------
  // Checkboxes ADD or REMOVE values from the skills array.
  const handleSkillChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the skill if the box was just checked
      setFormData({
        ...formData,
        skills: [...formData.skills, value],
      });
    } else {
      // Remove the skill if the box was unchecked
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value),
      });
    }
  };

  // ---------- Submit handler ----------
  const handleSubmit = (event) => {
    event.preventDefault(); // stop page reload

    // Validate required fields (marked with * in the UI)
    if (!formData.fullName || !formData.email || !formData.department) {
      alert("Please fill all required fields");
      return;
    }

    // Success
    alert("Registration Successful");
    console.log("Submitted data:", formData);
  };

  // ============================================================
  // JSX returned by the component.
  // ============================================================
  return (
    // Full-page wrapper; className links to .reg-page in CSS
    <div className="reg-page">
      <div className="reg-card">
        {/* Header */}
        <header className="reg-header">
          <h1 className="reg-title">Student Registration</h1>
          <p className="reg-subtitle">
            Fields marked with <span className="reg-required">*</span> are
            required
          </p>
        </header>

        <form className="reg-form" onSubmit={handleSubmit}>
          {/* ============================================================
              SECTION 1 — Personal Info
             ============================================================ */}
          <fieldset className="reg-fieldset">
            <legend className="reg-legend">Personal Information</legend>

            {/* Full Name */}
            <div className="reg-field">
              <label className="reg-label" htmlFor="fullName">
                Full Name <span className="reg-required">*</span>
              </label>
              <input
                className="reg-input"
                id="fullName"
                type="text"
                name="fullName" /* matches state key */
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g., Abebe Kebede"
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="reg-field">
              <label className="reg-label" htmlFor="email">
                Email <span className="reg-required">*</span>
              </label>
              <input
                className="reg-input"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Age */}
            <div className="reg-field">
              <label className="reg-label" htmlFor="age">
                Age
              </label>
              <input
                className="reg-input"
                id="age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="18"
                min="1"
                max="120"
              />
            </div>

            {/* Department (select) */}
            <div className="reg-field">
              <label className="reg-label" htmlFor="department">
                Department <span className="reg-required">*</span>
              </label>
              <select
                className="reg-select"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Systems">Information Systems</option>
              </select>
            </div>
          </fieldset>

          {/* ============================================================
              SECTION 2 — Gender (radio buttons)
             ============================================================ */}
          <fieldset className="reg-fieldset">
            <legend className="reg-legend">Gender</legend>

            <div className="reg-radio-group">
              <label className="reg-radio">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"} /* controlled radio */
                  onChange={handleChange}
                />
                <span>Male</span>
              </label>

              <label className="reg-radio">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <span>Female</span>
              </label>
            </div>
          </fieldset>

          {/* ============================================================
              SECTION 3 — Skills (checkboxes)
             ============================================================ */}
          <fieldset className="reg-fieldset">
            <legend className="reg-legend">Skills</legend>

            <div className="reg-checkbox-group">
              {["React", "Node.js", "MongoDB"].map((skill) => (
                <label key={skill} className="reg-checkbox">
                  <input
                    type="checkbox"
                    value={skill}
                    /* checked when this skill is in the array */
                    checked={formData.skills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* ============================================================
              SECTION 4 — Address
             ============================================================ */}
          <fieldset className="reg-fieldset">
            <legend className="reg-legend">Address</legend>

            <div className="reg-field">
              <label className="reg-label" htmlFor="address">
                Address
              </label>
              <textarea
                className="reg-textarea"
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="City, Street, Postal Code"
              />
            </div>
          </fieldset>

          {/* ============================================================
              SUBMIT
             ============================================================ */}
          <button className="reg-submit" type="submit">
            Register Student
          </button>
        </form>

        {/* ---------- Live data preview (for teaching) ---------- */}
        <details className="reg-preview">
          <summary>Live form data (click to expand)</summary>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
}

// Default export so App.jsx can import it:
//     import JSXFormPartTwo from "./Component/JSXFormPartTwo.jsx";
export default JSXFormPartTwo;
