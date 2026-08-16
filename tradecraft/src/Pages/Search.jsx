import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import StudentCard from '../components/StudentCard'
import { useCampus } from '../context/CampusContext'
import { searchAll, getStudentsBySkill } from '../data/mockData'

export default function Search() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const { campusId } = useCampus()

  const { skills, students } = query ? searchAll(query, campusId) : { skills: [], students: [] }

  const skillTeachers = query
    ? getStudentsBySkill(query, campusId)
    : []

  const exactSkillMatch = skillTeachers.length > 0

  return (
    <div className="page-content wide">
      <div className="page-header">
        <h1>Search</h1>
        <p>Find skills, categories, or students on your campus.</p>
      </div>

      <SearchBar placeholder="Search skills, categories, students..." initialQuery={query} />

      {!query && (
        <p className="empty-state">Try searching for a skill like React, Guitar, or UI/UX.</p>
      )}

      {query && exactSkillMatch && (
        <section className="section">
          <h2 className="section-title">Students who teach {query}</h2>
          {skillTeachers.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </section>
      )}

      {query && !exactSkillMatch && skills.length > 0 && (
        <section className="section">
          <h2 className="section-title">Skills</h2>
          {skills.map((skill) => (
            <Link
              key={skill.id}
              to={`/skill/${encodeURIComponent(skill.name)}`}
              className="skill-link"
            >
              {skill.name}
            </Link>
          ))}
        </section>
      )}

      {query && students.length > 0 && !exactSkillMatch && (
        <section className="section">
          <h2 className="section-title">Students</h2>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </section>
      )}

      {query && !exactSkillMatch && skills.length === 0 && students.length === 0 && (
        <p className="empty-state">No results for "{query}" on this campus.</p>
      )}
    </div>
  )
}
