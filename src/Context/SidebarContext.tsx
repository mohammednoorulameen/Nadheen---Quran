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


