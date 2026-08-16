import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CampusSelector from '../components/CampusSelector'

const navGroups = [
  {
    label: 'Discover',
    links: [
      { to: '/', label: 'Home', end: true },
      { to: '/search', label: 'Search' },
      { to: '/categories', label: 'Categories' },
    ],
  },
  {
    label: 'Workspace',
    links: [
      { to: '/my-skills', label: 'My Skills' },
      { to: '/bookings', label: 'Bookings' },
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
          <span className="sidebar-logo">SkillBridge</span>
          <button type="button" className="sidebar-close" onClick={onClose} aria-label="Close menu">
            ×
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
      <button type="button" className="menu-toggle" onClick={onMenuToggle}>
        Menu
      </button>
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
