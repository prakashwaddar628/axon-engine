import ResumeBuilder from "@/components/ResumeBuilder";
import { BrainCircuit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResumeTailorPage() {
    return (
        <main className="min-h-screen bg-transparent p-4 md:p-8">
            {/* Background radial gradient for Deep Slate aesthetic */}
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-background to-background" />

            <div className="max-w-[1600px] mx-auto space-y-8 h-full flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between pb-6 border-b border-slate-800/50">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="hover:bg-slate-800/50 text-slate-400 hover:text-emerald-400 shrink-0">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                            <BrainCircuit className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-sm font-sans flex items-center gap-2">
                                AXON <span className="text-slate-500 text-lg font-mono font-medium">/ Tailor Engine</span>
                            </h1>
                        </div>
                    </div>
                    <div className="text-right hidden md:block border border-slate-800/60 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-full">
                        <p className="text-xs text-emerald-400 font-mono">Status: Connected to LLM Engine</p>
                    </div>
                </header>

                {/* Workspace - Resume Tailor fills remaining height */}
                <div className="flex-1 w-full relative">
                    <div className="absolute inset-0 pb-10">
                        <ResumeBuilder />
                    </div>
                </div>
            </div>
        </main>
    );
}
