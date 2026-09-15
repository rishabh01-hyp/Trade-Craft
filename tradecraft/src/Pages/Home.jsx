import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Loading from '../components/Loading'
import { useFetchData } from '../hooks/useFetchData'
import { fetchHomeData } from '../data/mockData'

export default function Home({ campus, user }) {
  const { data, loading } = useFetchData(() => fetchHomeData(), [])

  if (loading) {
    return (
      <div className="page-content">
        <Loading full label="Loading your campus..." />
      </div>
    )
  }

  const { skillOfTheDay, discoverSkills, campusActivity } = data

  return (
    <div className="page-content">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Peer-to-peer skill exchange</p>
          <h1>
            Learn from each other.
            <br />
            Teach what you know.
          </h1>
          {/* Greeting shown only when a student is logged in */}
          {user && <p className="hero-user">Signed in as roll no {user.rollNo}</p>}
          <p className="hero-tagline">
            Find a student on your campus who can teach you almost anything.
          </p>
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
              <span className="hero-stat-num">4.7</span>
              <span>Avg. rating</span>
            </div>
          </div>
        </div>

        <aside className="hero-card">
          <p className="hero-card-meta">Skill of the day &middot; {campus.name}</p>
          <p className="hero-card-name">{skillOfTheDay.name}</p>
          <p className="hero-card-desc">{skillOfTheDay.description}</p>
          <Link to={`/skill/${encodeURIComponent(skillOfTheDay.name)}`} className="btn-light">
            Explore
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
                {item.teachers} teaching &middot; {item.learners} learning
              </span>
            </div>
          ))}
        </div>

        <h3 className="section-subtitle">Recently added</h3>
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
