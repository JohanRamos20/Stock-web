import { useEffect, useState } from 'react'

export function usePagination<T>(items: T[], pageSize: number, resetKey?: unknown) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(page, totalPages)

  useEffect(() => {
    setPage(1)
  }, [resetKey])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const pagedItems = items.slice((safePage - 1) * pageSize, safePage * pageSize)

  return { page: safePage, setPage, totalPages, pagedItems }
}
