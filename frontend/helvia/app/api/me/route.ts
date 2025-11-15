import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    // Estrai auth_token dal cookie
    const token = cookieHeader.match(/auth_token=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json(
        { error: "Non autenticato" },
        { status: 401 }
      );
    }

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendURL) {
      return NextResponse.json(
        { error: "BACKEND_URL non configurato" },
        { status: 500 }
      );
    }

    const endpoints = ["/api/user/me", "/api/customer/me"];

    let data = null;

    for (const ep of endpoints) {
      const res = await fetch(backendURL + ep, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,    // ❤️ NECESSARIO
          Cookie: `auth_token=${token};`,      // ❤️ NECESSARIO
        },
      });

      if (res.ok) {
        data = await res.json();
        break;
      }
    }

    if (!data) {
      return NextResponse.json(
        { error: "Non autenticato" },
        { status: 401 }
      );
    }

    return NextResponse.json(data);

  } catch (e) {
    console.error("ME API ERROR:", e);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
