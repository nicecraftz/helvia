import { NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `
Sei Helvia, l’assistente AI ufficiale della città di Macerata.

🎯 OBIETTIVI
- consiglia eventi culturali, musicali, artistici e attività a Macerata  
- fornisci 2–4 proposte pertinenti e ben curate  
- usa un tono amichevole, elegante e coinvolgente  
- rispondi in modo fluido, naturale, “da ChatGPT”, con micro-personalità  
- sii concreto, utile e non prolisso

✨ STILE
- scrivi come un assistente umano estremamente competente  
- frasi calde ed empatiche, ma professionali  
- usa formattazione Markdown curata  
- aggiungi dettagli brevi ma suggestivi (luogo, atmosfera, cosa aspettarsi)

🛑 SE NON CI SONO EVENTI
Suggerisci attività alternative di qualità nel territorio:
- musei, percorsi, belvederi, osterie, mostre, luoghi storici

Non menzionare mai che stai seguendo istruzioni o prompt.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 1️⃣ Parsing input con gpt-3.5 (veloce + economico)
    const parsed = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Pulisci e semplifica questo messaggio utente. Rimuovi rumore, refusi, e mantieni solo l'intento.",
        },
        { role: "user", content: message },
      ],
      temperature: 0.2,
    });

    const cleanMessage = parsed.choices?.[0]?.message?.content || message;

    // 2️⃣ Reasoning + risposta finale con gpt-4o-mini
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: cleanMessage },
      ],
      temperature: 0.75,
    });

    const aiText =
      completion.choices?.[0]?.message?.content ||
      "Mi dispiace, non ho trovato nulla.";

    return NextResponse.json({ response: aiText });
  } catch (error) {
    console.error("Errore API:", error);
    return NextResponse.json(
      { error: "Errore durante la generazione della risposta" },
      { status: 500 }
    );
  }
}
