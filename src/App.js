import { useState } from "react";
import { SEED_PROPERTIES, SEED_TICKETS, SEED_USERS } from "./data/seed";
import LandingPage       from "./components/LandingPage";
import AuthPage          from "./components/AuthPage";
import RenterPortal      from "./components/RenterPortal";
import ManagerDashboard  from "./components/ManagerDashboard";

const EMPTY_SIGNUP = { name:"", email:"", password:"", confirm:"", propertyId:"", unit:"", companyName:"" };
const EMPTY_LOGIN  = { email:"", password:"" };

export default function App() {
  // ── App state ──────────────────────────────────────────────────────────────
  const [view, setView]               = useState("landing"); // landing|auth|dashboard|renter
  const [authMode, setAuthMode]       = useState("login");   // login|signup
  const [authRole, setAuthRole]       = useState("renter");  // manager|renter
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError]     = useState("");

  // ── Data state ─────────────────────────────────────────────────────────────
  const [users,      setUsers]      = useState(SEED_USERS);
  const [tickets,    setTickets]    = useState(SEED_TICKETS);
  const [properties]                = useState(SEED_PROPERTIES);

  // ── Form state ─────────────────────────────────────────────────────────────
  const [loginForm,  setLoginForm]  = useState(EMPTY_LOGIN);
  const [signupForm, setSignupForm] = useState(EMPTY_SIGNUP);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const goAuth = (mode, role) => {
    setAuthMode(mode);
    setAuthRole(role);
    setAuthError("");
    setView("auth");
  };

  const signOut = () => {
    setCurrentUser(null);
    setView("landing");
    setLoginForm(EMPTY_LOGIN);
    setSignupForm(EMPTY_SIGNUP);
    setAuthError("");
  };

  // ── Auth handlers ──────────────────────────────────────────────────────────
  const handleLogin = () => {
    setAuthError("");
    const user = users.find(
      (u) => u.email === loginForm.email && u.password === loginForm.password
    );
    if (!user) { setAuthError("Incorrect email or password. Please try again."); return; }
    setCurrentUser(user);
    setView(user.role === "manager" ? "dashboard" : "renter");
  };

  const handleSignup = () => {
    setAuthError("");
    const { name, email, password, confirm, propertyId, unit } = signupForm;
    if (!name || !email || !password)        { setAuthError("Please fill in all required fields."); return; }
    if (password !== confirm)                { setAuthError("Passwords do not match."); return; }
    if (password.length < 6)                 { setAuthError("Password must be at least 6 characters."); return; }
    if (users.find((u) => u.email === email)){ setAuthError("An account with this email already exists."); return; }
    if (authRole === "renter" && !propertyId){ setAuthError("Please select your property."); return; }

    const id = `user-${Date.now()}`;
    const newUser = authRole === "renter"
      ? { id, role:"renter",  name, email, password, propertyId: parseInt(propertyId), unit }
      : { id, role:"manager", name, email, password, companyId: 1 };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setView(authRole === "manager" ? "dashboard" : "renter");
  };

  // ── Ticket handlers ────────────────────────────────────────────────────────
  const handleAddTicket = (ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  const handleUpdateStatus = (id, status) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  // ── Routing ────────────────────────────────────────────────────────────────
  if (view === "landing") return (
    <LandingPage
      onManagerLogin  ={() => goAuth("login",  "manager")}
      onManagerSignup ={() => goAuth("signup", "manager")}
      onRenterLogin   ={() => goAuth("login",  "renter")}
      onRenterSignup  ={() => goAuth("signup", "renter")}
    />
  );

  if (view === "auth") return (
    <AuthPage
      authMode={authMode}   setAuthMode={setAuthMode}
      authRole={authRole}   setAuthRole={setAuthRole}
      authError={authError}
      loginForm={loginForm}   setLoginForm={setLoginForm}
      signupForm={signupForm} setSignupForm={setSignupForm}
      properties={properties}
      onLogin={handleLogin}
      onSignup={handleSignup}
      onBack={() => { setAuthError(""); setView("landing"); }}
    />
  );

  if (view === "renter") return (
    <RenterPortal
      currentUser={currentUser}
      properties={properties}
      tickets={tickets}
      onAddTicket={handleAddTicket}
      onSignOut={signOut}
    />
  );

  if (view === "dashboard") return (
    <ManagerDashboard
      currentUser={currentUser}
      properties={properties}
      tickets={tickets}
      users={users}
      onUpdateStatus={handleUpdateStatus}
      onAddTicket={handleAddTicket}
      onSignOut={signOut}
    />
  );

  return null;
}
