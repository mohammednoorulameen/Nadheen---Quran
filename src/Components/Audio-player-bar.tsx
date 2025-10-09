"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/Components/ui/button"
import { Slider } from "@/Components/ui/slider"
import { cn } from "@/lib/utils"

export type AudioItem = {
  id: string
  title: string
  url: string
  ayahLabel?: string
}

export default function AudioPlayerBar({
  items,
  startIndex = 0,
  showTimeline = false,
}: {
  items: AudioItem[]
  startIndex?: number
  showTimeline?: boolean
}) {
  const [idx, setIdx] = useState(startIndex)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.crossOrigin = "anonymous"
    }
    const a = audioRef.current
    const onTime = () => setTime(a!.currentTime || 0)
    const onLoaded = () => setDur(a!.duration || 0)
    const onEnded = () => next()
    a!.addEventListener("timeupdate", onTime)
    a!.addEventListener("loadedmetadata", onLoaded)
    a!.addEventListener("ended", onEnded)
    return () => {
      a!.removeEventListener("timeupdate", onTime)
      a!.removeEventListener("loadedmetadata", onLoaded)
      a!.removeEventListener("ended", onEnded)
    }
  }, [])

  const current = items[idx]
  useEffect(() => {
    const a = audioRef.current
    if (!a || !current?.url) return
    a.src = current.url
    setTime(0)
    if (playing) a.play().catch(() => setPlaying(false))
  }, [idx, current?.url])

  const toggle = () => {
    const a = audioRef.current
    if (!a || !current?.url) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }
  }
  const seek = (v: number[]) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = v[0]
    setTime(v[0])
  }
  const prev = () => setIdx((p) => Math.max(0, p - 1))
  const next = () => setIdx((p) => Math.min(items.length - 1, p + 1))

  if (!items || items.length === 0) return null

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75",
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Button size="icon" variant="ghost" onClick={prev} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 6h2v12H6zm2.5 6l11 6V6z" />
            </svg>
          </Button>
          <Button size="icon" variant="ghost" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            )}
          </Button>
          <Button size="icon" variant="ghost" onClick={next} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M16 6h2v12h-2zM5 18V6l11 6z" />
            </svg>
          </Button>

          {showTimeline ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
              <span className="truncate text-xs text-foreground/70">{current?.title}</span>
              <Slider
                value={[Math.min(time, dur || 0)]}
                min={0}
                max={Math.max(1, dur || 0)}
                step={0.25}
                onValueChange={seek}
                className="w-full"
              />
              <span className="text-xs tabular-nums text-foreground/60">
                {format(time)} / {format(dur)}
              </span>
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 md:flex">
              <span className="text-xs tabular-nums text-foreground/60">{format(time)}</span>
            </div>
          )}
        </div>

        {/* Mobile condensed */}
        {showTimeline ? (
          <div className="flex w-full items-center gap-2 md:hidden">
            <Slider
              value={[Math.min(time, dur || 0)]}
              min={0}
              max={Math.max(1, dur || 0)}
              step={0.25}
              onValueChange={seek}
              className="w-full"
            />
            <span className="text-[10px] tabular-nums text-foreground/60">{format(time)}</span>
          </div>
        ) : (
          <div className="flex w-full items-center justify-end md:hidden">
            <span className="text-[10px] tabular-nums text-foreground/60">{format(time)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function format(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}
