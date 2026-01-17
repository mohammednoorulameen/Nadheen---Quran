/* eslint-env serviceworker */

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {}

  self.registration.showNotification(
    data.title || "🕌 Azan Time",
    {
      body: data.body || "Time for Salah",
      icon: "/azan.png",
      vibrate: [300, 100, 300],
      silent: false,
      requireInteraction: true
    }
  )
})



// /* eslint-env serviceworker */

// self.addEventListener("push", (event) => {
//   const data = event.data ? event.data.json() : {}

//   self.registration.showNotification(
//     data.title || "🕌 Azan Time",
//     {
//       body: data.body || "Time for Salah",
//       icon: "/azan.png",
//       vibrate: [300, 100, 300],
//       silent: false,
//       requireInteraction: true
//     }
//   )
// })

