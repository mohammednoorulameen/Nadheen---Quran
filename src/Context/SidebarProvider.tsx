import { useState, useEffect, useCallback } from "react"
import { SidebarContext } from "./SidebarContext"
import { useIsMobile } from "@/Hook/useMobile"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
      setIsCollapsed(false)
    } else {
      setIsOpen(true)
      setIsCollapsed(false)
    }
  }, [isMobile])

  const toggle = useCallback(() => {
    if (isMobile) {
      setIsOpen(prev => !prev)
    } else {
      setIsCollapsed(prev => !prev)
    }
  }, [isMobile])

  const open = useCallback(() => {
    setIsOpen(true)
    if (!isMobile) setIsCollapsed(false)
  }, [isMobile])

  const close = useCallback(() => {
    if (isMobile) {
      setIsOpen(false)
    } else {
      setIsCollapsed(true)
    }
  }, [isMobile])

  const toggleCollapse = useCallback(() => {
    if (!isMobile) setIsCollapsed(prev => !prev)
  }, [isMobile])

  useEffect(() => {
    document.body.style.overflow =
      isMobile && isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobile, isOpen])

  return (
    <SidebarContext.Provider
      value={{
        isOpen: isMobile ? isOpen : true,
        isCollapsed: isMobile ? false : isCollapsed,
        isMobile,
        toggle,
        open,
        close,
        toggleCollapse,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

