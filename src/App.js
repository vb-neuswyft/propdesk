import { useState } from "react";

const MOCK_DATA = {
  companies: [
    { id: 1, name: "PropDesk Management", plan: "Pro", color: "#E8622A" },
    { id: 2, name: "BlueSky Properties", plan: "Starter", color: "#2A7BE8" },
  ],
  properties: [
    { id: 1, companyId: 1, name: "3477 E 48th Ave", address: "3477 E 48th Ave, Vancouver, BC", units: 6, image: "🏘" },
    { id: 2, companyId: 1, name: "3479 E 48th Ave", address: "3479 E 48th Ave, Vancouver, BC", units: 6, image: "🏘" },
    { id: 3, companyId: 1, name: "3416 E 4th Ave", address: "3416 E 4th Ave, Vancouver, BC", units: 8, image: "🏢" },
    { id: 4, companyId: 2, name: "Ocean View Condos", address: "321 Coastal Blvd, Miami FL", units: 40, image: "🏙" },
  ],
  tickets: [
    { id: 1, propertyId: 1, unit: "2", renter: "Sarah M.", title: "Heating not working", category: "HVAC", priority: "HIGH", status: "IN_PROGRESS", date: "2026-02-28", description: "The heater stopped working 3 days ago.", assignee: "Mike T." },
    { id: 2, propertyId: 1, unit: "4", renter: "James L.", title: "Leaky faucet in kitchen", category: "Plumbing", priority: "MEDIUM", status: "OPEN", date: "2026-03-01", description: "Kitchen faucet dripping constantly.", assignee: null },
    { id: 3, propertyId: 2, unit: "1", renter: "Priya K.", title: "Broken window latch", category: "Security", priority: "HIGH", status: "OPEN", date: "2026-03-02", description: "Window won't lock properly.", assignee: null },
    { id: 4, propertyId: 3, unit: "3", renter: "Tom H.", title: "Mold in bathroom", category: "Health & Safety", priority: "CRITICAL", status: "OPEN", date: "2026-03-01", description: "Black mold forming near shower.", assignee: null },
    { id: 5, propertyId: 2, unit: "5", renter: "Dana W.", title: "Parking lot light out", category: "Electrical", priority: "LOW", status: "RESOLVED", date: "2026-02-20", description: "Light bulb in spot 12 is out.", assignee: "Carlos R." },
  ]
};

const PRIORITY_STYLES = {
  CRITICAL: { bg: "#FF2D2D22", text: "#FF2D2D", label: "Critical" },
  HIGH: { bg: "#FF7A2222", text: "#FF7A22", label: "High" },
  MEDIUM: { bg: "#F5C84222", text: "#C49500", label: "Medium" },
  LOW: { bg: "#22AA5522", text: "#22AA55", label: "Low" },
};
const STATUS_STYLES = {
  OPEN: { bg: "#FF2D2D18", text: "#FF2D2D", label: "Open" },
  IN_PROGRESS: { bg: "#2A7BE818", text: "#2A7BE8", label: "In Progress" },
  RESOLVED: { bg: "#22AA5518", text: "#22AA55", label: "Resolved" },
};

const CATEGORIES = ["Plumbing", "Electrical", "HVAC", "Appliance", "Security", "Pest Control", "Health & Safety", "Structural", "Other"];

