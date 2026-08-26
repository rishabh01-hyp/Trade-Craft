import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CampusSelector from '../components/CampusSelector'

/* Tiny inline stroke icons make the nav scannable without pulling in an icon library.
   Each one inherits currentColor so active/inactive states just work. */
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

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">Trade-Craft</span>
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
          <CampusSelector />
        </div>
      </aside>
    </>
  )
}

export function TopBar({ onMenuToggle }) {
  return (
    <header className="top-bar">
      {/* An icon reads cleaner than the word "Menu" and stays compact on small screens */}
      <button type="button" className="menu-toggle" onClick={onMenuToggle} aria-label="Open menu">
        ☰
      </button>
      <span className="topbar-brand">TradeCraft</span>
      <button type="button" className="user-menu-btn">
        You ▾
      </button>
    </header>
  )
}

export function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-area">
        <TopBar onMenuToggle={() => setSidebarOpen(true)} />
        <main>{children}</main>
      </div>
    </div>
  )
}