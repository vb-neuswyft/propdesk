import { useState } from "react";
import S from "../styles/styles";
import { Logo, StatCard, EmptyState, categoryIcon, PriorityBadge, StatusBadge } from "./UI";
import TicketForm from "./TicketForm";
import ChexyButton from "./ChexyButton";

const RenterPortal = ({ currentUser, properties, tickets, onAddTicket, onSignOut }) => {
  const [showForm, setShowForm] = useState(false);

  const myProperty    = properties.find((p) => p.id === currentUser?.propertyId);
  const myTickets     = tickets.filter((t) => t.renterId === currentUser?.id);

  const stats = [
    { label: "My Open",     value: myTickets.filter((t) => t.status === "OPEN").length,        color: "#FF2D2D" },
    { label: "In Progress", value: myTickets.filter((t) => t.status === "IN_PROGRESS").length, color: "#2A7BE8" },
    { label: "Resolved",    value: myTickets.filter((t) => t.status === "RESOLVED").length,    color: "#22AA55" },
  ];

  return (
    <div style={S.body}>
      <div style={S.renterWrap}>

        {/* Header */}
        <div style={S.renterHeader}>
          <Logo />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "#9993A8" }}>👋 {currentUser?.name}</span>
            <button style={S.btnGhost} onClick={onSignOut}>Sign Out</button>
          </div>
        </div>

        <div style={S.renterCard}>
          {/* Page header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <div style={S.pageTitle}>My Maintenance</div>
              <div style={{ fontSize: 13, color: "#9993A8" }}>
                {myProperty ? `${myProperty.address} · Unit ${currentUser?.unit}` : "No property assigned"}
              </div>
            </div>
            <button style={{ ...S.btnPrimary, fontSize: 13, padding: "10px 18px" }} onClick={() => setShowForm(true)}>
              + Submit Request
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {stats.map((st) => (
              <div key={st.label} style={{ flex: 1, minWidth: 100, background: "#0F0F14", borderRadius: 10, padding: "14px 16px", border: "1px solid #ffffff08" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: st.color }}>{st.value}</div>
                <div style={{ fontSize: 11, color: "#9993A8", fontWeight: 600, marginTop: 2 }}>{st.label}</div>
              </div>
            ))}
          </div>

          {/* Ticket list */}
          <div style={{ fontSize: 13, color: "#9993A8", marginBottom: 14, fontWeight: 700 }}>
            MY SUBMITTED REQUESTS
          </div>

          {myTickets.length === 0
            ? <EmptyState icon="📭" title="No requests yet" subtitle="Submit your first maintenance request above" />
            : myTickets.map((t) => (
              <div key={t.id} style={{ padding: "14px 0", borderBottom: "1px solid #ffffff08", display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: "#ffffff08", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {categoryIcon(t.category)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: "#9993A8", display: "flex", gap: 8, alignItems: "center" }}>
                    <span>{t.category}</span>
                    <span>·</span>
                    <span>{t.date}</span>
                    {t.photos?.length > 0 && <span>· 📷 {t.photos.length}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <StatusBadge   status={t.status}   />
                  <PriorityBadge priority={t.priority} />
                </div>
              </div>
            ))
          }

          {/* Chexy payment button */}
          <ChexyButton
            renterName={currentUser?.name}
            propertyAddress={myProperty?.address}
            unit={currentUser?.unit}
          />
        </div>
      </div>

      {/* Ticket submission form */}
      {showForm && (
        <TicketForm
          currentUser={currentUser}
          properties={properties}
          tickets={tickets}
          onSubmit={onAddTicket}
          onClose={() => setShowForm(false)}
          isManager={false}
        />
      )}
    </div>
  );
};

export default RenterPortal;
