import { Outlet } from "react-router-dom"
import ScrollProgress from "@/Components/ScrollProgress"
import { AppShell } from "@/Components/AppShell"
import { SidebarProvider } from "@/Context/SidebarProvider"
import { Analytics } from "@vercel/analytics/react"
import BottomNav from "@/Components/Bottom-navs"

export default function LayoutPage() {
  return (
    <SidebarProvider>
      <ScrollProgress />
      <AppShell>
        <Outlet />
        <BottomNav />
      </AppShell>
      <Analytics />
    </SidebarProvider>
  )
}

