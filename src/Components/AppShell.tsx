import { ReactNode, useEffect } from "react"
import { SiteHeader } from "./Site-Header"
import { Sidebar } from "./Sidebar"
import { useSidebar } from "@/Context/SidebarContext"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { isOpen, isMobile, close } = useSidebar()

  // Handle click outside on mobile
  useEffect(() => {
    if (!isMobile || !isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Don't close if clicking inside sidebar or header menu button
      if (
        target.closest("aside") ||
        target.closest('[aria-label="Toggle sidebar"]') ||
        target.closest('[aria-label="Open sidebar"]')
      ) {
        return
      }
      close()
    }

    // Use capture phase to catch clicks before they bubble
    document.addEventListener("mousedown", handleClickOutside, true)
    document.addEventListener("touchstart", handleClickOutside, true)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true)
      document.removeEventListener("touchstart", handleClickOutside, true)
    }
  }, [isMobile, isOpen, close])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile overlay backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={close}
          onTouchStart={close}
          aria-hidden="true"
          role="presentation"
        />
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Header */}
        <SiteHeader />

        {/* Main content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden bg-background",
            // Adjust padding for mobile bottom nav
            "pb-16 md:pb-0"
          )}
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