export default function App() {
  const [view, setView] = useState("landing"); // landing | login | dashboard | renter
  const [role, setRole] = useState(null); // manager | renter
  const [activeCompany] = useState(MOCK_DATA.companies[0]);
  const [tickets, setTickets] = useState(MOCK_DATA.tickets);
  const [properties] = useState(MOCK_DATA.properties);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [renterPropertyId, setRenterPropertyId] = useState(null);
  const [newTicket, setNewTicket] = useState({ unit: "", renter: "", title: "", category: "Plumbing", priority: "MEDIUM", description: "", propertyId: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const companyProperties = properties.filter(p => p.companyId === activeCompany.id);
  const companyTickets = tickets.filter(t => companyProperties.some(p => p.id === t.propertyId));

  const filteredTickets = companyTickets.filter(t => {
    if (filterStatus !== "ALL" && t.status !== filterStatus) return false;
    if (filterPriority !== "ALL" && t.priority !== filterPriority) return false;
    return true;
  });

  const stats = {
    open: companyTickets.filter(t => t.status === "OPEN").length,
    inProgress: companyTickets.filter(t => t.status === "IN_PROGRESS").length,
    resolved: companyTickets.filter(t => t.status === "RESOLVED").length,
    critical: companyTickets.filter(t => t.priority === "CRITICAL").length,
  };

  const handleSubmitTicket = () => {
    const id = Math.max(...tickets.map(t => t.id)) + 1;
    const t = { ...newTicket, id, propertyId: parseInt(newTicket.propertyId) || renterPropertyId, status: "OPEN", date: new Date().toISOString().split("T")[0], assignee: null };
    setTickets(prev => [t, ...prev]);
    setSubmitSuccess(true);
    setTimeout(() => { setSubmitSuccess(false); setShowNewTicket(false); setNewTicket({ unit: "", renter: "", title: "", category: "Plumbing", priority: "MEDIUM", description: "", propertyId: "" }); }, 2000);
  };

  const updateTicketStatus = (id, status) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    if (selectedTicket?.id === id) setSelectedTicket(prev => ({ ...prev, status }));
  };

  const s = {
    body: { fontFamily: "'DM Sans', sans-serif", background: "#0C0C0F", color: "#F0EDE8", minHeight: "100vh", margin: 0 },
    // LANDING
    landing: { minHeight: "100vh", background: "linear-gradient(135deg, #0C0C0F 0%, #141420 60%, #0C0C0F 100%)", display: "flex", flexDirection: "column" },
    landingNav: { padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ffffff0d" },
    logo: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: "#F0EDE8" },
    logoAccent: { color: "#E8622A" },
    landingHero: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" },
    badge: { display: "inline-flex", alignItems: "center", gap: 6, background: "#E8622A18", border: "1px solid #E8622A44", borderRadius: 99, padding: "6px 14px", fontSize: 12, color: "#E8622A", marginBottom: 28, letterSpacing: "0.05em", fontWeight: 600 },
    h1: { fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 20, maxWidth: 800 },
    h1Gradient: { background: "linear-gradient(90deg, #F0EDE8, #E8622A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    subtext: { fontSize: 18, color: "#9993A8", maxWidth: 560, lineHeight: 1.6, marginBottom: 48 },
    btnRow: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
    btnPrimary: { background: "#E8622A", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", letterSpacing: "-0.2px" },
    btnSecondary: { background: "transparent", color: "#F0EDE8", border: "1px solid #ffffff22", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" },
    btnGhost: { background: "transparent", color: "#9993A8", border: "none", fontSize: 14, cursor: "pointer", padding: "4px 0" },
    featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, maxWidth: 900, margin: "60px auto 0", padding: "0 24px" },
    featureCard: { background: "#ffffff06", border: "1px solid #ffffff0d", borderRadius: 14, padding: "24px 20px" },
    featureIcon: { fontSize: 28, marginBottom: 12 },
    featureTitle: { fontSize: 14, fontWeight: 700, color: "#F0EDE8", marginBottom: 6 },
    featureDesc: { fontSize: 13, color: "#9993A8", lineHeight: 1.5 },
    // LOGIN
    loginWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0C0C0F", padding: 24 },
    loginCard: { background: "#141418", border: "1px solid #ffffff10", borderRadius: 20, padding: "44px 40px", width: "100%", maxWidth: 420 },
    loginTitle: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 },
    loginSub: { fontSize: 14, color: "#9993A8", marginBottom: 36 },
    roleGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 },
    roleCard: { border: "2px solid #ffffff15", borderRadius: 12, padding: "18px 14px", textAlign: "center", cursor: "pointer", transition: "all .2s", background: "transparent" },
    roleCardActive: { borderColor: "#E8622A", background: "#E8622A12" },
    // LAYOUT
    layout: { display: "flex", minHeight: "100vh", background: "#0C0C0F" },
    sidebar: { width: 240, background: "#0F0F14", borderRight: "1px solid #ffffff08", display: "flex", flexDirection: "column", padding: "0 0 20px", flexShrink: 0 },
    sidebarLogo: { padding: "22px 20px 16px", fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", borderBottom: "1px solid #ffffff08" },
    sidebarSection: { padding: "16px 12px 0", fontSize: 10, letterSpacing: "0.1em", color: "#5A5570", fontWeight: 700, textTransform: "uppercase" },
    sidebarItem: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, margin: "2px 8px", fontSize: 13, color: "#9993A8", cursor: "pointer", transition: "all .15s", fontWeight: 500 },
    sidebarItemActive: { background: "#E8622A18", color: "#E8622A" },
    main: { flex: 1, overflow: "auto", padding: "32px 36px" },
    pageTitle: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 },
    pageSub: { fontSize: 13, color: "#9993A8", marginBottom: 32 },
    // STATS
    statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 },
    statCard: { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, padding: "20px 20px 16px" },
    statValue: { fontSize: 34, fontWeight: 800, letterSpacing: "-1px" },
    statLabel: { fontSize: 12, color: "#9993A8", marginTop: 4, fontWeight: 500 },
    // TABLES
    tableWrap: { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, overflow: "hidden" },
    tableHeader: { display: "flex", gap: 12, alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #ffffff08" },
    tableTitle: { fontSize: 15, fontWeight: 700, flex: 1 },
    filterRow: { display: "flex", gap: 8, padding: "12px 20px", borderBottom: "1px solid #ffffff08", background: "#0F0F14", flexWrap: "wrap" },
    filterBtn: { padding: "5px 12px", borderRadius: 99, border: "1px solid #ffffff15", background: "transparent", color: "#9993A8", fontSize: 12, cursor: "pointer", fontWeight: 500 },
    filterBtnActive: { borderColor: "#E8622A", background: "#E8622A15", color: "#E8622A" },
    ticketRow: { display: "grid", gridTemplateColumns: "40px 1fr 120px 90px 100px 110px 36px", gap: 12, alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #ffffff06", cursor: "pointer", transition: "background .15s" },
    ticketRowHead: { display: "grid", gridTemplateColumns: "40px 1fr 120px 90px 100px 110px 36px", gap: 12, padding: "10px 20px", background: "#0F0F14", borderBottom: "1px solid #ffffff08" },
    headCell: { fontSize: 11, color: "#5A5570", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" },
    badge2: { display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 },
    // MODAL
    overlay: { position: "fixed", inset: 0, background: "#00000088", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", zIndex: 100, padding: 20 },
    drawer: { background: "#141418", border: "1px solid #ffffff10", borderRadius: 16, width: 460, maxHeight: "calc(100vh - 40px)", overflowY: "auto", padding: 28 },
    drawerTitle: { fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", marginBottom: 4 },
    drawerSub: { fontSize: 12, color: "#9993A8", marginBottom: 20 },
    field: { marginBottom: 16 },
    label: { fontSize: 11, color: "#9993A8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 },
    input: { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", boxSizing: "border-box" },
    select: { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", boxSizing: "border-box" },
    textarea: { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", resize: "vertical", minHeight: 80, boxSizing: "border-box" },
    btnSmall: { padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" },
    // PROPERTY CARD
    propGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
    propCard: { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "border-color .15s" },
    propEmoji: { fontSize: 32, marginBottom: 12 },
    propName: { fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 4 },
    propAddr: { fontSize: 12, color: "#9993A8", marginBottom: 14 },
    propMeta: { display: "flex", gap: 10 },
    propMetaChip: { fontSize: 11, background: "#ffffff08", borderRadius: 6, padding: "3px 8px", color: "#9993A8", fontWeight: 600 },
    // RENTER PORTAL
    renterWrap: { minHeight: "100vh", background: "#0C0C0F", padding: 24 },
    renterHeader: { maxWidth: 680, margin: "0 auto 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    renterCard: { maxWidth: 680, margin: "0 auto", background: "#141418", border: "1px solid #ffffff10", borderRadius: 20, padding: "36px 32px" },
    successBanner: { background: "#22AA5518", border: "1px solid #22AA5544", borderRadius: 10, padding: "14px 18px", textAlign: "center", color: "#22AA55", fontWeight: 600, marginBottom: 20, fontSize: 14 },
  };

  // LANDING PAGE
  if (view === "landing") return (
    <div style={s.body}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={s.landing}>
        <nav style={s.landingNav}>
          <div style={s.logo}>prop<span style={s.logoAccent}>desk</span></div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{ ...s.btnGhost, color: "#F0EDE8" }} onClick={() => { setView("login"); setRole("renter"); }}>Renter Portal</button>
            <button style={s.btnPrimary} onClick={() => { setView("login"); setRole(null); }}>Sign In</button>
          </div>
        </nav>
        <div style={s.landingHero}>
          <div style={s.badge}>✦ PROPERTY MANAGEMENT SAAS</div>
          <h1 style={{ ...s.h1, ...s.h1Gradient }}>Maintenance tickets.<br />Managed effortlessly.</h1>
          <p style={s.subtext}>Give your renters a sleek portal to report issues. Track, assign, and resolve every maintenance request across your entire portfolio — in one place.</p>
          <div style={s.btnRow}>
            <button style={s.btnPrimary} onClick={() => { setView("login"); setRole("manager"); }}>Start as Manager →</button>
            <button style={s.btnSecondary} onClick={() => { setView("login"); setRole("renter"); }}>Submit a Maintenance Request</button>
          </div>
          <div style={s.featureGrid}>
            {[
              { icon: "🏢", title: "Portfolio Overview", desc: "Manage unlimited properties across your entire portfolio from one dashboard." },
              { icon: "🎫", title: "Ticket Tracking", desc: "Real-time status updates with priority levels from Low to Critical." },
              { icon: "👥", title: "Multi-Tenant SaaS", desc: "White-label ready. Each company gets their own isolated workspace." },
              { icon: "📊", title: "Analytics", desc: "Spot trends, measure response times, and optimize your operations." },
            ].map(f => (
              <div key={f.title} style={s.featureCard}>
                <div style={s.featureIcon}>{f.icon}</div>
                <div style={s.featureTitle}>{f.title}</div>
                <div style={s.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 60, padding: "20px 0", borderTop: "1px solid #ffffff08", width: "100%", maxWidth: 900, textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#5A5570" }}>Trusted by property managers · 3 plans available · Free 14-day trial</p>
          </div>
        </div>
      </div>
    </div>
  );

  // LOGIN
  if (view === "login") return (
    <div style={s.body}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={s.loginWrap}>
        <div style={s.loginCard}>
          <div style={{ marginBottom: 28, cursor: "pointer", color: "#9993A8", fontSize: 13 }} onClick={() => setView("landing")}>← Back</div>
          <div style={s.logo}>prop<span style={s.logoAccent}>desk</span></div>
          <div style={{ ...s.loginTitle, marginTop: 24 }}>Welcome back</div>
          <div style={s.loginSub}>Sign in to your workspace</div>
          {!role && <div style={s.roleGrid}>
            {[{ id: "manager", icon: "🏢", label: "Property Manager" }, { id: "renter", icon: "🏠", label: "Renter" }].map(r => (
              <div key={r.id} style={{ ...s.roleCard, ...(role === r.id ? s.roleCardActive : {}), color: role === r.id ? "#E8622A" : "#9993A8" }} onClick={() => setRole(r.id)}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{r.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.label}</div>
              </div>
            ))}
          </div>}
          {role && <>
            <div style={{ ...s.roleGrid, marginBottom: 24 }}>
              {[{ id: "manager", icon: "🏢", label: "Property Manager" }, { id: "renter", icon: "🏠", label: "Renter" }].map(r => (
                <div key={r.id} style={{ ...s.roleCard, ...(role === r.id ? s.roleCardActive : {}), color: role === r.id ? "#E8622A" : "#9993A8" }} onClick={() => setRole(r.id)}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{r.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.label}</div>
                </div>
              ))}
            </div>
            <div style={s.field}>
              <label style={s.label}>Email</label>
              <input style={s.input} placeholder={role === "manager" ? "manager@yourcompany.com" : "you@email.com"} defaultValue={role === "manager" ? "manager@apexrealty.com" : "renter@email.com"} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Password</label>
              <input style={s.input} type="password" placeholder="••••••••" defaultValue="password" />
            </div>
            {role === "renter" && (
              <div style={s.field}>
                <label style={s.label}>Your Property</label>
                <select style={s.select} onChange={e => setRenterPropertyId(parseInt(e.target.value))}>
                  <option value="">Select your property...</option>
                  {MOCK_DATA.properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            )}
            <button style={{ ...s.btnPrimary, width: "100%", marginTop: 8 }} onClick={() => setView(role === "manager" ? "dashboard" : "renter")}>
              Sign In as {role === "manager" ? "Manager" : "Renter"} →
            </button>
          </>}
        </div>
      </div>
    </div>
  );

  // RENTER PORTAL
  if (view === "renter") {
    const myProperty = properties.find(p => p.id === renterPropertyId);
    const myTickets = renterPropertyId ? tickets.filter(t => t.propertyId === renterPropertyId && t.renter === "Me (Demo)") : [];
    return (
      <div style={s.body}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={s.renterWrap}>
          <div style={s.renterHeader}>
            <div style={s.logo}>prop<span style={s.logoAccent}>desk</span></div>
            <button style={s.btnGhost} onClick={() => setView("landing")}>Sign Out</button>
          </div>
          <div style={s.renterCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div style={s.pageTitle}>Maintenance Portal</div>
                <div style={{ fontSize: 13, color: "#9993A8" }}>{myProperty ? myProperty.name : "Select your property to get started"}</div>
              </div>
              <button style={{ ...s.btnPrimary, fontSize: 13, padding: "10px 18px" }} onClick={() => setShowNewTicket(true)}>+ Submit Request</button>
            </div>
            {submitSuccess && <div style={s.successBanner}>✓ Your request has been submitted! We'll be in touch soon.</div>}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { label: "Open Requests", value: companyTickets.filter(t => t.status === "OPEN").length, color: "#FF2D2D" },
                { label: "In Progress", value: companyTickets.filter(t => t.status === "IN_PROGRESS").length, color: "#2A7BE8" },
                { label: "Resolved", value: companyTickets.filter(t => t.status === "RESOLVED").length, color: "#22AA55" },
              ].map(st => (
                <div key={st.label} style={{ flex: 1, minWidth: 120, background: "#0F0F14", borderRadius: 10, padding: "14px 16px", border: "1px solid #ffffff08" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: st.color }}>{st.value}</div>
                  <div style={{ fontSize: 11, color: "#9993A8", fontWeight: 600, marginTop: 2 }}>{st.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#9993A8", marginBottom: 16, fontWeight: 600 }}>ALL RECENT TICKETS FOR YOUR PROPERTY</div>
            {companyTickets.slice(0, 6).map(t => {
              const pr = PRIORITY_STYLES[t.priority];
              const st = STATUS_STYLES[t.status];
              const prop = properties.find(p => p.id === t.propertyId);
              return (
                <div key={t.id} style={{ padding: "14px 0", borderBottom: "1px solid #ffffff08", display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: pr.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                    {t.category === "Plumbing" ? "🔧" : t.category === "HVAC" ? "❄️" : t.category === "Electrical" ? "⚡" : t.category === "Security" ? "🔒" : "🏠"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: "#9993A8" }}>Unit {t.unit} · {prop?.name} · {t.date}</div>
                  </div>
                  <span style={{ ...s.badge2, background: st.bg, color: st.text }}>{st.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        {showNewTicket && (
          <div style={s.overlay} onClick={e => e.target === e.currentTarget && setShowNewTicket(false)}>
            <div style={s.drawer}>
              <div style={s.drawerTitle}>Submit Maintenance Request</div>
              <div style={s.drawerSub}>We'll assign someone as soon as possible.</div>
              {[
                { label: "Property", field: "propertyId", type: "select", opts: properties.map(p => ({ v: p.id, l: p.name })) },
                { label: "Your Name", field: "renter", type: "text", ph: "Full name" },
                { label: "Unit Number", field: "unit", type: "text", ph: "e.g. 3B" },
                { label: "Issue Title", field: "title", type: "text", ph: "Short description" },
                { label: "Category", field: "category", type: "select", opts: CATEGORIES.map(c => ({ v: c, l: c })) },
                { label: "Priority", field: "priority", type: "select", opts: [{ v: "LOW", l: "Low" }, { v: "MEDIUM", l: "Medium" }, { v: "HIGH", l: "High" }, { v: "CRITICAL", l: "Critical" }] },
              ].map(f => (
                <div key={f.field} style={s.field}>
                  <label style={s.label}>{f.label}</label>
                  {f.type === "select"
                    ? <select style={s.select} value={newTicket[f.field]} onChange={e => setNewTicket(p => ({ ...p, [f.field]: e.target.value }))}>
                        <option value="">Select...</option>
                        {f.opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                      </select>
                    : <input style={s.input} placeholder={f.ph} value={newTicket[f.field]} onChange={e => setNewTicket(p => ({ ...p, [f.field]: e.target.value }))} />
                  }
                </div>
              ))}
              <div style={s.field}>
                <label style={s.label}>Description</label>
                <textarea style={s.textarea} placeholder="Describe the issue in detail..." value={newTicket.description} onChange={e => setNewTicket(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ ...s.btnSmall, background: "#E8622A", color: "#fff", flex: 1 }} onClick={handleSubmitTicket}>Submit Request</button>
                <button style={{ ...s.btnSmall, background: "#ffffff10", color: "#F0EDE8" }} onClick={() => setShowNewTicket(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // MANAGER DASHBOARD
  const navItems = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "tickets", icon: "🎫", label: "All Tickets" },
    { id: "properties", icon: "🏢", label: "Properties" },
    { id: "settings", icon: "⚙", label: "Settings" },
  ];

  return (
    <div style={s.body}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={s.layout}>
        {/* SIDEBAR */}
        <div style={s.sidebar}>
          <div style={s.sidebarLogo}>
            prop<span style={s.logoAccent}>desk</span>
            <div style={{ fontSize: 10, color: "#9993A8", fontWeight: 500, marginTop: 2 }}>Vancouver, BC Portfolio</div>
          </div>
          <div style={s.sidebarSection}>Navigation</div>
          {navItems.map(item => (
            <div key={item.id} style={{ ...s.sidebarItem, ...(activeTab === item.id ? s.sidebarItemActive : {}) }} onClick={() => setActiveTab(item.id)}>
              <span style={{ fontSize: 14 }}>{item.icon}</span> {item.label}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={s.sidebarSection}>Account</div>
          <div style={{ ...s.sidebarItem, marginTop: 4 }}>
            <div style={{ width: 24, height: 24, borderRadius: 99, background: "#E8622A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>A</div>
            Admin User
          </div>
          <div style={{ ...s.sidebarItem, color: "#5A5570", fontSize: 12 }} onClick={() => setView("landing")}>← Sign Out</div>
        </div>

        {/* MAIN */}
        <div style={s.main}>
          {/* DASHBOARD */}
          {activeTab === "dashboard" && <>
            <div style={s.pageTitle}>Dashboard</div>
            <div style={s.pageSub}>Overview of your Vancouver, BC portfolio — {activeCompany.name}</div>
            <div style={s.statsRow}>
              <div style={s.statCard}>
                <div style={{ ...s.statValue, color: "#FF2D2D" }}>{stats.open}</div>
                <div style={s.statLabel}>Open Tickets</div>
              </div>
              <div style={s.statCard}>
                <div style={{ ...s.statValue, color: "#2A7BE8" }}>{stats.inProgress}</div>
                <div style={s.statLabel}>In Progress</div>
              </div>
              <div style={s.statCard}>
                <div style={{ ...s.statValue, color: "#22AA55" }}>{stats.resolved}</div>
                <div style={s.statLabel}>Resolved</div>
              </div>
              <div style={s.statCard}>
                <div style={{ ...s.statValue, color: "#FF2D2D" }}>{stats.critical}</div>
                <div style={s.statLabel}>Critical Issues</div>
              </div>
            </div>
            <div style={s.tableWrap}>
              <div style={s.tableHeader}>
                <div style={s.tableTitle}>Recent Tickets</div>
                <button style={{ ...s.btnPrimary, fontSize: 12, padding: "8px 16px" }} onClick={() => { setActiveTab("tickets"); setShowNewTicket(true); }}>+ New Ticket</button>
              </div>
              <div style={s.ticketRowHead}>
                {["#", "Issue", "Property", "Category", "Priority", "Status", ""].map(h => <div key={h} style={s.headCell}>{h}</div>)}
              </div>
              {companyTickets.slice(0, 6).map(t => {
                const pr = PRIORITY_STYLES[t.priority]; const st = STATUS_STYLES[t.status];
                const prop = properties.find(p => p.id === t.propertyId);
                return (
                  <div key={t.id} style={{ ...s.ticketRow, background: "transparent" }} onMouseEnter={e => e.currentTarget.style.background = "#ffffff04"} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={() => setSelectedTicket(t)}>
                    <div style={{ fontSize: 11, color: "#5A5570", fontWeight: 700 }}>#{t.id}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}>{t.title}</div>
                      <div style={{ fontSize: 11, color: "#9993A8" }}>Unit {t.unit} · {t.renter}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#9993A8" }}>{prop?.name?.split(" ")[0]}</div>
                    <div style={{ fontSize: 12, color: "#9993A8" }}>{t.category}</div>
                    <span style={{ ...s.badge2, background: pr.bg, color: pr.text }}>{pr.label}</span>
                    <span style={{ ...s.badge2, background: st.bg, color: st.text }}>{st.label}</span>
                    <div style={{ fontSize: 18, color: "#5A5570" }}>›</div>
                  </div>
                );
              })}
            </div>
          </>}

          {/* ALL TICKETS */}
          {activeTab === "tickets" && <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div style={s.pageTitle}>All Tickets</div>
              <button style={{ ...s.btnPrimary, fontSize: 13, padding: "10px 18px" }} onClick={() => setShowNewTicket(true)}>+ New Ticket</button>
            </div>
            <div style={s.pageSub}>{filteredTickets.length} tickets across {companyProperties.length} properties</div>
            <div style={s.tableWrap}>
              <div style={s.filterRow}>
                {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED"].map(s2 => (
                  <button key={s2} style={{ ...s.filterBtn, ...(filterStatus === s2 ? s.filterBtnActive : {}) }} onClick={() => setFilterStatus(s2)}>{s2 === "ALL" ? "All Status" : STATUS_STYLES[s2]?.label || s2}</button>
                ))}
                <div style={{ width: 1, background: "#ffffff10", margin: "0 4px" }} />
                {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map(p => (
                  <button key={p} style={{ ...s.filterBtn, ...(filterPriority === p ? s.filterBtnActive : {}) }} onClick={() => setFilterPriority(p)}>{p === "ALL" ? "All Priority" : PRIORITY_STYLES[p]?.label}</button>
                ))}
              </div>
              <div style={s.ticketRowHead}>
                {["#", "Issue", "Property", "Category", "Priority", "Status", ""].map(h => <div key={h} style={s.headCell}>{h}</div>)}
              </div>
              {filteredTickets.map(t => {
                const pr = PRIORITY_STYLES[t.priority]; const st = STATUS_STYLES[t.status];
                const prop = properties.find(p => p.id === t.propertyId);
                return (
                  <div key={t.id} style={{ ...s.ticketRow, background: "transparent" }} onMouseEnter={e => e.currentTarget.style.background = "#ffffff04"} onMouseLeave={e => e.currentTarget.style.background = "transparent"} onClick={() => setSelectedTicket(t)}>
                    <div style={{ fontSize: 11, color: "#5A5570", fontWeight: 700 }}>#{t.id}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}>{t.title}</div>
                      <div style={{ fontSize: 11, color: "#9993A8" }}>Unit {t.unit} · {t.renter} · {t.date}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#9993A8" }}>{prop?.name?.split(" ")[0]}</div>
                    <div style={{ fontSize: 12, color: "#9993A8" }}>{t.category}</div>
                    <span style={{ ...s.badge2, background: pr.bg, color: pr.text }}>{pr.label}</span>
                    <span style={{ ...s.badge2, background: st.bg, color: st.text }}>{st.label}</span>
                    <div style={{ fontSize: 18, color: "#5A5570" }}>›</div>
                  </div>
                );
              })}
            </div>
          </>}

          {/* PROPERTIES */}
          {activeTab === "properties" && <>
            <div style={s.pageTitle}>Properties</div>
            <div style={s.pageSub}>{companyProperties.length} properties in your portfolio</div>
            <div style={s.propGrid}>
              {companyProperties.map(p => {
                const pTickets = companyTickets.filter(t => t.propertyId === p.id);
                const openCount = pTickets.filter(t => t.status === "OPEN").length;
                const criticalCount = pTickets.filter(t => t.priority === "CRITICAL").length;
                return (
                  <div key={p.id} style={s.propCard} onMouseEnter={e => e.currentTarget.style.borderColor = "#E8622A55"} onMouseLeave={e => e.currentTarget.style.borderColor = "#ffffff08"}>
                    <div style={s.propEmoji}>{p.image}</div>
                    <div style={s.propName}>{p.name}</div>
                    <div style={s.propAddr}>{p.address}</div>
                    <div style={s.propMeta}>
                      <div style={s.propMetaChip}>{p.units} units</div>
                      {openCount > 0 && <div style={{ ...s.propMetaChip, background: "#FF2D2D18", color: "#FF2D2D" }}>{openCount} open</div>}
                      {criticalCount > 0 && <div style={{ ...s.propMetaChip, background: "#FF2D2D33", color: "#FF2D2D", fontWeight: 800 }}>🔴 {criticalCount} critical</div>}
                    </div>
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #ffffff08" }}>
                      <div style={{ fontSize: 11, color: "#5A5570", marginBottom: 8, fontWeight: 700 }}>RENTER SUBMISSION LINK</div>
                      <div style={{ fontSize: 11, color: "#E8622A", background: "#E8622A10", borderRadius: 6, padding: "6px 10px", wordBreak: "break-all" }}>propdesk.ca/submit/{p.address.toLowerCase().replace(/[\s,]+/g, "-")}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ ...s.propCard, border: "2px dashed #ffffff15", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 180 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>+</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Add Property</div>
                <div style={{ fontSize: 12, color: "#9993A8", marginTop: 4 }}>Expand your portfolio</div>
              </div>
            </div>
          </>}

          {/* SETTINGS */}
          {activeTab === "settings" && <>
            <div style={s.pageTitle}>Settings</div>
            <div style={s.pageSub}>Manage your workspace and billing</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { title: "Company Profile", icon: "🏢", desc: "Name, logo, and contact information" },
                { title: "Team Members", icon: "👥", desc: "Invite and manage staff access" },
                { title: "Billing & Plan", icon: "💳", desc: `Current plan: ${activeCompany.plan} · Manage subscription` },
                { title: "Notification Preferences", icon: "🔔", desc: "Email alerts for new and urgent tickets" },
                { title: "Integrations", icon: "🔗", desc: "Connect Slack, email, and SMS alerts" },
                { title: "Renter Portal Branding", icon: "🎨", desc: "Custom colors and logo for your tenants" },
              ].map(c => (
                <div key={c.title} style={{ ...s.propCard, cursor: "pointer" }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: "#9993A8" }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </>}
        </div>
      </div>

      {/* TICKET DETAIL DRAWER */}
      {selectedTicket && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setSelectedTicket(null)}>
          <div style={s.drawer}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: "#5A5570", fontWeight: 700, marginBottom: 4 }}>TICKET #{selectedTicket.id}</div>
                <div style={s.drawerTitle}>{selectedTicket.title}</div>
              </div>
              <button style={{ ...s.btnSmall, background: "#ffffff10", color: "#F0EDE8" }} onClick={() => setSelectedTicket(null)}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <span style={{ ...s.badge2, background: PRIORITY_STYLES[selectedTicket.priority].bg, color: PRIORITY_STYLES[selectedTicket.priority].text }}>{PRIORITY_STYLES[selectedTicket.priority].label}</span>
              <span style={{ ...s.badge2, background: STATUS_STYLES[selectedTicket.status].bg, color: STATUS_STYLES[selectedTicket.status].text }}>{STATUS_STYLES[selectedTicket.status].label}</span>
            </div>
            {[
              { label: "Renter", value: selectedTicket.renter },
              { label: "Unit", value: selectedTicket.unit },
              { label: "Property", value: properties.find(p => p.id === selectedTicket.propertyId)?.name },
              { label: "Category", value: selectedTicket.category },
              { label: "Submitted", value: selectedTicket.date },
              { label: "Assignee", value: selectedTicket.assignee || "Unassigned" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #ffffff06" }}>
                <span style={{ fontSize: 12, color: "#5A5570", fontWeight: 700 }}>{row.label}</span>
                <span style={{ fontSize: 13, color: "#F0EDE8", textAlign: "right" }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, marginBottom: 20 }}>
              <div style={s.label}>Description</div>
              <div style={{ fontSize: 13, color: "#9993A8", lineHeight: 1.6, background: "#0F0F14", borderRadius: 8, padding: "12px 14px" }}>{selectedTicket.description}</div>
            </div>
            <div style={s.label}>Update Status</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["OPEN", "IN_PROGRESS", "RESOLVED"].map(s2 => (
                <button key={s2} style={{ ...s.btnSmall, background: selectedTicket.status === s2 ? STATUS_STYLES[s2].bg : "#ffffff08", color: selectedTicket.status === s2 ? STATUS_STYLES[s2].text : "#9993A8", border: `1px solid ${selectedTicket.status === s2 ? STATUS_STYLES[s2].text + "44" : "transparent"}` }} onClick={() => updateTicketStatus(selectedTicket.id, s2)}>{STATUS_STYLES[s2].label}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEW TICKET DRAWER (manager) */}
      {showNewTicket && activeTab === "tickets" && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setShowNewTicket(false)}>
          <div style={s.drawer}>
            <div style={s.drawerTitle}>Create Ticket</div>
            <div style={s.drawerSub}>Log a new maintenance request manually.</div>
            {submitSuccess && <div style={s.successBanner}>✓ Ticket created successfully!</div>}
            {[
              { label: "Property", field: "propertyId", type: "select", opts: companyProperties.map(p => ({ v: p.id, l: p.name })) },
              { label: "Renter Name", field: "renter", type: "text", ph: "Full name" },
              { label: "Unit Number", field: "unit", type: "text", ph: "e.g. 3B" },
              { label: "Issue Title", field: "title", type: "text", ph: "Short description" },
              { label: "Category", field: "category", type: "select", opts: CATEGORIES.map(c => ({ v: c, l: c })) },
              { label: "Priority", field: "priority", type: "select", opts: [{ v: "LOW", l: "Low" }, { v: "MEDIUM", l: "Medium" }, { v: "HIGH", l: "High" }, { v: "CRITICAL", l: "Critical" }] },
            ].map(f => (
              <div key={f.field} style={s.field}>
                <label style={s.label}>{f.label}</label>
                {f.type === "select"
                  ? <select style={s.select} value={newTicket[f.field]} onChange={e => setNewTicket(p => ({ ...p, [f.field]: e.target.value }))}>
                      <option value="">Select...</option>
                      {f.opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  : <input style={s.input} placeholder={f.ph} value={newTicket[f.field]} onChange={e => setNewTicket(p => ({ ...p, [f.field]: e.target.value }))} />
                }
              </div>
            ))}
            <div style={s.field}>
              <label style={s.label}>Description</label>
              <textarea style={s.textarea} placeholder="Describe the issue..." value={newTicket.description} onChange={e => setNewTicket(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ ...s.btnSmall, background: "#E8622A", color: "#fff", flex: 1 }} onClick={handleSubmitTicket}>Create Ticket</button>
              <button style={{ ...s.btnSmall, background: "#ffffff10", color: "#F0EDE8" }} onClick={() => setShowNewTicket(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
