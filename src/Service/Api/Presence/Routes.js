const PRESENCE_KEY = "__presence"

type PresenceMap = Map<string, number>

function getPresence(): PresenceMap {
  const g = globalThis as any
  if (!g[PRESENCE_KEY]) {
    g[PRESENCE_KEY] = new Map<string, number>()
  }
  return g[PRESENCE_KEY] as PresenceMap
}

function cleanup(map: PresenceMap) {
  const now = Date.now()
  const TTL = 45000
  for (const [id, ts] of map.entries()) {
    if (now - ts > TTL) map.delete(id)
  }
}

export async function GET() {
  const map = getPresence()
  cleanup(map)
  return Response.json({ online: map.size })
}

export async function POST(req: Request) {
  const map = getPresence()
  try {
    const { id } = await req.json()
    if (typeof id === "string" && id.length) map.set(id, Date.now())
  } catch {}
  cleanup(map)
  return Response.json({ online: map.size })
}

// const PRESENCE_KEY = "__presence"

// type PresenceMap = Map<string, number>

// /**
//  * Get the global presence map.
//  */
// function getPresence(): PresenceMap {
//   const g = globalThis as any
//   if (!g[PRESENCE_KEY]) {
//     g[PRESENCE_KEY] = new Map<string, number>()
//   }
//   return g[PRESENCE_KEY] as PresenceMap
// }

// /**
//  * Remove users whose last heartbeat exceeds TTL.
//  */
// function cleanup(map: PresenceMap) {
//   const now = Date.now()
//   const TTL = 45000 // 45 seconds
//   for (const [id, ts] of map.entries()) {
//     if (now - ts > TTL) map.delete(id)
//   }
// }

// /**
//  * GET: Return current online users count
//  */
// export async function GET() {
//   const map = getPresence()
//   cleanup(map)
//   return Response.json({ online: map.size })
// }

// /**
//  * POST: Update presence for a given user ID
//  */
// export async function POST(req: Request) {
//   const map = getPresence()

//   try {
//     const { id } = await req.json()
//     if (typeof id === "string" && id.length) {
//       map.set(id, Date.now())
//     } else {
//       return Response.json({ error: "Invalid id" }, { status: 400 })
//     }
//   } catch (err) {
//     return Response.json({ error: "Invalid JSON" }, { status: 400 })
//   }

//   cleanup(map)
//   return Response.json({ online: map.size, users: Array.from(map.keys()) })
// }


// // const PRESENCE_KEY = "__presence"

// // type PresenceMap = Map<string, number>

// // function getPresence(): PresenceMap {
// //   const g = globalThis as any
// //   if (!g[PRESENCE_KEY]) {
// //     g[PRESENCE_KEY] = new Map<string, number>()
// //   }
// //   return g[PRESENCE_KEY] as PresenceMap
// // }

// // function cleanup(map: PresenceMap) {
// //   const now = Date.now()
// //   const TTL = 45000 // 45s
// //   for (const [id, ts] of map.entries()) {
// //     if (now - ts > TTL) map.delete(id)
// //   }
// // }

// // export async function GET() {
// //   const map = getPresence()
// //   cleanup(map)
// //   return Response.json({ online: map.size })
// // }

// // export async function POST(req: Request) {
// //   const map = getPresence()
// //   try {
// //     const { id } = await req.json()
// //     if (typeof id === "string" && id.length) map.set(id, Date.now())
// //   } catch {}
// //   cleanup(map)
// //   return Response.json({ online: map.size })
// // }
