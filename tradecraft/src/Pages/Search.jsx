import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import StudentCard from '../components/StudentCard'
import Loading from '../components/Loading'
import { useFetchData } from '../hooks/useFetchData'
import { fetchSearchResults } from '../data/mockData'

export default function Search({ campus }) {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const { data, loading } = useFetchData(
    () => fetchSearchResults(query, campus.id),
    [query, campus.id]
  )

  if (loading) {
    return (
      <div className="page-content wide">
        <Loading full label="Searching your campus..." />
      </div>
    )
  }

  const { skills, students, teachers } = data
  const exactSkillMatch = teachers.length > 0

  return (
    <div className="page-content wide">
      <div className="page-header">
        <h1>Search</h1>
        <p>Find skills, categories or students on your campus.</p>
      </div>

      <SearchBar placeholder="Search skills, categories, students..." initialQuery={query} />

      {!query && (
        <p className="empty-state">Try searching for a skill like React, Guitar or UI/UX.</p>
      )}

      {query && exactSkillMatch && (
        <section className="section">
          <h2 className="section-title">Students who teach {query}</h2>
          {teachers.map((student) => (
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

      {query && !exactSkillMatch && students.length > 0 && (
        <section className="section">
          <h2 className="section-title">Students</h2>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </section>
      )}

      {query && !exactSkillMatch && skills.length === 0 && students.length === 0 && (
        <p className="empty-state">No results for &ldquo;{query}&rdquo; on this campus.</p>
      )}
    </div>
  )
}
