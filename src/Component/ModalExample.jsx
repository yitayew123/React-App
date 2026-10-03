// ============================================================
// ModalExample.jsx
// A reusable MODAL component that renders via React PORTAL.
//
// KEY IDEAS:
//   - createPortal(jsx, domNode) renders the JSX into a DOM node
//     that lives OUTSIDE the normal React tree.
//   - WHY USE A PORTAL?
//       1. Escapes parent overflow/z-index stacking issues.
//       2. Keeps modal styles isolated from surrounding layout.
//       3. Semantically places modal at the top of the DOM.
//   - The portal target is <div id="portal-root"> in index.html.
//   - Closing is handled by a parent callback (onClose).
//   - Extras: close on overlay click, close on Escape key,
//     animations, accessibility (role/aria).
// ============================================================

// Named import of createPortal from react-dom (modern React).
import { createPortal } from "react-dom";

// useEffect to attach the Escape-key listener.
import { useEffect } from "react";

// Side-effect CSS import for this component.
import "./ModalExample.css";

// ============================================================
// ModalExample
// Props:
//   studentName (string)   → shown in the confirmation message
//   onClose     (function) → parent callback to close the modal
// ============================================================
function ModalExample({ studentName, onClose }) {
  // ---------- Close on Escape key ----------
  // Attach a keydown listener when the modal mounts.
  // Remove it on unmount to avoid memory leaks.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // ---------- Where to render the portal ----------
  const portalRoot = document.getElementById("portal-root");

  // ---------- Fallback if the DOM node is missing ----------
  if (!portalRoot) {
    console.error(
      "ModalExample: #portal-root is missing. Add <div id='portal-root'></div> to index.html.",
    );
    return null;
  }

  // ---------- Portal content ----------
  const modalContent = (
    // Overlay: full-screen dark backdrop. Clicking it closes the modal.
    <div className="modal-overlay" onClick={onClose} role="presentation">
      {/* Modal card. stopPropagation prevents closing when the card
          itself is clicked (only the overlay click should close). */}
      <div
        className="modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Success icon badge */}
        <div className="modal-icon" aria-hidden="true">
          ✓
        </div>

        {/* Title (linked to aria-labelledby) */}
        <h2 className="modal-title" id="modal-title">
          Registration Successful
        </h2>

        {/* Body message — uses the studentName prop */}
        <p className="modal-message">
          Student <strong>{studentName}</strong> has been registered
          successfully.
        </p>

        {/* Footer actions */}
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

  // ---------- Render into #portal-root, not the React tree ----------
  return createPortal(modalContent, portalRoot);
}

export default ModalExample;
