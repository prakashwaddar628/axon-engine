import ResumeBuilder from "@/components/ResumeBuilder";
import DailyChallenge from "@/components/DailyChallenge";
import { BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
                <BrainCircuit className="h-8 w-8 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">AXON</h1>
                <p className="text-slate-500 dark:text-slate-400">Autonomous Career Engine v1.0</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">Welcome back, Prakash</p>
            <p className="text-xs text-muted-foreground">Master Profile: Active</p>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Workspace (Resume Tailor) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Tailor Engine</h2>
            </div>
            <ResumeBuilder />
          </div>

          {/* Sidebar (Daily Challenge + Stats) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl font-semibold">Daily Intelligence</h2>
            <DailyChallenge />
            
            {/* Placeholder for future Stats component */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="font-semibold mb-2">Application Stats</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                        <span>Resumes Tailored</span>
                        <span className="font-medium text-foreground">12</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Challenges Solved</span>
                        <span className="font-medium text-foreground">8</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
