'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Settings, Bell, Eye, Shield } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    aiRecommendations: true,
    antibiasMode: true,
    publicProfile: false,
    shareActivity: true,
  })

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      setPreferences(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
    alert('Preferenze salvate con successo!')
  }

  const updatePreference = (key: string, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences))
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/profilo"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-all hover:gap-3 duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Torna al Profilo</span>
        </Link>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl shadow-lg mb-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Preferenze</h1>
          <p className="text-sm text-muted-foreground">
            Personalizza la tua esperienza su Helvia
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-effect rounded-3xl p-6 shadow-xl border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-5">
              <Bell className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Notifiche</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Notifiche Email
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ricevi aggiornamenti via email
                  </p>
                </div>
                <Switch
                  id="email"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => updatePreference('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div>
                  <Label htmlFor="push" className="text-foreground font-medium">
                    Notifiche Push
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ricevi notifiche sul dispositivo
                  </p>
                </div>
                <Switch
                  id="push"
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) => updatePreference('pushNotifications', checked)}
                />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-6 shadow-xl border-2 border-secondary/20">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="w-6 h-6 text-secondary" />
              <h2 className="text-xl font-bold text-foreground">Intelligenza Artificiale</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div>
                  <Label htmlFor="ai" className="text-foreground font-medium">
                    Raccomandazioni AI
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ricevi suggerimenti personalizzati dall'AI
                  </p>
                </div>
                <Switch
                  id="ai"
                  checked={preferences.aiRecommendations}
                  onCheckedChange={(checked) => updatePreference('aiRecommendations', checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div>
                  <Label htmlFor="antibias" className="text-foreground font-medium">
                    Modalità Anti-Bias
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Esplora eventi diversi dai tuoi soliti interessi
                  </p>
                </div>
                <Switch
                  id="antibias"
                  checked={preferences.antibiasMode}
                  onCheckedChange={(checked) => updatePreference('antibiasMode', checked)}
                />
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-6 shadow-xl border-2 border-accent/20">
            <div className="flex items-center gap-3 mb-5">
              <Eye className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-bold text-foreground">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div>
                  <Label htmlFor="public" className="text-foreground font-medium">
                    Profilo Pubblico
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rendi il tuo profilo visibile agli altri
                  </p>
                </div>
                <Switch
                  id="public"
                  checked={preferences.publicProfile}
                  onCheckedChange={(checked) => updatePreference('publicProfile', checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div>
                  <Label htmlFor="activity" className="text-foreground font-medium">
                    Condividi Attività
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mostra gli eventi a cui partecipi pubblicamente
                  </p>
                </div>
                <Switch
                  id="activity"
                  checked={preferences.shareActivity}
                  onCheckedChange={(checked) => updatePreference('shareActivity', checked)}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Salva Preferenze
          </Button>
        </form>
      </div>
    </div>
  )
}
