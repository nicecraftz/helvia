'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Plus, Calendar, CreditCard } from 'lucide-react'

export default function OrganizerNavbar() {
  const pathname = usePathname()

  const links = [
    { href: '/organizer', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/organizer/crea-evento', icon: Plus, label: 'Crea' },
    { href: '/organizer/eventi', icon: Calendar, label: 'Eventi' },
    { href: '/organizer/abbonamento', icon: CreditCard, label: 'Piano' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border z-50 shadow-2xl">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {links.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive
                    ? 'text-accent scale-110'
                    : 'text-muted-foreground hover:text-foreground hover:scale-105'
                }`}
              >
                {isActive && (
                  <div className="absolute -top-1 w-10 h-1 bg-gradient-to-r from-accent via-primary to-secondary rounded-full animate-glow" />
                )}
                <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : ''}`} />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
