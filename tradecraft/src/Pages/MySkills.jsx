import { mySkills } from '../data/mockData'

export default function MySkills() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Skills</h1>
        <p>Manage what you teach and what you want to learn.</p>
      </div>

      <div className="skills-columns">
        <div className="skills-column">
          <h3>Skills I Teach</h3>
          {mySkills.teaches.map((skill) => (
            <div key={skill} className="skill-item">
              <span>{skill}</span>
            </div>
          ))}
          <button type="button" className="add-skill-btn">+ Add skill</button>
        </div>

        <div className="skills-column">
          <h3>Skills I Want to Learn</h3>
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
