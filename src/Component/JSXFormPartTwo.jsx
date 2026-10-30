// Student registration form with controlled fields and basic validation.
import { useState } from "react";
import "./JSXFormPartTwo.css";

function JSXFormPartTwo() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    department: "",
    gender: "",
    address: "",
    skills: [],
  });

  // Use each field's name to update its value in the shared state object.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Keep the selected checkboxes in the skills array.
  const handleSkillChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value],
      });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value),
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.department) {
      alert("Please fill all required fields");
      return;
    }

    alert("Registration Successful");
    console.log("Submitted data:", formData);
  };

  return (
    <div className="reg-page">
      <div className="reg-card">
        <header className="reg-header">
          <h1 className="reg-title">Student Registration</h1>
          <p className="reg-subtitle">
            Fields marked with <span className="reg-required">*</span> are
            required
          </p>
        </header>

        <form className="reg-form" onSubmit={handleSubmit}>
          {/* Personal information */}
          <fieldset className="reg-fieldset">
            <legend className="reg-legend">Personal Information</legend>

            <div className="reg-field">
              <label className="reg-label" htmlFor="fullName">
                Full Name <span className="reg-required">*</span>
              </label>
              <input
                className="reg-input"
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g., Abebe Kebede"
                autoComplete="name"
              />
            </div>

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

          {/* Gender options */}
          <fieldset className="reg-fieldset">
            <legend className="reg-legend">Gender</legend>

            <div className="reg-radio-group">
              <label className="reg-radio">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
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

          {/* Skills */}
          <fieldset className="reg-fieldset">
            <legend className="reg-legend">Skills</legend>

            <div className="reg-checkbox-group">
              {["React", "Node.js", "MongoDB"].map((skill) => (
                <label key={skill} className="reg-checkbox">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Address */}
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

          <button className="reg-submit" type="submit">
            Register Student
          </button>
        </form>

        <details className="reg-preview">
          <summary>Live form data (click to expand)</summary>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
}

export default JSXFormPartTwo;
