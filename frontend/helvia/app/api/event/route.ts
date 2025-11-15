import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/event/`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Errore nel recupero eventi" },
        { status: res.status }
      );
    }
    const events = await res.json();
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/event/ error:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
