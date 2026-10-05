// ============================================================
// Component/RouterDemo.jsx
// Explicit .jsx extensions avoid resolution errors.
// ============================================================

import { MemoryRouter, Routes, Route } from "react-router-dom";

// ---------- Shared layout (same folder) ----------
import Navbar from "./Navbar.jsx";

// ---------- Route pages (one level up, into src/pages/) ----------
import Home      from "../pages/Home.jsx";
import About     from "../pages/About.jsx";
import Contact   from "../pages/Contact.jsx";
import User      from "../pages/User.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Profile   from "../pages/Profile.jsx";
import Settings  from "../pages/Settings.jsx";
import NotFound  from "../pages/NotFound.jsx";

function RouterDemo() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:id" element={<User />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </MemoryRouter>
  );
}

export default RouterDemo;