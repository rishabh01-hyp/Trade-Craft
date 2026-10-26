// Read-only async student directory. Workspace CRUD lives in React Context.
import { students } from '../data/mockData.js'

async function request(read) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return read()
}

export function matches(needle, haystack) {
  return String(haystack || '')
    .toLowerCase()
    .includes(String(needle || '').toLowerCase())
}

export const api = {
  // GET /<resource>?q=&department=&campus=&skill=&sort=&order=&page=&pageSize=
  async get(resource, { params = {} } = {}) {
    return request(() => {
      if (resource !== 'students') throw new Error('Unknown resource.')
      let items = [...students]

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

}
