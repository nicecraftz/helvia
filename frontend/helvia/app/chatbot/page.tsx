'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/navbar'
import { Send, Sparkles, Bot, User, Lightbulb } from 'lucide-react'

type Message = {
  id: number
  text: string
  isUser: boolean
  suggestions?: string[]
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Ciao! Sono l\'assistente AI di Helvia per Macerata. Come posso aiutarti a scoprire eventi culturali nella tua città?',
      isUser: false,
      suggestions: ['Eventi questo weekend', 'Cosa fare stasera?', 'Mostre d\'arte'],
    },
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = (text?: string) => {
    const messageText = text || inputValue
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
    }

    const aiResponse: Message = {
      id: messages.length + 2,
      text: 'Grazie per la tua domanda! Ho trovato diversi eventi interessanti a Macerata. Basandomi sui tuoi interessi, ti consiglio il Concerto al Teatro Lauro Rossi questo venerdì. Vuoi scoprire di più o preferisci altre opzioni?',
      isUser: false,
      suggestions: ['Dimmi di più', 'Altre opzioni', 'Eventi gratis'],
    }

    setMessages([...messages, userMessage, aiResponse])
    setInputValue('')
  }

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      <div className="glass-effect border-b border-border/50 p-6 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center shadow-lg">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent flex items-center gap-2">
              Assistente AI Helvia
              <Sparkles className="w-5 h-5 text-accent" />
            </h1>
            <p className="text-sm text-muted-foreground">
              Scopri eventi personalizzati per te a Macerata
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 max-w-screen-xl mx-auto w-full">
        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            <div
              className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom duration-500`}
            >
              {!message.isUser && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                  message.isUser
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                    : 'glass-effect text-foreground border border-border/50 shadow-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              {message.isUser && (
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 border-2 border-primary/30">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
            
            {message.suggestions && !message.isUser && (
              <div className="flex gap-2 flex-wrap ml-14 animate-in fade-in slide-in-from-left duration-500 delay-200">
                <Lightbulb className="w-4 h-4 text-accent mt-2" />
                {message.suggestions.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    size="sm"
                    variant="outline"
                    className="rounded-full bg-card border-secondary/30 hover:bg-secondary hover:text-white hover:border-secondary transition-all text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-border/50 glass-effect p-6 shadow-lg">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Chiedi all'AI di Helvia..."
              className="flex-1 bg-background border-border/50 rounded-xl h-14 px-5 text-base focus:border-primary transition-all"
            />
            <Button
              onClick={() => handleSend()}
              className="h-12 px-6 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-secondary/30 transition-all hover:scale-[1.05]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            L'AI può aiutarti a trovare eventi, creare itinerari e rispondere alle tue domande su Macerata
          </p>
        </div>
      </div>

      <Navbar />
    </div>
  )
}
