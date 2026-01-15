import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import type { RefObject } from "react"
import { Home, BookOpen, Search, Timer, Settings } from "lucide-react"
import { useUserSettings } from "@/Hook/useUserSettings"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  scrollContainerRef: RefObject<HTMLElement>
}

export default function BottomNav({ scrollContainerRef }: BottomNavProps) {
  const location = useLocation()
  const pathname = location.pathname

  const { bottomNavAutoHide } = useUserSettings()

  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || !bottomNavAutoHide) {
      setHidden(false)
      return
    }

    const onScroll = () => {
      const currentY = container.scrollTop
      const delta = currentY - lastY.current
      lastY.current = currentY

      // Ignore tiny scrolls to avoid jitter
      if (Math.abs(delta) < 8) return

      // Scroll down → hide | Scroll up → show
      setHidden(delta > 0)
    }

    // Reset scroll position when container changes
    lastY.current = container.scrollTop

    container.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      container.removeEventListener("scroll", onScroll)
    }
  }, [bottomNavAutoHide, scrollContainerRef])

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/quran", label: "Quran", icon: BookOpen },
    { href: "/search", label: "Search", icon: Search },
    { href: "/counter", label: "Counter", icon: Timer },
  ]

  return (
    <nav
      aria-label="Bottom Navigation"
      className={cn(
        "md:hidden fixed left-0 right-0 bottom-0 z-50",
        "transition-transform duration-300 ease-out",
        hidden ? "translate-y-full" : "translate-y-0"
      )}
    >
      <div className="mx-auto max-w-screen-sm px-3 pb-2">
        <div className="rounded-2xl border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
          <ul className="grid grid-cols-5">
            {items.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <li key={label}>
                  <Link
                    to={href}
                    className={cn(
                      "flex h-14 flex-col items-center justify-center gap-1 text-xs transition-colors",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="leading-none">{label}</span>
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                to="/settings"
                className="flex h-14 flex-col items-center justify-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Open Settings"
              >
                <Settings className="h-5 w-5" aria-hidden="true" />
                <span className="leading-none">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


// "use client"

// import { Link, useLocation } from "react-router-dom"
// import { useEffect, useRef, useState } from "react"
// import { Home, BookOpen, Search, Timer, Settings } from "lucide-react"
// import { useUserSettings } from "@/Hook/useUserSettings"

// function cn(...c: Array<string | false | null | undefined>) {
//   return c.filter(Boolean).join(" ")
// }

// export default function BottomNav() {
//   const location = useLocation()
//   const pathname = location.pathname

//   const { bottomNavAutoHide, bottomNavHideDelaySec } = useUserSettings()

//   const lastY = useRef(0)
//   const hideTimer = useRef<number | null>(null)
//   const [hidden, setHidden] = useState(false)

//   useEffect(() => {
//     if (!bottomNavAutoHide) {
//       setHidden(false)
//       if (hideTimer.current) window.clearTimeout(hideTimer.current)
//       return
//     }

//     const scheduleHide = () => {
//       if (hideTimer.current) window.clearTimeout(hideTimer.current)
//       if (bottomNavHideDelaySec > 0) {
//         hideTimer.current = window.setTimeout(
//           () => setHidden(true),
//           bottomNavHideDelaySec * 1000
//         )
//       }
//     }

//     const onScroll = () => {
//       const y = window.scrollY
//       const delta = y - lastY.current
//       lastY.current = y

//       // Ignore very tiny scrolls to avoid jitter, but keep it responsive
//       if (Math.abs(delta) < 6) return

//       if (delta > 0) {
//         // scrolling down → hide
//         setHidden(true)
//       } else {
//         // scrolling up → show
//         setHidden(false)
//       }

//       scheduleHide()
//     }

//     const onPointer = () => {
//       setHidden(false)
//       scheduleHide()
//     }

//     window.addEventListener("scroll", onScroll, { passive: true })
//     window.addEventListener("pointerdown", onPointer, { passive: true })
//     window.addEventListener("touchstart", onPointer, { passive: true })

//     scheduleHide()

//     return () => {
//       window.removeEventListener("scroll", onScroll)
//       window.removeEventListener("pointerdown", onPointer)
//       window.removeEventListener("touchstart", onPointer)
//       if (hideTimer.current) window.clearTimeout(hideTimer.current)
//     }
//   }, [bottomNavAutoHide, bottomNavHideDelaySec])

//   const items = [
//     { href: "/", label: "Home", icon: Home },
//     { href: "/quran", label: "Quran", icon: BookOpen },
//     { href: "/search", label: "Search", icon: Search },
//     { href: "/counter", label: "Counter", icon: Timer },
//   ]

//   return (
//     <nav
//       aria-label="Bottom Navigation"
//       className={cn(
//         "md:hidden fixed left-0 right-0 bottom-0 z-50",
//         // Smooth hide/show using transform, optimized for GPU
//         "transition-transform duration-300 ease-out will-change-transform",
//         hidden
//           ? "translate-y-full opacity-0"
//           : "translate-y-0 opacity-100"
//       )}
//     >
//       <div className="mx-auto max-w-screen-sm px-3 pb-2">
//         <div className="rounded-2xl border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
//           <ul className="grid grid-cols-5">
//             {items.map(({ href, label, icon: Icon }) => {
//               const active = pathname === href
//               return (
//                 <li key={label}>
//                   <Link
//                     to={href}
//                     className={cn(
//                       "flex h-14 flex-col items-center justify-center gap-1 text-xs transition-colors",
//                       active
//                         ? "text-primary"
//                         : "text-muted-foreground hover:text-foreground"
//                     )}
//                     aria-current={active ? "page" : undefined}
//                   >
//                     <Icon className="h-5 w-5" aria-hidden="true" />
//                     <span className="leading-none">{label}</span>
//                   </Link>
//                 </li>
//               )
//             })}
//             <li>
//               <Link
//                 to="/settings"
//                 className="flex h-14 w-full flex-col items-center justify-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
//                 aria-label="Open Settings"
//               >
//                 <Settings className="h-5 w-5" aria-hidden="true" />
//                 <span className="leading-none">Settings</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

