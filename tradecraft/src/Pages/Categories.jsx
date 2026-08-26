import { Link } from 'react-router-dom'
import { categories } from '../data/mockData'

export default function Categories() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Categories</h1>
        <p>Browse skills by area — academic, creative, sports, and more.</p>
      </div>

      {/* A card grid (instead of flat rows) lets each category stand out on its own */}
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="category-card"
          >
            <span className="category-name">{category.name}</span>
            <span className="category-meta">
              {category.skills.length} skills
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}