'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OrganizerNavbar from '@/components/organizer-navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Calendar, MapPin, Users, Eye, Sparkles, Edit, Trash2, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function ManageEventsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data - sostituire con dati reali
  const [events] = useState([
    {
      id: 1,
      title: 'Concerto Jazz al Teatro',
      categories: ['Musica', 'Classica'],
      date: '15 Marzo 2025',
      location: 'Teatro Lauro Rossi',
      participants: 127,
      views: 453,
      sponsored: true,
      status: 'active',
    },
    {
      id: 2,
      title: 'Workshop di Fotografia',
      categories: ['Workshop', 'Arte'],
      date: '18 Marzo 2025',
      location: 'UNIMC Campus',
      participants: 45,
      views: 189,
      sponsored: false,
      status: 'active',
    },
    {
      id: 3,
      title: 'Mostra Arte Moderna',
      categories: ['Arte', 'Cultura'],
      date: '20 Marzo 2025',
      location: 'Palazzo Buonaccorsi',
      participants: 89,
      views: 267,
      sponsored: true,
      status: 'active',
    },
    {
      id: 4,
      title: 'Aperitivo Culturale',
      categories: ['Sociale', 'Food'],
      date: '10 Marzo 2025',
      location: 'Centro Storico',
      participants: 156,
      views: 312,
      sponsored: false,
      status: 'completed',
    },
  ])

  const categoryColors = [
    'bg-purple-500/20 text-purple-600 border-purple-500/30',
    'bg-cyan-500/20 text-cyan-600 border-cyan-500/30',
  ]

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeEvents = filteredEvents.filter(e => e.status === 'active')
  const completedEvents = filteredEvents.filter(e => e.status === 'completed')

  const handleEdit = (eventId: number) => {
    router.push(`/organizer/eventi/modifica/${eventId}`)
  }

  const handleDelete = (eventId: number) => {
    if (confirm('Sei sicuro di voler eliminare questo evento?')) {
      console.log('[v0] Deleting event:', eventId)
      // Logica per eliminare l'evento
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Gestisci Eventi
          </h1>
          <p className="text-muted-foreground">
            Modifica o rimuovi i tuoi eventi
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca nei tuoi eventi..."
            className="pl-12 bg-card border-border rounded-xl h-12"
          />
        </div>

        {/* Eventi Attivi */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              Eventi Attivi ({activeEvents.length})
            </h2>
          </div>

          {activeEvents.length === 0 ? (
            <Card className="p-8 text-center border-dashed border-2">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Nessun evento attivo</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {activeEvents.map((event) => (
                <Card key={event.id} className="p-5 border-border/50 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground text-lg">
                            {event.title}
                          </h3>
                          {event.sponsored && (
                            <div className="px-2 py-1 bg-accent/10 border border-accent/20 rounded-full flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-accent" />
                              <span className="text-xs font-medium text-accent">Sponsorizzato</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                          {event.categories.map((cat, idx) => (
                            <span 
                              key={idx} 
                              className={`text-xs px-2 py-1 rounded-full border ${categoryColors[idx % categoryColors.length]}`}
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleEdit(event.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifica
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(event.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Elimina
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Info */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-secondary" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-accent" />
                        {event.participants} partecipanti
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="w-4 h-4 text-primary" />
                        {event.views} visualizzazioni
                      </div>
                    </div>

                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Eventi Completati */}
        {completedEvents.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Eventi Completati ({completedEvents.length})
            </h2>

            <div className="space-y-3">
              {completedEvents.map((event) => (
                <Card key={event.id} className="p-5 border-border/50 opacity-75 hover:opacity-100 transition-opacity">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                        className="rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>

      <OrganizerNavbar />
    </div>
  )
}
