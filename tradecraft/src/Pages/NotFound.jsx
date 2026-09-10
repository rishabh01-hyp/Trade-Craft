import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-content">
      <div className="not-found">
        <p className="not-found-code">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  )
}
