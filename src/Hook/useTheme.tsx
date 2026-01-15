import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  // Initialize theme from localStorage immediately (before first render)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light"
    
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme
    }
    
    // Fallback: check userSettings for darkMode
    try {
      const userSettings = localStorage.getItem("v0:userSettings")
      if (userSettings) {
        const settings = JSON.parse(userSettings)
        if (typeof settings.darkMode === "boolean") {
          return settings.darkMode ? "dark" : "light"
        }
      }
    } catch {
      // Ignore parse errors
    }
    
    return "light"
  })

  // Apply theme class and sync with localStorage
  useEffect(() => {
    const root = document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Save to localStorage
    localStorage.setItem("theme", theme)
    
    // Also sync with useUserSettings format for consistency
    try {
      const userSettings = localStorage.getItem("v0:userSettings")
      const settings = userSettings ? JSON.parse(userSettings) : {}
      settings.darkMode = theme === "dark"
      localStorage.setItem("v0:userSettings", JSON.stringify(settings))
    } catch {
      // Ignore errors
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  return { theme, toggleTheme }
}
