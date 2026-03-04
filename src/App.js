import { useState } from "react";

// ─── SEED DATA ───────────────────────────────────────────────────────────────
const SEED_PROPERTIES = [
  { id: 1, companyId: 1, name: "3477 E 48th Ave", address: "3477 E 48th Ave, Vancouver, BC", units: 6, image: "🏘" },
  { id: 2, companyId: 1, name: "3479 E 48th Ave", address: "3479 E 48th Ave, Vancouver, BC", units: 6, image: "🏘" },
  { id: 3, companyId: 1, name: "3416 E 4th Ave",  address: "3416 E 4th Ave, Vancouver, BC",  units: 8, image: "🏢" },
];

const SEED_TICKETS = [
  { id: 1, propertyId: 1, unit: "2", renterId: "renter-1", renter: "Sarah M.", title: "Heating not working",     category: "HVAC",           priority: "HIGH",     status: "IN_PROGRESS", date: "2026-02-28", description: "The heater stopped working 3 days ago.", assignee: "Mike T." },
  { id: 2, propertyId: 1, unit: "4", renterId: "renter-2", renter: "James L.", title: "Leaky faucet in kitchen", category: "Plumbing",        priority: "MEDIUM",   status: "OPEN",        date: "2026-03-01", description: "Kitchen faucet dripping constantly.", assignee: null },
  { id: 3, propertyId: 2, unit: "1", renterId: "renter-3", renter: "Priya K.", title: "Broken window latch",     category: "Security",        priority: "HIGH",     status: "OPEN",        date: "2026-03-02", description: "Window won't lock properly.", assignee: null },
  { id: 4, propertyId: 3, unit: "3", renterId: "renter-4", renter: "Tom H.",   title: "Mold in bathroom",        category: "Health & Safety", priority: "CRITICAL", status: "OPEN",        date: "2026-03-01", description: "Black mold forming near shower.", assignee: null },
  { id: 5, propertyId: 2, unit: "5", renterId: "renter-5", renter: "Dana W.",  title: "Parking lot light out",   category: "Electrical",      priority: "LOW",      status: "RESOLVED",    date: "2026-02-20", description: "Light bulb in spot 12 is out.", assignee: "Carlos R." },
];

const SEED_USERS = [
  { id: "manager-1", role: "manager", name: "Admin",    email: "admin@propdesk.ca", password: "admin123",  companyId: 1 },
  { id: "renter-1",  role: "renter",  name: "Sarah M.", email: "sarah@email.com",   password: "renter123", propertyId: 1, unit: "2" },
  { id: "renter-2",  role: "renter",  name: "James L.", email: "james@email.com",   password: "renter123", propertyId: 1, unit: "4" },
  { id: "renter-3",  role: "renter",  name: "Priya K.", email: "priya@email.com",   password: "renter123", propertyId: 2, unit: "1" },
];

const PRIORITY_STYLES = {
  CRITICAL: { bg: "#FF2D2D22", text: "#FF2D2D", label: "Critical" },
  HIGH:     { bg: "#FF7A2222", text: "#FF7A22", label: "High" },
  MEDIUM:   { bg: "#F5C84222", text: "#C49500", label: "Medium" },
  LOW:      { bg: "#22AA5522", text: "#22AA55", label: "Low" },
};
const STATUS_STYLES = {
  OPEN:        { bg: "#FF2D2D18", text: "#FF2D2D", label: "Open" },
  IN_PROGRESS: { bg: "#2A7BE818", text: "#2A7BE8", label: "In Progress" },
  RESOLVED:    { bg: "#22AA5518", text: "#22AA55", label: "Resolved" },
};
const CATEGORIES = ["Plumbing","Electrical","HVAC","Appliance","Security","Pest Control","Health & Safety","Structural","Other"];

