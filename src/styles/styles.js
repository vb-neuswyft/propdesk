const S = {
  // ── Base ──────────────────────────────────────────────────────────────────
  body:              { fontFamily: "'DM Sans', sans-serif", background: "#0C0C0F", color: "#F0EDE8", minHeight: "100vh", margin: 0 },

  // ── Landing ───────────────────────────────────────────────────────────────
  landing:           { minHeight: "100vh", background: "linear-gradient(135deg,#0C0C0F 0%,#141420 60%,#0C0C0F 100%)", display: "flex", flexDirection: "column" },
  landingNav:        { padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ffffff0d" },
  landingHero:       { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" },
  badge:             { display: "inline-flex", alignItems: "center", gap: 6, background: "#E8622A18", border: "1px solid #E8622A44", borderRadius: 99, padding: "6px 14px", fontSize: 12, color: "#E8622A", marginBottom: 28, letterSpacing: "0.05em", fontWeight: 600 },
  h1:                { fontSize: "clamp(36px,6vw,72px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 20, maxWidth: 800 },
  h1Gradient:        { background: "linear-gradient(90deg,#F0EDE8,#E8622A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtext:           { fontSize: 18, color: "#9993A8", maxWidth: 560, lineHeight: 1.6, marginBottom: 48 },
  featureGrid:       { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, maxWidth: 900, margin: "60px auto 0", padding: "0 24px" },
  featureCard:       { background: "#ffffff06", border: "1px solid #ffffff0d", borderRadius: 14, padding: "24px 20px" },

  // ── Branding ──────────────────────────────────────────────────────────────
  logo:              { fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: "#F0EDE8" },
  logoAccent:        { color: "#E8622A" },

  // ── Buttons ───────────────────────────────────────────────────────────────
  btnRow:            { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  btnPrimary:        { background: "#E8622A", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" },
  btnSecondary:      { background: "transparent", color: "#F0EDE8", border: "1px solid #ffffff22", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" },
  btnGhost:          { background: "transparent", color: "#9993A8", border: "none", fontSize: 14, cursor: "pointer", padding: "4px 0" },
  btnSmall:          { padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  btnChexy:          { background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "#4FC3F7", border: "1px solid #4FC3F744", borderRadius: 10, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" },

  // ── Auth ──────────────────────────────────────────────────────────────────
  authWrap:          { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0C0C0F", padding: 24 },
  authCard:          { background: "#141418", border: "1px solid #ffffff10", borderRadius: 20, padding: "44px 40px", width: "100%", maxWidth: 440 },
  tabRow:            { display: "flex", background: "#0F0F14", borderRadius: 10, padding: 4, marginBottom: 28 },
  tabBtn:            { flex: 1, padding: "9px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "transparent", color: "#9993A8" },
  tabBtnActive:      { background: "#E8622A", color: "#fff" },
  roleGrid:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 },
  roleCard:          { border: "2px solid #ffffff15", borderRadius: 12, padding: "18px 14px", textAlign: "center", cursor: "pointer", background: "transparent", color: "#9993A8" },
  roleCardActive:    { borderColor: "#E8622A", background: "#E8622A12", color: "#E8622A" },
  divider:           { display: "flex", alignItems: "center", gap: 12, margin: "20px 0", color: "#5A5570", fontSize: 12 },
  dividerLine:       { flex: 1, height: 1, background: "#ffffff10" },

  // ── Form fields ───────────────────────────────────────────────────────────
  field:             { marginBottom: 16 },
  label:             { fontSize: 11, color: "#9993A8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 },
  input:             { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", boxSizing: "border-box" },
  select:            { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", boxSizing: "border-box" },
  textarea:          { width: "100%", background: "#0F0F14", border: "1px solid #ffffff12", borderRadius: 8, padding: "10px 12px", color: "#F0EDE8", fontSize: 13, outline: "none", resize: "vertical", minHeight: 80, boxSizing: "border-box" },
  fileUpload:        { width: "100%", background: "#0F0F14", border: "2px dashed #ffffff20", borderRadius: 8, padding: "16px 12px", color: "#9993A8", fontSize: 13, cursor: "pointer", textAlign: "center", boxSizing: "border-box" },
  photoThumb:        { width: 64, height: 64, borderRadius: 8, objectFit: "cover", border: "1px solid #ffffff15" },

  // ── Alerts ────────────────────────────────────────────────────────────────
  errorBox:          { background: "#FF2D2D15", border: "1px solid #FF2D2D44", borderRadius: 8, padding: "10px 14px", color: "#FF2D2D", fontSize: 13, marginBottom: 16 },
  successBanner:     { background: "#22AA5518", border: "1px solid #22AA5544", borderRadius: 10, padding: "14px 18px", textAlign: "center", color: "#22AA55", fontWeight: 600, marginBottom: 20, fontSize: 14 },
  infoBanner:        { background: "#2A7BE818", border: "1px solid #2A7BE844", borderRadius: 10, padding: "12px 16px", color: "#2A7BE8", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 },

  // ── Layout ────────────────────────────────────────────────────────────────
  layout:            { display: "flex", minHeight: "100vh", background: "#0C0C0F" },
  sidebar:           { width: 240, background: "#0F0F14", borderRight: "1px solid #ffffff08", display: "flex", flexDirection: "column", padding: "0 0 20px", flexShrink: 0 },
  sidebarLogo:       { padding: "22px 20px 16px", fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", borderBottom: "1px solid #ffffff08" },
  sidebarSection:    { padding: "16px 12px 0", fontSize: 10, letterSpacing: "0.1em", color: "#5A5570", fontWeight: 700, textTransform: "uppercase" },
  sidebarItem:       { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, margin: "2px 8px", fontSize: 13, color: "#9993A8", cursor: "pointer", fontWeight: 500 },
  sidebarItemActive: { background: "#E8622A18", color: "#E8622A" },
  main:              { flex: 1, overflow: "auto", padding: "32px 36px" },

  // ── Page headers ──────────────────────────────────────────────────────────
  pageTitle:         { fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 },
  pageSub:           { fontSize: 13, color: "#9993A8", marginBottom: 32 },

  // ── Stat cards ────────────────────────────────────────────────────────────
  statsRow:          { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 },
  statCard:          { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, padding: "20px 20px 16px" },
  statValue:         { fontSize: 34, fontWeight: 800, letterSpacing: "-1px" },
  statLabel:         { fontSize: 12, color: "#9993A8", marginTop: 4, fontWeight: 500 },

  // ── Tables ────────────────────────────────────────────────────────────────
  tableWrap:         { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, overflow: "hidden" },
  tableHeader:       { display: "flex", gap: 12, alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #ffffff08" },
  tableTitle:        { fontSize: 15, fontWeight: 700, flex: 1 },
  filterRow:         { display: "flex", gap: 8, padding: "12px 20px", borderBottom: "1px solid #ffffff08", background: "#0F0F14", flexWrap: "wrap" },
  filterBtn:         { padding: "5px 12px", borderRadius: 99, border: "1px solid #ffffff15", background: "transparent", color: "#9993A8", fontSize: 12, cursor: "pointer", fontWeight: 500 },
  filterBtnActive:   { borderColor: "#E8622A", background: "#E8622A15", color: "#E8622A" },
  ticketGrid:        { display: "grid", gridTemplateColumns: "40px 1fr 140px 90px 100px 110px 36px", gap: 12, alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #ffffff06", cursor: "pointer" },
  ticketGridHead:    { display: "grid", gridTemplateColumns: "40px 1fr 140px 90px 100px 110px 36px", gap: 12, padding: "10px 20px", background: "#0F0F14", borderBottom: "1px solid #ffffff08" },
  headCell:          { fontSize: 11, color: "#5A5570", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" },
  badge2:            { display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 },

  // ── Drawer / Modal ────────────────────────────────────────────────────────
  overlay:           { position: "fixed", inset: 0, background: "#00000088", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", zIndex: 100, padding: 20 },
  drawer:            { background: "#141418", border: "1px solid #ffffff10", borderRadius: 16, width: 480, maxHeight: "calc(100vh - 40px)", overflowY: "auto", padding: 28 },
  drawerTitle:       { fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", marginBottom: 4 },
  drawerSub:         { fontSize: 12, color: "#9993A8", marginBottom: 20 },

  // ── Property cards ────────────────────────────────────────────────────────
  propGrid:          { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 },
  propCard:          { background: "#141418", border: "1px solid #ffffff08", borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "border-color .15s" },
  propMetaChip:      { fontSize: 11, background: "#ffffff08", borderRadius: 6, padding: "3px 8px", color: "#9993A8", fontWeight: 600 },

  // ── Renter portal ─────────────────────────────────────────────────────────
  renterWrap:        { minHeight: "100vh", background: "#0C0C0F", padding: 24 },
  renterHeader:      { maxWidth: 720, margin: "0 auto 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  renterCard:        { maxWidth: 720, margin: "0 auto", background: "#141418", border: "1px solid #ffffff10", borderRadius: 20, padding: "36px 32px" },
};

export default S;
