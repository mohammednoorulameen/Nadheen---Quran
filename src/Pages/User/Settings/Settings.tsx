import {  useState } from "react"
import { requestNotificationPermission } from "@/Hook/useNotification"

export default function Settings() {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission
  )
  const [enabled, setEnabled] = useState<boolean>(
    localStorage.getItem("azanNotifications") === "true"
  )

  const handleEnable = async () => {
    const result = await requestNotificationPermission()
    setPermission(result)

    if (result === "granted") {
      localStorage.setItem("azanNotifications", "true")
      setEnabled(true)
    }
  }

  const handleDisable = () => {
    // Disable notifications INSIDE APP
    localStorage.setItem("azanNotifications", "false")
    setEnabled(false)
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage app preferences and notifications
          </p>
        </div>

        {/* Notification Card */}
        <div className="rounded-xl border bg-card p-4 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔔</div>
            <div className="flex-1">
              <h2 className="font-medium">Azan Notifications</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Receive prayer time reminders on your device.
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm">
              Status:
              <span
                className={`ml-2 font-medium ${
                  enabled
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {enabled ? "enabled" : "disabled"}
              </span>
            </span>

            {/* Buttons */}
            {!enabled && (
              <button
                onClick={handleEnable}
                className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                Enable
              </button>
            )}

            {enabled && (
              <button
                onClick={handleDisable}
                className="px-4 py-2 text-sm rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition"
              >
                Disable
              </button>
            )}
          </div>

          {/* Permission info */}
          {permission === "denied" && (
            <p className="text-xs text-muted-foreground">
              Notifications are blocked at browser level. Please enable them
              from browser or system settings.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
