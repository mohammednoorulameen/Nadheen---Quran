import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog"
import { Menu } from "lucide-react"
import { LeftNav } from "@/Components/Left-nav"
import { Link } from "react-router-dom"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <button
                aria-label="Open menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card hover:bg-accent"
              >
                <Menu className="h-5 w-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="p-0 sm:max-w-lg">
              <div className="max-h-[80vh] overflow-auto">
                <LeftNav variant="sheet" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <span className="text-sm font-bold">Q</span>
          </span>
          <span className="text-lg font-semibold text-primary">Quran</span>
        </Link>
        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-4 md:flex">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Quran
          </Link>
          <Link to="/hadith" className="text-sm text-muted-foreground hover:text-foreground">
            Hadith
          </Link>
          <Link to="/books" className="text-sm text-muted-foreground hover:text-foreground">
            Books
          </Link>
        </nav>
        {/* Actions */}
        <div className="flex items-center gap-3">
          <span
            id="scroll-progress-label"
            aria-live="polite"
            className="hidden text-xs header-remaining md:inline"
          ></span>
          <Link
            to="/settings"
            className="hidden rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent md:inline"
            aria-label="Open settings"
          >
            Settings
          </Link>
          <Button asChild size="sm" variant="secondary">
            <Link to="/surah/1">Read</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
