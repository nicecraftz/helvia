import { NextResponse } from "next/server";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 🔐 Funzione per ottenere i cookie (auth_token)
function getCookieHeader(req: Request) {
  return req.headers.get("cookie") || "";
}

/* ---------------------------------------------------
   GET  → Ottieni gli interessi dell'utente
--------------------------------------------------- */
export async function GET(req: Request) {
  try {
    if (!backendURL) {
      return NextResponse.json(
        { error: "BACKEND_URL mancante" },
        { status: 500 }
      );
    }

    const cookieHeader = getCookieHeader(req);

    // Tentiamo sia user che customer
    const endpoint = "/api/user/interests";

    const res = await fetch(backendURL + endpoint, {
      method: "GET",
      headers: { Cookie: cookieHeader },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  } catch (error) {
    console.error("INTERESTS GET ERROR:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

/* ---------------------------------------------------
   POST  → Aggiorna/interessi dell’utente
--------------------------------------------------- */
export async function POST(req: Request) {
  try {
    if (!backendURL) {
      return NextResponse.json(
        { error: "BACKEND_URL mancante" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const cookieHeader = getCookieHeader(req);

    if (!body.interests || !Array.isArray(body.interests)) {
      return NextResponse.json(
        { error: "Formato interessi non valido" },
        { status: 400 }
      );
    }

    const endpoint = "/api/user/interests";

    const res = await fetch(backendURL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  } catch (error) {
    console.error("INTERESTS POST ERROR:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
