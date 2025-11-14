'use client'

import { useState } from 'react'
import OrganizerNavbar from '@/components/organizer-navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'

const plans = [
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Perfetto per iniziare',
    icon: Sparkles,
    iconColor: 'text-gray-400',
    iconBg: 'bg-gray-500/10',
    price: 0,
    priceYearly: 0,
    sponsorships: 0,
    features: [
      'Fino a 3 eventi al mese',
      'Statistiche base',
      'Supporto via email',
    ],
    cta: 'Piano Attuale',
    current: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Per crescere velocemente',
    icon: Zap,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    price: 29,
    priceYearly: 23,
    sponsorships: 5,
    popular: true,
    features: [
      'Eventi illimitati',
      '5 sponsorizzazioni/mese',
      'Statistiche avanzate',
      'Badge "Professional"',
      'Supporto prioritario',
    ],
    cta: 'Upgrade a Professional',
    current: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Massima visibilità',
    icon: Crown,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    price: 79,
    priceYearly: 63,
    sponsorships: 15,
    features: [
      'Tutto di Professional',
      '15 sponsorizzazioni/mese',
      'Analytics completa',
      'Badge "Premium" esclusivo',
      'Account manager dedicato',
      'Priorità massima',
    ],
    cta: 'Upgrade a Premium',
    current: false,
  },
]

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Scegli il tuo piano
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aumenta la visibilità dei tuoi eventi con le sponsorizzazioni
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Mensile
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annuale
              <span className="ml-2 px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const displayPrice = billingCycle === 'yearly' ? plan.priceYearly : plan.price
            const Icon = plan.icon

            return (
              <Card
                key={plan.id}
                className={`relative p-8 space-y-6 transition-all hover:border-primary/50 ${
                  plan.popular ? 'border-primary/50 shadow-lg' : ''
                } ${plan.current ? 'border-muted' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Più popolare
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 flex items-center justify-center ${plan.iconBg} rounded-xl`}>
                  <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                </div>

                {/* Plan Info */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">€{displayPrice}</span>
                    <span className="text-muted-foreground">/mese</span>
                  </div>
                  {billingCycle === 'yearly' && plan.price > 0 && (
                    <p className="text-xs text-muted-foreground">
                      €{displayPrice * 12} all'anno
                    </p>
                  )}
                </div>

                {/* Sponsorships Badge */}
                {plan.sponsorships > 0 && (
                  <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                    <p className="text-sm font-semibold text-foreground">
                      {plan.sponsorships} sponsorizzazioni/mese
                    </p>
                  </div>
                )}

                {plan.sponsorships === 0 && (
                  <div className="p-3 bg-muted/50 border border-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Nessuna sponsorizzazione
                    </p>
                  </div>
                )}

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full h-11 font-medium ${
                    plan.current
                      ? 'bg-muted text-muted-foreground cursor-default'
                      : plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  }`}
                  disabled={plan.current}
                >
                  {plan.cta}
                </Button>
              </Card>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 p-8 bg-muted/30 border border-border rounded-2xl text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Come funzionano le sponsorizzazioni?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Le sponsorizzazioni mettono i tuoi eventi in evidenza nella homepage e nei risultati di ricerca,
            aumentando la visibilità fino al 300% e raggiungendo più partecipanti interessati.
          </p>
        </div>
      </div>

      <OrganizerNavbar />
    </div>
  )
}
