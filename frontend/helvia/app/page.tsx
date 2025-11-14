'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, MapPin, Users, Award, Heart, Calendar, Target, Compass } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Macerata · Cultura · Comunità</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-foreground mb-2">Vivi Macerata</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                con Helvia
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
              La piattaforma intelligente che connette studenti e cittadini agli eventi culturali di Macerata. 
              Teatro, concerti, mostre e molto altro, tutto in un solo posto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/registrati">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-7 bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1">
                  Inizia Gratis
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-7 border-2 hover:bg-primary/5 transition-all duration-300">
                  Accedi
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Eventi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">1200+</div>
                <div className="text-sm text-muted-foreground mt-1">Studenti</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Location</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Che cos'è Helvia?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Helvia prende il nome dall'antica città romana di <span className="font-semibold text-primary">Helvia Recina</span>, 
                situata vicino a Macerata. Come l'antica città era un centro culturale dell'epoca romana, 
                Helvia oggi vuole essere il centro della vita culturale studentesca maceratese.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Grazie all'intelligenza artificiale, Helvia impara dai tuoi interessi e ti suggerisce eventi 
                perfetti per te: concerti allo Sferisterio, spettacoli teatrali, mostre d'arte, festival 
                e iniziative universitarie.
              </p>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <Compass className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Dall'antico al moderno:</span> Come Helvia Recina 
                  fu un punto di riferimento nella Valle del Potenza, oggi Helvia guida gli studenti 
                  alla scoperta della cultura maceratese.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <MapPin className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Macerata</h3>
                <p className="text-sm text-muted-foreground">Eventi locali per la comunità</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                <Sparkles className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-bold text-lg mb-2">AI Powered</h3>
                <p className="text-sm text-muted-foreground">Suggerimenti intelligenti</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                <Users className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-bold text-lg mb-2">Comunità</h3>
                <p className="text-sm text-muted-foreground">Connetti con studenti</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20">
                <Award className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Gamification</h3>
                <p className="text-sm text-muted-foreground">Sblocca riconoscimenti</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 mb-8">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">La Nostra Mission</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Rendere la cultura accessibile a tutti
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              La nostra missione è abbattere le barriere tra studenti e cultura. Vogliamo che ogni 
              persona a Macerata possa scoprire facilmente eventi che arricchiscono la propria vita, 
              costruendo una comunità più connessa e culturalmente attiva.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-8 rounded-2xl bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Passione per la Cultura</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Crediamo che la cultura sia un diritto, non un privilegio. Helvia rende gli eventi 
                  accessibili a chiunque voglia partecipare.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-background/80 backdrop-blur-sm border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Comunità Forte</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connettiamo studenti e cittadini attraverso esperienze condivise, costruendo 
                  legami duraturi nella comunità maceratese.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-background/80 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovazione</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Usiamo l'AI non per complicare, ma per semplificare. Vogliamo che trovare 
                  eventi sia facile, veloce e personalizzato.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Come Funziona</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tre semplici passi per iniziare a vivere la cultura di Macerata
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg">
              1
            </div>
            <Sparkles className="w-10 h-10 text-primary mb-4 mt-4" />
            <h3 className="text-2xl font-bold mb-3">Registrati</h3>
            <p className="text-muted-foreground leading-relaxed">
              Crea il tuo account gratuito e indica i tuoi interessi: musica, teatro, arte, sport e altro ancora.
            </p>
          </div>

          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-bold shadow-lg">
              2
            </div>
            <Compass className="w-10 h-10 text-secondary mb-4 mt-4" />
            <h3 className="text-2xl font-bold mb-3">Scopri</h3>
            <p className="text-muted-foreground leading-relaxed">
              L'AI analizza le tue preferenze e ti suggerisce eventi perfetti per te. Filtra per data, categoria e prezzo.
            </p>
          </div>

          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold shadow-lg">
              3
            </div>
            <Award className="w-10 h-10 text-accent mb-4 mt-4" />
            <h3 className="text-2xl font-bold mb-3">Partecipa</h3>
            <p className="text-muted-foreground leading-relaxed">
              Partecipa agli eventi, guadagna punti e sblocca riconoscimenti. Diventa un vero esploratore culturale!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Pronto a scoprire Macerata?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Unisciti alla comunità di studenti che sta già esplorando il meglio della cultura maceratese con Helvia.
            </p>
            <Link href="/registrati">
              <Button size="lg" variant="secondary" className="text-lg px-12 py-7 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl font-semibold">
                Inizia Ora Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
