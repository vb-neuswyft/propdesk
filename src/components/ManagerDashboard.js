import { useState } from "react";
import S from "../styles/styles";
import { Logo, StatCard, PriorityBadge, StatusBadge, EmptyState, categoryIcon } from "./UI";
import TicketDrawer from "./TicketDrawer";
import TicketForm from "./TicketForm";
import { STATUS_STYLES, PRIORITY_STYLES } from "../data/seed";

const NAV_ITEMS = [
  { id: "dashboard",  icon: "▦",  label: "Dashboard"   },
  { id: "tickets",    icon: "🎫", label: "All Tickets"  },
  { id: "properties", icon: "🏢", label: "Properties"   },
  { id: "renters",    icon: "👥", label: "Renters"      },
  { id: "settings",   icon: "⚙",  label: "Settings"     },
];

const ManagerDashboard = ({
  currentUser, properties, tickets, users,
  onUpdateStatus, onAddTicket, onSignOut,
}) => {
  const [activeTab, setActiveTab]         = useState("dashboard");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showForm, setShowForm]           = useState(false);
  const [filterStatus, setFilterStatus]   = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");

  const myProperties = properties.filter((p) => p.companyId === currentUser?.companyId);
  const myTickets    = tickets.filter((t) => myProperties.some((p) => p.id === t.propertyId));

  const filtered = myTickets.filter((t) => {
    if (filterStatus   !== "ALL" && t.status   !== filterStatus)   return false;
    if (filterPriority !== "ALL" && t.priority !== filterPriority) return false;
    return true;
  });

  const stats = {
    open:       myTickets.filter((t) => t.status === "OPEN").length,
    inProgress: myTickets.filter((t) => t.status === "IN_PROGRESS").length,
    resolved:   myTickets.filter((t) => t.status === "RESOLVED").length,
    critical:   myTickets.filter((t) => t.priority === "CRITICAL").length,
  };

  // ── Ticket row ──────────────────────────────────────────────────────────────
  const TicketRow = ({ t }) => {
    const prop = properties.find((p) => p.id === t.propertyId);
    return (
      <div
        style={{ ...S.ticketGrid, background: "transparent" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff04")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        onClick={() => setSelectedTicket(t)}
      >
        <div style={{ fontSize: 11, color: "#5A5570", fontWeight: 700 }}>#{t.id}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 1, display: "flex", gap: 6, alignItems: "center" }}>
            {t.title}
            {t.photos?.length > 0 && <span style={{ fontSize: 11, color: "#9993A8" }}>📷{t.photos.length}</span>}
          </div>
          <div style={{ fontSize: 11, color: "#9993A8" }}>Unit {t.unit} · {t.renter} · {t.date}</div>
        </div>
        <div style={{ fontSize: 12, color: "#9993A8" }}>{prop?.name}</div>
        <div style={{ fontSize: 12, color: "#9993A8" }}>{t.category}</div>
        <PriorityBadge priority={t.priority} />
        <StatusBadge   status={t.status}   />
        <div style={{ fontSize: 18, color: "#5A5570" }}>›</div>
      </div>
    );
  };

  const TableHead = () => (
    <div style={S.ticketGridHead}>
      {["#","Issue","Property","Category","Priority","Status",""].map((h) => (
        <div key={h} style={S.headCell}>{h}</div>
      ))}
    </div>
  );

  return (
    <div style={S.body}>
      <div style={S.layout}>

        {/* Sidebar */}
        <div style={S.sidebar}>
          <div style={S.sidebarLogo}>
            prop<span style={S.logoAccent}>desk</span>
            <div style={{ fontSize: 10, color: "#9993A8", fontWeight: 500, marginTop: 2 }}>
              Vancouver, BC Portfolio
            </div>
          </div>
          <div style={S.sidebarSection}>Navigation</div>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ ...S.sidebarItem, ...(activeTab === item.id ? S.sidebarItemActive : {}) }}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span> {item.label}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={S.sidebarSection}>Account</div>
          <div style={{ ...S.sidebarItem, marginTop: 4 }}>
            <div style={{ width: 24, height: 24, borderRadius: 99, background: "#E8622A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>
              {currentUser?.name?.[0]?.toUpperCase()}
            </div>
            {currentUser?.name}
          </div>
          <div style={{ ...S.sidebarItem, color: "#5A5570", fontSize: 12 }} onClick={onSignOut}>
            ← Sign Out
          </div>
        </div>

        {/* Main */}
        <div style={S.main}>

          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && <>
            <div style={S.pageTitle}>Dashboard</div>
            <div style={S.pageSub}>Vancouver, BC portfolio · {myProperties.length} properties</div>
            <div style={S.statsRow}>
              <StatCard value={stats.open}       label="Open Tickets" color="#FF2D2D" />
              <StatCard value={stats.inProgress} label="In Progress"  color="#2A7BE8" />
              <StatCard value={stats.resolved}   label="Resolved"     color="#22AA55" />
              <StatCard value={stats.critical}   label="Critical"     color="#FF2D2D" />
            </div>
            <div style={S.tableWrap}>
              <div style={S.tableHeader}>
                <div style={S.tableTitle}>Recent Tickets</div>
                <button style={{ ...S.btnPrimary, fontSize: 12, padding: "8px 16px" }} onClick={() => { setActiveTab("tickets"); setShowForm(true); }}>
                  + New Ticket
                </button>
              </div>
              <TableHead />
              {myTickets.slice(0, 6).map((t) => <TicketRow key={t.id} t={t} />)}
              {myTickets.length === 0 && <EmptyState icon="🎫" title="No tickets yet" subtitle="Tickets submitted by renters will appear here" />}
            </div>
          </>}

          {/* ── ALL TICKETS ── */}
          {activeTab === "tickets" && <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div style={S.pageTitle}>All Tickets</div>
              <button style={{ ...S.btnPrimary, fontSize: 13, padding: "10px 18px" }} onClick={() => setShowForm(true)}>
                + New Ticket
              </button>
            </div>
            <div style={S.pageSub}>{filtered.length} tickets across {myProperties.length} properties</div>
            <div style={S.tableWrap}>
              <div style={S.filterRow}>
                {["ALL","OPEN","IN_PROGRESS","RESOLVED"].map((s) => (
                  <button key={s} style={{ ...S.filterBtn, ...(filterStatus === s ? S.filterBtnActive : {}) }} onClick={() => setFilterStatus(s)}>
                    {s === "ALL" ? "All Status" : STATUS_STYLES[s]?.label}
                  </button>
                ))}
                <div style={{ width: 1, background: "#ffffff10", margin: "0 4px" }} />
                {["ALL","CRITICAL","HIGH","MEDIUM","LOW"].map((p) => (
                  <button key={p} style={{ ...S.filterBtn, ...(filterPriority === p ? S.filterBtnActive : {}) }} onClick={() => setFilterPriority(p)}>
                    {p === "ALL" ? "All Priority" : PRIORITY_STYLES[p]?.label}
                  </button>
                ))}
              </div>
              <TableHead />
              {filtered.map((t) => <TicketRow key={t.id} t={t} />)}
              {filtered.length === 0 && <EmptyState icon="🔍" title="No tickets match your filters" subtitle="Try changing the status or priority filter" />}
            </div>
          </>}

          {/* ── PROPERTIES ── */}
          {activeTab === "properties" && <>
            <div style={S.pageTitle}>Properties</div>
            <div style={S.pageSub}>{myProperties.length} properties in your Vancouver portfolio</div>
            <div style={S.propGrid}>
              {myProperties.map((p) => {
                const pT     = myTickets.filter((t) => t.propertyId === p.id);
                const openC  = pT.filter((t) => t.status === "OPEN").length;
                const critC  = pT.filter((t) => t.priority === "CRITICAL").length;
                const renterCount = users.filter((u) => u.role === "renter" && u.propertyId === p.id).length;
                return (
                  <div key={p.id} style={S.propCard} onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#E8622A55")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ffffff08")}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{p.image}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#9993A8", marginBottom: 14 }}>{p.address}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <div style={S.propMetaChip}>{p.units} units</div>
                      <div style={S.propMetaChip}>👥 {renterCount} renters</div>
                      {openC > 0 && <div style={{ ...S.propMetaChip, background: "#FF2D2D18", color: "#FF2D2D" }}>{openC} open</div>}
                      {critC > 0 && <div style={{ ...S.propMetaChip, background: "#FF2D2D33", color: "#FF2D2D", fontWeight: 800 }}>🔴 {critC} critical</div>}
                    </div>
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #ffffff08" }}>
                      <div style={{ fontSize: 11, color: "#5A5570", marginBottom: 6, fontWeight: 700 }}>RENTER SIGNUP LINK</div>
                      <div style={{ fontSize: 11, color: "#E8622A", background: "#E8622A10", borderRadius: 6, padding: "6px 10px", wordBreak: "break-all" }}>
                        propdesk.ca/?property={p.id}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ ...S.propCard, border: "2px dashed #ffffff15", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 180 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>+</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Add Property</div>
                <div style={{ fontSize: 12, color: "#9993A8", marginTop: 4 }}>Expand your portfolio</div>
              </div>
            </div>
          </>}

          {/* ── RENTERS ── */}
          {activeTab === "renters" && <>
            <div style={S.pageTitle}>Renters</div>
            <div style={S.pageSub}>{users.filter((u) => u.role === "renter").length} registered renters</div>
            <div style={S.tableWrap}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", gap: 12, padding: "10px 20px", background: "#0F0F14", borderBottom: "1px solid #ffffff08" }}>
                {["Name","Email","Property · Unit","Tickets"].map((h) => <div key={h} style={S.headCell}>{h}</div>)}
              </div>
              {users.filter((u) => u.role === "renter").map((u) => {
                const prop = properties.find((p) => p.id === u.propertyId);
                const tc   = tickets.filter((t) => t.renterId === u.id).length;
                return (
                  <div key={u.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", gap: 12, padding: "14px 20px", borderBottom: "1px solid #ffffff06", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 99, background: "#E8622A22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#E8622A", fontWeight: 800 }}>
                        {u.name[0]}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#9993A8" }}>{u.email}</div>
                    <div style={{ fontSize: 12, color: "#9993A8" }}>{prop ? `${prop.name} · Unit ${u.unit}` : "—"}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: tc > 0 ? "#E8622A" : "#9993A8" }}>{tc}</div>
                  </div>
                );
              })}
              {users.filter((u) => u.role === "renter").length === 0 && (
                <EmptyState icon="👥" title="No renters yet" subtitle="Renters will appear here once they sign up" />
              )}
            </div>
          </>}

          {/* ── SETTINGS ── */}
          {activeTab === "settings" && <>
            <div style={S.pageTitle}>Settings</div>
            <div style={S.pageSub}>Manage your workspace and billing</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { title: "Company Profile",          icon: "🏢", desc: "Name, logo, and contact information" },
                { title: "Team Members",              icon: "👥", desc: "Invite and manage staff access" },
                { title: "Billing & Plan",            icon: "💳", desc: "Current plan: Pro · Manage subscription" },
                { title: "Notification Preferences",  icon: "🔔", desc: "Email alerts for new and urgent tickets" },
                { title: "Integrations",              icon: "🔗", desc: "Connect Slack, email, and SMS alerts" },
                { title: "Renter Portal Branding",    icon: "🎨", desc: "Custom colors and logo for your tenants" },
              ].map((c) => (
                <div key={c.title} style={{ ...S.propCard, cursor: "pointer" }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: "#9993A8" }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </>}

        </div>
      </div>

      {/* Ticket detail drawer */}
      {selectedTicket && (
        <TicketDrawer
          ticket={selectedTicket}
          properties={properties}
          onClose={() => setSelectedTicket(null)}
          onUpdateStatus={(id, status) => {
            onUpdateStatus(id, status);
            setSelectedTicket((prev) => ({ ...prev, status }));
          }}
        />
      )}

      {/* New ticket form */}
      {showForm && (
        <TicketForm
          currentUser={currentUser}
          properties={myProperties}
          tickets={tickets}
          onSubmit={onAddTicket}
          onClose={() => setShowForm(false)}
          isManager={true}
        />
      )}
    </div>
  );
};

export default ManagerDashboard;
