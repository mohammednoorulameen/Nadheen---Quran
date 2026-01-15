import { createContext } from "react"

export interface SidebarContextType {
  isOpen: boolean
  isCollapsed: boolean
  isMobile: boolean
  toggle: () => void
  open: () => void
  close: () => void
  toggleCollapse: () => void
}

export const SidebarContext =
  createContext<SidebarContextType | undefined>(undefined)



// import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
// import { useIsMobile } from "@/Hook/useMobile"

// interface SidebarContextType {
//   isOpen: boolean
//   isCollapsed: boolean 
//   isMobile: boolean
//   toggle: () => void
//   open: () => void
//   close: () => void
//   toggleCollapse: () => void 
// }

// // const SidebarContext = createContext<SidebarContextType | undefined>(undefined)
// export const SidebarContext =
//   createContext<SidebarContextType | undefined>(undefined)


// export function SidebarProvider({ children }: { children: React.ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isCollapsed, setIsCollapsed] = useState(false)
//   const isMobile = useIsMobile()

//   // Initialize sidebar state based on screen size
//   useEffect(() => {
//     if (isMobile) {
//       // Mobile: sidebar starts closed
//       setIsOpen(false)
//       setIsCollapsed(false)
//     } else {
//       // Desktop: sidebar starts open and expanded
//       setIsOpen(true)
//       setIsCollapsed(false)
//     }
//   }, [isMobile])

//   const toggle = useCallback(() => {
//     if (isMobile) {
//       // Mobile: toggle open/closed
//       setIsOpen((prev) => !prev)
//     } else {
//       // Desktop: toggle collapse/expand
//       setIsCollapsed((prev) => !prev)
//     }
//   }, [isMobile])

//   const open = useCallback(() => {
//     setIsOpen(true)
//     if (!isMobile) {
//       setIsCollapsed(false)
//     }
//   }, [isMobile])

//   const close = useCallback(() => {
//     if (isMobile) {
//       setIsOpen(false)
//     } else {
//       // On desktop, "close" means collapse to icon-only
//       setIsCollapsed(true)
//     }
//   }, [isMobile])

//   const toggleCollapse = useCallback(() => {
//     if (!isMobile) {
//       setIsCollapsed((prev) => !prev)
//     }
//   }, [isMobile])

//   // Close sidebar on mobile when pressing Escape
//   useEffect(() => {
//     if (!isMobile || !isOpen) return

//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setIsOpen(false)
//       }
//     }

//     document.addEventListener("keydown", handleEscape)
//     return () => document.removeEventListener("keydown", handleEscape)
//   }, [isMobile, isOpen])

//   // Prevent body scroll when sidebar is open on mobile
//   useEffect(() => {
//     if (isMobile && isOpen) {
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = ""
//     }
//     return () => {
//       document.body.style.overflow = ""
//     }
//   }, [isMobile, isOpen])

//   return (
//     <SidebarContext.Provider
//       value={{
//         isOpen: isMobile ? isOpen : true, 
//         isCollapsed: isMobile ? false : isCollapsed,
//         isMobile,
//         toggle,
//         open,
//         close,
//         toggleCollapse,
//       }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   )
// }

// // export function useSidebar() {
// //   const context = useContext(SidebarContext)
// //   if (context === undefined) {
// //     throw new Error("useSidebar must be used within a SidebarProvider")
// //   }
// //   return context
// // }
