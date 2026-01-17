"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, RotateCcw, Trash2, Clock } from "lucide-react"
import { Card } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"


interface CounterHistory {
  timestamp: number
  value: number
}

export default function CounterPage() {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState<CounterHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [customValue, setCustomValue] = useState("")

  /* ------------------ STORAGE ------------------ */
  useEffect(() => {
    const savedCount = localStorage.getItem("counter-value")
    const savedHistory = localStorage.getItem("counter-history")

    if (savedCount) setCount(Number(savedCount))
    if (savedHistory) setHistory(JSON.parse(savedHistory))
  }, [])

  useEffect(() => {
    localStorage.setItem("counter-value", String(count))
    localStorage.setItem("counter-history", JSON.stringify(history))
  }, [count, history])

  /* ------------------ HELPERS ------------------ */
  const addHistory = (value: number) => {
    setHistory((prev) => [
      ...prev,
      { timestamp: Date.now(), value }
    ])
  }

  const increment = () => {
    setCount((c) => {
      const v = c + 1
      addHistory(v)
      return v
    })
  }

  const decrement = () => {
    setCount((c) => {
      const v = c - 1
      addHistory(v)
      return v
    })
  }

  const reset = () => {
    setCount(0)
    addHistory(0)
  }

  const addCustom = () => {
    if (!customValue) return
    setCount((c) => {
      const v = c + Number(customValue)
      addHistory(v)
      return v
    })
    setCustomValue("")
  }

  const deleteHistoryItem = (timestamp: number) => {
    setHistory((prev) =>
      prev.filter((item) => item.timestamp !== timestamp)
    )
  }

  const clearHistory = () => setHistory([])

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString()

  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center p-4">
      <div className="w-full max-w-md space-y-6">

        {/* COUNTER CARD */}
        <Card className="p-6 text-center space-y-6">
          <h1 className="text-2xl font-semibold">Counter</h1>

          <div className="rounded-xl border py-6">
            <p className="text-6xl font-mono font-bold">{count}</p>
          </div>

          {/* CONTROLS */}
          <div className="flex justify-center gap-3">
            <Button size="icon" onClick={decrement}>
              <Minus />
            </Button>

            <Button variant="outline" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>

            <Button size="icon" onClick={increment}>
              <Plus />
            </Button>
          </div>

          {/* CUSTOM ADD */}
          <div className="flex gap-2">
            <input
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Add value"
              className="flex-1 rounded-md border px-3 py-2 bg-background"
            />
            <Button onClick={addCustom}>Add</Button>
          </div>
        </Card>

        {/* HISTORY TOGGLE */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowHistory(!showHistory)}
        >
          <Clock className="mr-2 h-4 w-4" />
          {showHistory ? "Hide History" : "Show History"} ({history.length})
        </Button>

        {/* HISTORY LIST */}
        {showHistory && (
          <Card className="p-4 max-h-80 overflow-y-auto space-y-2">
            {history.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">
                No history yet
              </p>
            )}

            {history.map((item) => (
              <div
                key={item.timestamp}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <div className="text-sm">
                  <p className="font-medium">Value: {item.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(item.timestamp)}
                  </p>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteHistoryItem(item.timestamp)}
                  aria-label="Delete entry"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}

            {history.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                className="w-full mt-2"
                onClick={clearHistory}
              >
                Clear All History
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
