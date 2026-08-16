import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { useCampus } from '../context/CampusContext'
import { skillOfTheDay, discoverSkills, campusActivity } from '../data/mockData'

export default function Home() {
  const { campus } = useCampus()

  return (
    <div className="page-content">
      <section className="hero">
        <h1>Learn from each other. Teach what you know.</h1>
        <p className="hero-tagline">What do you want to learn?</p>
        <SearchBar placeholder="Search skills..." large />
      </section>

      <section className="section">
        <h2 className="section-title">Skill of the Day</h2>
        <div className="skill-of-day">
          <p className="skill-of-day-name">{skillOfTheDay.skill}</p>
          <p className="skill-of-day-desc">{skillOfTheDay.description}</p>
          <p className="skill-of-day-meta">
            {skillOfTheDay.teachersCount} students on {campus.name} can teach this
          </p>
          <Link to={`/skill/${encodeURIComponent(skillOfTheDay.skill)}`} className="btn-ghost">
            Explore skill →
          </Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Discover Something New</h2>
        <div className="discover-grid">
          {discoverSkills.map((skill) => (
            <Link
              key={skill}
              to={`/skill/${encodeURIComponent(skill)}`}
              className="discover-link"
            >
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
