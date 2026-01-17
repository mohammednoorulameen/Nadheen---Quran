import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import { registerSW } from "virtual:pwa-register"

registerSW({
  immediate: true,
  onRegistered() {
    console.log("✅ Service Worker registered")
  },
  onOfflineReady() {
    console.log("📦 App ready to work offline")
  }
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)



// import { StrictMode } from "react"
// import { createRoot } from "react-dom/client"
// import App from "./App"
// import "./index.css"
// import { registerSW } from "virtual:pwa-register"

// // ✅ Register PWA Service Worker
// registerSW({
//   immediate: true,
//   onRegistered() {
//     console.log("✅ Service Worker registered")
//   },
//   onOfflineReady() {
//     console.log("📦 App ready to work offline")
//   }
// })

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { registerSW } from 'virtual:pwa-register'

// registerSW({ immediate: true })

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
    
//   </StrictMode>,
  
// )
