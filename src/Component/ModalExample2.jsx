// ============================================================
// ModalExample2.jsx
// Real-world DELETE CONFIRMATION modal (portal-based).
//
// REAL-WORLD PATTERNS DEMONSTRATED:
//   1. Destructive action requires typing "DELETE" to confirm.
//   2. Modal shows what is being deleted (student name).
//   3. Loading state while the "API call" runs.
//   4. Error state if the operation fails.
//   5. Multiple close affordances: Cancel button, overlay, Esc.
//   6. Focus management: input auto-focuses on open.
//   7. Body scroll lock while the modal is open.
//   8. Portal renders into #portal-root (outside the React tree).
// ============================================================

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./ModalExample2.css";

// ============================================================
// ModalExample2
// Props:
//   student     (object)   → { id, name, department } shown in modal
//   onClose     (function) → close callback (cancel or after delete)
//   onConfirm   (function) → called with the typed confirmation
//                           Should return a Promise (simulated API).
// ============================================================
function ModalExample2({ student, onClose, onConfirm }) {
  // ---------- State ----------
  const [typed, setTyped] = useState(""); // text typed by user
  const [busy, setBusy] = useState(false); // loading state
  const [errorMsg, setErrorMsg] = useState(""); // error message

  // ---------- Refs ----------
  const inputRef = useRef(null); // for auto-focus

  // ---------- Effect: focus input + lock scroll + Esc key ----------
  useEffect(() => {
    // Focus the confirmation input when the modal opens.
    inputRef.current?.focus();

    // Lock page scroll while modal is open (common real-world detail).
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Close on Escape unless a delete is in progress.
    const handleKey = (event) => {
      if (event.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [busy, onClose]);

  // ---------- Portal target ----------
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) {
    console.error(
      "ModalExample2: #portal-root not found. Add <div id='portal-root'></div> to index.html.",
    );
    return null;
  }

  // ---------- Handlers ----------
  const confirmValid = typed.trim().toUpperCase() === "DELETE";

  const handleConfirm = async () => {
    if (!confirmValid || busy) return;

    setBusy(true);
    setErrorMsg("");

    try {
      // onConfirm is expected to return a Promise (simulated API call).
      await onConfirm(student);
      // Parent will close the modal on success.
    } catch (err) {
      setErrorMsg(err?.message || "Something went wrong. Try again.");
      setBusy(false);
    }
  };

  // Close only when not busy (prevents closing mid-delete).
  const safeClose = () => {
    if (!busy) onClose();
  };

  // ---------- Portal content ----------
  const modalContent = (
    <div className="del-overlay" onClick={safeClose} role="presentation">
      <div
        className="del-card"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="del-title"
        aria-describedby="del-desc"
      >
        {/* ---------- Warning icon ---------- */}
        <div className="del-icon" aria-hidden="true">
          ⚠
        </div>

        {/* ---------- Title + description ---------- */}
        <h2 className="del-title" id="del-title">
          Delete Student?
        </h2>

        <p className="del-desc" id="del-desc">
          This action cannot be undone. The following record will be permanently
          removed:
        </p>

        {/* ---------- Student preview ---------- */}
        <div className="del-student">
          <div className="del-avatar" aria-hidden="true">
            {student.name.charAt(0)}
          </div>
          <div className="del-student-info">
            <span className="del-student-name">{student.name}</span>
            <span className="del-student-dept">{student.department}</span>
          </div>
        </div>

        {/* ---------- Type-to-confirm ---------- */}
        <label className="del-label" htmlFor="del-input">
          Type <strong>DELETE</strong> to confirm
        </label>
        <input
          id="del-input"
          ref={inputRef}
          type="text"
          className="del-input"
          placeholder="DELETE"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          disabled={busy}
          autoComplete="off"
          spellCheck="false"
        />

        {/* ---------- Error message ---------- */}
        {errorMsg && <p className="del-error">{errorMsg}</p>}

        {/* ---------- Actions ---------- */}
        <div className="del-actions">
          <button
            type="button"
            className="del-btn del-btn--ghost"
            onClick={safeClose}
            disabled={busy}
          >
            Cancel
          </button>

          <button
            type="button"
            className="del-btn del-btn--danger"
            onClick={handleConfirm}
            disabled={!confirmValid || busy}
          >
            {busy ? (
              <>
                <span className="del-spinner" aria-hidden="true" /> Deleting…
              </>
            ) : (
              "Delete Student"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, portalRoot);
}

export default ModalExample2;
