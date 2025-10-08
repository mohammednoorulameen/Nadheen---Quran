import { Link } from "react-router-dom"

export default async function SurahInfoPage({ params }: { params: { number: string } }) {
  const surahNumber = Number(params.number)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL : ""}/api/surah/${surahNumber}/meta`,
    {
      cache: "no-store",
    },
  ).catch(() => null)

  const data = (await res?.json().catch(() => null)) || {
    meta: { number: surahNumber, name: `Surah ${surahNumber}`, versesCount: 0, revelationPlace: "—", pages: [] },
    details: { summary: null, source: null },
  }

  const meta = data.meta
  const details = data.details

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-24">
      <div className="flex items-center justify-between py-6">
        <Link to={`/surah/${surahNumber}`} className="text-sm text-foreground/70 hover:text-foreground">
          ← Go to Surah
        </Link>
        <div className="text-right text-sm text-foreground/60">
          {meta?.versesCount ?? "—"} ayahs • {meta?.revelationPlace ?? "—"}
        </div>
      </div>

      <article className="prose prose-invert max-w-none">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          {meta?.name ?? `Surah ${surahNumber}`}{" "}
          <span className="ms-2 text-foreground/60 font-normal">{meta?.arabic_name ?? ""}</span>
        </h1>

        <p className="text-sm text-foreground/60">
          Pages: {Array.isArray(meta?.pages) ? `${meta.pages[0]}–${meta.pages[1]}` : "—"} • Translation:{" "}
          {meta?.translatedName ?? "—"}
        </p>

        <hr className="my-6 opacity-40" />

        {details?.summary ? (
          <div className="space-y-5 leading-7">
            <h3 className="text-base font-medium">Overview</h3>
            <p className="text-foreground/80">{details.summary}</p>
            {details.source ? (
              <p className="text-xs text-foreground/60">
                Source: <span className="underline underline-offset-4">{details.source}</span>
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-foreground/70">Summary not available for this Surah.</p>
        )}
      </article>
    </main>
  )
}
