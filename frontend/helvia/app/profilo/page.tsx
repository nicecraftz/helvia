"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/navbar";
import {
  Award,
  Settings,
  LogOut,
  TrendingUp,
  Calendar,
  Heart,
  Camera,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    router.push("/login");
  };

  useEffect(() => {
    async function loadData() {
      try {
        // 1️⃣ USER INFO
        const resUser = await fetch("/api/me");
        if (resUser.ok) {
          const data = await resUser.json();
          setUser(data);
        }

        // 2️⃣ USER INTERESTS
        const resInterests = await fetch("/api/interests");
        if (resInterests.ok) {
          const data = await resInterests.json();
          setInterests(data.interests || []);
        }
      } catch (err) {
        console.error("Errore caricamento profilo:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Caricamento...
      </div>
    );
  }

  if (!user) {
    return <div className="p-10 text-center">Errore caricamento utente</div>;
  }

  const aiProfile = { musica: 60, cultura: 30, sociale: 10 };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">
        {/* CARD PROFILO */}
        <div className="glass-effect rounded-3xl p-8 shadow-xl border-2 border-primary/20 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-start gap-6 mb-8">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold">
                  {user.first_name?.[0]}
                  {user.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-1">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-muted-foreground">@{user.username}</p>

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
                <p className="text-sm text-muted-foreground font-medium">
                  Livello
                </p>
                <p className="text-4xl font-bold text-primary">5</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20">
              <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Eventi
                </p>
                <p className="text-4xl font-bold text-secondary">23</p>
              </div>
            </div>
          </div>
        </div>

        {/* INTERESTS CARD */}
        <div className="glass-effect rounded-3xl p-6 shadow-xl border-2 border-primary/20 animate-in fade-in slide-in-from-left duration-500 delay-150">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  I Tuoi Interessi
                </h2>
                <p className="text-xs text-muted-foreground">
                  Categorie che segui
                </p>
              </div>
            </div>
            <Link href="/profilo/interessi">
              <Button
                variant="ghost"
                className="text-primary hover:text-secondary font-medium"
              >
                Modifica →
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {interests.length > 0 ? (
              interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full border-2 border-primary/30"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                Nessun interesse selezionato
              </p>
            )}
          </div>
        </div>

        {/* LOGOUT */}
        <div className="space-y-9 animate-in fade-in slide-in-from-bottom duration-500 delay-300">
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
  );
}
