'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Calendar, MapPin, Filter, Users, Euro } from 'lucide-react'

const categories = ['Tutti', 'Musica', 'Arte', 'Cinema', 'Workshop', 'Sociale', 'Teatro']

const categoryColors = [
  'bg-purple-500/20 text-purple-600 border-purple-500/30',
  'bg-cyan-500/20 text-cyan-600 border-cyan-500/30',
]

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tutti')
  const [showFilters, setShowFilters] = useState(false)
  const [priceFilter, setPriceFilter] = useState('Tutti')
  const [dateFilter, setDateFilter] = useState('Tutti')

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/event/')
        if (res.ok) {
          const data = await res.json()
          setEvents(data)
        } else {
          console.error('Failed to fetch events')
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    fetchEvents()
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Tutti' ||
      event.topics?.some((topic) => topic.name === selectedCategory)
    const matchesPrice =
      priceFilter === 'Tutti' || (priceFilter === 'Gratuito' ? event.cost === 0 : event.cost !== 0)
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-3xl font-serif font-bold text-primary">Scopri Eventi</h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca eventi..."
            className="pl-12 bg-card border-border rounded-xl h-12"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary text-white hover:bg-secondary'
                  : 'bg-card border-border hover:bg-muted/20'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-8">
          <p className="text-sm text-muted-foreground">{filteredEvents.length} eventi trovati</p>

          {filteredEvents.map(event => (
            <Link key={event.id} href={`/eventi/${event.id}`}>
              <div className="bg-card rounded-2xl mb-15 overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-[1.01] cursor-pointer border border-border/50">
                <div className="relative">
                  <img src={event.image_url || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 px-4 py-2 bg-card/95 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
                    {event.cost === 0 ? (
                      <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        Gratis
                      </span>
                    ) : (
                      <span className="text-foreground font-bold text-sm flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        {event.cost}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(event.topics || []).map((topic, idx) => (
                      <span
                        key={idx}
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${
                          categoryColors[idx % categoryColors.length]
                        }`}
                      >
                        {topic.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(event.start_datetime).toLocaleDateString('it-IT')}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {event.location || 'Posizione non disponibile'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Users className="w-4 h-4 text-accent" />
                      {event.participants} partecipanti
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  )
}
