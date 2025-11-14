'use client'

import { useState } from 'react'
import Link from 'next/link'
import OrganizerNavbar from '@/components/organizer-navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, Calendar, Eye, Euro, Sparkles, ArrowUpRight, Clock, Plus } from 'lucide-react'

export default function OrganizerDashboard() {
  // Mock data - sostituire con dati reali
  const [stats] = useState({
    totalEvents: 12,
    activeEvents: 8,
    totalViews: 3452,
    totalParticipants: 847,
    revenue: 2340,
    sponsoredEvents: 2,
    availableSponsorships: 3,
  })

  const [recentEvents] = useState([
    {
      id: 1,
      title: 'Concerto Jazz al Teatro',
      date: '15 Marzo 2025',
      participants: 127,
      views: 453,
      sponsored: true,
    },
    {
      id: 2,
      title: 'Workshop Fotografia',
      date: '18 Marzo 2025',
      participants: 45,
      views: 189,
      sponsored: false,
    },
    {
      id: 3,
      title: 'Mostra Arte Moderna',
      date: '20 Marzo 2025',
      participants: 89,
      views: 267,
      sponsored: true,
    },
  ])

  const [subscription] = useState({
    plan: 'Professional',
    sponsorshipsPerMonth: 5,
    sponsorshipsUsed: 2,
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Dashboard Organizzatore
          </h1>
          <p className="text-muted-foreground">
            Gestisci i tuoi eventi e monitora le performance
          </p>
        </div>

        {/* Piano Abbonamento Highlight */}
        <Card className="relative overflow-hidden border-2 border-accent/20 bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold text-foreground">
                    Piano {subscription.plan}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {subscription.sponsorshipsUsed}/{subscription.sponsorshipsPerMonth} sponsorizzazioni usate questo mese
                </p>
              </div>
              <Link href="/organizer/abbonamento">
                <Button variant="outline" size="sm" className="rounded-full border-accent/30 hover:bg-accent/10">
                  Gestisci
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                style={{ width: `${(subscription.sponsorshipsUsed / subscription.sponsorshipsPerMonth) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Statistiche Principali */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 space-y-3 border-border/50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.activeEvents}</p>
              <p className="text-xs text-muted-foreground">Eventi Attivi</p>
            </div>
          </Card>

          <Card className="p-5 space-y-3 border-border/50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Eye className="w-5 h-5 text-secondary" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Visualizzazioni</p>
            </div>
          </Card>

          <Card className="p-5 space-y-3 border-border/50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalParticipants.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Partecipanti</p>
            </div>
          </Card>

          <Card className="p-5 space-y-3 border-border/50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Euro className="w-5 h-5 text-green-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">€{stats.revenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Ricavi Totali</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/organizer/crea-evento" className="block">
            <Card className="p-6 border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="p-3 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Crea Evento</p>
                  <p className="text-xs text-muted-foreground">Pubblica un nuovo evento</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/organizer/eventi" className="block">
            <Card className="p-6 border-2 border-dashed border-secondary/30 hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer group">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="p-3 bg-secondary/10 rounded-full group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Gestisci Eventi</p>
                  <p className="text-xs text-muted-foreground">Modifica o rimuovi eventi</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Eventi Recenti */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Eventi Recenti</h2>
            <Link href="/organizer/eventi">
              <Button variant="ghost" size="sm" className="text-primary">
                Vedi tutti
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentEvents.map((event) => (
              <Card key={event.id} className="p-5 hover:shadow-lg transition-shadow border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      {event.sponsored && (
                        <div className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-full">
                          <Sparkles className="w-3 h-3 text-accent" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.participants}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {event.views}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Dettagli
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

      <OrganizerNavbar />
    </div>
  )
}
