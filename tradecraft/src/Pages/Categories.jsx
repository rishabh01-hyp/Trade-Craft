import { Link } from 'react-router-dom'
import { categories } from '../data/mockData'

export default function Categories() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Categories</h1>
        <p>Browse skills by area — academic, creative, sports, and more.</p>
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="category-item"
          >
            <span>{category.name}</span>
            <span className="category-count">{category.skills.length} skills</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
