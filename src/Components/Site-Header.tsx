import { Button } from "@/Components/ui/button";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/Hook/useSidebar";

export function SiteHeader() {
  const { toggle, isOpen } = useSidebar();
  const location = useLocation();

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm supports-[backdrop-filter]:bg-card/80"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 md:px-6">
        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Brand - hidden on mobile when sidebar is available */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
          aria-label="Go to homepage"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <span className="text-sm font-bold">Q</span>
          </span>
          <span className="hidden text-lg font-semibold text-foreground sm:inline md:text-xl">
            Quran
          </span>
        </Link>

        {/* Desktop nav - hidden on mobile */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          <Link
            to="/"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              location.pathname === "/"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to="/quran"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              location.pathname.startsWith("/quran")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            Quran
          </Link>
          <Link
            to="/hadith"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              location.pathname.startsWith("/hadith")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            Hadith
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <span
            id="scroll-progress-label"
            aria-live="polite"
            className="hidden text-xs font-medium text-muted-foreground header-remaining md:inline"
          ></span>
          <Link
            to="/settings"
            className={cn(
              "hidden rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "md:inline-flex items-center",
              location.pathname === "/settings"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
            aria-label="Open settings"
          >
            Settings
          </Link>
          <Button
            asChild
            size="sm"
            variant="default"
            className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Link to="/surah/1">Read</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
