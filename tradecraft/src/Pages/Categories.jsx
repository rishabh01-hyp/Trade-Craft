import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { useFetchData } from '../hooks/useFetchData'
import { fetchCategories } from '../data/mockData'

export default function Categories() {
  const { data: categories, loading } = useFetchData(() => fetchCategories(), [])

  if (loading) {
    return (
      <div className="page-content">
        <Loading full label="Loading categories..." />
      </div>
    )
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Categories</h1>
        <p>Browse skills by area — academic, creative, sports and more.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.id} to={`/categories/${category.id}`} className="category-card">
            <span className="category-name">{category.name}</span>
            <span className="category-meta">
              {category.skills.length} skills
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
