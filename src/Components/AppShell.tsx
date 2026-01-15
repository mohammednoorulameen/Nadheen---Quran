import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { SiteHeader } from "./Site-Header"
import { Sidebar } from "./Sidebar"
import BottomNav from "./Bottom-navs"
import { useSidebar } from "@/Hook/useSidebar"
import { useRouteLoader } from "@/Hook/useRouteLoader"
import { cn } from "@/lib/utils"
import PageLoader from "./Shared/PageLoader"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const loading = useRouteLoader()
  const { isOpen, isMobile, close } = useSidebar()
  const mainRef = useRef<HTMLElement>(null!)

  // Handle click outside on mobile
  useEffect(() => {
    if (!isMobile || !isOpen) return

    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      if (
        target.closest("aside") ||
        target.closest('[aria-label="Toggle sidebar"]') ||
        target.closest('[aria-label="Open sidebar"]')
      ) {
        return
      }
      close()
    }

    document.addEventListener("mousedown", handleClickOutside, true)
    document.addEventListener("touchstart", handleClickOutside, true)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true)
      document.removeEventListener("touchstart", handleClickOutside, true)
    }
  }, [isMobile, isOpen, close])

  return (
    <>
      {loading && <PageLoader />}

      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Mobile overlay */}
        {isMobile && isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={close}
            onTouchStart={close}
            aria-hidden="true"
            role="presentation"
          />
        )}

        {/* Main area */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          {/* Header */}
          <SiteHeader />

          {/* Scroll container */}
          <main
            ref={mainRef}
            className={cn(
              "flex-1 overflow-y-auto overflow-x-hidden bg-background",
              "pb-16 md:pb-0"
            )}
            role="main"
          >
            {children}
          </main>

          {/* Bottom Navigation */}
          <BottomNav scrollContainerRef={mainRef} />
        </div>
      </div>
    </>
  )
}

