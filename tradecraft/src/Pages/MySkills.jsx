import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useLoading } from '../hooks/useLoading'
import { mySkills as defaultMySkills } from '../data/mockData'

const STORAGE_KEY = 'tradecraft_myskills'

export default function MySkills() {
  const loading = useLoading()

  // Load saved skill lists from localStorage, falling back to mockData defaults —
  // same pattern ReviewsPage uses so the add/remove edits survive a refresh.
  const [skillsData, setSkillsData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultMySkills
    } catch (error) {
      console.error('Failed to load skills from localStorage:', error)
      return defaultMySkills
    }
  })

  // Text currently typed into each column's "add skill" input
  const [newTeachSkill, setNewTeachSkill] = useState('')
  const [newLearnSkill, setNewLearnSkill] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(skillsData))
    } catch (error) {
      console.error('Failed to save skills to localStorage:', error)
    }
  }, [skillsData])

  if (loading) {
    return (
      <div className="page-content">
        <Loading full label="Loading your skills..." />
      </div>
    )
  }

  function addSkill(column, value) {
    const trimmed = value.trim()
    if (!trimmed) return
    // Avoid duplicate entries (case-insensitive)
    const exists = skillsData[column].some((s) => s.toLowerCase() === trimmed.toLowerCase())
    if (exists) return

    setSkillsData((prev) => ({
      ...prev,
      [column]: [...prev[column], trimmed],
    }))
  }

  function removeSkill(column, skill) {
    setSkillsData((prev) => ({
      ...prev,
      [column]: prev[column].filter((s) => s !== skill),
    }))
  }

  function handleTeachSubmit(e) {
    e.preventDefault()
    addSkill('teaches', newTeachSkill)
    setNewTeachSkill('')
  }

  function handleLearnSubmit(e) {
    e.preventDefault()
    addSkill('learning', newLearnSkill)
    setNewLearnSkill('')
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Skills</h1>
        <p>Manage what you teach and what you want to learn.</p>
      </div>

      <div className="skills-columns">
        <div className="skills-column">
          <h3>Skills I Teach <span className="count-badge">{skillsData.teaches.length}</span></h3>
          {skillsData.teaches.length === 0 && (
            <p className="empty-state" style={{ padding: '8px 0' }}>No skills added yet.</p>
          )}
          {skillsData.teaches.map((skill) => (
            <div key={skill} className="skill-item">
              <span>{skill}</span>
              <button
                type="button"
                className="skill-remove-btn"
                onClick={() => removeSkill('teaches', skill)}
                aria-label={`Remove ${skill} from skills I teach`}
              >
                ×
              </button>
            </div>
          ))}
          <form onSubmit={handleTeachSubmit} className="add-skill-form">
            <input
              type="text"
              className="add-skill-input"
              placeholder="e.g. Public Speaking"
              value={newTeachSkill}
              onChange={(e) => setNewTeachSkill(e.target.value)}
              aria-label="New skill I teach"
            />
            <button type="submit" className="add-skill-btn">+ Add skill</button>
          </form>
        </div>

        <div className="skills-column">
          <h3>Skills I Want to Learn <span className="count-badge">{skillsData.learning.length}</span></h3>
          {skillsData.learning.length === 0 && (
            <p className="empty-state" style={{ padding: '8px 0' }}>No skills added yet.</p>
          )}
          {skillsData.learning.map((skill) => (
            <div key={skill} className="skill-item">
              <span>{skill}</span>
              <button
                type="button"
                className="skill-remove-btn"
                onClick={() => removeSkill('learning', skill)}
                aria-label={`Remove ${skill} from skills I want to learn`}
              >
                ×
              </button>
            </div>
          ))}
          <form onSubmit={handleLearnSubmit} className="add-skill-form">
            <input
              type="text"
              className="add-skill-input"
              placeholder="e.g. Guitar"
              value={newLearnSkill}
              onChange={(e) => setNewLearnSkill(e.target.value)}
              aria-label="New skill I want to learn"
            />
            <button type="submit" className="add-skill-btn">+ Add skill</button>
          </form>
        </div>
      </div>
    </div>
  )
}