const S = {
  body:             { fontFamily: "'DM Sans', sans-serif", background: "#0C0C0F", color: "#F0EDE8", minHeight: "100vh", margin: 0 },
  landing:          { minHeight: "100vh", background: "linear-gradient(135deg,#0C0C0F 0%,#141420 60%,#0C0C0F 100%)", display: "flex", flexDirection: "column" },
  landingNav:       { padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ffffff0d" },
  logo:             { fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: "#F0EDE8" },
  logoAccent:       { color: "#E8622A" },
  landingHero:      { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" },
  badge:            { display: "inline-flex", alignItems: "center", gap: 6, background: "#E8622A18", border: "1px solid #E8622A44", borderRadius: 99, padding: "6px 14px", fontSize: 12, color: "#E8622A", marginBottom: 28, letterSpacing: "0.05em", fontWeight: 600 },
  h1:               { fontSize: "clamp(36px,6vw,72px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 20, maxWidth: 800 },
  h1Gradient:       { background: "linear-gradient(90deg,#F0EDE8,#E8622A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtext:          { fontSize: 18, color: "#9993A8", maxWidth: 560, lineHeight: 1.6, marginBottom: 48 },
  btnRow:           { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  btnPrimary:       { background: "#E8622A", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" },
  btnSecondary:     { background: "transparent", color: "#F0EDE8", border: "1px solid #ffffff22", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" },
  btnGhost:         { background: "transparent", color: "#9993A8", border: "none", fontSize: 14, cursor: "pointer", padding: "4px 0" },
  btnSmall:         { padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  featureGrid:      { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, maxWidth: 900, margin: "60px auto 0", padding: "0 24px" },
  featureCard:      { background: "#ffffff06", border: "1px solid #ffffff0d", borderRadius: 14, padding: "24px 20px" },
  authWrap:         { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0C0C0F", padding: 24 },
  authCard:         { background: "#141418", border: "1px solid #ffffff10", borderRadius: 20, padding: "44px 40px", width: "100%", maxWidth: 440 },
  tabRow:           { display: "flex", background: "#0F0F14", borderRadius: 10, padding: 4, marginBottom: 28 },
  tabBtn:           { flex: 1, padding: "9px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "transparent", color: "#9993A8" },
  tabBtnActive:     { background: "#E8622A", color: "#fff" },
  roleGrid:         { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 },
  roleCard:         { border: "2px solid #ffffff15", borderRadius: 12, padding: "18px 14px", textAlign: "center", cursor: "pointer", background: "transparent", color: "#9993A8" },
  roleCardActive:   { borderColor: "#E8622A", background: "#E8622A12", color: "#E8622A" },
  field:            { marginBottom: 16 },
  label:            { fontSize: 11, color: "#9993A8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 },
  input:            { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", boxSizing: "border-box" },
  select:           { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", boxSizing: "border-box" },
  textarea:         { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", resize: "vertical", minHeight: 80, boxSizing: "border-box" },
  errorBox:         { background: "#FF2D2D15", border: "1px solid #FF2D2D44", borderRadius: 8, padding: "10px 14px", color: "#FF2D2D", fontSize: 13, marginBottom: 16 },
  successBanner:    { background: "#22AA5518", border: "1px solid #22AA5544", borderRadius: 10, padding: "14px 18px", textAlign: "center", color: "#22AA55", fontWeight: 600, marginBottom: 20, fontSize: 14 },
  divider:          { display: "flex", alignItems: "center", gap: 12, margin: "20px 0", color: "#5A5570", fontSize: 12 },
  dividerLine:      { flex: 1, height: 1, background: "#ffffff10" },
  layout:           { display: "flex", minHeight: "100vh", background: "#0C0C0F" },
  sidebar:          { width: 240, background: "#0F0F14", borderRight: "1px solid #ffffff08", display: "flex", flexDirection: "column", padding: "0 0 20px", flexShrink: 0 },
  sidebarLogo:      { padding: "22px 20px 16px", fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", borderBottom: "1px solid #ffffff08" },
  sidebarSection:   { padding: "16px 12px 0", fontSize: 10, letterSpacing: "0.1em", color: "#5A5570", fontWeight: 700, textTransform: "uppercase" },
  sidebarItem:      { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, margin: "2px 8px", fontSize: 13, color: "#9993A8", cursor: "pointer", fontWeight: 500 },
  sidebarItemActive:{ background: "#E8622A18", color: "#E8622A" },
  main:             { flex: 1, overflow: "auto", padding: "32px 36px" },
  pageTitle:        { fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 },
  pageSub:          { fontSize: 13, color: "#9993A8", marginBottom: 32 },
  statsRow:         { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 },
  statCard:         { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, padding: "20px 20px 16px" },
  statValue:        { fontSize: 34, fontWeight: 800, letterSpacing: "-1px" },
  statLabel:        { fontSize: 12, color: "#9993A8", marginTop: 4, fontWeight: 500 },
  tableWrap:        { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, overflow: "hidden" },
  tableHeader:      { display: "flex", gap: 12, alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #ffffff08" },
  tableTitle:       { fontSize: 15, fontWeight: 700, flex: 1 },
  filterRow:        { display: "flex", gap: 8, padding: "12px 20px", borderBottom: "1px solid #ffffff08", background: "#0F0F14", flexWrap: "wrap" },
  filterBtn:        { padding: "5px 12px", borderRadius: 99, border: "1px solid #ffffff15", background: "transparent", color: "#9993A8", fontSize: 12, cursor: "pointer", fontWeight: 500 },
  filterBtnActive:  { borderColor: "#E8622A", background: "#E8622A15", color: "#E8622A" },
  ticketGrid:       { display: "grid", gridTemplateColumns: "40px 1fr 140px 90px 100px 110px 36px", gap: 12, alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #ffffff06", cursor: "pointer" },
  ticketGridHead:   { display: "grid", gridTemplateColumns: "40px 1fr 140px 90px 100px 110px 36px", gap: 12, padding: "10px 20px", background: "#0F0F14", borderBottom: "1px solid #ffffff08" },
  headCell:         { fontSize: 11, color: "#5A5570", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" },
  badge2:           { display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 },
  overlay:          { position: "fixed", inset: 0, background: "#00000088", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", zIndex: 100, padding: 20 },
  drawer:           { background: "#141418", border: "1px solid #ffffff10", borderRadius: 16, width: 460, maxHeight: "calc(100vh - 40px)", overflowY: "auto", padding: 28 },
  drawerTitle:      { fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", marginBottom: 4 },
  drawerSub:        { fontSize: 12, color: "#9993A8", marginBottom: 20 },
  propGrid:         { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 },
  propCard:         { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "border-color .15s" },
  propMetaChip:     { fontSize: 11, background: "#ffffff08", borderRadius: 6, padding: "3px 8px", color: "#9993A8", fontWeight: 600 },
  renterWrap:       { minHeight: "100vh", background: "#0C0C0F", padding: 24 },
  renterHeader:     { maxWidth: 680, margin: "0 auto 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  renterCard:       { maxWidth: 680, margin: "0 auto", background: "#141418", border: "1px solid #ffffff10", borderRadius: 20, padding: "36px 32px" },
};

const Logo = () => <span style={S.logo}>prop<span style={S.logoAccent}>desk</span></span>;
const Field = ({ label, children }) => <div style={S.field}><label style={S.label}>{label}</label>{children}</div>;

export default function App() {
  const [view, setView]             = useState("landing");
  const [authMode, setAuthMode]     = useState("login");
  const [authRole, setAuthRole]     = useState("renter");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers]           = useState(SEED_USERS);
  const [tickets, setTickets]       = useState(SEED_TICKETS);
  const [properties]                = useState(SEED_PROPERTIES);
  const [activeTab, setActiveTab]   = useState("dashboard");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus]     = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [showNewTicket, setShowNewTicket]   = useState(false);
  const [submitSuccess, setSubmitSuccess]   = useState(false);
  const [authError, setAuthError]           = useState("");
  const [signupForm, setSignupForm] = useState({ name:"", email:"", password:"", confirm:"", propertyId:"", unit:"", companyName:"" });
  const [loginForm, setLoginForm]   = useState({ email:"", password:"" });
  const [newTicket, setNewTicket]   = useState({ unit:"", renter:"", title:"", category:"Plumbing", priority:"MEDIUM", description:"", propertyId:"" });

  const managerProperties = currentUser?.role === "manager" ? properties.filter(p => p.companyId === currentUser.companyId) : [];
  const managerTickets    = tickets.filter(t => managerProperties.some(p => p.id === t.propertyId));
  const renterTickets     = currentUser?.role === "renter" ? tickets.filter(t => t.propertyId === currentUser.propertyId && t.renterId === currentUser.id) : [];
  const filteredTickets   = managerTickets.filter(t => {
    if (filterStatus !== "ALL" && t.status !== filterStatus) return false;
    if (filterPriority !== "ALL" && t.priority !== filterPriority) return false;
    return true;
  });
  const stats = {
    open:       managerTickets.filter(t => t.status === "OPEN").length,
    inProgress: managerTickets.filter(t => t.status === "IN_PROGRESS").length,
    resolved:   managerTickets.filter(t => t.status === "RESOLVED").length,
    critical:   managerTickets.filter(t => t.priority === "CRITICAL").length,
  };

  const handleLogin = () => {
    setAuthError("");
    const user = users.find(u => u.email === loginForm.email && u.password === loginForm.password);
    if (!user) { setAuthError("Incorrect email or password. Please try again."); return; }
    setCurrentUser(user);
    setView(user.role === "manager" ? "dashboard" : "renter");
  };

  const handleSignup = () => {
    setAuthError("");
    if (!signupForm.name || !signupForm.email || !signupForm.password) { setAuthError("Please fill in all required fields."); return; }
    if (signupForm.password !== signupForm.confirm) { setAuthError("Passwords do not match."); return; }
    if (signupForm.password.length < 6) { setAuthError("Password must be at least 6 characters."); return; }
    if (users.find(u => u.email === signupForm.email)) { setAuthError("An account with this email already exists."); return; }
    if (authRole === "renter" && !signupForm.propertyId) { setAuthError("Please select your property."); return; }
    const id = `user-${Date.now()}`;
    const newUser = authRole === "renter"
      ? { id, role:"renter",  name:signupForm.name, email:signupForm.email, password:signupForm.password, propertyId:parseInt(signupForm.propertyId), unit:signupForm.unit }
      : { id, role:"manager", name:signupForm.name, email:signupForm.email, password:signupForm.password, companyId:1 };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setView(authRole === "manager" ? "dashboard" : "renter");
  };

  const handleSubmitTicket = () => {
    const id      = Math.max(...tickets.map(t => t.id)) + 1;
    const propId  = currentUser?.role === "renter" ? currentUser.propertyId : parseInt(newTicket.propertyId);
    const rName   = currentUser?.role === "renter" ? currentUser.name : newTicket.renter;
    const unit    = currentUser?.role === "renter" ? currentUser.unit  : newTicket.unit;
    const t = { ...newTicket, id, propertyId:propId, renterId:currentUser?.id||"manual", renter:rName, unit, status:"OPEN", date:new Date().toISOString().split("T")[0], assignee:null };
    setTickets(prev => [t, ...prev]);
    setSubmitSuccess(true);
    setTimeout(() => { setSubmitSuccess(false); setShowNewTicket(false); setNewTicket({ unit:"", renter:"", title:"", category:"Plumbing", priority:"MEDIUM", description:"", propertyId:"" }); }, 2500);
  };

  const updateTicketStatus = (id, status) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    if (selectedTicket?.id === id) setSelectedTicket(prev => ({ ...prev, status }));
  };

  const signOut = () => { setCurrentUser(null); setView("landing"); setActiveTab("dashboard"); setLoginForm({ email:"", password:"" }); setSignupForm({ name:"", email:"", password:"", confirm:"", propertyId:"", unit:"", companyName:"" }); setAuthError(""); };

  // ── LANDING ──────────────────────────────────────────────────────────────────
  if (view === "landing") return (
    <div style={S.body}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={S.landing}>
        <nav style={S.landingNav}>
          <Logo />
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button style={S.btnGhost} onClick={() => { setAuthMode("login"); setAuthRole("renter"); setView("auth"); }}>Renter Login</button>
            <button style={{ ...S.btnSecondary, fontSize:13, padding:"10px 20px" }} onClick={() => { setAuthMode("login"); setAuthRole("manager"); setView("auth"); }}>Manager Login</button>
            <button style={{ ...S.btnPrimary,   fontSize:13, padding:"10px 20px" }} onClick={() => { setAuthMode("signup"); setAuthRole("manager"); setView("auth"); }}>Get Started Free</button>
          </div>
        </nav>
        <div style={S.landingHero}>
          <div style={S.badge}>✦ PROPERTY MANAGEMENT · VANCOUVER, BC</div>
          <h1 style={{ ...S.h1, ...S.h1Gradient }}>Maintenance tickets.<br />Managed effortlessly.</h1>
          <p style={S.subtext}>Give your renters a private portal to report issues. Track, assign, and resolve every maintenance request across your entire portfolio — in one place.</p>
          <div style={S.btnRow}>
            <button style={S.btnPrimary}    onClick={() => { setAuthMode("signup"); setAuthRole("manager"); setView("auth"); }}>Start as Property Manager →</button>
            <button style={S.btnSecondary}  onClick={() => { setAuthMode("signup"); setAuthRole("renter");  setView("auth"); }}>Register as Renter</button>
          </div>
          <div style={S.featureGrid}>
            {[
              { icon:"🏢", title:"Portfolio Overview",    desc:"Manage all your Vancouver properties from one dashboard." },
              { icon:"🎫", title:"Ticket Tracking",       desc:"Real-time updates with priority levels from Low to Critical." },
              { icon:"🔒", title:"Private Renter Portal", desc:"Each renter only sees their own property and tickets." },
              { icon:"📊", title:"Analytics",             desc:"Spot trends, measure response times, optimize operations." },
            ].map(f => (
              <div key={f.title} style={S.featureCard}>
                <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#F0EDE8", marginBottom:6 }}>{f.title}</div>
                <div style={{ fontSize:13, color:"#9993A8", lineHeight:1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:60, paddingTop:20, borderTop:"1px solid #ffffff08", width:"100%", maxWidth:900, textAlign:"center" }}>
            <p style={{ fontSize:12, color:"#5A5570" }}>propdesk.ca · Vancouver, BC · Secure · Free to get started</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ── AUTH ──────────────────────────────────────────────────────────────────────
  if (view === "auth") return (
    <div style={S.body}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={S.authWrap}>
        <div style={S.authCard}>
          <div style={{ marginBottom:24, cursor:"pointer", color:"#9993A8", fontSize:13 }} onClick={() => { setAuthError(""); setView("landing"); }}>← Back</div>
          <Logo />
          <div style={{ ...S.tabRow, marginTop:24 }}>
            {["login","signup"].map(m => (
              <button key={m} style={{ ...S.tabBtn, ...(authMode===m ? S.tabBtnActive : {}) }} onClick={() => { setAuthMode(m); setAuthError(""); }}>
                {m==="login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>
          <div style={S.roleGrid}>
            {[{ id:"manager", icon:"🏢", label:"Property Manager" },{ id:"renter", icon:"🏠", label:"Renter" }].map(r => (
              <div key={r.id} style={{ ...S.roleCard, ...(authRole===r.id ? S.roleCardActive : {}) }} onClick={() => { setAuthRole(r.id); setAuthError(""); }}>
                <div style={{ fontSize:28, marginBottom:6 }}>{r.icon}</div>
                <div style={{ fontSize:13, fontWeight:600 }}>{r.label}</div>
              </div>
            ))}
          </div>
          {authError && <div style={S.errorBox}>⚠ {authError}</div>}

          {authMode === "signup" && <>
            <Field label="Full Name"><input style={S.input} placeholder="Your full name" value={signupForm.name} onChange={e => setSignupForm(p => ({ ...p, name:e.target.value }))} /></Field>
            <Field label="Email Address"><input style={S.input} placeholder="you@email.com" value={signupForm.email} onChange={e => setSignupForm(p => ({ ...p, email:e.target.value }))} /></Field>
            {authRole === "manager" && <Field label="Company / Portfolio Name"><input style={S.input} placeholder="e.g. My Property Group" value={signupForm.companyName} onChange={e => setSignupForm(p => ({ ...p, companyName:e.target.value }))} /></Field>}
            {authRole === "renter" && <>
              <Field label="Your Property">
                <select style={S.select} value={signupForm.propertyId} onChange={e => setSignupForm(p => ({ ...p, propertyId:e.target.value }))}>
                  <option value="">Select your building...</option>
                  {properties.map(p => <option key={p.id} value={p.id}>{p.address}</option>)}
                </select>
              </Field>
              <Field label="Unit Number"><input style={S.input} placeholder="e.g. 3, 4B, 101" value={signupForm.unit} onChange={e => setSignupForm(p => ({ ...p, unit:e.target.value }))} /></Field>
            </>}
            <Field label="Password"><input style={S.input} type="password" placeholder="At least 6 characters" value={signupForm.password} onChange={e => setSignupForm(p => ({ ...p, password:e.target.value }))} /></Field>
            <Field label="Confirm Password"><input style={S.input} type="password" placeholder="Repeat your password" value={signupForm.confirm} onChange={e => setSignupForm(p => ({ ...p, confirm:e.target.value }))} /></Field>
            <button style={{ ...S.btnPrimary, width:"100%", marginTop:4 }} onClick={handleSignup}>Create {authRole==="manager" ? "Manager" : "Renter"} Account →</button>
            <div style={S.divider}><div style={S.dividerLine}/>or<div style={S.dividerLine}/></div>
            <button style={{ ...S.btnGhost, width:"100%", textAlign:"center" }} onClick={() => { setAuthMode("login"); setAuthError(""); }}>Already have an account? <span style={{ color:"#E8622A" }}>Sign in</span></button>
          </>}

          {authMode === "login" && <>
            <Field label="Email Address"><input style={S.input} placeholder="you@email.com" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email:e.target.value }))} /></Field>
            <Field label="Password"><input style={S.input} type="password" placeholder="Your password" value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password:e.target.value }))} onKeyDown={e => e.key==="Enter" && handleLogin()} /></Field>
            <button style={{ ...S.btnPrimary, width:"100%", marginTop:4 }} onClick={handleLogin}>Sign In as {authRole==="manager" ? "Manager" : "Renter"} →</button>
            <div style={S.divider}><div style={S.dividerLine}/>demo credentials<div style={S.dividerLine}/></div>
            <div style={{ background:"#0F0F14", borderRadius:10, padding:"12px 14px", fontSize:12, color:"#9993A8", lineHeight:1.8 }}>
              <div><span style={{ color:"#F0EDE8", fontWeight:700 }}>Manager:</span> admin@propdesk.ca / admin123</div>
              <div><span style={{ color:"#F0EDE8", fontWeight:700 }}>Renter:</span> sarah@email.com / renter123</div>
            </div>
            <div style={S.divider}><div style={S.dividerLine}/>or<div style={S.dividerLine}/></div>
            <button style={{ ...S.btnGhost, width:"100%", textAlign:"center" }} onClick={() => { setAuthMode("signup"); setAuthError(""); }}>New here? <span style={{ color:"#E8622A" }}>Create an account</span></button>
          </>}
        </div>
      </div>
    </div>
  );

  // ── RENTER PORTAL ─────────────────────────────────────────────────────────────
  if (view === "renter") {
    const myProperty = properties.find(p => p.id === currentUser?.propertyId);
    return (
      <div style={S.body}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={S.renterWrap}>
          <div style={S.renterHeader}>
            <Logo />
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <span style={{ fontSize:13, color:"#9993A8" }}>👋 {currentUser?.name}</span>
              <button style={S.btnGhost} onClick={signOut}>Sign Out</button>
            </div>
          </div>
          <div style={S.renterCard}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
              <div>
                <div style={S.pageTitle}>My Maintenance</div>
                <div style={{ fontSize:13, color:"#9993A8" }}>{myProperty ? `${myProperty.address} · Unit ${currentUser?.unit}` : "No property assigned"}</div>
              </div>
              <button style={{ ...S.btnPrimary, fontSize:13, padding:"10px 18px" }} onClick={() => setShowNewTicket(true)}>+ Submit Request</button>
            </div>
            {submitSuccess && <div style={S.successBanner}>✓ Your request has been submitted! We'll be in touch soon.</div>}
            <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
              {[
                { label:"My Open",     value:renterTickets.filter(t=>t.status==="OPEN").length,        color:"#FF2D2D" },
                { label:"In Progress", value:renterTickets.filter(t=>t.status==="IN_PROGRESS").length, color:"#2A7BE8" },
                { label:"Resolved",    value:renterTickets.filter(t=>t.status==="RESOLVED").length,    color:"#22AA55" },
              ].map(st => (
                <div key={st.label} style={{ flex:1, minWidth:100, background:"#0F0F14", borderRadius:10, padding:"14px 16px", border:"1px solid #ffffff08" }}>
                  <div style={{ fontSize:26, fontWeight:800, color:st.color }}>{st.value}</div>
                  <div style={{ fontSize:11, color:"#9993A8", fontWeight:600, marginTop:2 }}>{st.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:13, color:"#9993A8", marginBottom:14, fontWeight:700 }}>MY SUBMITTED REQUESTS</div>
            {renterTickets.length === 0 && (
              <div style={{ textAlign:"center", padding:"40px 0", color:"#5A5570" }}>
                <div style={{ fontSize:32, marginBottom:10 }}>📭</div>
                <div style={{ fontSize:14, fontWeight:600 }}>No requests yet</div>
                <div style={{ fontSize:12, marginTop:4 }}>Submit your first maintenance request above</div>
              </div>
            )}
            {renterTickets.map(t => {
              const pr = PRIORITY_STYLES[t.priority];
              const st = STATUS_STYLES[t.status];
              return (
                <div key={t.id} style={{ padding:"14px 0", borderBottom:"1px solid #ffffff08", display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:38, height:38, borderRadius:8, background:pr.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                    {t.category==="Plumbing"?"🔧":t.category==="HVAC"?"❄️":t.category==="Electrical"?"⚡":t.category==="Security"?"🔒":"🏠"}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{t.title}</div>
                    <div style={{ fontSize:11, color:"#9993A8" }}>{t.category} · Submitted {t.date}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                    <span style={{ ...S.badge2, background:st.bg, color:st.text }}>{st.label}</span>
                    <span style={{ ...S.badge2, background:pr.bg, color:pr.text }}>{pr.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {showNewTicket && (
          <div style={S.overlay} onClick={e => e.target===e.currentTarget && setShowNewTicket(false)}>
            <div style={S.drawer}>
              <div style={S.drawerTitle}>Submit Maintenance Request</div>
              <div style={S.drawerSub}>Unit {currentUser?.unit} · {myProperty?.address}</div>
              {submitSuccess && <div style={S.successBanner}>✓ Submitted successfully!</div>}
              {[
                { label:"Issue Title", field:"title",    type:"text",   ph:"Short description of the problem" },
                { label:"Category",    field:"category", type:"select", opts:CATEGORIES.map(c=>({ v:c,l:c })) },
                { label:"Priority",    field:"priority", type:"select", opts:[{v:"LOW",l:"Low"},{v:"MEDIUM",l:"Medium"},{v:"HIGH",l:"High"},{v:"CRITICAL",l:"Critical"}] },
              ].map(f => (
                <div key={f.field} style={S.field}>
                  <label style={S.label}>{f.label}</label>
                  {f.type==="select"
                    ? <select style={S.select} value={newTicket[f.field]} onChange={e => setNewTicket(p=>({...p,[f.field]:e.target.value}))}>{f.opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>
                    : <input style={S.input} placeholder={f.ph} value={newTicket[f.field]} onChange={e => setNewTicket(p=>({...p,[f.field]:e.target.value}))} />
                  }
                </div>
              ))}
              <div style={S.field}>
                <label style={S.label}>Description</label>
                <textarea style={S.textarea} placeholder="Describe the issue in detail. The more info, the faster we can fix it!" value={newTicket.description} onChange={e => setNewTicket(p=>({...p,description:e.target.value}))} />
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button style={{ ...S.btnSmall, background:"#E8622A", color:"#fff", flex:1 }} onClick={handleSubmitTicket}>Submit Request</button>
                <button style={{ ...S.btnSmall, background:"#ffffff10", color:"#F0EDE8" }} onClick={() => setShowNewTicket(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── MANAGER DASHBOARD ─────────────────────────────────────────────────────────
  const navItems = [
    { id:"dashboard",  icon:"▦",  label:"Dashboard" },
    { id:"tickets",    icon:"🎫", label:"All Tickets" },
    { id:"properties", icon:"🏢", label:"Properties" },
    { id:"renters",    icon:"👥", label:"Renters" },
    { id:"settings",   icon:"⚙",  label:"Settings" },
  ];

  return (
    <div style={S.body}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={S.layout}>
        <div style={S.sidebar}>
          <div style={S.sidebarLogo}>
            prop<span style={S.logoAccent}>desk</span>
            <div style={{ fontSize:10, color:"#9993A8", fontWeight:500, marginTop:2 }}>Vancouver, BC Portfolio</div>
          </div>
          <div style={S.sidebarSection}>Navigation</div>
          {navItems.map(item => (
            <div key={item.id} style={{ ...S.sidebarItem, ...(activeTab===item.id ? S.sidebarItemActive : {}) }} onClick={() => setActiveTab(item.id)}>
              <span style={{ fontSize:14 }}>{item.icon}</span> {item.label}
            </div>
          ))}
          <div style={{ flex:1 }} />
          <div style={S.sidebarSection}>Account</div>
          <div style={{ ...S.sidebarItem, marginTop:4 }}>
            <div style={{ width:24, height:24, borderRadius:99, background:"#E8622A", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800 }}>{currentUser?.name?.[0]?.toUpperCase()}</div>
            {currentUser?.name}
          </div>
          <div style={{ ...S.sidebarItem, color:"#5A5570", fontSize:12 }} onClick={signOut}>← Sign Out</div>
        </div>

        <div style={S.main}>
          {activeTab === "dashboard" && <>
            <div style={S.pageTitle}>Dashboard</div>
            <div style={S.pageSub}>Vancouver, BC portfolio · {managerProperties.length} properties</div>
            <div style={S.statsRow}>
              <div style={S.statCard}><div style={{ ...S.statValue, color:"#FF2D2D" }}>{stats.open}</div><div style={S.statLabel}>Open Tickets</div></div>
              <div style={S.statCard}><div style={{ ...S.statValue, color:"#2A7BE8" }}>{stats.inProgress}</div><div style={S.statLabel}>In Progress</div></div>
              <div style={S.statCard}><div style={{ ...S.statValue, color:"#22AA55" }}>{stats.resolved}</div><div style={S.statLabel}>Resolved</div></div>
              <div style={S.statCard}><div style={{ ...S.statValue, color:"#FF2D2D" }}>{stats.critical}</div><div style={S.statLabel}>Critical</div></div>
            </div>
            <div style={S.tableWrap}>
              <div style={S.tableHeader}>
                <div style={S.tableTitle}>Recent Tickets</div>
                <button style={{ ...S.btnPrimary, fontSize:12, padding:"8px 16px" }} onClick={() => { setActiveTab("tickets"); setShowNewTicket(true); }}>+ New Ticket</button>
              </div>
              <div style={S.ticketGridHead}>{["#","Issue","Property","Category","Priority","Status",""].map(h=><div key={h} style={S.headCell}>{h}</div>)}</div>
              {managerTickets.slice(0,6).map(t => {
                const pr=PRIORITY_STYLES[t.priority]; const st=STATUS_STYLES[t.status];
                const prop=properties.find(p=>p.id===t.propertyId);
                return (
                  <div key={t.id} style={{ ...S.ticketGrid, background:"transparent" }} onMouseEnter={e=>e.currentTarget.style.background="#ffffff04"} onMouseLeave={e=>e.currentTarget.style.background="transparent"} onClick={()=>setSelectedTicket(t)}>
                    <div style={{ fontSize:11, color:"#5A5570", fontWeight:700 }}>#{t.id}</div>
                    <div><div style={{ fontSize:13, fontWeight:600, marginBottom:1 }}>{t.title}</div><div style={{ fontSize:11, color:"#9993A8" }}>Unit {t.unit} · {t.renter}</div></div>
                    <div style={{ fontSize:12, color:"#9993A8" }}>{prop?.name}</div>
                    <div style={{ fontSize:12, color:"#9993A8" }}>{t.category}</div>
                    <span style={{ ...S.badge2, background:pr.bg, color:pr.text }}>{pr.label}</span>
                    <span style={{ ...S.badge2, background:st.bg, color:st.text }}>{st.label}</span>
                    <div style={{ fontSize:18, color:"#5A5570" }}>›</div>
                  </div>
                );
              })}
            </div>
          </>}

          {activeTab === "tickets" && <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
              <div style={S.pageTitle}>All Tickets</div>
              <button style={{ ...S.btnPrimary, fontSize:13, padding:"10px 18px" }} onClick={() => setShowNewTicket(true)}>+ New Ticket</button>
            </div>
            <div style={S.pageSub}>{filteredTickets.length} tickets across {managerProperties.length} properties</div>
            <div style={S.tableWrap}>
              <div style={S.filterRow}>
                {["ALL","OPEN","IN_PROGRESS","RESOLVED"].map(s2=>(
                  <button key={s2} style={{ ...S.filterBtn, ...(filterStatus===s2?S.filterBtnActive:{}) }} onClick={()=>setFilterStatus(s2)}>{s2==="ALL"?"All Status":STATUS_STYLES[s2]?.label}</button>
                ))}
                <div style={{ width:1, background:"#ffffff10", margin:"0 4px" }} />
                {["ALL","CRITICAL","HIGH","MEDIUM","LOW"].map(p=>(
                  <button key={p} style={{ ...S.filterBtn, ...(filterPriority===p?S.filterBtnActive:{}) }} onClick={()=>setFilterPriority(p)}>{p==="ALL"?"All Priority":PRIORITY_STYLES[p]?.label}</button>
                ))}
              </div>
              <div style={S.ticketGridHead}>{["#","Issue","Property","Category","Priority","Status",""].map(h=><div key={h} style={S.headCell}>{h}</div>)}</div>
              {filteredTickets.map(t => {
                const pr=PRIORITY_STYLES[t.priority]; const st=STATUS_STYLES[t.status];
                const prop=properties.find(p=>p.id===t.propertyId);
                return (
                  <div key={t.id} style={{ ...S.ticketGrid, background:"transparent" }} onMouseEnter={e=>e.currentTarget.style.background="#ffffff04"} onMouseLeave={e=>e.currentTarget.style.background="transparent"} onClick={()=>setSelectedTicket(t)}>
                    <div style={{ fontSize:11, color:"#5A5570", fontWeight:700 }}>#{t.id}</div>
                    <div><div style={{ fontSize:13, fontWeight:600, marginBottom:1 }}>{t.title}</div><div style={{ fontSize:11, color:"#9993A8" }}>Unit {t.unit} · {t.renter} · {t.date}</div></div>
                    <div style={{ fontSize:12, color:"#9993A8" }}>{prop?.name}</div>
                    <div style={{ fontSize:12, color:"#9993A8" }}>{t.category}</div>
                    <span style={{ ...S.badge2, background:pr.bg, color:pr.text }}>{pr.label}</span>
                    <span style={{ ...S.badge2, background:st.bg, color:st.text }}>{st.label}</span>
                    <div style={{ fontSize:18, color:"#5A5570" }}>›</div>
                  </div>
                );
              })}
            </div>
          </>}

          {activeTab === "properties" && <>
            <div style={S.pageTitle}>Properties</div>
            <div style={S.pageSub}>{managerProperties.length} properties in your Vancouver portfolio</div>
            <div style={S.propGrid}>
              {managerProperties.map(p => {
                const pT=managerTickets.filter(t=>t.propertyId===p.id);
                const openC=pT.filter(t=>t.status==="OPEN").length;
                const critC=pT.filter(t=>t.priority==="CRITICAL").length;
                return (
                  <div key={p.id} style={S.propCard} onMouseEnter={e=>e.currentTarget.style.borderColor="#E8622A55"} onMouseLeave={e=>e.currentTarget.style.borderColor="#ffffff08"}>
                    <div style={{ fontSize:32, marginBottom:12 }}>{p.image}</div>
                    <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>{p.name}</div>
                    <div style={{ fontSize:12, color:"#9993A8", marginBottom:14 }}>{p.address}</div>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      <div style={S.propMetaChip}>{p.units} units</div>
                      {openC>0 && <div style={{ ...S.propMetaChip, background:"#FF2D2D18", color:"#FF2D2D" }}>{openC} open</div>}
                      {critC>0 && <div style={{ ...S.propMetaChip, background:"#FF2D2D33", color:"#FF2D2D", fontWeight:800 }}>🔴 {critC} critical</div>}
                    </div>
                    <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid #ffffff08" }}>
                      <div style={{ fontSize:11, color:"#5A5570", marginBottom:6, fontWeight:700 }}>RENTER SIGNUP LINK</div>
                      <div style={{ fontSize:11, color:"#E8622A", background:"#E8622A10", borderRadius:6, padding:"6px 10px", wordBreak:"break-all" }}>propdesk.ca/?property={p.id}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ ...S.propCard, border:"2px dashed #ffffff15", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", minHeight:180 }}>
                <div style={{ fontSize:32, marginBottom:10 }}>+</div>
                <div style={{ fontSize:14, fontWeight:700 }}>Add Property</div>
                <div style={{ fontSize:12, color:"#9993A8", marginTop:4 }}>Expand your portfolio</div>
              </div>
            </div>
          </>}

          {activeTab === "renters" && <>
            <div style={S.pageTitle}>Renters</div>
            <div style={S.pageSub}>{users.filter(u=>u.role==="renter").length} registered renters across your properties</div>
            <div style={S.tableWrap}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 80px", gap:12, padding:"10px 20px", background:"#0F0F14", borderBottom:"1px solid #ffffff08" }}>
                {["Name","Email","Property · Unit","Tickets"].map(h=><div key={h} style={S.headCell}>{h}</div>)}
              </div>
              {users.filter(u=>u.role==="renter").map(u => {
                const prop=properties.find(p=>p.id===u.propertyId);
                const tc=tickets.filter(t=>t.renterId===u.id).length;
                return (
                  <div key={u.id} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 80px", gap:12, padding:"14px 20px", borderBottom:"1px solid #ffffff06", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:30, height:30, borderRadius:99, background:"#E8622A22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#E8622A", fontWeight:800 }}>{u.name[0]}</div>
                      <span style={{ fontSize:13, fontWeight:600 }}>{u.name}</span>
                    </div>
                    <div style={{ fontSize:12, color:"#9993A8" }}>{u.email}</div>
                    <div style={{ fontSize:12, color:"#9993A8" }}>{prop?`${prop.name} · Unit ${u.unit}`:"—"}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:tc>0?"#E8622A":"#9993A8" }}>{tc}</div>
                  </div>
                );
              })}
            </div>
          </>}

          {activeTab === "settings" && <>
            <div style={S.pageTitle}>Settings</div>
            <div style={S.pageSub}>Manage your workspace and billing</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {[
                { title:"Company Profile",         icon:"🏢", desc:"Name, logo, and contact information" },
                { title:"Team Members",             icon:"👥", desc:"Invite and manage staff access" },
                { title:"Billing & Plan",           icon:"💳", desc:"Current plan: Pro · Manage subscription" },
                { title:"Notification Preferences", icon:"🔔", desc:"Email alerts for new and urgent tickets" },
                { title:"Integrations",             icon:"🔗", desc:"Connect Slack, email, and SMS alerts" },
                { title:"Renter Portal Branding",   icon:"🎨", desc:"Custom colors and logo for your tenants" },
              ].map(c=>(
                <div key={c.title} style={{ ...S.propCard, cursor:"pointer" }}>
                  <div style={{ fontSize:24, marginBottom:10 }}>{c.icon}</div>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>{c.title}</div>
                  <div style={{ fontSize:12, color:"#9993A8" }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </>}
        </div>
      </div>

      {selectedTicket && (
        <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&setSelectedTicket(null)}>
          <div style={S.drawer}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div>
                <div style={{ fontSize:11, color:"#5A5570", fontWeight:700, marginBottom:4 }}>TICKET #{selectedTicket.id}</div>
                <div style={S.drawerTitle}>{selectedTicket.title}</div>
              </div>
              <button style={{ ...S.btnSmall, background:"#ffffff10", color:"#F0EDE8" }} onClick={()=>setSelectedTicket(null)}>✕</button>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              <span style={{ ...S.badge2, background:PRIORITY_STYLES[selectedTicket.priority].bg, color:PRIORITY_STYLES[selectedTicket.priority].text }}>{PRIORITY_STYLES[selectedTicket.priority].label}</span>
              <span style={{ ...S.badge2, background:STATUS_STYLES[selectedTicket.status].bg,   color:STATUS_STYLES[selectedTicket.status].text   }}>{STATUS_STYLES[selectedTicket.status].label}</span>
            </div>
            {[
              { label:"Renter",    value:selectedTicket.renter },
              { label:"Unit",      value:selectedTicket.unit },
              { label:"Property",  value:properties.find(p=>p.id===selectedTicket.propertyId)?.address },
              { label:"Category",  value:selectedTicket.category },
              { label:"Submitted", value:selectedTicket.date },
              { label:"Assignee",  value:selectedTicket.assignee||"Unassigned" },
            ].map(row=>(
              <div key={row.label} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #ffffff06" }}>
                <span style={{ fontSize:12, color:"#5A5570", fontWeight:700 }}>{row.label}</span>
                <span style={{ fontSize:13, color:"#F0EDE8", textAlign:"right" }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop:16, marginBottom:20 }}>
              <div style={S.label}>Description</div>
              <div style={{ fontSize:13, color:"#9993A8", lineHeight:1.6, background:"#0F0F14", borderRadius:8, padding:"12px 14px" }}>{selectedTicket.description}</div>
            </div>
            <div style={S.label}>Update Status</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["OPEN","IN_PROGRESS","RESOLVED"].map(s2=>(
                <button key={s2} style={{ ...S.btnSmall, background:selectedTicket.status===s2?STATUS_STYLES[s2].bg:"#ffffff08", color:selectedTicket.status===s2?STATUS_STYLES[s2].text:"#9993A8", border:`1px solid ${selectedTicket.status===s2?STATUS_STYLES[s2].text+"44":"transparent"}` }} onClick={()=>updateTicketStatus(selectedTicket.id,s2)}>{STATUS_STYLES[s2].label}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showNewTicket && activeTab === "tickets" && (
        <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&setShowNewTicket(false)}>
          <div style={S.drawer}>
            <div style={S.drawerTitle}>Create Ticket</div>
            <div style={S.drawerSub}>Log a new maintenance request manually.</div>
            {submitSuccess && <div style={S.successBanner}>✓ Ticket created successfully!</div>}
            {[
              { label:"Property",    field:"propertyId", type:"select", opts:managerProperties.map(p=>({v:p.id,l:p.address})) },
              { label:"Renter Name", field:"renter",     type:"text",   ph:"Full name" },
              { label:"Unit Number", field:"unit",       type:"text",   ph:"e.g. 3" },
              { label:"Issue Title", field:"title",      type:"text",   ph:"Short description" },
              { label:"Category",    field:"category",   type:"select", opts:CATEGORIES.map(c=>({v:c,l:c})) },
              { label:"Priority",    field:"priority",   type:"select", opts:[{v:"LOW",l:"Low"},{v:"MEDIUM",l:"Medium"},{v:"HIGH",l:"High"},{v:"CRITICAL",l:"Critical"}] },
            ].map(f=>(
              <div key={f.field} style={S.field}>
                <label style={S.label}>{f.label}</label>
                {f.type==="select"
                  ? <select style={S.select} value={newTicket[f.field]} onChange={e=>setNewTicket(p=>({...p,[f.field]:e.target.value}))}><option value="">Select...</option>{f.opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>
                  : <input style={S.input} placeholder={f.ph} value={newTicket[f.field]} onChange={e=>setNewTicket(p=>({...p,[f.field]:e.target.value}))} />
                }
              </div>
            ))}
            <div style={S.field}>
              <label style={S.label}>Description</label>
              <textarea style={S.textarea} placeholder="Describe the issue..." value={newTicket.description} onChange={e=>setNewTicket(p=>({...p,description:e.target.value}))} />
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button style={{ ...S.btnSmall, background:"#E8622A", color:"#fff", flex:1 }} onClick={handleSubmitTicket}>Create Ticket</button>
              <button style={{ ...S.btnSmall, background:"#ffffff10", color:"#F0EDE8" }} onClick={()=>setShowNewTicket(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
