"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Euro,
  Sparkles,
  Users,
  Share2,
  CheckCircle2,
} from "lucide-react";

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [canShare, setCanShare] = useState(true);

  useEffect(() => {
    // Carica preferenze dal localStorage
    const preferences = localStorage.getItem("userPreferences");
    if (preferences) {
      const parsed = JSON.parse(preferences);
      setCanShare(parsed.shareActivity);
    }
  }, []);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/event/${eventId}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        } else {
          console.error("Errore nel recupero evento");
        }
      } catch (e) {
        console.error("Errore nella fetch evento:", e);
      }
    }
    if (eventId) fetchEvent();
  }, [eventId]);

  const handleParticipate = () => {
    if (!canShare) {
      alert(
        'Per partecipare agli eventi, devi abilitare "Condividi Attività" nelle Preferenze.'
      );
      return;
    }
    setIsParticipating(!isParticipating);
    // Qui potresti chiamare API per partecipazione evento
  };

  if (!event) return <p>Caricamento...</p>;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-80">
        <img
          src={event.image_url || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-3 bg-card/95 backdrop-blur-md rounded-xl shadow-xl hover:bg-card hover:scale-105 transition-all border border-border/50"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>

        <div className="absolute bottom-6 left-6">
          {event.topics && event.topics.length > 0 && (
            <span className="inline-block px-5 py-2 bg-purple-500/90 backdrop-blur-md text-white text-sm font-semibold rounded-full shadow-lg border border-purple-400/50">
              {event.topics[0].name}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10 space-y-8 pb-8">
        <div className="glass-effect rounded-3xl p-8 shadow-2xl border-2 border-primary/20">
          <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Data
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(event.start_datetime).toLocaleDateString("it-IT")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Orario
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(event.start_datetime).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" - "}
                  {new Date(event.end_datetime).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Luogo
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {event.location || "Posizione non disponibile"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Euro className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Ingresso
                </p>
                <p
                  className={`text-sm font-semibold ${
                    event.cost === 0 ? "text-green-600" : "text-foreground"
                  }`}
                >
                  {event.cost === 0 ? "Gratuito" : `${event.cost} €`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {event.participants} persone partecipano
                </p>
                <p className="text-xs text-muted-foreground">
                  Unisciti a loro!
                </p>
              </div>
            </div>
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-8 shadow-xl border-2 border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            📖 Descrizione
          </h2>
          <p className="text-foreground/90 leading-relaxed text-base">
            {event.description}
          </p>

          <div className="mt-6 pt-6 border-t border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Cosa aspettarsi
            </h3>
            <ul className="space-y-2 text-foreground/80">
              {/* Puoi eventualmente inserire punti dinamici se disponibili */}
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Evento unico e coinvolgente</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Partecipazione attiva consigliata</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Incontri con esperti del settore</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="sticky bottom-24 left-0 right-0">
          {!canShare && (
            <div className="mb-4 p-4 bg-orange-500/10 border-2 border-orange-500/30 rounded-2xl">
              <p className="text-sm text-orange-600 font-medium text-center">
                ⚠️ Abilita "Condividi Attività" nelle Preferenze per partecipare
                agli eventi
              </p>
            </div>
          )}

          <Button
            onClick={handleParticipate}
            disabled={!canShare}
            className={`w-full rounded-2xl py-8 text-xl font-bold shadow-2xl transition-all duration-300 ${
              isParticipating
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                : "bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white hover:scale-[1.02] hover:shadow-primary/50"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isParticipating ? (
              <span className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-7 h-7" />
                Partecipi a questo evento!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <Users className="w-7 h-7" />
                Partecipa
              </span>
            )}
          </Button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
