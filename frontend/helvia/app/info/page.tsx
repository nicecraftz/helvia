'use client'

import Link from 'next/link'
import Navbar from '@/components/navbar'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/home">
            <button className="p-2 hover:bg-card rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-primary">
            Chi Siamo
          </h1>
        </div>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-4xl font-serif font-bold text-primary mb-3">
              Helvia
            </h2>
            <p className="text-xl text-foreground">
              L'intelligenza artificiale al servizio della cultura
            </p>
          </div>

          {/* Origin Story */}
          <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              La Nostra Storia
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Helvia prende il nome da <strong className="text-foreground">Helvia Recina</strong>, 
              l'antica città romana sulle cui fondamenta sorge Macerata. Come l'antica 
              Helvia Recina era un centro culturale e sociale nell'epoca romana, la 
              nostra piattaforma vuole riportare quella stessa vivacità culturale nella 
              Macerata moderna.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              La Nostra Missione
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Helvia è nata per migliorare la vita culturale, la vita studentesca e 
              l'engagement comunitario a Macerata attraverso l'intelligenza artificiale. 
              Vogliamo rendere accessibili e personalizzati gli eventi culturali, 
              connettendo persone, passioni e opportunità.
            </p>
          </div>

          {/* AI Goal */}
          <div className="bg-secondary/10 border-2 border-secondary/30 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Il Potere dell'AI
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Utilizziamo l'intelligenza artificiale per:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Consigliare eventi personalizzati basati sui tuoi interessi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Facilitare la scoperta di nuove esperienze culturali</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Connettere studenti e cittadini con eventi rilevanti</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Promuovere la partecipazione alla vita culturale della città</span>
              </li>
            </ul>
          </div>

          {/* Hackathon */}
          <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Hackathon AI Macerata
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Helvia è stata sviluppata per l'Hackathon AI di Macerata, un evento 
              dedicato all'innovazione tecnologica al servizio della comunità locale. 
              Il nostro obiettivo è dimostrare come l'AI possa trasformare 
              positivamente la vita culturale di una città, rendendola più inclusiva, 
              accessibile e coinvolgente per tutti.
            </p>
          </div>

          {/* Values */}
          <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              I Nostri Valori
            </h3>
            <div className="grid gap-4">
              <div className="p-4 bg-primary/10 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">
                  🏛️ Connessione con la Storia
                </h4>
                <p className="text-sm text-muted-foreground">
                  Onoriamo il passato di Macerata mentre costruiamo il suo futuro digitale
                </p>
              </div>
              <div className="p-4 bg-secondary/10 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">
                  🤝 Inclusività
                </h4>
                <p className="text-sm text-muted-foreground">
                  La cultura deve essere accessibile a tutti, studenti e cittadini
                </p>
              </div>
              <div className="p-4 bg-muted/20 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">
                  💡 Innovazione
                </h4>
                <p className="text-sm text-muted-foreground">
                  Usiamo la tecnologia più avanzata per migliorare la vita reale
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  )
}
