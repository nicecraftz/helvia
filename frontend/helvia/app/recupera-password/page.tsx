"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle2, Sparkles } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/30 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-all hover:gap-3 duration-300 animate-in fade-in slide-in-from-left duration-500"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Torna al login</span>
        </Link>

        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg shadow-primary/30 mb-4 animate-float">
            {submitted ? (
              <CheckCircle2 className="w-10 h-10 text-white animate-in zoom-in duration-500" />
            ) : (
              <Mail className="w-10 h-10 text-white" />
            )}
          </div>
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Helvia
          </h1>
          <p className="text-xl font-semibold text-foreground">
            {submitted ? "Email Inviata!" : "Recupera Password"}
          </p>
        </div>

        <div className="glass-effect rounded-3xl p-8 shadow-2xl border-2 border-primary/20 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          {!submitted ? (
            <>
              <div className="text-center mb-6 space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Non ti preoccupare
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Inserisci il tuo indirizzo email e ti invieremo un link magico
                  per reimpostare la tua password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-foreground font-medium"
                  >
                    Indirizzo Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="mario.rossi@esempio.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background border-border rounded-xl h-12 pl-12 focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
                >
                  Invia Link di Recupero
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 animate-in zoom-in duration-700">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 w-24 h-24 mx-auto">
                  <Sparkles className="absolute top-0 right-0 w-6 h-6 text-green-500 animate-ping" />
                  <Sparkles
                    className="absolute bottom-2 left-2 w-5 h-5 text-green-400 animate-ping"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Controlla la tua email!
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed px-4">
                  Abbiamo inviato le istruzioni per reimpostare la password a{" "}
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 space-y-2">
                <p className="text-xs text-muted-foreground">
                  💡 Non hai ricevuto l'email? Controlla la cartella spam o
                  riprova tra qualche minuto.
                </p>
              </div>

              <Link href="/login" className="block">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]">
                  Torna al Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
