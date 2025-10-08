"use client"

import { Link } from "react-router-dom"


export function LeftNav({ variant = "aside" as "aside" | "sheet" }: { variant?: "aside" | "sheet" }) {
  return (
    <div className={variant === "aside" ? "space-y-4" : "p-4 space-y-6"}>
      {variant === "sheet" ? (
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">Navigate</h2>
          <p className="mt-1 text-xs text-muted-foreground">Jump to sections and content types.</p>
        </div>
      ) : null}

      <nav className="rounded-lg border bg-card p-4">
        <h3 className="mb-2 text-sm font-semibold text-foreground">Content</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <Link className="hover:text-foreground" to="/quran">
              Quran
            </Link>
          </li>
          <li>
            <Link className="hover:text-foreground" to="/hadith">
              Hadith
            </Link>
          </li>
          <li>
            <Link className="hover:text-foreground" to="/books">
              Books
            </Link>
          </li>
          <li>
            <Link className="hover:text-foreground" to="/counter">
              Counter
            </Link>
          </li>
        </ul>
      </nav>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-2 text-sm font-semibold text-foreground">On this page</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <a className="hover:text-foreground" href="#continue">
              Continue Reading
            </a>
          </li>
          <li>
            <a className="hover:text-foreground" href="#popular">
              Explore Topics
            </a>
          </li>
          <li>
            <a className="hover:text-foreground" href="#surahs">
              All Surahs
            </a>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-2 text-sm font-semibold">Support</h3>
        <p className="text-sm text-muted-foreground">Monthly donations help sustain projects.</p>
        <a
          href="#"
          className="mt-3 inline-flex items-center justify-center rounded-md border bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Donate Monthly
        </a>
      </div>
    </div>
  )
}
