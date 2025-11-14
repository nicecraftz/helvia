'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import OrganizerNavbar from '@/components/organizer-navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, MapPin, ArrowLeft, Save } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

const categories = [
  { name: 'Musica', color: 'bg-purple-500/20 text-purple-600 border-purple-500/30' },
  { name: 'Arte', color: 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30' },
  { name: 'Cinema', color: 'bg-purple-500/20 text-purple-600 border-purple-500/30' },
  { name: 'Workshop', color: 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30' },
  { name: 'Sociale', color: 'bg-purple-500/20 text-purple-600 border-purple-500/30' },
  { name: 'Teatro', color: 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30' },
]

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedCategories: [] as string[],
    startDate: '',
    endDate: '',
    location: '',
    price: '',
    isFree: false,
  })

  // Mock - caricare dati reali dell'evento
  useEffect(() => {
    // Simulare il caricamento dell'evento
    const mockEvent = {
      title: 'Concerto Jazz al Teatro',
      description: 'Una serata indimenticabile con i migliori artisti jazz della regione.',
      selectedCategories: ['Musica', 'Classica'],
      startDate: '2025-03-15',
      endDate: '',
      location: 'Teatro Lauro Rossi',
      price: '15',
      isFree: false,
    }
    setFormData(mockEvent)
  }, [eventId])

  const handleCategoryToggle = (categoryName: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryName)
        ? prev.selectedCategories.filter(c => c !== categoryName)
        : [...prev.selectedCategories, categoryName]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Updating event:', eventId, formData)
    // Logica per aggiornare l'evento
    router.push('/organizer/eventi')
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-3xl mx-auto px-6 py-8">
        
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna alla gestione
        </Button>

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Modifica Evento
          </h1>
          <p className="text-muted-foreground">
            Aggiorna i dettagli del tuo evento
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Titolo */}
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Titolo Evento
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Es: Concerto Jazz al Teatro"
                className="h-12"
                required
              />
            </div>
          </Card>

          {/* Descrizione */}
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Descrizione
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descrivi il tuo evento..."
                rows={5}
                className="resize-none"
                required
              />
            </div>
          </Card>

          {/* Categorie */}
          <Card className="p-6 space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Categorie</Label>
              <p className="text-sm text-muted-foreground">
                Seleziona una o più categorie per il tuo evento
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => handleCategoryToggle(category.name)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                      formData.selectedCategories.includes(category.name)
                        ? category.color
                        : 'bg-card border-border text-muted-foreground hover:border-foreground/30'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Date */}
          <Card className="p-6 space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Data e Orario
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm">Data Inizio</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm">Data Fine (Opzionale)</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Luogo */}
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                Luogo
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Es: Teatro Lauro Rossi, Macerata"
                className="h-12"
                required
              />
            </div>
          </Card>

          {/* Prezzo */}
          <Card className="p-6 space-y-4">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Prezzo</Label>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Evento Gratuito</p>
                  <p className="text-xs text-muted-foreground">Attiva se l'evento è ad ingresso libero</p>
                </div>
                <Switch
                  checked={formData.isFree}
                  onCheckedChange={(checked) => setFormData({...formData, isFree: checked, price: checked ? '' : formData.price})}
                />
              </div>

              {!formData.isFree && (
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm">Prezzo in Euro</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="15.00"
                    className="h-12"
                    required
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 h-12 rounded-xl"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              Salva Modifiche
            </Button>
          </div>

        </form>
      </div>

      <OrganizerNavbar />
    </div>
  )
}
