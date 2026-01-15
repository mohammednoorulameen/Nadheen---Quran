import { useContext } from "react"
import { SidebarContext } from "@/Context/SidebarContext"

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}


// import { SidebarContext } from "@/Context/SidebarContext"
// import { useContext } from "react"


// export function useSidebar() {
//   const context = useContext(SidebarContext)

//   if (!context) {
//     throw new Error("useSidebar must be used within a SidebarProvider")
//   }

//   return context
// }
