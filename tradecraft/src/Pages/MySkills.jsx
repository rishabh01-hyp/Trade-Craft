import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToast } from '../components/toastContext'
import { initialMySkills } from '../data/mockData'

const columns = [
  { key: 'teaches', title: 'Skills I Teach', placeholder: 'Add a skill you can teach' },
  { key: 'learning', title: 'Skills I Want to Learn', placeholder: 'Add a skill you want to learn' },
]

export default function MySkills() {
  const [skills, setSkills] = useLocalStorage('tradecraft_skills', initialMySkills)
  const [inputs, setInputs] = useState({ teaches: '', learning: '' })
  const toast = useToast()

  function handleInput(column, value) {
    setInputs((current) => ({ ...current, [column]: value }))
  }

  function addSkill(column) {
    const name = inputs[column].trim()
    if (!name) return

    const exists = skills[column].some((skill) => skill.toLowerCase() === name.toLowerCase())
    if (exists) {
      toast.error(`"${name}" is already in your list.`)
      return
    }

    setSkills((current) => ({ ...current, [column]: [...current[column], name] }))
    setInputs((current) => ({ ...current, [column]: '' }))
    toast.success(`Added "${name}".`)
  }

  function removeSkill(column, name) {
    setSkills((current) => ({
      ...current,
      [column]: current[column].filter((skill) => skill !== name),
    }))
    toast.info(`Removed "${name}".`)
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Skills</h1>
        <p>Manage what you teach and what you want to learn.</p>
      </div>

      <div className="skills-columns">
        {columns.map((column) => (
          <div key={column.key} className="skills-column">
            <h3>
              {column.title}
              <span className="count-badge">{skills[column.key].length}</span>
            </h3>

            {skills[column.key].length === 0 && (
              <p className="empty-state">Nothing added yet.</p>
            )}

            {skills[column.key].map((skill) => (
              <div key={skill} className="skill-item">
                <span>{skill}</span>
                <button
                  type="button"
                  className="remove-skill-btn"
                  onClick={() => removeSkill(column.key, skill)}
                  aria-label={`Remove ${skill}`}
                >
                  x
                </button>
              </div>
            ))}

            <form
              className="add-skill-form"
              onSubmit={(event) => {
                event.preventDefault()
                addSkill(column.key)
              }}
            >
              <input
                type="text"
                className="form-input"
                placeholder={column.placeholder}
                value={inputs[column.key]}
                onChange={(event) => handleInput(column.key, event.target.value)}
              />
              <button type="submit" className="btn btn-outline btn-sm">
                Add
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}