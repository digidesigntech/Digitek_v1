"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, ArrowRight } from "lucide-react";

export default function DigiDesignLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("dashboardAuth", "true");
      window.location.href = "/digi-design-portfolio/dashboard";
    } else {
      setError(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-md">
        <div className="glass rounded-2xl p-8 md:p-10 purple-glow">
          <div className="flex flex-col items-center text-center mb-8">
            <Image
              src="/digi-design-portfolio/logo_gold.png"
              alt="Digi Designs"
              width={520}
              height={240}
              priority
              className="h-14 w-auto select-none drop-shadow-[0_0_18px_rgba(255,212,121,0.35)] mb-6"
            />
            <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
              Dashboard Login
            </h1>
            <p className="text-sm text-gray-400">
              Authorised access only.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400 text-center">
                Incorrect password. Try again.
              </p>
            )}
            <button
              onClick={handleLogin}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 font-semibold transition-colors"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
