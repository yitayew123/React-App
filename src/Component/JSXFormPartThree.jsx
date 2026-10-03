// ============================================================
// JSXFormPartThree.jsx
// Professional MULTI-STEP registration form (wizard).
//
// KEY IDEAS:
//   - One state object holds all form data.
//   - "step" state tracks which step is visible (0–3).
//   - Each step is validated BEFORE moving to the next.
//   - Errors are stored per field in an "errors" object.
//   - Progress bar reflects (step + 1) / total steps.
//   - Final step shows a review of everything before submit.
//
// COVERS ALL COMMON FORM ELEMENTS:
//   text, email, tel, password, date, number, time, url,
//   search, color, range, file, select, datalist, radio,
//   checkbox, textarea, submit, reset.
// ============================================================

import { useState } from "react";
import "./JSXFormPartThree.css";

// ---------- Step labels (used by the stepper bar) ----------
const STEPS = ["Personal", "Academic", "Contact", "Review"];

// ---------- Initial form data (single source of truth) ----------
const INITIAL_DATA = {
  // STEP 1 — Personal
  fullName: "",
  email: "",
  phone: "",
  password: "",
  birthDate: "",
  gender: "",
  // STEP 2 — Academic
  department: "",
  year: "",
  gpa: 3,
  skills: [],
  startTime: "",
  country: "",
  // STEP 3 — Contact & Extras
  address: "",
  website: "",
  favoriteColor: "#2563eb",
  search: "",
  resume: null,
  agree: false,
};

