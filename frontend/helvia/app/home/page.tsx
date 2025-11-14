'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import { Sparkles, Calendar, MapPin, TrendingUp, Users, Euro } from 'lucide-react'

const featuredEvents = [
  {
    id: 1,
    title: 'Concerto al Teatro Lauro Rossi',
    categories: ['Musica', 'Classica', 'Serale'],
    date: '15 Marzo 2025',
    time: '21:00',
    location: 'Teatro Lauro Rossi',
    price: 0,
    participants: 127,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 2,
    title: 'Mostra d\'Arte Contemporanea',
    categories: ['Arte', 'Cultura', 'Mostre'],
    date: '20 Marzo 2025',
    time: '18:00',
    location: 'Palazzo Buonaccorsi',
    price: 5,
    participants: 89,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 3,
    title: 'Festival del Cinema Universitario',
    categories: ['Cinema', 'Università', 'Giovani'],
    date: '25 Marzo 2025',
    time: '20:00',
    location: 'Cinema Italia',
    price: 0,
    participants: 215,
    image: '/placeholder.svg?height=200&width=400',
  },
]

const aiRecommendations = [
  {
    id: 4,
    title: 'Workshop di Fotografia alle Marche',
    categories: ['Workshop', 'Arte', 'Formazione'],
    date: '18 Marzo 2025',
    time: '15:00',
    location: 'UNIMC Campus',
    price: 10,
    participants: 45,
    reason: 'Basato sui tuoi interessi artistici',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 5,
    title: 'Aperitivo Culturale a Macerata',
    categories: ['Sociale', 'Food', 'Networking'],
    date: '22 Marzo 2025',
    time: '19:00',
    location: 'Centro Storico di Macerata',
    price: 0,
    participants: 156,
    reason: 'Popolare tra studenti',
    image: '/placeholder.svg?height=200&width=400',
  },
]

const categoryColors = [
  'bg-purple-500/20 text-purple-600 border-purple-500/30',
  'bg-cyan-500/20 text-cyan-600 border-cyan-500/30',
  'bg-pink-500/20 text-pink-600 border-pink-500/30',
  'bg-orange-500/20 text-orange-600 border-orange-500/30',
  'bg-green-500/20 text-green-600 border-green-500/30',
  'bg-blue-500/20 text-blue-600 border-blue-500/30',
]

export default function HomePage() {
  const [showAiRecommendations, setShowAiRecommendations] = useState(true)
  
  useEffect(() => {
    const preferences = localStorage.getItem('userPreferences')
    if (preferences) {
      const parsed = JSON.parse(preferences)
      setShowAiRecommendations(parsed.aiRecommendations)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 -left-4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute top-40 -right-4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background pt-16 pb-20 px-6 border-b border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 text-[200px] font-bold text-primary/10">MC</div>
          </div>
          <div className="max-w-screen-xl mx-auto relative space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 animate-in fade-in slide-in-from-top duration-500">
              <MapPin className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-primary">Macerata, Marche</p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-in fade-in slide-in-from-top duration-700">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Buongiorno, Mario
              </span>
            </h1>
            
            <div className="space-y-2">
              <p className="text-foreground/90 text-2xl font-medium animate-in fade-in slide-in-from-top duration-700 delay-100">
                Scopri cosa succede oggi nella tua città
              </p>
              <p className="text-muted-foreground text-lg animate-in fade-in slide-in-from-top duration-700 delay-200">
                {showAiRecommendations 
                  ? `L'AI ha trovato ${featuredEvents.length + aiRecommendations.length} eventi perfetti per te`
                  : `Ci sono ${featuredEvents.length} eventi in primo piano oggi`
                }
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 mt-12 space-y-20">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-primary animate-pulse" />
                Eventi in Primo Piano
              </h2>
            </div>
            <div className="space-y-16">
              {featuredEvents.map((event, index) => (
                <Link key={event.id} href={`/eventi/${event.id}`}>
                  <div className="gradient-border mb-15 overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="bg-card rounded-2xl overflow-hidden">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-52 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <div className="absolute top-4 right-4 px-4 py-2 bg-card/95 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
                          {event.price === 0 ? (
                            <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                              <Euro className="w-4 h-4" />
                              Gratis
                            </span>
                          ) : (
                            <span className="text-foreground font-bold text-sm flex items-center gap-1">
                              <Euro className="w-4 h-4" />
                              {event.price}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {event.categories.map((cat, idx) => (
                            <span key={idx} className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full border ${categoryColors[idx % categoryColors.length]}`}>
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground leading-tight">
                          {event.title}
                        </h3>
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center gap-2 text-foreground/80">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{event.date}</p>
                              <p className="text-xs text-muted-foreground">Ore {event.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-foreground/80">
                            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{event.location}</p>
                              <p className="text-xs text-muted-foreground">Macerata, MC</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-foreground/80">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                              <Users className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{event.participants} partecipanti</p>
                              <p className="text-xs text-muted-foreground">Confermati</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {showAiRecommendations && (
            <>
              <div className="pt-12" />

              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center animate-pulse shadow-lg shadow-secondary/30">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      L'AI Consiglia per Te
                    </h2>
                    <p className="text-sm text-muted-foreground">Raccomandazioni personalizzate</p>
                  </div>
                </div>
                <div className="space-y-16">
                  {aiRecommendations.map((event, index) => (
                    <Link key={event.id} href={`/eventi/${event.id}`}>
                      <div className="glass-effect rounded-2xl mb-15 overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer border-2 border-secondary/30 hover:border-secondary animate-in fade-in slide-in-from-bottom duration-500 hover:shadow-lg hover:shadow-secondary/20" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="relative">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 right-4 px-4 py-2 bg-secondary/95 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg animate-pulse">
                            <Sparkles className="w-4 h-4" />
                            AI Match 95%
                          </div>
                          <div className="absolute top-4 left-4 px-4 py-2 bg-card/95 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
                            {event.price === 0 ? (
                              <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                                <Euro className="w-4 h-4" />
                                Gratis
                              </span>
                            ) : (
                              <span className="text-foreground font-bold text-sm flex items-center gap-1">
                                <Euro className="w-4 h-4" />
                                {event.price}
                              </span>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-sm text-secondary font-medium italic">
                              {event.reason}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {event.categories.map((cat, idx) => (
                              <span key={idx} className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full border ${categoryColors[idx % categoryColors.length]}`}>
                                {cat}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            {event.title}
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-foreground/80">
                              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{event.date}</p>
                                <p className="text-xs text-muted-foreground">Ore {event.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-foreground/80">
                              <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-secondary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{event.location}</p>
                                <p className="text-xs text-muted-foreground">Macerata, MC</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-foreground/80">
                              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Users className="w-4 h-4 text-accent" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{event.participants} partecipanti</p>
                                <p className="text-xs text-muted-foreground">Confermati</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}

          <div className="pt-12" />

          <section className="space-y-4 pb-4">
            <Link href="/eventi">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl py-8 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]">
                Esplora Tutti gli Eventi di Macerata
              </Button>
            </Link>
            <Link href="/chatbot">
              <Button
                variant="outline"
                className="w-full glass-effect border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-xl py-8 text-lg font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Parla con l'AI Assistente
              </Button>
            </Link>
          </section>
        </div>
      </div>

      <Navbar />
    </div>
  )
}
