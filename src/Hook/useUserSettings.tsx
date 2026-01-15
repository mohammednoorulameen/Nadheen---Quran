"use client"

import { useEffect, useState, useCallback } from "react"

type UserSettings = {
  bottomNavAutoHide?: boolean
  resumeReadingEnabled?: boolean
  ayahLayout?: "line" | "page"
  bottomNavHideDelaySec?: number
  centeredReading?: boolean
  arabicFontScale?: number
  translationFontScale?: number
  darkMode?: boolean
}

function readSettings(): UserSettings {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem("v0:userSettings") : null
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeSettings(next: Partial<UserSettings>) {
  const current = readSettings()
  const merged = { ...current, ...next }
  try {
    localStorage.setItem("v0:userSettings", JSON.stringify(merged))
  } catch {
    // ignore quota issues
  }
}

export function useUserSettings() {
  const [bottomNavAutoHide, setBottomNavAutoHide] = useState<boolean>(true)
  const [resumeReadingEnabled, setResumeReadingEnabled] = useState<boolean>(true)
  const [ayahLayout, setAyahLayout] = useState<"line" | "page">("line")
  const [bottomNavHideDelaySec, setBottomNavHideDelaySec] = useState<number>(0)
  const [centeredReading, setCenteredReading] = useState<boolean>(true)
  const [arabicFontScale, setArabicFontScale] = useState<number>(1)
  const [translationFontScale, setTranslationFontScale] = useState<number>(1)
  // Initialize darkMode from localStorage immediately (before first render)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    
    // First check useTheme hook storage (theme: "dark" or "light")
    const theme = localStorage.getItem("theme")
    if (theme === "dark") return true
    if (theme === "light") return false
    
    // Fallback: check userSettings
    try {
      const s = readSettings()
      if (typeof s.darkMode === "boolean") {
        return s.darkMode
      }
    } catch {
      // Ignore errors
    }
    
    return false
  })

  useEffect(() => {
    const s = readSettings()
    if (typeof s.bottomNavAutoHide === "boolean") {
      setBottomNavAutoHide(s.bottomNavAutoHide)
    }
    if (typeof s.resumeReadingEnabled === "boolean") {
      setResumeReadingEnabled(s.resumeReadingEnabled)
    }
    if (s.ayahLayout === "line" || s.ayahLayout === "page") {
      setAyahLayout(s.ayahLayout)
    }
    if (typeof s.bottomNavHideDelaySec === "number") {
      setBottomNavHideDelaySec(s.bottomNavHideDelaySec)
    }
    if (typeof s.centeredReading === "boolean") {
      setCenteredReading(s.centeredReading)
    }
    if (typeof s.arabicFontScale === "number") {
      setArabicFontScale(s.arabicFontScale)
    }
    if (typeof s.translationFontScale === "number") {
      setTranslationFontScale(s.translationFontScale)
    }
    // Sync darkMode from localStorage (may have been changed by useTheme)
    try {
      const theme = localStorage.getItem("theme")
      if (theme === "dark" && !darkMode) {
        setDarkMode(true)
      } else if (theme === "light" && darkMode) {
        setDarkMode(false)
      } else if (typeof s.darkMode === "boolean" && s.darkMode !== darkMode) {
        setDarkMode(s.darkMode)
      }
    } catch {
      // Ignore errors
    }
  }, [])

  useEffect(() => {
    writeSettings({ bottomNavAutoHide })
  }, [bottomNavAutoHide])

  useEffect(() => {
    writeSettings({ resumeReadingEnabled })
  }, [resumeReadingEnabled])

  useEffect(() => {
    writeSettings({ ayahLayout })
  }, [ayahLayout])

  useEffect(() => {
    writeSettings({ bottomNavHideDelaySec })
  }, [bottomNavHideDelaySec])

  useEffect(() => {
    writeSettings({ centeredReading })
  }, [centeredReading])

  useEffect(() => {
    writeSettings({ arabicFontScale })
  }, [arabicFontScale])

  useEffect(() => {
    writeSettings({ translationFontScale })
  }, [translationFontScale])

  useEffect(() => {
    writeSettings({ darkMode })
    if (typeof document !== "undefined") {
      const root = document.documentElement
      if (darkMode) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
    
    // Also sync with useTheme format for consistency
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", darkMode ? "dark" : "light")
    }
  }, [darkMode])

  const toggleBottomNavAutoHide = useCallback(() => {
    setBottomNavAutoHide((v) => !v)
  }, [])

  const toggleResumeReading = useCallback(() => {
    setResumeReadingEnabled((v) => !v)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((v) => !v)
  }, [])

  const setAyahLayoutLine = useCallback(() => setAyahLayout("line"), [])
  const setAyahLayoutPage = useCallback(() => setAyahLayout("page"), [])

  return {
    bottomNavAutoHide,
    setBottomNavAutoHide,
    toggleBottomNavAutoHide,
    resumeReadingEnabled,
    setResumeReadingEnabled,
    toggleResumeReading,
    ayahLayout,
    setAyahLayout,
    setAyahLayoutLine,
    setAyahLayoutPage,
    bottomNavHideDelaySec,
    setBottomNavHideDelaySec,
    centeredReading,
    setCenteredReading,
    arabicFontScale,
    setArabicFontScale,
    translationFontScale,
    setTranslationFontScale,
    darkMode,
    setDarkMode,
    toggleDarkMode,
  }
}
