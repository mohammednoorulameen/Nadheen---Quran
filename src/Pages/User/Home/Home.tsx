// src/Pages/User/Home/Home.tsx
import HomeQuickCards from "@/Components/Home-quick-cards"


// async function getSurahs() {
//   try {
//     const res = await fetch("https://api.alquran.cloud/v1/surah", { next: { revalidate: 3600 }})
//     if (!res.ok) throw new Error("Failed to fetch surahs")
//     const json = await res.json()
//     return (json?.data ?? []).map((s: any) => ({
//       number: s.number,
//       nameAr: s.name,
//       nameEn: s.englishName,
//       ayahs: s.numberOfAyahs,
//       revelationType: s.revelationType,
//     }))
//   } catch {
//     return [
//       { number: 1, nameAr: "الفاتحة", nameEn: "Al-Fatihah", ayahs: 7, revelationType: "Meccan" },
//       { number: 2, nameAr: "البقرة", nameEn: "Al-Baqarah", ayahs: 286, revelationType: "Medinan" },
//       { number: 3, nameAr: "آل عمران", nameEn: "Ali 'Imran", ayahs: 200, revelationType: "Medinan" },
//     ]
//   }
// }

// ← Remove "use client" here

export default function Homepage() {
  // const surahs =  getSurahs() // server fetch
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Explore
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Quick access to Quran, Hadith, Counter, and more.
        </p>
      </header>

      <HomeQuickCards />
    </div>
  )
}











// "use client"
// import HomeQuickCards from "@/Components/home-quick-cards"

// // Use a server fetch to avoid client-side effects. Cache for an hour.
// async function getSurahs() {
//   try {
//     const res = await fetch("https://api.alquran.cloud/v1/surah", {
//       // Revalidate occasionally; adjust as needed.
//       next: { revalidate: 3600 },
//     })
//     if (!res.ok) throw new Error("Failed to fetch surahs")
//     const json = await res.json()
//     // Normalize the shape we need
//     const data = (json?.data ?? []).map((s: any) => ({
//       number: s.number as number,
//       nameAr: s.name as string,
//       nameEn: s.englishName as string,
//       ayahs: s.numberOfAyahs as number,
//       revelationType: s.revelationType as "Meccan" | "Medinan",
//     }))
//     return data as {
//       number: number
//       nameAr: string
//       nameEn: string
//       ayahs: number
//       revelationType: "Meccan" | "Medinan"
//     }[]
//   } catch {
//     // Fallback minimal set if network fails (keeps UI working)
//     return [
//       { number: 1, nameAr: "الفاتحة", nameEn: "Al-Fatihah", ayahs: 7, revelationType: "Meccan" },
//       { number: 2, nameAr: "البقرة", nameEn: "Al-Baqarah", ayahs: 286, revelationType: "Medinan" },
//       { number: 3, nameAr: "آل عمران", nameEn: "Ali 'Imran", ayahs: 200, revelationType: "Medinan" },
//     ]
//   }
// }

// export default async function Homepage() {
//   const surahs = await getSurahs()
//   return (
//     <main className="mx-auto max-w-5xl px-4 py-10">
//       <header className="mb-6">
//         <h1 className="text-balance text-2xl font-semibold">Explore</h1>
//         <p className="mt-1 text-sm text-muted-foreground">Quick access to Quran, Hadith, Counter, and more.</p>
//       </header>

//       <HomeQuickCards />
//     </main>
//   )
// }
