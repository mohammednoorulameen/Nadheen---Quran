export async function getAzanTimes(lat: number, lon: number) {
  const res = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
  )
  const data = await res.json()
  return data.data.timings
}

export function getAzanDate(time: string) {
  const [h, m] = time.split(":").map(Number)
  const now = new Date()
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    h,
    m,
    0
  )
}

type AzanNotificationOptions = NotificationOptions & {
  vibrate?: number[]
}

export function scheduleAzanNotification(
  date: Date,
  prayerName: string
) {
  const delay = date.getTime() - Date.now()
  if (delay <= 0) return

  setTimeout(() => {
    if (!("Notification" in window)) return
    if (Notification.permission !== "granted") return

    const options: AzanNotificationOptions = {
      body: `It is time for ${prayerName}`,
      icon: "/azan.png",
      vibrate: [300, 100, 300],
      silent: false
    }

    new Notification("🕌 Azan Time", options)
  }, delay)
}
