'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Calendar, MapPin, Filter, Users, Euro } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Concerto al Teatro Lauro Rossi',
    categories: ['Musica', 'Classica'],
    date: '15 Marzo 2025',
    location: 'Teatro Lauro Rossi',
    price: 0,
    participants: 127,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 2,
    title: 'Mostra d\'Arte Contemporanea',
    category: 'Arte',
    categories: ['Arte', 'Cultura'],
    date: '20 Marzo 2025',
    location: 'Palazzo Buonaccorsi',
    price: 5,
    participants: 89,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 3,
    title: 'Festival del Cinema Universitario',
    category: 'Cinema',
    categories: ['Cinema', 'Università'],
    date: '25 Marzo 2025',
    location: 'Cinema Italia',
    price: 0,
    participants: 215,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 4,
    title: 'Workshop di Fotografia',
    category: 'Workshop',
    categories: ['Workshop', 'Arte'],
    date: '18 Marzo 2025',
    location: 'UNIMC Campus',
    price: 10,
    participants: 45,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 5,
    title: 'Aperitivo Culturale',
    category: 'Sociale',
    categories: ['Sociale', 'Food'],
    date: '22 Marzo 2025',
    location: 'Centro Storico',
    price: 0,
    participants: 156,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 6,
    title: 'Teatro Classico Italiano',
    category: 'Teatro',
    categories: ['Teatro', 'Cultura'],
    date: '28 Marzo 2025',
    location: 'Teatro Lauro Rossi',
    price: 15,
    participants: 98,
    image: '/placeholder.svg?height=200&width=400',
  },
]

const categories = ['Tutti', 'Musica', 'Arte', 'Cinema', 'Workshop', 'Sociale', 'Teatro']

const categoryColors = [
  'bg-purple-500/20 text-purple-600 border-purple-500/30',
  'bg-cyan-500/20 text-cyan-600 border-cyan-500/30',
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tutti')
  const [showFilters, setShowFilters] = useState(false)
  const [priceFilter, setPriceFilter] = useState('Tutti')
  const [dateFilter, setDateFilter] = useState('Tutti')

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tutti' || event.category === selectedCategory
    const matchesPrice = priceFilter === 'Tutti' || (priceFilter === 'Gratuito' ? event.price === 0 : event.price !== 0)
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-3xl font-serif font-bold text-primary">
          Scopri Eventi
        </h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca eventi..."
            className="pl-12 bg-card border-border rounded-xl h-12"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
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

        {/* Additional Filters */}
        <div className="space-y-3">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full justify-between bg-card border-border rounded-xl"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtri Avanzati
            </span>
            <span className="text-xs text-muted-foreground">
              {showFilters ? '▼' : '▶'}
            </span>
          </Button>

          {showFilters && (
            <div className="bg-card rounded-xl p-4 space-y-4 border border-border">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Prezzo
                </label>
                <div className="flex gap-2">
                  {['Tutti', 'Gratuito', 'A Pagamento'].map((filter) => (
                    <Button
                      key={filter}
                      onClick={() => setPriceFilter(filter)}
                      variant={priceFilter === filter ? 'default' : 'outline'}
                      size="sm"
                      className={`rounded-full ${
                        priceFilter === filter
                          ? 'bg-primary text-white'
                          : 'bg-background'
                      }`}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Data
                </label>
                <div className="flex gap-2">
                  {['Tutti', 'Oggi', 'Weekend'].map((filter) => (
                    <Button
                      key={filter}
                      onClick={() => setDateFilter(filter)}
                      variant={dateFilter === filter ? 'default' : 'outline'}
                      size="sm"
                      className={`rounded-full ${
                        dateFilter === filter
                          ? 'bg-primary text-white'
                          : 'bg-background'
                      }`}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Events List */}
        <div className="space-y-8">
          <p className="text-sm text-muted-foreground">
            {filteredEvents.length} eventi trovati
          </p>

          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/eventi/${event.id}`}>
              <div className="bg-card rounded-2xl mb-15 overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-[1.01] cursor-pointer border border-border/50">
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
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
                <div className="p-5 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {event.categories.map((cat, idx) => (
                      <span key={idx} className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[idx % categoryColors.length]}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Calendar className="w-4 h-4 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {event.location}
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
