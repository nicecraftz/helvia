'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InterestSelector } from '@/components/interest-selector'
import { Eye, EyeOff, Sparkles, Theater, GraduationCap, Music, User, Building2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'user' | 'business' | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  })
  const [businessFormData, setBusinessFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    vatNumber: '',
    companyName: '',
    username: '',
    password: '',
  })
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Selected interests:', selectedInterests)
    router.push('/login')
  }

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/organizer')
  }

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/5 via-background to-accent/5 p-6">
        <div className="w-full max-w-4xl space-y-8 animate-in fade-in zoom-in duration-700">
          {/* Logo */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Helvia
            </h1>
            <p className="text-xl text-muted-foreground">
              Scegli il tipo di account da creare
            </p>
          </div>

          {/* User type selection */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* User button */}
            <button
              onClick={() => setUserType('user')}
              className="group relative p-8 rounded-2xl border-2 border-border hover:border-secondary bg-background hover:bg-secondary/5 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/20 hover:scale-[1.02] text-left"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-border group-hover:border-secondary transition-colors">
                <div className="absolute inset-1 rounded-full bg-secondary scale-0 group-hover:scale-100 transition-transform" />
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
              Hai già un account?{' '}
              <Link
                href="/login"
                className="text-secondary hover:text-accent font-semibold transition-colors"
              >
                Accedi
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
      <div className={`hidden lg:flex lg:w-1/2 ${userType === 'business' ? 'bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10' : 'bg-gradient-to-br from-secondary/10 via-accent/5 to-primary/10'} p-12 flex-col justify-between relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className={`absolute top-20 left-20 w-64 h-64 ${userType === 'business' ? 'bg-accent/10' : 'bg-secondary/10'} rounded-full filter blur-3xl`} />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${userType === 'business' ? 'from-accent to-primary' : 'from-secondary to-accent'} rounded-xl flex items-center justify-center shadow-lg`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-3xl font-serif font-bold bg-gradient-to-r ${userType === 'business' ? 'from-accent to-primary' : 'from-secondary to-accent'} bg-clip-text text-transparent`}>
              Helvia
            </h1>
          </div>

          {userType === 'business' ? (
            <div className="space-y-6 max-w-md">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Diventa partner di Helvia
              </h2>
              <p className="text-lg text-muted-foreground">
                Registra la tua azienda e inizia a promuovere i tuoi eventi sulla piattaforma culturale più innovativa di Macerata.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-md">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Unisciti alla comunità culturale di Macerata
              </h2>
              <p className="text-lg text-muted-foreground">
                Crea il tuo profilo e inizia a ricevere raccomandazioni personalizzate su concerti, mostre, spettacoli teatrali e vita universitaria.
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${userType === 'business' ? 'bg-accent/20' : 'bg-primary/20'} flex items-center justify-center`}>
                  <Theater className={`w-6 h-6 ${userType === 'business' ? 'text-accent' : 'text-primary'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Sferisterio Arena</h3>
                  <p className="text-sm text-muted-foreground">{userType === 'business' ? 'Partner ufficiale' : 'Opera e concerti estivi'}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Università di Macerata</h3>
                  <p className="text-sm text-muted-foreground">{userType === 'business' ? 'Collaborazione attiva' : 'Eventi e vita studentesca'}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${userType === 'business' ? 'bg-primary/20' : 'bg-accent/20'} flex items-center justify-center`}>
                  <Music className={`w-6 h-6 ${userType === 'business' ? 'text-primary' : 'text-accent'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Centro Storico</h3>
                  <p className="text-sm text-muted-foreground">{userType === 'business' ? 'Visibilità garantita' : 'Cultura e tradizioni locali'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right duration-700 py-8">
          {/* Logo mobile */}
          <div className="lg:hidden text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${userType === 'business' ? 'from-accent to-primary' : 'from-secondary to-accent'} rounded-2xl shadow-lg mb-4`}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-4xl font-serif font-bold bg-gradient-to-r ${userType === 'business' ? 'from-accent to-primary' : 'from-secondary to-accent'} bg-clip-text text-transparent`}>
              Helvia
            </h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {userType === 'business' ? 'Registra la tua azienda' : 'Crea il tuo account'}
            </h2>
            <p className="text-muted-foreground">
              {userType === 'business' ? 'Compila i dati aziendali per iniziare' : 'Inizia a scoprire eventi culturali a Macerata'}
            </p>
          </div>

          <form onSubmit={userType === 'business' ? handleBusinessSubmit : handleUserSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground font-medium">
                  Nome
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Mario"
                  value={userType === 'business' ? businessFormData.firstName : formData.firstName}
                  onChange={(e) => {
                    if (userType === 'business') {
                      setBusinessFormData({ ...businessFormData, firstName: e.target.value })
                    } else {
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  }}
                  className="bg-background border-border rounded-xl h-12 focus:border-primary transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground font-medium">
                  Cognome
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Rossi"
                  value={userType === 'business' ? businessFormData.lastName : formData.lastName}
                  onChange={(e) => {
                    if (userType === 'business') {
                      setBusinessFormData({ ...businessFormData, lastName: e.target.value })
                    } else {
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  }}
                  className="bg-background border-border rounded-xl h-12 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {userType === 'business' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail" className="text-foreground font-medium">
                    Email Aziendale
                  </Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    placeholder="info@azienda.it"
                    value={businessFormData.businessEmail}
                    onChange={(e) =>
                      setBusinessFormData({ ...businessFormData, businessEmail: e.target.value })
                    }
                    className="bg-background border-border rounded-xl h-12 focus:border-accent transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-foreground font-medium">
                    Nome Azienda
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Es. Eventi Culturali Srl"
                    value={businessFormData.companyName}
                    onChange={(e) =>
                      setBusinessFormData({ ...businessFormData, companyName: e.target.value })
                    }
                    className="bg-background border-border rounded-xl h-12 focus:border-accent transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vatNumber" className="text-foreground font-medium">
                    Partita IVA
                  </Label>
                  <Input
                    id="vatNumber"
                    type="text"
                    placeholder="IT12345678901"
                    value={businessFormData.vatNumber}
                    onChange={(e) =>
                      setBusinessFormData({ ...businessFormData, vatNumber: e.target.value })
                    }
                    className="bg-background border-border rounded-xl h-12 focus:border-accent transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground font-medium">
                    Nome utente
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="eventiroma"
                    value={businessFormData.username}
                    onChange={(e) =>
                      setBusinessFormData({ ...businessFormData, username: e.target.value })
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
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mario.rossi@esempio.it"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background border-border rounded-xl h-12 focus:border-primary transition-all"
                    required
                  />
                </div>

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

                <div className="space-y-2 pt-2">
                  <Label className="text-foreground font-medium">
                    I tuoi interessi
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Scegli fino a 3 categorie che ti interessano
                  </p>
                  <InterestSelector 
                    selectedInterests={selectedInterests}
                    onInterestsChange={setSelectedInterests}
                    maxSelection={3}
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className={`w-full ${userType === 'business' ? 'bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90' : 'bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90'} text-white rounded-xl py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-secondary/30 hover:scale-[1.02] mt-6`}
            >
              Registrati
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
              Hai già un account?{' '}
              <Link
                href="/login"
                className={`${userType === 'business' ? 'text-accent hover:text-primary' : 'text-secondary hover:text-accent'} font-semibold transition-colors`}
              >
                Accedi
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
