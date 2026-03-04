import S from "../styles/styles";
import { Logo, Field, Divider } from "./UI";

const AuthPage = ({
  authMode, setAuthMode,
  authRole, setAuthRole,
  authError,
  loginForm,  setLoginForm,
  signupForm, setSignupForm,
  properties,
  onLogin, onSignup,
  onBack,
}) => (
  <div style={S.body}>
    <div style={S.authWrap}>
      <div style={S.authCard}>

        {/* Back */}
        <div style={{ marginBottom: 24, cursor: "pointer", color: "#9993A8", fontSize: 13 }} onClick={onBack}>
          ← Back
        </div>
        <Logo />

        {/* Sign In / Create Account tabs */}
        <div style={{ ...S.tabRow, marginTop: 24 }}>
          {[["login","Sign In"],["signup","Create Account"]].map(([m, label]) => (
            <button
              key={m}
              style={{ ...S.tabBtn, ...(authMode === m ? S.tabBtnActive : {}) }}
              onClick={() => setAuthMode(m)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Role selector */}
        <div style={S.roleGrid}>
          {[{ id:"manager", icon:"🏢", label:"Property Manager" },{ id:"renter", icon:"🏠", label:"Renter" }].map((r) => (
            <div
              key={r.id}
              style={{ ...S.roleCard, ...(authRole === r.id ? S.roleCardActive : {}) }}
              onClick={() => setAuthRole(r.id)}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{r.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{r.label}</div>
            </div>
          ))}
        </div>

        {authError && <div style={S.errorBox}>⚠ {authError}</div>}

        {/* ── SIGNUP ── */}
        {authMode === "signup" && <>
          <Field label="Full Name">
            <input style={S.input} placeholder="Your full name" value={signupForm.name} onChange={(e) => setSignupForm((p) => ({ ...p, name: e.target.value }))} />
          </Field>
          <Field label="Email Address">
            <input style={S.input} placeholder="you@email.com" value={signupForm.email} onChange={(e) => setSignupForm((p) => ({ ...p, email: e.target.value }))} />
          </Field>
          {authRole === "manager" && (
            <Field label="Company / Portfolio Name">
              <input style={S.input} placeholder="e.g. My Property Group" value={signupForm.companyName} onChange={(e) => setSignupForm((p) => ({ ...p, companyName: e.target.value }))} />
            </Field>
          )}
          {authRole === "renter" && <>
            <Field label="Your Property">
              <select style={S.select} value={signupForm.propertyId} onChange={(e) => setSignupForm((p) => ({ ...p, propertyId: e.target.value }))}>
                <option value="">Select your building...</option>
                {properties.map((p) => <option key={p.id} value={p.id}>{p.address}</option>)}
              </select>
            </Field>
            <Field label="Unit Number">
              <input style={S.input} placeholder="e.g. 3, 4B" value={signupForm.unit} onChange={(e) => setSignupForm((p) => ({ ...p, unit: e.target.value }))} />
            </Field>
          </>}
          <Field label="Password">
            <input style={S.input} type="password" placeholder="At least 6 characters" value={signupForm.password} onChange={(e) => setSignupForm((p) => ({ ...p, password: e.target.value }))} />
          </Field>
          <Field label="Confirm Password">
            <input style={S.input} type="password" placeholder="Repeat your password" value={signupForm.confirm} onChange={(e) => setSignupForm((p) => ({ ...p, confirm: e.target.value }))} />
          </Field>
          <button style={{ ...S.btnPrimary, width: "100%", marginTop: 4 }} onClick={onSignup}>
            Create {authRole === "manager" ? "Manager" : "Renter"} Account →
          </button>
          <Divider label="or" />
          <button style={{ ...S.btnGhost, width: "100%", textAlign: "center" }} onClick={() => setAuthMode("login")}>
            Already have an account? <span style={{ color: "#E8622A" }}>Sign in</span>
          </button>
        </>}

        {/* ── LOGIN ── */}
        {authMode === "login" && <>
          <Field label="Email Address">
            <input style={S.input} placeholder="you@email.com" value={loginForm.email} onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))} />
          </Field>
          <Field label="Password">
            <input
              style={S.input}
              type="password"
              placeholder="Your password"
              value={loginForm.password}
              onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && onLogin()}
            />
          </Field>
          <button style={{ ...S.btnPrimary, width: "100%", marginTop: 4 }} onClick={onLogin}>
            Sign In as {authRole === "manager" ? "Manager" : "Renter"} →
          </button>
          <Divider label="demo credentials" />
          <div style={{ background: "#0F0F14", borderRadius: 10, padding: "12px 14px", fontSize: 12, color: "#9993A8", lineHeight: 1.9 }}>
            <div><span style={{ color: "#F0EDE8", fontWeight: 700 }}>Manager:</span> admin@propdesk.ca / admin123</div>
            <div><span style={{ color: "#F0EDE8", fontWeight: 700 }}>Renter:</span>  sarah@email.com / renter123</div>
          </div>
          <Divider label="or" />
          <button style={{ ...S.btnGhost, width: "100%", textAlign: "center" }} onClick={() => setAuthMode("signup")}>
            New here? <span style={{ color: "#E8622A" }}>Create an account</span>
          </button>
        </>}

      </div>
    </div>
  </div>
);

export default AuthPage;
