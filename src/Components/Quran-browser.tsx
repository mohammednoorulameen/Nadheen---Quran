"use client"

import { useMemo, useState } from "react"
import { QuranHeader } from "./Quran-header"
import { SurahList } from "./Surah-list"

export type Surah = {
  number: number
  nameAr: string
  nameEn: string
  ayahs: number
  revelationType: "Meccan" | "Medinan"
}

export function QuranBrowser({ initialSurahs }: { initialSurahs: Surah[] }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return initialSurahs
    return initialSurahs.filter((s) => {
      return (
        s.nameEn.toLowerCase().includes(q) ||
        s.nameAr.replace(/\s+/g, "").includes(query.replace(/\s+/g, "")) ||
        String(s.number) === q
      )
    })
  }, [initialSurahs, query])

  return (
    <div className="flex flex-col gap-6">
      <QuranHeader query={query} onQueryChange={setQuery} />
      <section aria-label="Surah List" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-balance text-xl font-semibold text-foreground md:text-2xl">Browse Surahs</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
        </div>
        <SurahList surahs={filtered} />
      </section>
    </div>
  )
}
