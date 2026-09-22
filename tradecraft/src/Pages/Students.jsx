import { useState } from 'react'
import { api } from '../services/api'
import { campuses, departments } from '../data/mockData'
import { useFetchData } from '../hooks/useFetchData'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import StudentCard from '../components/StudentCard'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 6

const sortOptions = [
  { value: 'teachingRating_desc', label: 'Highest teaching rating' },
  { value: 'teachingRating_asc', label: 'Lowest teaching rating' },
  { value: 'teachingSessions_desc', label: 'Most sessions' },
  { value: 'name_asc', label: 'Name (A–Z)' },
]

export default function Students({ campus }) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 350)

  const [department, setDepartment] = useState('')
  const [campusFilter, setCampusFilter] = useState(campus?.id || '')
  const [sort, setSort] = useState('teachingRating_desc')
  const [page, setPage] = useState(1)

  const [sortKey, order] = sort.split('_')

  const { data, loading, error, retry } = useFetchData(
    () =>
      api.get('students', {
        params: {
          q: debouncedQuery,
          department,
          campus: campusFilter,
          sort: sortKey,
          order,
          page,
          pageSize: PAGE_SIZE,
        },
      }),
    [debouncedQuery, department, campusFilter, sortKey, order, page]
  )

  const students = data?.items ?? []
  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // Changing a filter, sort or search resets back to the first page.
  function changeFilter(setter) {
    return (value) => {
      setter(value)
      setPage(1)
    }
  }

  return (
    <div className="page-content wide">
      <div className="page-header">
        <h1>Students</h1>
        <p>Browse every student on your campus — filter by department, sort and search.</p>
      </div>

      <div className="filter-bar">
        <div className="filter-search">
          <input
            type="search"
            className="form-input"
            placeholder="Search by name or skill..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            aria-label="Search students"
          />
        </div>

        <select
          className="form-select filter-select"
          value={campusFilter}
          onChange={(event) => changeFilter(setCampusFilter)(event.target.value)}
          aria-label="Filter by campus"
        >
          <option value="">All campuses</option>
          {campuses.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <select
          className="form-select filter-select"
          value={department}
          onChange={(event) => changeFilter(setDepartment)(event.target.value)}
          aria-label="Filter by department"
        >
          <option value="">All departments</option>
          {departments.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="form-select filter-select"
          value={sort}
          onChange={(event) => changeFilter(setSort)(event.target.value)}
          aria-label="Sort students"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <p className="result-meta">
        {total} student{total !== 1 ? 's' : ''} found
        {campusFilter ? ` on ${campuses.find((c) => c.id === campusFilter)?.name}` : ' across campuses'}
      </p>

      {loading ? (
        <Loading full label="Loading students..." />
      ) : error ? (
        <ErrorState message={error.message || 'Failed to load students.'} onRetry={retry} />
      ) : students.length === 0 ? (
        <p className="empty-state">No students match those filters.</p>
      ) : (
        <>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  )
}