"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Rocket, Sparkles, ShieldCheck, Cpu } from "lucide-react";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState({
        name: "",
        skills: "",
        projects: [
            { name: "", description: "", techStack: "", impact: "" }
        ]
    });

    const handleSave = () => {
        const formattedProfile = {
            ...profile,
            skills: profile.skills.split(",").map(s => s.trim()),
            projects: profile.projects.map(p => ({
                ...p,
                techStack: typeof p.techStack === 'string' ? p.techStack.split(",").map(s => s.trim()) : p.techStack
            }))
        };
        localStorage.setItem("axon_user_profile", JSON.stringify(formattedProfile));
        router.push("/");
    };

    const addProject = () => {
        setProfile({
            ...profile,
            projects: [...profile.projects, { name: "", description: "", techStack: "", impact: "" }]
        });
    };

    return (
        <main className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-6 selection:bg-primary/30 selection:text-white font-sans">
            {/* Dynamic Mesh Background */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-700" />
            </div>

            <div className="max-w-3xl w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center space-y-4">
                    <div className="inline-flex relative group">
                        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="h-20 w-20 glass rounded-[2rem] flex items-center justify-center border-white/10 relative z-10">
                            <BrainCircuit className="h-10 w-10 text-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight text-gradient mb-2">Initiate AXON</h1>
                        <p className="text-slate-500 text-sm font-medium tracking-wide">Sync your neural profile to activate the autonomous career engine.</p>
                    </div>
                </div>

                <div className="glass rounded-[3rem] border-white/5 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-700">
                    <div className="bg-white/5 px-10 py-6 border-b border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                <Cpu className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-mono leading-none">Sync Protocol</h3>
                                <p className="text-sm font-bold text-white mt-1">Step {step} of 2</p>
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            <div className={`h-1.5 w-6 rounded-full transition-all duration-500 ${step === 1 ? 'bg-primary' : 'bg-white/10'}`} />
                            <div className={`h-1.5 w-6 rounded-full transition-all duration-500 ${step === 2 ? 'bg-primary' : 'bg-white/10'}`} />
                        </div>
                    </div>

                    <div className="p-10 space-y-8">
                        {step === 1 ? (
                            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono ml-1">Identity Node</Label>
                                    <Input 
                                        placeholder="Enter your full name..." 
                                        className="h-14 glass bg-white/5 border-white/10 rounded-2xl px-6 font-medium text-white focus:ring-primary/20 focus:border-primary/40 transition-all"
                                        value={profile.name}
                                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono ml-1">Expertise Matrix (Comma Separated)</Label>
                                    <Input 
                                        placeholder="React, Python, Machine Learning..." 
                                        className="h-14 glass bg-white/5 border-white/10 rounded-2xl px-6 font-medium text-white focus:ring-primary/20 focus:border-primary/40 transition-all"
                                        value={profile.skills}
                                        onChange={(e) => setProfile({...profile, skills: e.target.value})}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                                {profile.projects.map((proj, idx) => (
                                    <div key={idx} className="glass bg-white/5 p-8 rounded-[2rem] border-white/5 space-y-6 relative group">
                                        <div className="absolute top-6 right-6 h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <Sparkles className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono ml-1">Project Name</Label>
                                                <Input 
                                                    placeholder="Laxpra Search..." 
                                                    className="h-12 glass bg-white/5 border-white/10 rounded-xl px-4 text-slate-200"
                                                    value={proj.name}
                                                    onChange={(e) => {
                                                        const newProjs = [...profile.projects];
                                                        newProjs[idx].name = e.target.value;
                                                        setProfile({...profile, projects: newProjs});
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono ml-1">Tech Stack</Label>
                                                <Input 
                                                    placeholder="Next.js, Tailwind..." 
                                                    className="h-12 glass bg-white/5 border-white/10 rounded-xl px-4 text-slate-200"
                                                    value={proj.techStack}
                                                    onChange={(e) => {
                                                        const newProjs = [...profile.projects];
                                                        newProjs[idx].techStack = e.target.value;
                                                        setProfile({...profile, projects: newProjs});
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono ml-1">Achievement Description</Label>
                                            <Textarea 
                                                placeholder="Briefly describe your high-alpha project..." 
                                                className="glass bg-white/5 border-white/10 rounded-xl p-4 text-slate-300 min-h-[100px] resize-none"
                                                value={proj.description}
                                                onChange={(e) => {
                                                    const newProjs = [...profile.projects];
                                                    newProjs[idx].description = e.target.value;
                                                    setProfile({...profile, projects: newProjs});
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button 
                                    variant="outline" 
                                    className="w-full h-14 rounded-2xl border-dashed border-white/10 hover:border-primary/40 hover:bg-primary/5 text-slate-500 transition-all"
                                    onClick={addProject}
                                >
                                    + Integrate Project Node
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="px-10 py-8 bg-white/5 border-t border-white/5 flex justify-between items-center backdrop-blur-3xl">
                        {step > 1 ? (
                            <Button variant="ghost" className="text-slate-500 hover:text-white rounded-xl" onClick={() => setStep(step - 1)}>
                                Revert Protocol
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2 text-slate-600">
                                <ShieldCheck className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Sync Verified</span>
                            </div>
                        )}
                        <Button 
                            className="h-14 px-8 bg-white text-black hover:bg-white/90 rounded-2xl font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] ml-auto"
                            onClick={() => step === 1 ? setStep(2) : handleSave()}
                        >
                            {step === 1 ? "Next Step" : "Initialize Neural Engine"}
                            <Rocket className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
