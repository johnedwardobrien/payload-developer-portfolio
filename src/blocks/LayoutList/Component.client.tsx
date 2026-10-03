'use client'

import React, { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import type { ArticleCollectionSlug } from '@/types/articleCollections'
import { cn } from '@/utilities/ui'
import { useDebounce } from '@/utilities/useDebounce'

import { fetchLayoutListDocs } from './actions'
import { LayoutListCard } from './LayoutListCard'
import type { LayoutListDoc, LayoutListResult, LayoutListSort } from './types'

type Props = { blockId: string; limit: number } & (
  | {
      mode: 'remote'
      relationTo: ArticleCollectionSlug
      categories?: string[]
      initial: LayoutListResult
    }
  | {
      mode: 'local'
      docs: LayoutListDoc[]
    }
)

const sortOptions: { label: string; value: LayoutListSort }[] = [
  { label: 'Latest', value: 'latest' },
  { label: 'Alphabetic', value: 'alphabetic' },
]

const sortDocs = (docs: LayoutListDoc[], sort: LayoutListSort) =>
  [...docs].sort((a, b) =>
    sort === 'alphabetic'
      ? a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      : (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
  )

export const LayoutListClient: React.FC<Props> = (props) => {
  const { blockId, limit } = props

  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput.trim(), 300)
  const [sort, setSort] = useState<LayoutListSort>('latest')
  const [page, setPage] = useState(1)
  const [remote, setRemote] = useState<LayoutListResult | null>(
    props.mode === 'remote' ? props.initial : null,
  )
  const [isPending, startTransition] = useTransition()
  const requestId = useRef(0)
  const lastSearch = useRef(search)

  const collectionQuery =
    props.mode === 'remote'
      ? { relationTo: props.relationTo, categories: props.categories }
      : null

  const load = (nextPage: number, nextSort: LayoutListSort, nextSearch: string) => {
    setPage(nextPage)
    setSort(nextSort)
    if (!collectionQuery) return

    const current = ++requestId.current
    startTransition(async () => {
      const result = await fetchLayoutListDocs({
        ...collectionQuery,
        limit,
        page: nextPage,
        search: nextSearch,
        sort: nextSort,
      })
      if (current === requestId.current) setRemote(result)
    })
  }

  useEffect(() => {
    if (lastSearch.current === search) return
    lastSearch.current = search
    load(1, sort, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const localDocs = props.mode === 'local' ? props.docs : null
  const local = useMemo<LayoutListResult | null>(() => {
    if (!localDocs) return null
    const term = search.toLowerCase()
    const filtered = term
      ? localDocs.filter((doc) => doc.title.toLowerCase().includes(term))
      : localDocs
    const sorted = sortDocs(filtered, sort)
    return {
      docs: sorted.slice((page - 1) * limit, page * limit),
      totalDocs: sorted.length,
      page,
      totalPages: Math.max(Math.ceil(sorted.length / limit), 1),
    }
  }, [localDocs, search, sort, page, limit])

  const result = local ?? remote ?? { docs: [], totalDocs: 0, page: 1, totalPages: 1 }
  const currentPage = result.page
  const start = result.totalDocs === 0 ? 0 : (currentPage - 1) * limit + 1
  const end = Math.min(currentPage * limit, result.totalDocs)

  const goToPage = (nextPage: number) => {
    load(nextPage, sort, search)
    const el = document.getElementById(blockId)
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="layout-list-cont">
      <div className="layout-list-toolbar">
        <label className="layout-list-search">
          <span className="sr-only">Search</span>
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </label>
        <div className="layout-list-sort" role="group" aria-label="Sort">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={sort === option.value}
              className={cn(sort === option.value && 'is-active')}
              onClick={() => sort !== option.value && load(1, option.value, search)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-busy={isPending}
        aria-live="polite"
        className={cn(
          'layout-list-grid grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
          isPending && 'is-pending',
        )}
      >
        {result.docs.map((doc) => (
          <LayoutListCard key={`${doc.relationTo}-${doc.id}`} doc={doc} />
        ))}
      </div>

      {result.docs.length === 0 && !isPending && (
        <p className="layout-list-empty">No results found.</p>
      )}

      {result.totalDocs > 0 && (
        <nav className="layout-list-pager" aria-label="Pagination">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage <= 1 || isPending}
            onClick={() => goToPage(currentPage - 1)}
          >
            &#8249;
          </button>
          <span>
            {start} - {end} of {result.totalDocs}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage >= result.totalPages || isPending}
            onClick={() => goToPage(currentPage + 1)}
          >
            &#8250;
          </button>
        </nav>
      )}
    </div>
  )
}
