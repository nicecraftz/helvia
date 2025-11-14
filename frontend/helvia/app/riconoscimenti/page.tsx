'use client'

import Link from 'next/link'
import Navbar from '@/components/navbar'
import { Award, Star, Users, Calendar, Heart, Zap, Trophy, Target } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'

const achievements = [
  {
    id: 1,
    icon: Star,
    emoji: '⭐',
    title: 'Primo Evento',
    description: 'Hai partecipato al tuo primo evento a Macerata!',
    unlocked: true,
    gradient: 'from-yellow-500 to-orange-500',
    points: 50,
  },
  {
    id: 2,
    icon: Users,
    emoji: '👥',
    title: 'Sociale',
    description: 'Hai partecipato a 5 eventi sociali',
    unlocked: true,
    gradient: 'from-blue-500 to-cyan-500',
    points: 100,
  },
  {
    id: 3,
    icon: Calendar,
    emoji: '📅',
    title: 'Frequentatore Abituale',
    description: 'Hai partecipato a eventi per 3 settimane consecutive',
    unlocked: true,
    gradient: 'from-green-500 to-emerald-500',
    points: 150,
  },
  {
    id: 4,
    icon: Heart,
    emoji: '❤️',
    title: 'Appassionato di Arte',
    description: 'Hai partecipato a 10 eventi artistici',
    unlocked: false,
    gradient: 'from-red-500 to-pink-500',
    points: 200,
    progress: 7,
    total: 10,
  },
  {
    id: 5,
    icon: Zap,
    emoji: '⚡',
    title: 'Esploratore di Macerata',
    description: 'Hai visitato tutti i luoghi culturali della città',
    unlocked: false,
    gradient: 'from-purple-500 to-violet-500',
    points: 250,
    progress: 8,
    total: 12,
  },
  {
    id: 6,
    icon: Award,
    emoji: '🏆',
    title: 'Ambasciatore Helvia',
    description: 'Hai invitato 5 amici sulla piattaforma',
    unlocked: false,
    gradient: 'from-orange-500 to-red-500',
    points: 300,
    progress: 2,
    total: 5,
  },
  {
    id: 7,
    icon: Trophy,
    emoji: '🎖️',
    title: 'Collezionista',
    description: 'Hai sbloccato 10 riconoscimenti',
    unlocked: false,
    gradient: 'from-amber-500 to-yellow-500',
    points: 500,
    progress: 3,
    total: 10,
  },
  {
    id: 8,
    icon: Target,
    emoji: '🎯',
    title: 'Sempre Presente',
    description: 'Hai partecipato a 50 eventi',
    unlocked: false,
    gradient: 'from-indigo-500 to-purple-500',
    points: 1000,
    progress: 23,
    total: 50,
  },
]

export default function AchievementsPage() {
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-top duration-500">
          <Link href="/profilo">
            <button className="w-12 h-12 flex items-center justify-center hover:bg-card rounded-xl transition-all hover:scale-110">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              I Tuoi Riconoscimenti
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Sblocca badge completando sfide</p>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-8 shadow-xl border-2 border-primary/20 animate-in fade-in slide-in-from-top duration-500 delay-100">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-3 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">Sbloccati</p>
              <p className="text-4xl font-bold text-primary">
                {unlockedCount} / {achievements.length}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl mb-3 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">Punti Totali</p>
              <p className="text-4xl font-bold text-secondary">
                {achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Progresso Generale</span>
              <span className="text-primary font-bold">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </span>
            </div>
            <div className="h-4 bg-muted/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-1000"
                style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`glass-effect rounded-3xl p-6 shadow-lg transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom ${
                  achievement.unlocked
                    ? 'border-2 border-primary/30 hover:border-primary/50 hover:scale-[1.02]'
                    : 'border-2 border-border/30 opacity-70 hover:opacity-100'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                      achievement.unlocked
                        ? `bg-gradient-to-br ${achievement.gradient}`
                        : 'bg-muted/30'
                    }`}
                  >
                    {achievement.unlocked ? (
                      <span className="text-4xl">{achievement.emoji}</span>
                    ) : (
                      <Icon className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {achievement.title}
                      </h3>
                      <span className="text-sm font-bold text-accent flex-shrink-0">
                        +{achievement.points} pt
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {achievement.description}
                    </p>
                    
                    {achievement.unlocked ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-600 text-sm font-semibold rounded-full">
                        <span className="text-lg">✓</span>
                        Sbloccato
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground font-medium">
                            Progresso
                          </span>
                          <span className="font-bold text-foreground">
                            {achievement.progress} / {achievement.total}
                          </span>
                        </div>
                        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${achievement.gradient} rounded-full transition-all duration-500`}
                            style={{
                              width: `${(achievement.progress! / achievement.total!) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/20 border border-border text-muted-foreground text-sm font-medium rounded-full">
                        🔒 Bloccato
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Navbar />
    </div>
  )
}
