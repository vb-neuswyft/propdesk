import S from "../styles/styles";
import { Logo } from "./UI";

const FEATURES = [
  { icon: "🏢", title: "Portfolio Overview",    desc: "Manage all your Vancouver properties from one dashboard." },
  { icon: "🎫", title: "Ticket Tracking",       desc: "Real-time updates with priority levels from Low to Critical." },
  { icon: "🔒", title: "Private Renter Portal", desc: "Each renter only sees their own property and tickets." },
  { icon: "📧", title: "Email Notifications",   desc: "Get instant alerts when a renter submits a new request." },
  { icon: "📷", title: "Photo Uploads",         desc: "Renters attach photos so you see the issue before visiting." },
  { icon: "💳", title: "Chexy Integration",     desc: "Renters pay rent with credit cards and earn Aeroplan points." },
];

const LandingPage = ({ onManagerLogin, onManagerSignup, onRenterLogin, onRenterSignup }) => (
  <div style={S.body}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <div style={S.landing}>
      <nav style={S.landingNav}>
        <Logo />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={S.btnGhost}                                                onClick={onRenterLogin}>Renter Login</button>
          <button style={{ ...S.btnSecondary, fontSize: 13, padding: "10px 20px" }} onClick={onManagerLogin}>Manager Login</button>
          <button style={{ ...S.btnPrimary,   fontSize: 13, padding: "10px 20px" }} onClick={onManagerSignup}>Get Started Free</button>
        </div>
      </nav>

      <div style={S.landingHero}>
        <div style={S.badge}>✦ PROPERTY MANAGEMENT · VANCOUVER, BC</div>
        <h1 style={{ ...S.h1, ...S.h1Gradient }}>
          Maintenance tickets.<br />Managed effortlessly.
        </h1>
        <p style={S.subtext}>
          Give your renters a private portal to report issues. Track, assign, and resolve every maintenance request across your entire portfolio — in one place.
        </p>
        <div style={S.btnRow}>
          <button style={S.btnPrimary}   onClick={onManagerSignup}>Start as Property Manager →</button>
          <button style={S.btnSecondary} onClick={onRenterSignup}>Register as Renter</button>
        </div>

        <div style={S.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} style={S.featureCard}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F0EDE8", marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#9993A8", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60, paddingTop: 20, borderTop: "1px solid #ffffff08", width: "100%", maxWidth: 900, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#5A5570" }}>
            propdesk.ca · Vancouver, BC · Secure · Free to get started
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
