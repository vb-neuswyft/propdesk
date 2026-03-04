import S from "../styles/styles";
import { PriorityBadge, StatusBadge, Field } from "./UI";
import { STATUS_STYLES } from "../data/seed";

const TicketDrawer = ({ ticket, properties, onClose, onUpdateStatus }) => {
  if (!ticket) return null;
  const property = properties.find((p) => p.id === ticket.propertyId);

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.drawer}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: "#5A5570", fontWeight: 700, marginBottom: 4 }}>
              TICKET #{ticket.id}
            </div>
            <div style={S.drawerTitle}>{ticket.title}</div>
          </div>
          <button style={{ ...S.btnSmall, background: "#ffffff10", color: "#F0EDE8" }} onClick={onClose}>✕</button>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge   status={ticket.status}   />
        </div>

        {/* Details */}
        {[
          { label: "Renter",    value: ticket.renter },
          { label: "Unit",      value: ticket.unit },
          { label: "Property",  value: property?.address },
          { label: "Category",  value: ticket.category },
          { label: "Submitted", value: ticket.date },
          { label: "Assignee",  value: ticket.assignee || "Unassigned" },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #ffffff06" }}>
            <span style={{ fontSize: 12, color: "#5A5570", fontWeight: 700 }}>{row.label}</span>
            <span style={{ fontSize: 13, color: "#F0EDE8", textAlign: "right" }}>{row.value}</span>
          </div>
        ))}

        {/* Description */}
        <div style={{ marginTop: 16, marginBottom: 20 }}>
          <div style={S.label}>Description</div>
          <div style={{ fontSize: 13, color: "#9993A8", lineHeight: 1.6, background: "#0F0F14", borderRadius: 8, padding: "12px 14px" }}>
            {ticket.description || "No description provided."}
          </div>
        </div>

        {/* Photos */}
        {ticket.photos?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={S.label}>Attached Photos ({ticket.photos.length})</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              {ticket.photos.map((photo, i) => (
                <a key={i} href={photo.url} target="_blank" rel="noopener noreferrer">
                  <img src={photo.url} alt={photo.name} style={{ ...S.photoThumb, width: 80, height: 80 }} />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Status updater */}
        <div style={S.label}>Update Status</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["OPEN", "IN_PROGRESS", "RESOLVED"].map((s) => {
            const st = STATUS_STYLES[s];
            const isActive = ticket.status === s;
            return (
              <button
                key={s}
                style={{
                  ...S.btnSmall,
                  background: isActive ? st.bg  : "#ffffff08",
                  color:      isActive ? st.text : "#9993A8",
                  border:     `1px solid ${isActive ? st.text + "44" : "transparent"}`,
                }}
                onClick={() => onUpdateStatus(ticket.id, s)}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicketDrawer;
