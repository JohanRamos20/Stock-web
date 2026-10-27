interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from(new Set([1, page - 1, page, page + 1, totalPages])).filter(
    (pageNumber) => pageNumber >= 1 && pageNumber <= totalPages,
  )

  function buttonClass(pageNumber: number) {
    return `px-3.5 py-2 text-sm font-heading font-extrabold cursor-pointer border-0 ${
      page === pageNumber ? 'bg-accent text-white' : 'bg-white text-text hover:bg-text/5'
    }`
  }

  return (
    <div className="flex flex-wrap gap-[2px] border border-divider w-fit max-w-full mt-5">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3.5 py-2 text-sm font-heading font-extrabold cursor-pointer border-0 bg-white text-text hover:bg-text/5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      {pages.map((pageNumber, index) => (
        <span key={pageNumber} className="contents">
          {index > 0 && pageNumber - pages[index - 1] > 1 && (
            <span className="px-3.5 py-2 text-sm bg-white text-muted">...</span>
          )}
          <button type="button" onClick={() => onPageChange(pageNumber)} className={buttonClass(pageNumber)}>
            {pageNumber}
          </button>
        </span>
      ))}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3.5 py-2 text-sm font-heading font-extrabold cursor-pointer border-0 bg-white text-text hover:bg-text/5 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
  )
}
