'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Sparkles, LogIn, MapPin, Calendar, Users, User, Building2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'user' | 'business' | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [businessFormData, setBusinessFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/home')
  }

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/organizer')
  }

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6">
        <div className="w-full max-w-4xl space-y-8 animate-in fade-in zoom-in duration-700">
          {/* Logo */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Helvia
            </h1>
            <p className="text-xl text-muted-foreground">
              Scegli come vuoi accedere
            </p>
          </div>

          {/* User type selection */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* User button */}
            <button
              onClick={() => setUserType('user')}
              className="group relative p-8 rounded-2xl border-2 border-border hover:border-primary bg-background hover:bg-primary/5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] text-left"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    Sono un Utente
                  </h3>
                  <p className="text-muted-foreground">
                    Scopri eventi culturali, ricevi raccomandazioni personalizzate e connettiti con la comunità
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-border group-hover:border-primary transition-colors">
                <div className="absolute inset-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </button>

            {/* Business button */}
            <button
              onClick={() => setUserType('business')}
              className="group relative p-8 rounded-2xl border-2 border-border hover:border-accent bg-background hover:bg-accent/5 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover:scale-[1.02] text-left"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    Sono un Organizzatore
                  </h3>
                  <p className="text-muted-foreground">
                    Gestisci e promuovi i tuoi eventi, raggiungi il pubblico giusto e analizza le performance
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-border group-hover:border-accent transition-colors">
                <div className="absolute inset-1 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Non hai un account?{' '}
              <Link
                href="/registrati"
                className="text-primary hover:text-secondary font-semibold transition-colors"
              >
                Registrati
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Illustrative panel */}
      <div className={`hidden lg:flex lg:w-1/2 ${userType === 'business' ? 'bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10' : 'bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10'} p-12 flex-col justify-between relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-96 h-96 ${userType === 'business' ? 'bg-accent/10' : 'bg-primary/10'} rounded-full filter blur-3xl`} />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${userType === 'business' ? 'from-accent to-primary' : 'from-primary to-secondary'} rounded-xl flex items-center justify-center shadow-lg`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-3xl font-serif font-bold bg-gradient-to-r ${userType === 'business' ? 'from-accent to-primary' : 'from-primary to-secondary'} bg-clip-text text-transparent`}>
              Helvia
            </h1>
          </div>

          {userType === 'business' ? (
            <div className="space-y-6 max-w-md">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Portale Organizzatori
              </h2>
              <p className="text-lg text-muted-foreground">
                Gestisci i tuoi eventi, monitora le iscrizioni e raggiungi migliaia di utenti interessati alla cultura.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-md">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                La tua guida AI per la cultura di Macerata
              </h2>
              <p className="text-lg text-muted-foreground">
                Scopri concerti allo Sferisterio, mostre a Palazzo Buonaccorsi, eventi all'Università e molto altro con raccomandazioni personalizzate.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className={`w-10 h-10 rounded-full ${userType === 'business' ? 'bg-accent/10' : 'bg-primary/10'} flex items-center justify-center`}>
                <MapPin className={`w-5 h-5 ${userType === 'business' ? 'text-accent' : 'text-primary'}`} />
              </div>
              <span className="text-sm">{userType === 'business' ? 'Promuovi eventi in tutta Macerata' : 'Eventi in tutto il centro storico di Macerata'}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm">{userType === 'business' ? 'Gestione calendario eventi in tempo reale' : 'Calendario sempre aggiornato in tempo reale'}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className={`w-10 h-10 rounded-full ${userType === 'business' ? 'bg-primary/10' : 'bg-accent/10'} flex items-center justify-center`}>
                <Users className={`w-5 h-5 ${userType === 'business' ? 'text-primary' : 'text-accent'}`} />
              </div>
              <span className="text-sm">{userType === 'business' ? 'Raggiungi il pubblico giusto per i tuoi eventi' : 'Connettiti con altri studenti e appassionati'}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-muted-foreground">
          Ispirato a Helvia Recina, l'antica città romana del territorio maceratese
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right duration-700">
          {/* Logo mobile */}
          <div className="lg:hidden text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${userType === 'business' ? 'from-accent to-primary' : 'from-primary to-secondary'} rounded-2xl shadow-lg mb-4`}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-4xl font-serif font-bold bg-gradient-to-r ${userType === 'business' ? 'from-accent to-primary' : 'from-primary to-secondary'} bg-clip-text text-transparent`}>
              Helvia
            </h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {userType === 'business' ? 'Accesso Organizzatori' : 'Bentornato'}
            </h2>
            <p className="text-muted-foreground">
              {userType === 'business' ? 'Accedi al portale gestione eventi' : 'Accedi per continuare a scoprire eventi a Macerata'}
            </p>
          </div>

          <form onSubmit={userType === 'business' ? handleBusinessSubmit : handleUserSubmit} className="space-y-6">
            {userType === 'business' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Aziendale
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="info@azienda.it"
                    value={businessFormData.email}
                    onChange={(e) =>
                      setBusinessFormData({ ...businessFormData, email: e.target.value })
                    }
                    className="bg-background border-border rounded-xl h-12 focus:border-accent transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={businessFormData.password}
                      onChange={(e) =>
                        setBusinessFormData({ ...businessFormData, password: e.target.value })
                      }
                      className="bg-background border-border rounded-xl h-12 pr-12 focus:border-accent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground font-medium">
                    Nome utente
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="mariorossi"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="bg-background border-border rounded-xl h-12 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="bg-background border-border rounded-xl h-12 pr-12 focus:border-primary transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end">
              <Link
                href="/recupera-password"
                className={`text-sm ${userType === 'business' ? 'text-accent hover:text-primary' : 'text-primary hover:text-secondary'} font-medium transition-colors hover:underline`}
              >
                Password dimenticata?
              </Link>
            </div>

            <Button
              type="submit"
              className={`w-full ${userType === 'business' ? 'bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90' : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'} text-white rounded-xl py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] flex items-center justify-center gap-2`}
            >
              <LogIn className="w-5 h-5" />
              Accedi
            </Button>
          </form>

          <div className="text-center space-y-3">
            <button
              onClick={() => setUserType(null)}
              className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              ← Torna alla selezione
            </button>
            <p className="text-sm text-muted-foreground">
              Non hai un account?{' '}
              <Link
                href="/registrati"
                className={`${userType === 'business' ? 'text-accent hover:text-primary' : 'text-primary hover:text-secondary'} font-semibold transition-colors`}
              >
                Registrati
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
