import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export function useRouteLoader() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // show loader on route change
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // adjust delay if needed

    return () => clearTimeout(timer)
  }, [location.pathname])

  return loading
}
