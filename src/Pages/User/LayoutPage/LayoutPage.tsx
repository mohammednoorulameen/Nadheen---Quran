
import { Outlet } from "react-router-dom";
import ScrollProgress from "@/Components/ScrollProgress"
import { SiteHeader } from "@/Components/Site-Header";
import { Analytics } from "@vercel/analytics/react";
import BottomNav from "@/Components/Bottom-navs";

export default function LayoutPage() {
  return (
    <div>
      <ScrollProgress />
      <SiteHeader />
      <div className="pt-0 md:pt-16">
        <Outlet />
        <BottomNav/>
      </div>
      <Analytics />
    </div>
  )
}


// // src/layouts/RootLayout.tsx
// import React, { Suspense } from "react"
// import "../../../global.css"
// import { SiteHeader } from "@/Components/Site-Header"
// import ScrollProgress from "@/Components/ScrollProgress"
// // import BottomNav from "@/Components/BottomNav"

// // Fonts: Replace Next.js font imports with @fontsource or CSS
// // npm install @fontsource/noto-naskh-arabic
// import "@fontsource/noto-naskh-arabic/400.css"
// import "@fontsource/noto-naskh-arabic/700.css"

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="antialiased dark font-sans" style={{ fontFamily: "Noto Naskh Arabic, sans-serif" }}>
//       {/* Scroll progress bar */}
//       <ScrollProgress />

//       {/* Sticky header */}
//       <SiteHeader />

//       {/* Main content */}
//       <Suspense fallback={null}>{children}</Suspense>

//       {/* Bottom nav */}
//       {/* <BottomNav /> */}

//       {/* Analytics */}
//       {/* <Analytics /> */}
//     </div>
//   )
// }


// // src/layouts/RootLayout.tsx
// import type React from "react"
// import { Suspense } from "react"
// import { GeistSans } from "geist/font/sans"
// import { GeistMono } from "geist/font/mono"
// import { Noto_Naskh_Arabic } from "next/font/google" // you can import google fonts via @fontsource if needed
// import { Analytics } from "@vercel/analytics/react" 
// import "../../../global.css"
// import { SiteHeader } from "@/Components/Site-Header"
// import ScrollProgress from "@/Components/ScrollProgress"
// // import BottomNav from "@/components/bottom-nav"

// const arabic = Noto_Naskh_Arabic({
//   subsets: ["arabic"],
//   display: "swap",
//   variable: "--font-arabic",
// })

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${GeistSans.variable} ${GeistMono.variable} ${arabic.variable} antialiased dark`}
//     >
//       <body className="font-sans">
//         {/* Scroll progress bar */}
//         <ScrollProgress />
//         {/* Sticky header */}
//         <SiteHeader />
//         {/* Main content */}
//         <Suspense fallback={null}>{children}</Suspense>
//         {/* Bottom nav */}
//         {/* <BottomNav /> */}
//         {/* Analytics */}
//         {/* <Analytics /> */}
//       </body>
//     </html>
//   )
// }


// import React from 'react'
// // import Header from '../../../Common/User/Header'
// import { Outlet } from 'react-router-dom'
// // import Footer from '../../../Common/User/Footer'
// import ScrollToTop from '../../../Hook/useScrollTop'
// import { SiteHeader } from '@/Components/Site-Header'

// const LayoutPage = () => {
//   return (
//     <div>
//         {/* <Header/> */}
//         <div className="pt-0 md:pt-16">
//             <ScrollToTop/>
//             <SiteHeader/>
//             <Outlet/>
//         </div>
//         {/* <Footer/> */}
//     </div>
//   )
// }

// export default LayoutPage