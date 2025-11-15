import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const endpoint =
      body.type === "business"
        ? "/auth/register-business"
        : "/auth/register"

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    if (!backendURL) {
      return NextResponse.json(
        { error: "BACKEND_URL non configurato" },
        { status: 500 }
      )
    }

    const res = await fetch(backendURL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    console.error("REGISTER API ERROR:", e)
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 }
    )
  }
}
