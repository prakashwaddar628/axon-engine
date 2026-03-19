"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DailyChallenge from "@/components/DailyChallenge";
import SkillRadar from "@/components/SkillRadar";
import ActiveSprint from "@/components/ActiveSprint";
import Sidebar from "@/components/Sidebar";
import { BrainCircuit } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("axon_user_profile");
    if (!stored) {
      router.push("/onboarding");
    } else {
      setProfile(JSON.parse(stored));
      setLoading(false);
    }
  }, [router]);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-transparent p-6 md:p-12 overflow-hidden selection:bg-primary/30 selection:text-white">
      {/* Dynamic Mesh Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] left-[10%] w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Ethereal Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center gap-6">
            <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center border-white/10 relative z-10">
                    <BrainCircuit className="h-8 w-8 text-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gradient font-sans">
                AXON
              </h1>
              <div className="flex items-center gap-3 mt-1">
                  <div className="h-1 w-1 rounded-full bg-primary animate-ping" />
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em]">Core Intelligence / v1.2</p>
              </div>
            </div>
          </div>
          
          <div className="glass px-8 py-4 rounded-[2rem] border-white/5 flex items-center gap-6 divide-x divide-white/10">
            <div className="pr-6">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Strategist</p>
                <p className="text-sm font-bold text-white tracking-tight">{profile?.name || "System User"}</p>
            </div>
            <div className="pl-6">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Neural Sync</p>
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Optimal</span>
                </div>
            </div>
          </div>
        </header>

        {/* Tactical Interface (Bento Grid) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Protocol */}
          <div className="lg:col-span-1 xl:col-span-1 h-[calc(100vh-16rem)] min-w-[100px] hidden xl:block sticky top-8 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
            <Sidebar />
          </div>

          {/* Core Workspace */}
          <div className="lg:col-span-12 xl:col-span-11 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 h-full">
            
            {/* Widget: Performance Matrix */}
            <div className="xl:col-span-2 glass rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden group hover:border-primary/20 transition-colors duration-500 animate-in fade-in zoom-in-95 duration-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <SkillRadar />
            </div>

            {/* Widget: Neural Quest */}
            <div className="xl:col-span-1 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
                <DailyChallenge />
            </div>

            {/* Widget: Tactical Roadmap (Full Width) */}
            <div className="md:col-span-2 xl:col-span-3 lg:h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <ActiveSprint />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
