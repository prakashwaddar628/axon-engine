import DailyChallenge from "@/components/DailyChallenge";
import SkillRadar from "@/components/SkillRadar";
import ActiveSprint from "@/components/ActiveSprint";
import Sidebar from "@/components/Sidebar";
import { BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent p-4 md:p-8">
      {/* Background radial gradient for Deep Slate aesthetic */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-background to-background" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <BrainCircuit className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-sm font-sans">
                AXON
              </h1>
              <p className="text-slate-400 text-sm font-mono tracking-wider">Autonomous Career Engine v1</p>
            </div>
          </div>
          <div className="text-right hidden md:block border border-slate-800/60 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-full">
            <p className="text-sm font-medium text-slate-200">Welcome, Prakash</p>
            <p className="text-xs text-emerald-400 font-mono">Master Profile: Synced</p>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">

          {/* Sidebar */}
          <div className="lg:col-span-3 h-[calc(100vh-12rem)] sticky top-8">
            <Sidebar />
          </div>

          {/* Main Dashboard Workspace */}
          <div className="lg:col-span-9 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top: Skill Radar */}
              <div className="h-[420px]">
                <SkillRadar />
              </div>

              {/* Daily Challenge Card replacing old large format */}
              <div className="h-[420px] flex flex-col">
                <DailyChallenge />
              </div>
            </div>

            {/* Bottom: Active Sprint */}
            <div>
              <ActiveSprint />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
