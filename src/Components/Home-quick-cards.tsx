"use client"

import React from "react"
import { Book, Library, Palette as Rosette, ListOrdered} from "lucide-react"
import ContinueReadingCard from "@/Components/ContinueReadingCardWrapper"
import { Link } from "react-router-dom"

function Card({
  to,
  title,
  desc,
  icon,
}: {
  to: string
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="group block rounded-xl border bg-card p-4 transition-colors hover:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg border bg-background p-2 text-primary">{icon}</div>
        <div>
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
    </Link>
  )
}

export default function HomeQuickCards() {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card to="/quran" title="Quran" desc="Browse Surahs and continue reading" icon={<Book size={18} />} />
        <Card to="/hadith" title="Hadith" desc="Explore collections" icon={<Library size={18} />} />
        <Card to="/counter" title="Counter" desc="Tasbih with targets and history" icon={<Rosette size={18} />} />
        <Card to="/books" title="Books" desc="Study resources and references" icon={<ListOrdered size={18} />} />
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-2 text-sm font-semibold">Continue Reading</h2>
        <ContinueReadingCard />
      </div>
    </section>
  )
}


// "use client"



// import type React from "react"

// import { Book, Library, Palette as Rosette, ListOrdered, Link } from "lucide-react"
// import ContinueReadingCard from "@/Components/ContinueReadingCardWrapper"

// function Card({
//   href,
//   title,
//   desc,
//   icon,
// }: {
//   href: string
//   title: string
//   desc: string
//   icon: React.ReactNode
// }) {
//   return (
//     <Link
//       href={href}
//       className="group block rounded-xl border bg-card p-4 transition-colors hover:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
//     >
//       <div className="flex items-center gap-3">
//         <div className="rounded-lg border bg-background p-2 text-primary">{icon}</div>
//         <div>
//           <h3 className="font-medium text-foreground">{title}</h3>
//           <p className="text-xs text-muted-foreground">{desc}</p>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default function HomeQuickCards() {
//   return (
//     <section className="space-y-6">
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         <Card to="/quran" title="Quran" desc="Browse Surahs and continue reading" icon={<Book size={18} />} />
//         <Card href="/hadith" title="Hadith" desc="Explore collections" icon={<Library size={18} />} />
//         <Card href="/counter" title="Counter" desc="Tasbih with targets and history" icon={<Rosette size={18} />} />
//         <Card href="/books" title="Books" desc="Study resources and references" icon={<ListOrdered size={18} />} />
//       </div>

//       <div className="rounded-xl border bg-card p-4">
//         <h2 className="mb-2 text-sm font-semibold">Continue Reading</h2>
//         <ContinueReadingCard />
//       </div>
//     </section>
//   )
// }
