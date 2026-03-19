"use client";

import { CheckCircle2, CircleDashed, Milestone, Target } from "lucide-react";

export default function ActiveSprint() {
    const steps = [
        { title: "Strategic Matrix Sync", status: "completed", date: "Initial" },
        { title: "Alignment Audit", status: "completed", date: "Phase 1" },
        { title: "Neural Linkage", status: "current", date: "Active" },
        { title: "Objective Tailoring", status: "upcoming", date: "Phase 2" },
    ];

    return (
        <div className="h-full glass rounded-[2.5rem] p-8 border-white/5 flex flex-col relative overflow-hidden group hover:border-primary/10 transition-colors duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 glass rounded-xl flex items-center justify-center border-white/10">
                        <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-mono leading-none">Protocol Sequence</h3>
                        <p className="text-lg font-bold text-white tracking-tight mt-1">Tactical Roadmap</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Sprint Efficiency</p>
                    <p className="text-sm font-bold text-emerald-400 font-mono">92%</p>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {steps.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col gap-4 group/step">
                        <div className="flex items-center gap-4">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
                                step.status === 'completed' 
                                    ? 'bg-primary/20 border-primary shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                                    : step.status === 'current'
                                    ? 'bg-primary/10 border-primary animate-pulse'
                                    : 'bg-white/5 border-white/10'
                            }`}>
                                {step.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                {step.status === 'current' && <CircleDashed className="h-4 w-4 text-primary animate-spin" />}
                                {step.status === 'upcoming' && <Milestone className="h-4 w-4 text-slate-600" />}
                            </div>
                            <div className="h-px flex-1 bg-white/5 hidden md:block group-last/step:hidden" />
                        </div>
                        
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-mono mb-1">{step.date}</p>
                            <p className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                                step.status === 'upcoming' ? 'text-slate-600' : 'text-slate-200 group-hover/step:text-primary'
                            }`}>
                                {step.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 opacity-40" />
        </div>
    );
}
