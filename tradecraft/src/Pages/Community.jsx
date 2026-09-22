import { useState } from 'react'
import { useFetchData } from '../hooks/useFetchData'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useToast } from '../components/toastContext'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import { githubFallbackRepos } from '../data/mockData'

// Real third-party REST API: GitHub's repository search endpoint.
// Public endpoints allow unauthenticated requests, so this works
// straight from the browser. We wrap it so the UI can show loading,
// error + retry and a curated offline fallback.
const GITHUB_API = 'https://api.github.com/search/repositories'

const topics = [
  { id: 'react', label: 'React', query: 'react' },
  { id: 'javascript', label: 'JavaScript', query: 'javascript' },
  { id: 'python', label: 'Python', query: 'python' },
  { id: 'cybersecurity', label: 'Cybersecurity', query: 'security' },
  { id: 'uiux', label: 'UI/UX', query: 'design-system' },
]

async function fetchTrendingRepos(topicQuery) {
  const url = `${GITHUB_API}?q=${encodeURIComponent(topicQuery)}&sort=stars&order=desc&per_page=6`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`)
  }
  const payload = await response.json()
  if (!payload.items || payload.items.length === 0) {
    throw new Error('No repositories returned by the API.')
  }
  return payload.items.map((repo) => ({
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description || 'No description provided.',
    stargazers_count: repo.stargazers_count ?? 0,
    language: repo.language || 'Unknown',
  }))
}

function formatStars(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return String(count)
}

function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="repo-card"
    >
      <div className="repo-card-header">
        <span className="repo-name">{repo.full_name}</span>
        <span className="repo-stars" title="Stars">
          ★ {formatStars(repo.stargazers_count)}
        </span>
      </div>
      <p className="repo-desc">{repo.description}</p>
      <span className="repo-language">{repo.language}</span>
    </a>
  )
}

export default function Community() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)
  const toast = useToast()

  const topic = topics.find((item) => item.id === activeTopic) || topics[0]

  const { data: repos, loading, error, retry } = useFetchData(
    () => fetchTrendingRepos(topic.query),
    [topic.id]
  )

  const displayed = (repos || githubFallbackRepos).filter(
    (repo) =>
      !debouncedQuery ||
      repo.full_name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      (repo.language || '').toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  function handleRetry() {
    retry()
    toast.info('Retrying request to the GitHub API...')
  }

  return (
    <div className="page-content wide">
      <div className="page-header">
        <h1>Community</h1>
        <p>
          Trending open-source repositories fetched live from the{' '}
          <a
            href="https://docs.github.com/en/rest/search"
            target="_blank"
            rel="noreferrer"
            className="external-link"
          >
            GitHub Search API
          </a>
          . Pick a topic to explore what the community is building.
        </p>
      </div>

      <div className="community-tabs" role="tablist" aria-label="Topics">
        {topics.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === activeTopic}
            className={`community-tab ${item.id === activeTopic ? 'active' : ''}`}
            onClick={() => setActiveTopic(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <input
          type="search"
          className="form-input"
          placeholder="Filter repositories..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Filter repositories"
        />
      </div>

      {loading ? (
        <Loading full label={`Fetching ${topic.label} repos from GitHub...`} />
      ) : error ? (
        <>
          <div className="community-error">
            <ErrorState message={error.message || 'Could not reach the GitHub API.'} onRetry={handleRetry} />
          </div>
          <p className="offline-note">
            Showing cached community data while the live API is unavailable.
          </p>
          <div className="repo-grid">
            {displayed.map((repo) => (
              <RepoCard key={repo.full_name} repo={repo} />
            ))}
          </div>
        </>
      ) : displayed.length === 0 ? (
        <p className="empty-state">No repositories match &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="repo-grid">
          {displayed.map((repo) => (
            <RepoCard key={repo.full_name} repo={repo} />
          ))}
        </div>
      )}
    </div>
  )
}