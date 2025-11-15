"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import Navbar from "@/components/navbar";
import { Calendar, MapPin, TrendingUp, Users, Euro } from "lucide-react";

type EventTopic = {
  name: string;
};

type Event = {
  id: number;
  title: string;
  cost: number;
  image_url?: string;
  topics?: EventTopic[];
  start_datetime: string;
  location?: string;
  participants: number;
};

const categoryColors = [
  "bg-purple-500/20 text-purple-600 border-purple-500/30",
  "bg-cyan-500/20 text-cyan-600 border-cyan-500/30",
  "bg-pink-500/20 text-pink-600 border-pink-500/30",
  "bg-orange-500/20 text-orange-600 border-orange-500/30",
  "bg-green-500/20 text-green-600 border-green-500/30",
  "bg-blue-500/20 text-blue-600 border-blue-500/30",
];

export default function HomePage() {
  const { user, loading } = useUser();
  const [showAiRecommendations, setShowAiRecommendations] = useState(true);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<Event[]>([]);

  // Recupera preferenze utente
  useEffect(() => {
    const preferences = localStorage.getItem("userPreferences");
    if (preferences) {
      const parsed = JSON.parse(preferences);
      setShowAiRecommendations(parsed.aiRecommendations);
    }
  }, []);

  // Recupera eventi
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/event/");
        if (response.ok) {
          const events: Event[] = await response.json();
          setFeaturedEvents(events.slice(0, 3));
          setAiRecommendations(events.slice(3, 6));
        }
      } catch (e) {
        console.error("Errore fetch eventi", e);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Caricamento...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ⭐⭐⭐ HERO SECTION IDENTICO A PRIMA ⭐⭐⭐ */}

      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background pt-16 pb-20 px-6 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 text-[200px] font-bold text-primary/10">
            MC
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto relative space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 animate-in fade-in slide-in-from-top duration-500">
            <MapPin className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-primary">Macerata, Marche</p>
          </div>

          {/* 👇 QUI IL SALUTO UTENTE 👇 */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-in fade-in slide-in-from-top duration-700">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Buongiorno, {user.first_name}
            </span>
          </h1>

          <div className="space-y-2">
            <p className="text-foreground/90 text-2xl font-medium animate-in fade-in slide-in-from-top duration-700 delay-100">
              Scopri cosa succede oggi nella tua città
            </p>
            <p className="text-muted-foreground text-lg animate-in fade-in slide-in-from-top duration-700 delay-200">
              {showAiRecommendations
                ? `L'AI ha trovato eventi perfetti per te`
                : `Ci sono ${featuredEvents.length} eventi in primo piano oggi`}
            </p>
          </div>
        </div>
      </div>

      {/* ⭐⭐⭐ EVENTI IN PRIMO PIANO ⭐⭐⭐ */}

      <div className="max-w-screen-xl mx-auto px-6 mt-12 space-y-20">
        <section>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3 mb-8">
            <TrendingUp className="w-7 h-7 text-primary animate-pulse" />
            Eventi in Primo Piano
          </h2>

          <div className="space-y-16">
            {featuredEvents.map((event, index) => (
              <Link key={event.id} href={`/eventi/${event.id}`}>
                <div
                  className="gradient-border mb-15 overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom duration-500 hover:shadow-lg hover:shadow-secondary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-card rounded-2xl overflow-hidden">
                    <div className="relative">
                      <img
                        src={event.image_url || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-52 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      <div className="absolute top-4 right-4 px-4 py-2 bg-card/95 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
                        {event.cost === 0 ? (
                          <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                            <Euro className="w-4 h-4" /> Gratis
                          </span>
                        ) : (
                          <span className="text-foreground font-bold text-sm flex items-center gap-1">
                            <Euro className="w-4 h-4" /> {event.cost}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {event.topics?.map((topic, idx) => (
                          <span
                            key={idx}
                            className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full border ${
                              categoryColors[idx % categoryColors.length]
                            }`}
                          >
                            {topic.name}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl font-bold text-foreground leading-tight">
                        {event.title}
                      </h3>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {new Date(
                                event.start_datetime
                              ).toLocaleDateString("it-IT")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Ore{" "}
                              {new Date(
                                event.start_datetime
                              ).toLocaleTimeString("it-IT", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-foreground/80">
                          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {event.location || "Macerata, MC"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Macerata, MC
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-foreground/80">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {event.participants} partecipanti
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Confermati
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Navbar />
    </div>
  );
}
