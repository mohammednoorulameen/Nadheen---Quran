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
  showTimeline = true,
  playIndex,
  playTrigger,
  onIndexChange,
}: {
  items: AudioItem[]
  startIndex?: number
  showTimeline?: boolean
  playIndex?: number | null
  playTrigger?: number
  onIndexChange?: (index: number) => void
}) {
  const [idx, setIdx] = useState(startIndex)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.crossOrigin = "anonymous"
    }
    const a = audioRef.current
    
    const onTime = () => setTime(a.currentTime || 0)
    const onLoaded = () => setDur(a.duration || 0)
    
    // Handle when audio ends - play next track (simple approach like user's working code)
    const onEnded = () => {
      setIdx((p) => {
        const nextIdx = Math.min(items.length - 1, p + 1)
        if (nextIdx === p) {
          // Reached the end
          setPlaying(false)
        } else {
          // Play next track - simple approach
          const nextItem = items[nextIdx]
          if (nextItem?.url) {
            a.src = nextItem.url
            a.play().catch((err) => {
              console.error("Audio play error:", err)
              setPlaying(false)
            })
          }
        }
        return nextIdx
      })
    }
    
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("loadedmetadata", onLoaded)
    a.addEventListener("ended", onEnded)
    
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("loadedmetadata", onLoaded)
      a.removeEventListener("ended", onEnded)
    }
  }, [items])

  // Handle external playIndex control
  useEffect(() => {
    if (playIndex !== undefined && playIndex !== null && playIndex >= 0 && playIndex < items.length) {
      const a = audioRef.current
      if (a && items[playIndex]?.url) {
        setIdx(playIndex)
        a.src = items[playIndex].url
        a.play()
          .then(() => setPlaying(true))
          .catch((err) => {
            console.error("Audio play error:", err)
            setPlaying(false)
          })
      }
    }
  }, [playIndex, playTrigger, items])

  const current = items[idx]
  
  // Notify parent when index changes
  useEffect(() => {
    try {
      onIndexChange && onIndexChange(idx)
    } catch {}
  }, [idx, onIndexChange])
  
  // Update audio source when index changes (for manual navigation)
  useEffect(() => {
    const a = audioRef.current
    if (!a || !current?.url) return
    
    if (a.src !== current.url) {
      a.src = current.url
      setTime(0)
      // Auto-play if we're already playing
      if (playing) {
        a.play().catch((err) => {
          console.error("Audio play error:", err)
          setPlaying(false)
        })
      }
    }
  }, [idx, current?.url, playing])
  
  // Handle playing/pausing
  useEffect(() => {
    const a = audioRef.current
    if (!a || !current?.url) return
    
    if (playing) {
      if (a.src === current.url) {
        // Source matches, play
        a.play().catch((err) => {
          console.error("Audio play error:", err)
          setPlaying(false)
        })
      }
    } else {
      a.pause()
    }
  }, [playing, current?.url])

  const next = () => {
    setIdx((p) => {
      const nextIdx = Math.min(items.length - 1, p + 1)
      return nextIdx
    })
    setPlaying(true)
  }

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
  const prev = () => {
    setIdx((p) => Math.max(0, p - 1))
    setPlaying(true)
  }

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
