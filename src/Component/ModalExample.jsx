import { createPortal } from "react-dom";
import { useEffect } from "react";
import "./ModalExample.css";

// Shows a registration confirmation in a portal.
function ModalExample({ studentName, onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) {
    console.error(
      "ModalExample: #portal-root is missing. Add <div id='portal-root'></div> to index.html.",
    );
    return null;
  }

  const modalContent = (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      {/* Keep clicks inside the dialog from reaching the overlay. */}
      <div
        className="modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-icon" aria-hidden="true">
          ✓
        </div>

        <h2 className="modal-title" id="modal-title">
          Registration Successful
        </h2>

        <p className="modal-message">
          Student <strong>{studentName}</strong> has been registered
          successfully.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-btn modal-btn--primary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, portalRoot);
}

export default ModalExample;
