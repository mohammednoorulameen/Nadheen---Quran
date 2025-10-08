"use client"


import { Link } from "lucide-react";
import { useEffect, useState } from "react"

type Saved = { surah: number; ayah: number; ts: number }

export default function ContinueReadingCard() {
  const [saved, setSaved] = useState<Saved | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("continue-reading")
      if (raw) setSaved(JSON.parse(raw))
    } catch {
console.log('check 1')
}
  }, [])

  const clear = () => {
    try {
      localStorage.removeItem("continue-reading")
      setSaved(null)
    } catch {
        console.log('check 2')
    }
  }

  return (
    <div className="rounded-xl border bg-card p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Continue Reading</h2>
        {saved ? (
          <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground">
            Clear
          </button>
        ) : null}
      </div>
      {!saved ? (
        <p className="text-sm text-muted-foreground">Start reading any surah to save your place.</p>
      ) : (
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-sm">
              Surah {saved.surah} • Ayah {saved.ayah}
            </p>
            <p className="text-xs text-muted-foreground">Saved recently</p>
          </div>
          <Link
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
            href={`/surah/${saved.surah}#ayah-${saved.ayah}`}
          >
            Resume
          </Link>
        </div>
      )}
    </div>
  )
}
