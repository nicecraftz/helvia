'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Navbar from '@/components/navbar'
import { Award, Lock, Settings, LogOut, TrendingUp, Calendar, Heart, Camera, Tag } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  const aiProfile = {
    musica: 60,
    cultura: 30,
    food: 10,
  }

  const userInterests = ['Musica', 'Arte']

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">
        <div className="glass-effect rounded-3xl p-8 shadow-xl border-2 border-primary/20 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-start gap-6 mb-8">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold">
                  MR
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Mario Rossi
              </h1>
              <p className="text-muted-foreground">@mariorossi</p>
              <p className="text-sm text-muted-foreground mt-1">
                mario.rossi@esempio.it
              </p>
              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full border border-primary/30">
                  Esploratore di Macerata
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Livello</p>
                <p className="text-4xl font-bold text-primary">5</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20">
              <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Eventi</p>
                <p className="text-4xl font-bold text-secondary">23</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-6 shadow-xl border-2 border-secondary/20 animate-in fade-in slide-in-from-left duration-500 delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Il Tuo Profilo AI</h2>
              <p className="text-xs text-muted-foreground">Generato automaticamente dai tuoi interessi</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground font-medium">Musica</span>
                <span className="text-primary font-bold">{aiProfile.musica}%</span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000" style={{ width: `${aiProfile.musica}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground font-medium">Cultura</span>
                <span className="text-secondary font-bold">{aiProfile.cultura}%</span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-secondary to-accent rounded-full transition-all duration-1000" style={{ width: `${aiProfile.cultura}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground font-medium">Food</span>
                <span className="text-accent font-bold">{aiProfile.food}%</span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${aiProfile.food}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-secondary/10 border border-secondary/20 rounded-xl">
            <p className="text-xs text-foreground leading-relaxed">
              💡 <span className="font-semibold">Insight:</span> Stai mostrando un forte interesse per eventi musicali e culturali. Ti piacciono gli eventi serali negli ultimi giorni!
            </p>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-6 shadow-xl border-2 border-primary/20 animate-in fade-in slide-in-from-left duration-500 delay-150">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">I Tuoi Interessi</h2>
                <p className="text-xs text-muted-foreground">Categorie che segui</p>
              </div>
            </div>
            <Link href="/profilo/interessi">
              <Button variant="ghost" className="text-primary hover:text-secondary font-medium">
                Modifica →
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {userInterests.map((interest) => (
              <span 
                key={interest}
                className="px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full border-2 border-primary/30"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-6 shadow-xl border-2 border-accent/20 animate-in fade-in slide-in-from-right duration-500 delay-200">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Riconoscimenti</h2>
            </div>
            <Link href="/riconoscimenti">
              <Button variant="ghost" className="text-primary hover:text-secondary font-medium">
                Vedi tutti →
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🎵', name: 'Amante Musica', color: 'from-purple-500 to-pink-500' },
              { icon: '🎨', name: 'Arte Lover', color: 'from-cyan-500 to-blue-500' },
              { icon: '⭐', name: 'Top Explorer', color: 'from-yellow-500 to-orange-500' },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-4 bg-card rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center shadow-lg text-2xl`}>
                  {badge.icon}
                </div>
                <p className="text-xs text-center text-foreground font-semibold">
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500 delay-300">
          <Link href="/profilo/modifica-password">
            <Button
              variant="outline"
              className="w-full justify-start gap-4 glass-effect border-2 border-border/50 rounded-2xl py-7 text-lg hover:bg-primary/5 hover:border-primary/50 transition-all hover:scale-[1.02]"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Modifica Password</span>
            </Button>
          </Link>

          <Link href="/profilo/preferenze">
            <Button
              variant="outline"
              className="w-full justify-start gap-4 glass-effect border-2 border-border/50 rounded-2xl py-7 text-lg hover:bg-secondary/5 hover:border-secondary/50 transition-all hover:scale-[1.02]"
            >
              <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-medium">Preferenze</span>
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-4 glass-effect border-2 border-destructive/30 rounded-2xl py-7 text-lg text-destructive hover:bg-destructive/10 hover:border-destructive transition-all hover:scale-[1.02]"
          >
            <div className="w-11 h-11 bg-destructive/10 rounded-xl flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">Esci</span>
          </Button>
        </div>
      </div>

      <Navbar />
    </div>
  )
}
