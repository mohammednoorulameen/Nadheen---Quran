"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      const current = window.scrollY
      const pct = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0
      setWidth(pct)
      const remaining = Math.max(0, 100 - Math.round(pct))
      const label = document.getElementById("scroll-progress-label")
      if (label) label.textContent = `Remaining ${remaining}%`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return <div className="scroll-progress" style={{ width: `${width}%` }} aria-hidden />
}
