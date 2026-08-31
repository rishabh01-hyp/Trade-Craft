import Loading from '../components/Loading'
import { useLoading } from '../hooks/useLoading'
import { mySkills } from '../data/mockData'

export default function MySkills() {
  const loading = useLoading()

  if (loading) {
    return (
      <div className="page-content">
        <Loading full label="Loading your skills..." />
      </div>
    )
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Skills</h1>
        <p>Manage what you teach and what you want to learn.</p>
      </div>

      <div className="skills-columns">
        <div className="skills-column">
          <h3>Skills I Teach <span className="count-badge">{mySkills.teaches.length}</span></h3>
          {mySkills.teaches.map((skill) => (
            <div key={skill} className="skill-item">
              <span>{skill}</span>
            </div>
          ))}
          <button type="button" className="add-skill-btn">+ Add skill</button>
        </div>

        <div className="skills-column">
          <h3>Skills I Want to Learn <span className="count-badge">{mySkills.learning.length}</span></h3>
          {mySkills.learning.map((skill) => (
            <div key={skill} className="skill-item">
              <span>{skill}</span>
            </div>
          ))}
          <button type="button" className="add-skill-btn">+ Add skill</button>
        </div>
      </div>
    </div>
  )
}
