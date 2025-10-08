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
  const TTL = 45000 // 45s
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
