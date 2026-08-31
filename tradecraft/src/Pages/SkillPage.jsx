import { Link, useParams } from 'react-router-dom'
import StudentCard from '../components/StudentCard'
import Loading from '../components/Loading'
import { useCampus } from '../context/CampusContext'
import { useLoading } from '../hooks/useLoading'
import { getStudentsBySkill, getSkillByName } from '../data/mockData'

export default function SkillPage() {
  const { skillName } = useParams()
  const decodedName = decodeURIComponent(skillName)
  const { campusId, campus } = useCampus()
  const loading = useLoading()

  const skill = getSkillByName(decodedName)
  const teachers = getStudentsBySkill(decodedName, campusId)

  if (loading) {
    return (
      <div className="page-content wide">
        <Loading full label="Finding students..." />
      </div>
    )
  }

  return (
    <div className="page-content wide">
      <p className="breadcrumb">
        <Link to="/search">Search</Link> / {decodedName}
      </p>

      <div className="page-header">
        <h1>{decodedName}</h1>
        {skill && <p>{skill.description}</p>}
        {!skill && (
          <p>Students on {campus.name} who can help you learn {decodedName}.</p>
        )}
      </div>

      {teachers.length > 0 ? (
        <section className="section">
          <h2 className="section-title">
            {teachers.length} student{teachers.length !== 1 ? 's' : ''} teaching this
          </h2>
          {teachers.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </section>
      ) : (
        <p className="empty-state">
          No students teaching {decodedName} on {campus.name} yet.
        </p>
      )}
    </div>
  )
}
