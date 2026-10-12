import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import './layout.css';

function Layout() {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-logo">🚀 ReactSite</div>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={getNavLinkClass} end>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className={getNavLinkClass}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/services" className={getNavLinkClass}>
                Services
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className={getNavLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} ReactSite. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
