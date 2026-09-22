// Numbered pagination control. Renders a window of page buttons plus
// prev/next arrows. `window` controls how many page numbers to show
// around the active page.
export default function Pagination({ page, totalPages, onChange, window = 2 }) {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i += 1) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= window) {
      pages.push({ type: 'page', value: i })
    } else if (pages[pages.length - 1]?.type !== 'gap') {
      pages.push({ type: 'gap' })
    }
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="page-btn"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        &larr;
      </button>

      {pages.map((item, index) =>
        item.type === 'gap' ? (
          <span key={`gap-${index}`} className="page-gap" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item.value}
            type="button"
            className={`page-btn ${item.value === page ? 'active' : ''}`}
            onClick={() => onChange(item.value)}
            aria-current={item.value === page ? 'page' : undefined}
          >
            {item.value}
          </button>
        )
      )}

      <button
        type="button"
        className="page-btn"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        &rarr;
      </button>
    </nav>
  )
}