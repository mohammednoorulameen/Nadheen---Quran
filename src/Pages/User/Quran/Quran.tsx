import { QuranBrowser } from "@/Components/Quran-browser"
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
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main Quran Section */}
        <section className="space-y-6">
          <header className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Surahs</h1>
            <p className="text-sm text-muted-foreground">Browse all 114 chapters</p>
          </header>
          <QuranBrowser initialSurahs={surahs} />
        </section>

        {/* Right Tips Section */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Tips</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Use the search to filter Surahs quickly.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}