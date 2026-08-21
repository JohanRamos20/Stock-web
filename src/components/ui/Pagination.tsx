interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex gap-[2px] border border-divider w-max mt-5">
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`px-3.5 py-2 text-sm font-heading font-extrabold cursor-pointer border-0 ${
            page === pageNumber ? 'bg-accent text-white' : 'bg-white text-text hover:bg-text/5'
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  )
}