// ============================================================
// Main component
// ============================================================
function JSXFormPartThree() {
  // ---------- Wizard state ----------
  const [step, setStep] = useState(0); // current step index
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({}); // per-field errors
  const [submitted, setSubmitted] = useState(false);

  // ---------- Generic change handler ----------
  // Works for text, email, tel, password, date, number,
  // time, url, search, color, range, select, datalist, radio, checkbox, file.
  const handleChange = (event) => {
    const { name, value, type, files, checked } = event.target;

    setFormData({
      ...formData,
      [name]:
        type === "file"
          ? files?.[0] || null
          : type === "checkbox" && name === "agree"
            ? checked
            : value,
    });

    // Clear error on the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ---------- Skills checkbox handler (array) ----------
  const handleSkillChange = (event) => {
    const { value, checked } = event.target;
    setFormData({
      ...formData,
      skills: checked
        ? [...formData.skills, value]
        : formData.skills.filter((s) => s !== value),
    });
    setErrors((prev) => ({ ...prev, skills: "" }));
  };

  // ---------- Per-step validation ----------
  const validateStep = (index) => {
    const errs = {};

    if (index === 0) {
      if (!formData.fullName.trim()) errs.fullName = "Full name is required";
      if (!formData.email.trim()) errs.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email))
        errs.email = "Enter a valid email";
      if (!formData.phone.trim()) errs.phone = "Phone is required";
      if (formData.password.length < 6) errs.password = "At least 6 characters";
      if (!formData.gender) errs.gender = "Select a gender";
    }

    if (index === 1) {
      if (!formData.department) errs.department = "Select a department";
      if (!formData.year) errs.year = "Year is required";
      if (formData.skills.length === 0) errs.skills = "Pick at least one skill";
    }

    if (index === 2) {
      if (!formData.address.trim()) errs.address = "Address is required";
      if (!formData.agree) errs.agree = "You must accept the terms";
    }

    return errs;
  };

  // ---------- Navigation ----------
  const handleNext = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (event) => {
    event.preventDefault();
    const errs = validateStep(step);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    alert("Registration Successful!");
    console.log("Submitted:", formData);
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  };

  // ---------- Progress calculation ----------
  const progress = ((step + 1) / STEPS.length) * 100;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="stepper-page">
      <div className="stepper-card">
        {/* ---------- Header ---------- */}
        <header className="stepper-header">
          <h1 className="stepper-title">Student Registration</h1>
          <p className="stepper-subtitle">Multi-step form wizard</p>
        </header>

        {/* ---------- Stepper indicator ---------- */}
        <div className="stepper-bar">
          <div className="stepper-progress" style={{ width: `${progress}%` }} />
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={
                "stepper-step" +
                (i === step ? " is-active" : "") +
                (i < step ? " is-done" : "")
              }
            >
              <div className="stepper-circle">{i < step ? "✓" : i + 1}</div>
              <span className="stepper-label">{label}</span>
            </div>
          ))}
        </div>

        {/* ---------- Form ---------- */}
        <form className="stepper-form" onSubmit={handleSubmit} noValidate>
          {/* ============================================================
              STEP 1 — PERSONAL
             ============================================================ */}
          {step === 0 && (
            <section className="step-section">
              <h2 className="step-title">Personal Information</h2>

              <div className="grid-2">
                {/* text */}
                <div className="field">
                  <label className="field-label" htmlFor="fullName">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="field-input"
                    placeholder="Abebe Kebede"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <p className="field-error">{errors.fullName}</p>
                  )}
                </div>

                {/* email */}
                <div className="field">
                  <label className="field-label" htmlFor="email">
                    Email <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="field-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="field-error">{errors.email}</p>
                  )}
                </div>

                {/* tel */}
                <div className="field">
                  <label className="field-label" htmlFor="phone">
                    Phone <span className="req">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="field-input"
                    placeholder="+251 9XX XXX XXX"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="field-error">{errors.phone}</p>
                  )}
                </div>

                {/* password */}
                <div className="field">
                  <label className="field-label" htmlFor="password">
                    Password <span className="req">*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="field-input"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="field-error">{errors.password}</p>
                  )}
                </div>

                {/* date */}
                <div className="field">
                  <label className="field-label" htmlFor="birthDate">
                    Birth Date
                  </label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className="field-input"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>

                {/* radio */}
                <div className="field">
                  <span className="field-label">
                    Gender <span className="req">*</span>
                  </span>
                  <div className="chip-row">
                    {["Male", "Female"].map((g) => (
                      <label
                        key={g}
                        className={
                          "chip" + (formData.gender === g ? " is-selected" : "")
                        }
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="field-error">{errors.gender}</p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ============================================================
              STEP 2 — ACADEMIC
             ============================================================ */}
          {step === 1 && (
            <section className="step-section">
              <h2 className="step-title">Academic Details</h2>

              <div className="grid-2">
                {/* select */}
                <div className="field">
                  <label className="field-label" htmlFor="department">
                    Department <span className="req">*</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="field-input"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="Software Engineering">
                      Software Engineering
                    </option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Systems">
                      Information Systems
                    </option>
                  </select>
                  {errors.department && (
                    <p className="field-error">{errors.department}</p>
                  )}
                </div>

                {/* number */}
                <div className="field">
                  <label className="field-label" htmlFor="year">
                    Year <span className="req">*</span>
                  </label>
                  <input
                    id="year"
                    name="year"
                    type="number"
                    className="field-input"
                    placeholder="1 – 5"
                    min="1"
                    max="5"
                    value={formData.year}
                    onChange={handleChange}
                  />
                  {errors.year && <p className="field-error">{errors.year}</p>}
                </div>

                {/* time */}
                <div className="field">
                  <label className="field-label" htmlFor="startTime">
                    Preferred Class Time
                  </label>
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    className="field-input"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                </div>

                {/* datalist */}
                <div className="field">
                  <label className="field-label" htmlFor="country">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    list="countries"
                    className="field-input"
                    placeholder="Start typing…"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  <datalist id="countries">
                    <option value="Ethiopia" />
                    <option value="Kenya" />
                    <option value="Egypt" />
                    <option value="South Africa" />
                    <option value="Nigeria" />
                  </datalist>
                </div>

                {/* range — full width */}
                <div className="field field--full">
                  <label className="field-label" htmlFor="gpa">
                    Expected GPA: <strong>{formData.gpa}</strong>
                  </label>
                  <input
                    id="gpa"
                    name="gpa"
                    type="range"
                    min="0"
                    max="4"
                    step="0.1"
                    className="field-range"
                    value={formData.gpa}
                    onChange={handleChange}
                  />
                </div>

                {/* checkbox group — full width */}
                <div className="field field--full">
                  <span className="field-label">
                    Skills <span className="req">*</span>
                  </span>
                  <div className="chip-row">
                    {["React", "Node.js", "MongoDB", "Python", "SQL"].map(
                      (s) => (
                        <label
                          key={s}
                          className={
                            "chip" +
                            (formData.skills.includes(s) ? " is-selected" : "")
                          }
                        >
                          <input
                            type="checkbox"
                            value={s}
                            checked={formData.skills.includes(s)}
                            onChange={handleSkillChange}
                          />
                          <span>{s}</span>
                        </label>
                      ),
                    )}
                  </div>
                  {errors.skills && (
                    <p className="field-error">{errors.skills}</p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ============================================================
              STEP 3 — CONTACT & EXTRAS
             ============================================================ */}
          {step === 2 && (
            <section className="step-section">
              <h2 className="step-title">Contact &amp; Extras</h2>

              <div className="grid-2">
                {/* textarea — full width */}
                <div className="field field--full">
                  <label className="field-label" htmlFor="address">
                    Address <span className="req">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="field-input field-textarea"
                    rows="3"
                    placeholder="City, Street, Postal Code"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="field-error">{errors.address}</p>
                  )}
                </div>

                {/* url */}
                <div className="field">
                  <label className="field-label" htmlFor="website">
                    Website
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    className="field-input"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* color */}
                <div className="field">
                  <label className="field-label" htmlFor="favoriteColor">
                    Favorite Color
                  </label>
                  <div className="color-row">
                    <input
                      id="favoriteColor"
                      name="favoriteColor"
                      type="color"
                      className="field-color"
                      value={formData.favoriteColor}
                      onChange={handleChange}
                    />
                    <span className="color-value">
                      {formData.favoriteColor}
                    </span>
                  </div>
                </div>

                {/* search */}
                <div className="field">
                  <label className="field-label" htmlFor="search">
                    Search Course
                  </label>
                  <input
                    id="search"
                    name="search"
                    type="search"
                    className="field-input"
                    placeholder="Type to search…"
                    value={formData.search}
                    onChange={handleChange}
                  />
                </div>

                {/* file */}
                <div className="field">
                  <label className="field-label" htmlFor="resume">
                    Resume (PDF)
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="field-file"
                    onChange={handleChange}
                  />
                  {formData.resume && (
                    <p className="field-hint">
                      Selected: {formData.resume.name}
                    </p>
                  )}
                </div>

                {/* terms checkbox */}
                <div className="field field--full">
                  <label className="checkbox-line">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                    />
                    <span>
                      I agree to the <a href="#terms">terms and conditions</a>{" "}
                      <span className="req">*</span>
                    </span>
                  </label>
                  {errors.agree && (
                    <p className="field-error">{errors.agree}</p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ============================================================
              STEP 4 — REVIEW & SUBMIT
             ============================================================ */}
          {step === 3 && (
            <section className="step-section">
              <h2 className="step-title">Review Your Information</h2>

              <div className="review-grid">
                <ReviewRow label="Full Name" value={formData.fullName} />
                <ReviewRow label="Email" value={formData.email} />
                <ReviewRow label="Phone" value={formData.phone} />
                <ReviewRow label="Birth Date" value={formData.birthDate} />
                <ReviewRow label="Gender" value={formData.gender} />
                <ReviewRow label="Department" value={formData.department} />
                <ReviewRow label="Year" value={formData.year} />
                <ReviewRow label="GPA" value={formData.gpa} />
                <ReviewRow label="Class Time" value={formData.startTime} />
                <ReviewRow label="Country" value={formData.country} />
                <ReviewRow
                  label="Skills"
                  value={
                    formData.skills.length ? formData.skills.join(", ") : "—"
                  }
                />
                <ReviewRow label="Address" value={formData.address} />
                <ReviewRow label="Website" value={formData.website} />
                <ReviewRow
                  label="Favorite Color"
                  value={
                    <span className="review-color">
                      <span
                        className="swatch"
                        style={{ backgroundColor: formData.favoriteColor }}
                      />
                      {formData.favoriteColor}
                    </span>
                  }
                />
                <ReviewRow
                  label="Resume"
                  value={formData.resume ? formData.resume.name : "—"}
                />
                <ReviewRow
                  label="Terms Accepted"
                  value={formData.agree ? "Yes" : "No"}
                />
              </div>

              {submitted && (
                <p className="success-msg">
                  ✔ Your registration has been submitted successfully.
                </p>
              )}
            </section>
          )}

          {/* ============================================================
              ACTION BAR
             ============================================================ */}
          <div className="stepper-actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleBack}
              disabled={step === 0}
            >
              ← Back
            </button>

            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleReset}
            >
              Reset
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleNext}
              >
                Next →
              </button>
            ) : (
              <button type="submit" className="btn btn--success">
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Small helper component for the review rows ----------
function ReviewRow({ label, value }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className="review-value">{value || "—"}</span>
    </div>
  );
}

export default JSXFormPartThree;
