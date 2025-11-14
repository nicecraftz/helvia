'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { InterestSelector } from '@/components/interest-selector'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function InterestsPage() {
  const router = useRouter()
  // Initial interests - these would come from user data
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Musica', 'Arte'])

  const handleSave = () => {
    // Here you would save to backend
    console.log('[v0] Saving interests:', selectedInterests)
    router.push('/profilo')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/profilo">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">I Tuoi Interessi</h1>
            <p className="text-sm text-muted-foreground">
              Gestisci le categorie che ti interessano
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="glass-effect rounded-3xl p-6 shadow-xl border-2 border-primary/20">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Seleziona le tue categorie preferite
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Queste categorie aiutano l'AI a suggerirti eventi personalizzati. Puoi modificarle in qualsiasi momento.
              </p>
              
              <InterestSelector 
                selectedInterests={selectedInterests}
                onInterestsChange={setSelectedInterests}
                maxSelection={10}
                showCounter={false}
              />
            </div>

            <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-xl">
              <p className="text-xs text-foreground leading-relaxed">
                💡 <span className="font-semibold">Suggerimento:</span> Seleziona almeno 3 interessi per ricevere raccomandazioni migliori. L'AI analizzerà le tue scelte per suggerirti eventi sempre più pertinenti.
              </p>
            </div>
          </div>
        </div>

        {/* Save button */}
        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white rounded-xl py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-secondary/30"
        >
          <Save className="w-5 h-5 mr-2" />
          Salva Modifiche
        </Button>
      </div>
    </div>
  )
}
