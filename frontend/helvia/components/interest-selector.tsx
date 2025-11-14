'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export const INTEREST_CATEGORIES = [
  { name: 'Musica', color: 'bg-purple-500/20 text-purple-600 border-purple-500/30 hover:bg-purple-500/30' },
  { name: 'Arte', color: 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30 hover:bg-cyan-500/30' },
  { name: 'Cinema', color: 'bg-pink-500/20 text-pink-600 border-pink-500/30 hover:bg-pink-500/30' },
  { name: 'Workshop', color: 'bg-orange-500/20 text-orange-600 border-orange-500/30 hover:bg-orange-500/30' },
  { name: 'Sociale', color: 'bg-green-500/20 text-green-600 border-green-500/30 hover:bg-green-500/30' },
  { name: 'Teatro', color: 'bg-violet-500/20 text-violet-600 border-violet-500/30 hover:bg-violet-500/30' },
]

interface InterestSelectorProps {
  selectedInterests: string[]
  onInterestsChange: (interests: string[]) => void
  maxSelection?: number
  showCounter?: boolean
}

export function InterestSelector({ 
  selectedInterests, 
  onInterestsChange, 
  maxSelection = 3,
  showCounter = true 
}: InterestSelectorProps) {
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter(i => i !== interest))
    } else if (selectedInterests.length < maxSelection) {
      onInterestsChange([...selectedInterests, interest])
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {INTEREST_CATEGORIES.map((category) => {
          const isSelected = selectedInterests.includes(category.name)
          const isDisabled = !isSelected && selectedInterests.length >= maxSelection

          return (
            <button
              key={category.name}
              type="button"
              onClick={() => !isDisabled && toggleInterest(category.name)}
              disabled={isDisabled}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium rounded-full border-2 transition-all duration-200',
                category.color,
                isSelected && 'ring-2 ring-offset-2 ring-primary scale-105',
                isDisabled && 'opacity-40 cursor-not-allowed',
                !isDisabled && 'cursor-pointer hover:scale-105'
              )}
            >
              {category.name}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          )
        })}
      </div>
      
      {showCounter && (
        <p className="text-sm text-muted-foreground">
          {selectedInterests.length} / {maxSelection} selezionati
        </p>
      )}
    </div>
  )
}
