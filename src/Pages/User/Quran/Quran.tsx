import { QuranBrowser } from "@/Components/Quran-browser"
import { LeftNav } from "@/Components/Left-nav"
import { useEffect, useState } from "react"

// Define a proper interface for the API response
interface SurahAPIResponse {
  number: number
  name: string
  englishName: string
  numberOfAyahs: number
  revelationType: "Meccan" | "Medinan"
}

//  Define a type for our app’s version of the data
interface Surah {
  number: number
  nameAr: string
  nameEn: string
  ayahs: number
  revelationType: "Meccan" | "Medinan"
}

//  This is a normal async function for data fetching
async function getSurahs(): Promise<Surah[]> {
  try {
    const res = await fetch("https://api.alquran.cloud/v1/surah")

    if (!res.ok) throw new Error("Failed to fetch surahs")

    const json = await res.json()
    const data = (json?.data ?? []) as SurahAPIResponse[]

    return data.map((s) => ({
      number: s.number,
      nameAr: s.name,
      nameEn: s.englishName,
      ayahs: s.numberOfAyahs,
      revelationType: s.revelationType,
    }))
  } catch {
    // ✅ fallback data
    return [
      { number: 1, nameAr: "الفاتحة", nameEn: "Al-Fatihah", ayahs: 7, revelationType: "Meccan" },
      { number: 2, nameAr: "البقرة", nameEn: "Al-Baqarah", ayahs: 286, revelationType: "Medinan" },
      { number: 3, nameAr: "آل عمران", nameEn: "Ali 'Imran", ayahs: 200, revelationType: "Medinan" },
    ]
  }
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([])

  useEffect(() => {
    getSurahs().then(setSurahs)
  }, [])

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)_260px]">
        {/* Left Navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <LeftNav />
          </div>
        </aside>

        {/* Main Quran Section */}
        <section className="space-y-4">
          <header>
            <h1 className="text-xl font-semibold">Surahs</h1>
            <p className="text-sm text-muted-foreground">Browse all 114 chapters</p>
          </header>
          <QuranBrowser initialSurahs={surahs} />
        </section>

        {/* Right Tips Section */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold">Tips</h3>
              <p className="text-sm text-muted-foreground">Use the search to filter Surahs quickly.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}