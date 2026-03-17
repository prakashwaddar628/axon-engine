import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, CircleDashed, Milestone } from "lucide-react";

export default function ActiveSprint() {
    const steps = [
        { title: "Strategic Profile Matrix", status: "completed", date: "Initial Sync" },
        { title: "Market Alignment Audit", status: "completed", date: "Today" },
        { title: "Daily Quest: Neural Linkage", status: "current", date: "Active" },
        { title: "Targeted Tailoring: High Alpha Roles", status: "upcoming", date: "Next Phase" },
    ];

    return (
        <Card className="bg-slate-950/30 backdrop-blur-md border border-slate-800/50 text-slate-100 rounded-3xl shadow-xl overflow-hidden">
            <CardHeader className="bg-slate-900/20 border-b border-slate-800/30 py-4 px-6 flex flex-row items-center gap-3">
                <Milestone className="h-4 w-4 text-emerald-400" />
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-400/90 font-mono">
                    Active Sprint
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6 relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 space-y-3 p-4 rounded-2xl bg-slate-900/20 border border-slate-800/30 hover:border-emerald-500/20 transition-all duration-300">
                            <div className="flex justify-between items-center">
                                {step.status === "completed" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                                {step.status === "current" && <CircleDashed className="h-5 w-5 text-emerald-400 animate-spin-slow" />}
                                {step.status === "upcoming" && <CircleDashed className="h-5 w-5 text-slate-700" />}
                                <span className="text-[10px] font-mono text-slate-500">{step.date}</span>
                            </div>
                            <p className={`text-sm font-semibold tracking-tight leading-tight ${step.status === 'upcoming' ? 'text-slate-500' : 'text-slate-200'}`}>
                                {step.title}
                            </p>
                        </div>
                    ))}
                    {/* Background trail line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -translate-y-1/2 z-0 hidden md:block" />
                </div>
            </CardContent>
        </Card>
    );
}
