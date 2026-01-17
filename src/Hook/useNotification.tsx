export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.")
    return "denied"
  }

  if (Notification.permission === "granted") {
    return "granted"
  }

  return await Notification.requestPermission()
}
