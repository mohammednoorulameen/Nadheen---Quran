export const dynamic = "force-dynamic"

export async function GET(_: Request, { params }: { params: { number: string } }) {
  const id = Number(params.number)
  if (!id || id < 1 || id > 114) {
    return new Response(JSON.stringify({ error: "invalid_surah_number" }), { status: 400 })
  }

  const [chapterRes, infoRes] = await Promise.all([
    fetch(`https://api.quran.com/api/v4/chapters/${id}?language=en`, { cache: "no-store" }),
    fetch(`https://api.quran.com/api/v4/chapters/${id}/info?language=en`, { cache: "no-store" }),
  ])

  if (!chapterRes.ok) {
    return new Response(JSON.stringify({ error: "chapter_fetch_failed" }), { status: 502 })
  }

  const chapter = await chapterRes.json().catch(() => null)
  const info = infoRes.ok ? await infoRes.json().catch(() => null) : null

  const meta = chapter?.chapter
    ? {
        number: id,
        name: chapter.chapter.name_simple,
        arabic_name: chapter.chapter.name_arabic,
        versesCount: chapter.chapter.verses_count,
        revelationPlace: chapter.chapter.revelation_place,
        pages: chapter.chapter.pages, // [start, end]
        translatedName: chapter.chapter.translated_name?.name ?? null,
      }
    : null

  const details = info?.chapter_info
    ? {
        summary: info.chapter_info.short_text || null,
        source: info.chapter_info.source || null,
      }
    : { summary: null, source: null }

  return Response.json({ meta, details })
}
