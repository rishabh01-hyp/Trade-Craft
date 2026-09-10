import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import CampusSelector from '../components/CampusSelector'

function Icon({ children }) {
  return (
    <svg
      className="nav-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const icons = {
  home: (
    <Icon>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </Icon>
  ),
  search: (
    <Icon>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </Icon>
  ),
  grid: (
    <Icon>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </Icon>
  ),
  sparkles: (
    <Icon>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </Icon>
  ),
  calendar: (
    <Icon>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 9h18" />
    </Icon>
  ),
}

const navGroups = [
  {
    label: 'Discover',
    links: [
      { to: '/', label: 'Home', end: true, icon: icons.home },
      { to: '/search', label: 'Search', icon: icons.search },
      { to: '/categories', label: 'Categories', icon: icons.grid },
    ],
  },
  {
    label: 'Workspace',
    links: [
      { to: '/my-skills', label: 'My Skills', icon: icons.sparkles },
      { to: '/bookings', label: 'Bookings', icon: icons.calendar },
    ],
  },
]

function Sidebar({ open, onClose, campus, onCampusChange }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">TradeCraft</span>
          <button type="button" className="sidebar-close" onClick={onClose} aria-label="Close menu">
            x
          </button>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.label} className="nav-group">
              <div className="nav-group-label">{group.label}</div>
              {group.links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <CampusSelector campus={campus} onCampusChange={onCampusChange} />
        </div>
      </aside>
    </>
  )
}

function TopBar({ onMenuToggle, user, onLogout }) {
  return (
    <header className="top-bar">
      <button type="button" className="menu-toggle" onClick={onMenuToggle} aria-label="Open menu">
        &#9776;
      </button>
      <span className="topbar-brand">TradeCraft</span>

      {user ? (
        <div className="user-area">
          <span className="user-name">Hi, {user.name}</span>
          <button type="button" className="user-menu-btn" onClick={onLogout}>
            Log out
          </button>
        </div>
      ) : (
        <Link to="/login" className="user-menu-btn">
          Log in
        </Link>
      )}
    </header>
  )
}

export function AppLayout({ children, campus, onCampusChange, user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        campus={campus}
        onCampusChange={onCampusChange}
      />
      <div className="main-area">
        <TopBar onMenuToggle={() => setSidebarOpen(true)} user={user} onLogout={onLogout} />
        <main>{children}</main>
      </div>
    </div>
  )
}
