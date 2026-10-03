'use client'

import React, { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ArticleCollectionSlug } from '@/types/articleCollections'
import { cn } from '@/utilities/ui'
import { useDebounce } from '@/utilities/useDebounce'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    <div className="mx-auto flex w-[95%] flex-col gap-8 md:w-[90%] lg:w-[80%]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full max-w-xs">
          <Label className="sr-only" htmlFor={`${blockId}-search`}>
            Search
          </Label>
          <Input
            id={`${blockId}-search`}
            type="search"
            className="bg-white text-espresso placeholder:text-muted-foreground"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div
          className="inline-flex overflow-hidden rounded border border-border"
          role="group"
          aria-label="Sort"
        >
          {sortOptions.map((option) => {
            const isActive = sort === option.value
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                className={cn(
                  'h-10 border-l border-border px-4 text-sm font-medium transition-colors first:border-l-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground hover:bg-card',
                )}
                onClick={() => !isActive && load(1, option.value, search)}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <div
        aria-busy={isPending}
        aria-live="polite"
        className={cn(
          'grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 transition-opacity',
          isPending && 'opacity-50 pointer-events-none',
        )}
      >
        {result.docs.map((doc) => (
          <div className="col-span-4" key={`${doc.relationTo}-${doc.id}`}>
            <LayoutListCard doc={doc} />
          </div>
        ))}
      </div>

      {result.docs.length === 0 && !isPending && <p>No results found.</p>}

      {result.totalDocs > 0 && (
        <nav className="flex items-center justify-end gap-2" aria-label="Pagination">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Previous page"
            disabled={currentPage <= 1 || isPending}
            onClick={() => goToPage(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold text-sm">
            Showing {start}
            {start > 0 ? ` - ${end}` : ''} of {result.totalDocs}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Next page"
            disabled={currentPage >= result.totalPages || isPending}
            onClick={() => goToPage(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      )}
    </div>
  )
}
