'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OrganizerNavbar from '@/components/organizer-navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Calendar, MapPin, Euro, Tag, Sparkles, ArrowLeft, ImageIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

const categories = [
  'Musica',
  'Arte', 
  'Cinema',
  'Workshop',
  'Sociale',
  'Teatro'
]

const categoryColors = [
  'bg-purple-500/20 text-purple-600 border-purple-500/30 hover:bg-purple-500/30',
  'bg-cyan-500/20 text-cyan-600 border-cyan-500/30 hover:bg-cyan-500/30',
  'bg-pink-500/20 text-pink-600 border-pink-500/30 hover:bg-pink-500/30',
  'bg-orange-500/20 text-orange-600 border-orange-500/30 hover:bg-orange-500/30',
  'bg-green-500/20 text-green-600 border-green-500/30 hover:bg-green-500/30',
  'bg-blue-500/20 text-blue-600 border-blue-500/30 hover:bg-blue-500/30',
]

export default function CreateEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [] as string[],
    startDate: '',
    endDate: '',
    location: '',
    price: '',
    isFree: false,
    image: null as File | null,
  })
  const [isDateRange, setIsDateRange] = useState(false)
  const [wantSponsorship, setWantSponsorship] = useState(false)
  const [availableSponsorships] = useState(3) // Da recuperare dal piano abbonamento

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Qui andrà la logica per salvare l'evento
    console.log('[v0] Event data:', formData, 'Sponsored:', wantSponsorship)
    alert('Evento creato con successo!')
    router.push('/organizer')
  }

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Crea Nuovo Evento
            </h1>
            <p className="text-sm text-muted-foreground">
              Compila i dettagli per pubblicare il tuo evento
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Immagine Evento */}
          <Card className="p-6 space-y-4 border-border/50">
            <Label className="text-base font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Immagine Evento
            </Label>
            <div className="border-2 border-dashed border-border/50 rounded-xl p-8 hover:border-primary/50 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="flex flex-col items-center gap-3 cursor-pointer">
                <div className="p-4 bg-primary/10 rounded-full">
                  <ImageIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    Carica un'immagine
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG fino a 10MB
                  </p>
                </div>
              </label>
            </div>
          </Card>

          {/* Titolo */}
          <Card className="p-6 space-y-4 border-border/50">
            <Label htmlFor="title" className="text-base font-semibold">
              Titolo Evento *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Es: Concerto Jazz sotto le stelle"
              required
              className="text-base border-border/50"
            />
          </Card>

          {/* Descrizione */}
          <Card className="p-6 space-y-4 border-border/50">
            <Label htmlFor="description" className="text-base font-semibold">
              Descrizione *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrivi il tuo evento, cosa aspettarsi, chi può partecipare..."
              required
              rows={5}
              className="text-base border-border/50 resize-none"
            />
          </Card>

          {/* Categorie */}
          <Card className="p-6 space-y-4 border-border/50">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              Categorie * (seleziona almeno una)
            </Label>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, idx) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                    formData.categories.includes(category)
                      ? categoryColors[idx]
                      : 'bg-card border-border text-muted-foreground hover:bg-muted/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Card>

          {/* Data/e */}
          <Card className="p-6 space-y-4 border-border/50">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Data Evento *
              </Label>
              <div className="flex items-center gap-2">
                <Label htmlFor="date-range" className="text-sm text-muted-foreground">
                  Range di date
                </Label>
                <Switch
                  id="date-range"
                  checked={isDateRange}
                  onCheckedChange={setIsDateRange}
                />
              </div>
            </div>
            
            {!isDateRange ? (
              <Input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="text-base border-border/50"
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Data Inizio</Label>
                  <Input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    className="text-base border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Data Fine</Label>
                  <Input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                    className="text-base border-border/50"
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Luogo */}
          <Card className="p-6 space-y-4 border-border/50">
            <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Luogo *
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Es: Teatro Lauro Rossi, Macerata"
              required
              className="text-base border-border/50"
            />
          </Card>

          {/* Prezzo */}
          <Card className="p-6 space-y-4 border-border/50">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Euro className="w-5 h-5 text-green-600" />
                Prezzo
              </Label>
              <div className="flex items-center gap-2">
                <Label htmlFor="free-event" className="text-sm text-muted-foreground">
                  Evento Gratuito
                </Label>
                <Switch
                  id="free-event"
                  checked={formData.isFree}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFree: checked, price: checked ? '0' : formData.price })}
                />
              </div>
            </div>
            
            {!formData.isFree && (
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="pl-10 text-base border-border/50"
                />
              </div>
            )}
          </Card>

          {/* Sponsorizzazione */}
          {availableSponsorships > 0 && (
            <Card className="p-6 space-y-4 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-background">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Sponsorizza questo evento
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Gli eventi sponsorizzati appaiono in cima ai risultati. 
                    Hai {availableSponsorships} sponsorizzazioni disponibili questo mese.
                  </p>
                </div>
                <Switch
                  checked={wantSponsorship}
                  onCheckedChange={setWantSponsorship}
                />
              </div>
              
              {wantSponsorship && (
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm font-medium text-accent flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Questo evento sarà sponsorizzato
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 rounded-full h-12 border-border"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-full h-12 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white font-semibold"
            >
              Pubblica Evento
            </Button>
          </div>

        </form>
      </div>

      <OrganizerNavbar />
    </div>
  )
}
