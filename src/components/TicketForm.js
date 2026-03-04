import { useState } from "react";
import S from "../styles/styles";
import { Field } from "./UI";
import PhotoUpload from "./PhotoUpload";
import { CATEGORIES } from "../data/seed";
import { sendTicketNotification } from "../utils/emailService";

const EMPTY_FORM = {
  title: "", category: "Plumbing", priority: "MEDIUM",
  description: "", propertyId: "", unit: "", renter: "",
};

/**
 * TicketForm
 * Used by both renters (simpler, locked to their property)
 * and managers (full form with property selector).
 */
const TicketForm = ({
  currentUser,
  properties,
  tickets,
  onSubmit,
  onClose,
  isManager = false,
}) => {
  const [form, setForm]         = useState(EMPTY_FORM);
  const [photos, setPhotos]     = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // "sent" | "failed" | null

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const myProperty = properties.find((p) => p.id === currentUser?.propertyId);

  const handleSubmit = async () => {
    if (!form.title) return;

    setSubmitting(true);

    const id       = Math.max(...tickets.map((t) => t.id), 0) + 1;
    const propId   = isManager ? parseInt(form.propertyId) : currentUser.propertyId;
    const rName    = isManager ? form.renter  : currentUser.name;
    const unit     = isManager ? form.unit    : currentUser.unit;
    const property = properties.find((p) => p.id === propId);

    const newTicket = {
      ...form,
      id,
      propertyId: propId,
      renterId:   currentUser?.id || "manual",
      renter:     rName,
      unit,
      status:     "OPEN",
      date:       new Date().toISOString().split("T")[0],
      assignee:   null,
      photos,
    };

    // Submit the ticket first
    onSubmit(newTicket);

    // Send email notification (non-blocking)
    const emailResult = await sendTicketNotification(newTicket, property);
    setEmailStatus(emailResult.success ? "sent" : "failed");

    setSubmitting(false);
    setSubmitted(true);

    // Auto-close after 2.5s
    setTimeout(() => {
      setSubmitted(false);
      setPhotos([]);
      setForm(EMPTY_FORM);
      onClose();
    }, 2500);
  };

  if (submitted) return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ ...S.drawer, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Request Submitted!</div>
        <div style={{ fontSize: 13, color: "#9993A8", textAlign: "center", marginBottom: 16 }}>
          We've received your maintenance request and will be in touch soon.
        </div>
        {emailStatus === "sent" && (
          <div style={S.infoBanner}>
            <span>📧</span> Manager has been notified by email
          </div>
        )}
        {photos.length > 0 && (
          <div style={{ fontSize: 12, color: "#9993A8" }}>
            📷 {photos.length} photo{photos.length > 1 ? "s" : ""} attached
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.drawer}>
        <div style={S.drawerTitle}>{isManager ? "Create Ticket" : "Submit Maintenance Request"}</div>
        <div style={S.drawerSub}>
          {isManager
            ? "Log a new maintenance request manually."
            : `Unit ${currentUser?.unit} · ${myProperty?.address}`}
        </div>

        {/* Property selector — manager only */}
        {isManager && (
          <Field label="Property">
            <select style={S.select} value={form.propertyId} onChange={(e) => set("propertyId", e.target.value)}>
              <option value="">Select property...</option>
              {properties.map((p) => <option key={p.id} value={p.id}>{p.address}</option>)}
            </select>
          </Field>
        )}

        {/* Renter name + unit — manager only */}
        {isManager && <>
          <Field label="Renter Name">
            <input style={S.input} placeholder="Full name" value={form.renter} onChange={(e) => set("renter", e.target.value)} />
          </Field>
          <Field label="Unit Number">
            <input style={S.input} placeholder="e.g. 3" value={form.unit} onChange={(e) => set("unit", e.target.value)} />
          </Field>
        </>}

        <Field label="Issue Title">
          <input style={S.input} placeholder="Short description of the problem" value={form.title} onChange={(e) => set("title", e.target.value)} />
        </Field>

        <Field label="Category">
          <select style={S.select} value={form.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Priority">
          <select style={S.select} value={form.priority} onChange={(e) => set("priority", e.target.value)}>
            {[["LOW","Low"],["MEDIUM","Medium"],["HIGH","High"],["CRITICAL","Critical"]].map(([v,l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </Field>

        <Field label="Description">
          <textarea
            style={S.textarea}
            placeholder="Describe the issue in detail. The more info you provide, the faster we can fix it!"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>

        {/* Photo upload */}
        <Field label="Photos (optional)">
          <PhotoUpload photos={photos} onChange={setPhotos} maxPhotos={3} />
        </Field>

        {/* Email notice */}
        <div style={{ ...S.infoBanner, marginBottom: 16 }}>
          <span>📧</span>
          <span>The property manager will be notified by email when you submit.</span>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{ ...S.btnSmall, background: submitting ? "#666" : "#E8622A", color: "#fff", flex: 1 }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : isManager ? "Create Ticket" : "Submit Request"}
          </button>
          <button style={{ ...S.btnSmall, background: "#ffffff10", color: "#F0EDE8" }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
