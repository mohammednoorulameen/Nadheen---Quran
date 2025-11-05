"use client"

import { useEffect, useState } from "react"
import { SurahReaderStructured } from "@/Components/Surah-reader-structured"
import { Link, useSearchParams, useParams } from "react-router-dom"

type SurahMeta = {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: "Meccan" | "Medinan"
}

type Ayah = {
  number: number
  numberInSurah: number
  juz: number
  page: number
  text: string
}

type Verse = {
  numberInSurah: number
  arabic: string
  translation?: string
  page: number
  global: number
}

type SurahData = {
  meta: SurahMeta
  verses: Verse[]
  translatorName?: string
}

async function GetSurah(number: string): Promise<SurahData | null> {
  const n = Number(number)
  if (!Number.isFinite(n) || n < 1 || n > 114) return null

  const [arRes, enRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${n}/quran-uthmani`),
    fetch(`https://api.alquran.cloud/v1/surah/${n}/en.sahih`),
  ])

  if (!arRes.ok) return null
  const arJson = await arRes.json()
  const arData = arJson?.data
  if (!arData) return null

  let translatorName: string | undefined
  let enAyahs: { numberInSurah: number; text: string }[] = []

  if (enRes.ok) {
    const enJson = await enRes.json()
    const enData = enJson?.data
    translatorName = enData?.edition?.englishName ?? enData?.edition?.name
    enAyahs = (enData?.ayahs ?? []).map((a: { numberInSurah: number; text: string }) => ({
      numberInSurah: a.numberInSurah,
      text: a.text,
    }))
  }

  const meta: SurahMeta = {
    number: arData.number,
    name: arData.name,
    englishName: arData.englishName,
    englishNameTranslation: arData.englishNameTranslation,
    numberOfAyahs: arData.numberOfAyahs,
    revelationType: arData.revelationType,
  }

  const arAyahs: Ayah[] = (arData.ayahs ?? []).map((a: { number: number; numberInSurah: number; juz: number; page: number; text: string }) => ({
    number: a.number,
    numberInSurah: a.numberInSurah,
    juz: a.juz,
    page: a.page,
    text: a.text,
  }))

  const verses: Verse[] = arAyahs.map((a) => {
    const en = enAyahs.find((e) => e.numberInSurah === a.numberInSurah)
    return {
      numberInSurah: a.numberInSurah,
      arabic: a.text,
      translation: en?.text,
      page: a.page,
      global: a.number,
    }
  })

  return { meta, verses, translatorName }
}

export default function SurahPage() {
  const params = useParams<{ number: string }>()
  const searchParams = useSearchParams()[0]

  const [data, setData] = useState<SurahData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.number) return

    setLoading(true)
    GetSurah(params.number).then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [params.number])

  if (loading) return <div>Loading...</div>
  if (!data) return <div>Surah not found</div>

  const center = params.number === "2"
  const startAtTop =
    (typeof searchParams?.get("start") === "string" && searchParams.get("start") === "top")

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 md:py-10">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Surahs
        </Link>
        <span aria-hidden> / </span>
        <span className="text-foreground">Surah {data.meta.englishName}</span>
      </nav>

      <SurahReaderStructured
        surahNumber={data.meta.number}
        surahName={data.meta.name}
        centered={center}
        translatorName={data.translatorName}
        startAtTop={!!startAtTop}
        verses={data.verses.map((v: Verse) => ({
          number: v.numberInSurah,
          arabic: v.arabic,
          translation: v.translation,
          page: v.page,
          global: v.global,
        }))}
      />
    </main>
  )
}




















