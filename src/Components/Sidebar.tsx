import { Link, useLocation } from "react-router-dom"
import { ChevronLeft, Home, BookOpen, Hash, Settings} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

import { useEffect, useRef } from "react"
import { useSidebar } from "@/Hook/useSidebar"

export function Sidebar() {
  const { isOpen, isCollapsed, isMobile, toggle, close } = useSidebar()
  const location = useLocation()
  const sidebarRef = useRef<HTMLElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/quran", label: "Quran", icon: BookOpen },
    { path: "/hadith", label: "Hadith", icon: BookOpen },
    { path: "/counter", label: "Counter", icon: Hash },
    { path: "/settings", label: "Settings", icon: Settings },
  ]
  

  // Focus management: focus first link when sidebar opens on mobile
  useEffect(() => {
    if (isOpen && isMobile && firstLinkRef.current) {
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isMobile])

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "h-full border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        "flex flex-col shrink-0",
        // Mobile: fixed positioning, slides in from left
        isMobile
          ? cn(
              "fixed left-0 top-0 z-50",
              isOpen
                ? "translate-x-0 w-75 shadow-2xl"
                : "-translate-x-full w-0 overflow-hidden border-none shadow-none"
            )
          : // Desktop: relative positioning, always visible
            cn(
              "relative z-30",
              isCollapsed ? "w-16" : "w-75"
            )
      )}
      aria-label="Main navigation"
      aria-hidden={isMobile ? !isOpen : false}
      role="navigation"
    >
      {/* Sidebar Header */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border transition-all duration-300",
          isMobile ? "justify-between px-4" : isCollapsed ? "justify-center px-2" : "justify-between px-4"
        )}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2 font-semibold text-sidebar-foreground transition-all duration-300",
            "hover:text-sidebar-primary focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar rounded-md",
            isCollapsed && "justify-center",
            isMobile && "flex-shrink-0"
          )}
          onClick={() => isMobile && close()}
          aria-label="Go to homepage"
          title={isCollapsed ? "Quran" : undefined}
        >
          {!isCollapsed && (
         <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary/10 text-sidebar-primary">
            <span className="text-sm font-bold">Q</span>
          </span>
          )}
          <span
            className={cn(
              "text-lg transition-opacity duration-300",
              isCollapsed ? "hidden" : "block"
            )}
          >
            Quran
          </span>
        </Link>

        {/* Toggle button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className={cn(
            "h-8 w-8 shrink-0 text-sidebar-foreground transition-colors",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            "focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar",
            isCollapsed && "mx-auto"
          )}
          aria-label={isMobile ? (isOpen ? "Close sidebar" : "Open sidebar") : isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={isMobile ? isOpen : !isCollapsed}
        >
          {isMobile ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isCollapsed && "rotate-180"
              )}
            />
          )}
        </Button>
      </div>

      {/* Sidebar Content */}
      <nav
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden",
          isMobile ? "px-4 py-6" : isCollapsed ? "px-2 py-4" : "px-4 py-6"
        )}
        aria-label="Main navigation"
      >
        <div className={cn("space-y-6", isCollapsed && "space-y-4")}>
          {/* Navigation Section */}
          <div>
            {!isCollapsed && (
              <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">
                Navigate
              </h2>
            )}
            <ul className="space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const active = isActive(item.path)
                const isFirst = index === 0

                return (
                  <li key={item.path}>
                    <Link
                      ref={isFirst ? firstLinkRef : undefined}
                      to={item.path}
                      onClick={() => isMobile && close()}
                      className={cn(
                        "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar",
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground/80",
                        isCollapsed
                          ? "justify-center px-2 py-2.5"
                          : "px-3 py-2.5",
                        isMobile && "px-3 py-2.5"
                      )}
                      aria-current={active ? "page" : undefined}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span
                        className={cn(
                          "transition-opacity duration-300 whitespace-nowrap",
                          isCollapsed ? "hidden" : "block"
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Quick Links Section - Hidden when collapsed */}
          {!isCollapsed && (
            <div>
              <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">
                Quick Links
              </h2>
              <ul className="space-y-1 text-sm">
                <li>
                  <a
                    href="#continue"
                    onClick={() => isMobile && close()}
                    className="block rounded-lg px-3 py-2 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar"
                  >
                    Continue Reading
                  </a>
                </li>
                <li>
                  <a
                    href="#popular"
                    onClick={() => isMobile && close()}
                    className="block rounded-lg px-3 py-2 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar"
                  >
                    Explore Topics
                  </a>
                </li>
                <li>
                  <a
                    href="#surahs"
                    onClick={() => isMobile && close()}
                    className="block rounded-lg px-3 py-2 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar"
                  >
                    All Surahs
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Support Section - Hidden when collapsed */}
          {!isCollapsed && (
            <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-sidebar-foreground">Support</h3>
              <p className="mb-3 text-xs leading-relaxed text-sidebar-foreground/70">
                Monthly donations help sustain projects.
              </p>
              <a
                href="#"
                className="inline-flex w-full items-center justify-center rounded-md bg-sidebar-primary px-3 py-2 text-sm font-medium text-sidebar-primary-foreground transition-colors hover:bg-sidebar-primary/90 focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar"
                onClick={() => isMobile && close()}
              >
                Donate Monthly
              </a>
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}
