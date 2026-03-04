import S from "../styles/styles";
import { PRIORITY_STYLES, STATUS_STYLES } from "../data/seed";

// ── Logo ─────────────────────────────────────────────────────────────────────
export const Logo = () => (
  <span style={S.logo}>
    prop<span style={S.logoAccent}>desk</span>
  </span>
);

// ── Form Field wrapper ────────────────────────────────────────────────────────
export const Field = ({ label, children }) => (
  <div style={S.field}>
    <label style={S.label}>{label}</label>
    {children}
  </div>
);

// ── Priority Badge ────────────────────────────────────────────────────────────
export const PriorityBadge = ({ priority }) => {
  const p = PRIORITY_STYLES[priority];
  if (!p) return null;
  return <span style={{ ...S.badge2, background: p.bg, color: p.text }}>{p.label}</span>;
};

// ── Status Badge ──────────────────────────────────────────────────────────────
export const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status];
  if (!s) return null;
  return <span style={{ ...S.badge2, background: s.bg, color: s.text }}>{s.label}</span>;
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
export const StatCard = ({ value, label, color }) => (
  <div style={S.statCard}>
    <div style={{ ...S.statValue, color }}>{value}</div>
    <div style={S.statLabel}>{label}</div>
  </div>
);

// ── Section Divider with label ────────────────────────────────────────────────
export const Divider = ({ label }) => (
  <div style={S.divider}>
    <div style={S.dividerLine} />
    {label}
    <div style={S.dividerLine} />
  </div>
);

// ── Category icon helper ──────────────────────────────────────────────────────
export const categoryIcon = (category) => {
  const map = {
    Plumbing:          "🔧",
    HVAC:              "❄️",
    Electrical:        "⚡",
    Security:          "🔒",
    "Health & Safety": "⚠️",
    Appliance:         "🔌",
    "Pest Control":    "🐛",
    Structural:        "🏗",
    Other:             "🏠",
  };
  return map[category] || "🏠";
};

// ── Empty state placeholder ───────────────────────────────────────────────────
export const EmptyState = ({ icon, title, subtitle }) => (
  <div style={{ textAlign: "center", padding: "48px 0", color: "#5A5570" }}>
    <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontSize: 15, fontWeight: 700, color: "#9993A8" }}>{title}</div>
    {subtitle && <div style={{ fontSize: 13, marginTop: 6 }}>{subtitle}</div>}
  </div>
);
