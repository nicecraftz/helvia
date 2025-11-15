import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendURL) {
      return NextResponse.json(
        { error: "BACKEND_URL non configurato" },
        { status: 500 }
      );
    }

    const endpoint =
      body.type === "business"
        ? "/api/auth/customer/register"
        : "/api/auth/user/register";

    const res = await fetch(backendURL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("⚠️ Backend NON ha risposto JSON:", text);
      return NextResponse.json(
        { error: "Errore backend", raw: text },
        { status: 500 }
      );
    }

    if (!res.ok || data.error) {
      return NextResponse.json(
        { error: data.error || "Errore registrazione" },
        { status: res.status }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "auth_token",
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (e) {
    console.error("REGISTER API ERROR:", e);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
