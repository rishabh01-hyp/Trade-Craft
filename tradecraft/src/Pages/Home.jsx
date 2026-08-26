import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { useCampus } from '../context/CampusContext'
import { skillOfTheDay, discoverSkills, campusActivity } from '../data/mockData'

export default function Home() {
  const { campus } = useCampus()

  return (
    <div className="page-content">
      {/* Hero splits into copy + a featured skill card so the landing page
          has a clear focal point instead of a plain wall of text */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Peer-to-peer skill exchange</p>
          <h1>
            Learn from each other.
            <br />
            Teach what you know.
          </h1>
          <p className="hero-tagline">Find a student on your campus to teach you almost anything.</p>
          <SearchBar placeholder="Search skills..." large />
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">10+</span>
              <span>Skills</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">2</span>
              <span>Campuses</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">4.7★</span>
              <span>Avg. rating</span>
            </div>
          </div>
        </div>

        <aside className="hero-card">
          <p className="hero-card-meta">Skill of the day · {campus.name}</p>
          <p className="hero-card-name">{skillOfTheDay.skill}</p>
          <p className="hero-card-desc">{skillOfTheDay.description}</p>
          <Link
            to={`/skill/${encodeURIComponent(skillOfTheDay.skill)}`}
            className="btn-light"
          >
            Explore →
          </Link>
        </aside>
      </section>

      <section className="section">
        <h2 className="section-title">Discover Something New</h2>
        <div className="discover-grid">
          {discoverSkills.map((skill) => (
            <Link key={skill} to={`/skill/${encodeURIComponent(skill)}`} className="discover-link">
              {skill}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Campus Activity</h2>
        <div className="activity-list">
          {campusActivity.popular.map((item) => (
            <div key={item.skill} className="activity-row">
              <Link to={`/skill/${encodeURIComponent(item.skill)}`} className="activity-skill">
                {item.skill}
              </Link>
              <span className="activity-stats">
                {item.teachers} teaching · {item.learners} learning
              </span>
            </div>
          ))}
        </div>
        <p className="section-title" style={{ marginTop: '24px' }}>
          Recently added
        </p>
        <div className="recent-tags">
          {campusActivity.recentlyAdded.map((skill) => (
            <Link key={skill} to={`/skill/${encodeURIComponent(skill)}`} className="tag">
              {skill}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}