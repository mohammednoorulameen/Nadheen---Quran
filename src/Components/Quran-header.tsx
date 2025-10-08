"use client"

import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Search } from "lucide-react"

export function QuranHeader({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (v: string) => void
}) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            {/* Simple brand mark */}
            <span className="text-sm font-bold">Q</span>
          </span>
          <h1 className="text-pretty text-2xl font-bold text-primary md:text-3xl">Quran</h1>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" className="text-sm">
            Meccan
          </Button>
          <Button variant="ghost" className="text-sm">
            Medinan
          </Button>
          <Button className="text-sm">Start Reading</Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <label htmlFor="surah-search" className="sr-only">
          Search Surahs
        </label>
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="surah-search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name or number..."
            className="pl-9"
            aria-label="Search Surahs by name or number"
          />
        </div>
        <Button variant="secondary" className="whitespace-nowrap">
          Filter
        </Button>
      </div>
    </header>
  )
}
