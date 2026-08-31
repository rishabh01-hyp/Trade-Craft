import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { useLoading } from '../hooks/useLoading'
import { getCategoryById } from '../data/mockData'

export default function CategoryDetail() {
  const { categoryId } = useParams()
  const category = getCategoryById(categoryId)
  const loading = useLoading()

  if (loading) {
    return (
      <div className="page-content">
        <Loading full label="Loading category..." />
      </div>
    )
  }

  if (!category) {
    return (
      <div className="page-content">
        <p className="empty-state">Category not found.</p>
        <Link to="/categories" className="btn-ghost">← Back to categories</Link>
      </div>
    )
  }

  return (
    <div className="page-content">
      <p className="breadcrumb">
        <Link to="/categories">Categories</Link> / {category.name}
      </p>

      <div className="page-header">
        <h1>{category.name}</h1>
      </div>

      <div className="category-skills">
        {category.skills.map((skill) => (
          <Link
            key={skill}
            to={`/skill/${encodeURIComponent(skill)}`}
            className="skill-link"
          >
            {skill}
          </Link>
        ))}
      </div>
    </div>
  )
}
