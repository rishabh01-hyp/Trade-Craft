// ============================================================
// api.js — a small in-memory REST API layer
// ------------------------------------------------------------
// This module mimics a REST backend so the app can exercise the
// exact same patterns it would use against a real server:
//
//   GET    /students        -> api.get('students', { params })
//   GET    /students/:id    -> api.getOne('students', id)
//   POST   /bookings        -> api.create('bookings', payload)
//   PUT    /bookings/:id    -> api.update('bookings', id, payload)
//   DELETE /bookings/:id    -> api.remove('bookings', id)
//
// Every call is asynchronous (Promise + latency) and can be made
// to fail so the UI genuinely exercises loading/error/retry.
// ============================================================

import { students, initialBookings } from '../data/mockData'

export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// Set to 1 (100%) while testing the error + retry flows.
const FAILURE_RATE = 0
const LATENCY_MIN = 300
const LATENCY_MAX = 600

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

// The in-memory "database", seeded from mock data.
const db = {
  students: students.map((student) => ({ ...student })),
  bookings: readStored('tradecraft_bookings', initialBookings),
}

function persist(resource) {
  if (resource === 'bookings') {
    try {
      localStorage.setItem('tradecraft_bookings', JSON.stringify(db.bookings))
    } catch {
      // Ignore quota / private-mode write failures.
    }
  }
}

function assertResource(resource) {
  if (!(resource in db)) {
    throw new ApiError(`Unknown resource "${resource}"`, 404)
  }
}

// Shared request wrapper: latency + simulated network failures.
async function request(fn) {
  await delay(LATENCY_MIN + Math.random() * (LATENCY_MAX - LATENCY_MIN))
  if (Math.random() < FAILURE_RATE) {
    throw new ApiError('The request could not be completed. Please try again.', 503)
  }
  return fn()
}

// Fuzzy, case-insensitive string match used by filters and search.
export function matches(needle, haystack) {
  return String(haystack || '')
    .toLowerCase()
    .includes(String(needle || '').toLowerCase())
}

export const api = {
  // GET /<resource>?q=&department=&campus=&skill=&sort=&order=&page=&pageSize=
  async get(resource, { params = {} } = {}) {
    return request(() => {
      assertResource(resource)
      const source = db[resource]

      // Object-shaped resources (e.g. bookings: {upcoming, pending, completed})
      // are not lists, so they are returned whole for the caller to organize.
      if (!Array.isArray(source)) {
        return JSON.parse(JSON.stringify(source))
      }

      let items = [...source]

      const {
        q = '',
        department = '',
        campus = '',
        skill = '',
        sort = '',
        order = 'asc',
        page = 1,
        pageSize = Infinity,
      } = params

      if (q) {
        items = items.filter(
          (item) =>
            matches(q, item.name) ||
            matches(q, item.department) ||
            (item.teaches || []).some((s) => matches(q, s)) ||
            (item.learning || []).some((s) => matches(q, s))
        )
      }
      if (department) {
        items = items.filter((item) => item.department === department)
      }
      if (campus) {
        items = items.filter((item) => item.campus === campus)
      }
      if (skill) {
        items = items.filter((item) =>
          (item.teaches || []).some((s) => s.toLowerCase() === skill.toLowerCase())
        )
      }

      if (sort) {
        items.sort((a, b) => {
          const av = a[sort]
          const bv = b[sort]
          const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
          return order === 'desc' ? -cmp : cmp
        })
      }

      const total = items.length
      const start = (page - 1) * pageSize
      const paged = Number.isFinite(pageSize) ? items.slice(start, start + pageSize) : items

      return { items: paged, total }
    })
  },

  // GET /<resource>/:id
  async getOne(resource, id) {
    return request(() => {
      assertResource(resource)
      const found = db[resource].find((item) => String(item.id) === String(id))
      if (!found) throw new ApiError(`${resource}/${id} was not found`, 404)
      return { ...found }
    })
  },

  // POST /<resource>
  async create(resource, payload) {
    return request(() => {
      assertResource(resource)
      const record = { id: `${resource.slice(0, 1)}${Date.now()}`, ...payload }
      db[resource] = [record, ...db[resource]]
      persist(resource)
      return { ...record }
    })
  },

  // PUT /<resource>/:id
  async update(resource, id, payload) {
    return request(() => {
      assertResource(resource)
      const index = db[resource].findIndex((item) => String(item.id) === String(id))
      if (index === -1) throw new ApiError(`${resource}/${id} was not found`, 404)
      db[resource][index] = { ...db[resource][index], ...payload }
      persist(resource)
      return { ...db[resource][index] }
    })
  },

  // DELETE /<resource>/:id
  async remove(resource, id) {
    return request(() => {
      assertResource(resource)
      const index = db[resource].findIndex((item) => String(item.id) === String(id))
      if (index === -1) throw new ApiError(`${resource}/${id} was not found`, 404)
      const [removed] = db[resource].splice(index, 1)
      persist(resource)
      return removed
    })
  },
}

export default api