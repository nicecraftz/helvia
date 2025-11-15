import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    console.error("LOGIN API ERROR:", e)
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 }
    )
  }
}
