"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Rocket, User, Settings2 } from "lucide-react";

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
        // In a real app, this would call a Server Action to save to a DB
        // For now, we'll store in localStorage to simulate persistence
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
        <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />
            
            <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-4">
                        <BrainCircuit className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Initiate AXON
                    </h1>
                    <p className="text-slate-400">Configure your autonomous career agent for maximum performance.</p>
                </div>

                <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl">
                    <CardHeader>
                        <div className="flex justify-between items-center text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2">
                            <span>Step {step} of 2</span>
                            <span>{step === 1 ? "Identity & Core" : "Project Arsenal"}</span>
                        </div>
                        <CardTitle className="text-2xl">{step === 1 ? "Personal Context" : "Strategic Projects"}</CardTitle>
                        <CardDescription className="text-slate-400">
                            {step === 1 
                                ? "Who are you? Tell AXON about your core identity and expertise." 
                                : "Add your key technical achievements to build your intelligence base."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {step === 1 ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input 
                                        id="name" 
                                        placeholder="Tony Stark" 
                                        className="bg-slate-950/50 border-slate-800" 
                                        value={profile.name}
                                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="skills">Core Skills (comma separated)</Label>
                                    <Input 
                                        id="skills" 
                                        placeholder="React, Python, LLMs, RAG" 
                                        className="bg-slate-950/50 border-slate-800" 
                                        value={profile.skills}
                                        onChange={(e) => setProfile({...profile, skills: e.target.value})}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {profile.projects.map((proj, idx) => (
                                    <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950/30 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Project Name</Label>
                                                <Input 
                                                    placeholder="Project X" 
                                                    className="bg-slate-950/50 border-slate-800" 
                                                    value={proj.name}
                                                    onChange={(e) => {
                                                        const newProjs = [...profile.projects];
                                                        newProjs[idx].name = e.target.value;
                                                        setProfile({...profile, projects: newProjs});
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Tech Stack (comma separated)</Label>
                                                <Input 
                                                    placeholder="Next.js, FastAPI" 
                                                    className="bg-slate-950/50 border-slate-800" 
                                                    value={proj.techStack}
                                                    onChange={(e) => {
                                                        const newProjs = [...profile.projects];
                                                        newProjs[idx].techStack = e.target.value;
                                                        setProfile({...profile, projects: newProjs});
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea 
                                                placeholder="What did you build?" 
                                                className="bg-slate-950/50 border-slate-800" 
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
                                    className="w-full border-dashed border-slate-700 hover:border-emerald-500/50 text-slate-400"
                                    onClick={addProject}
                                >
                                    + Add Another Project
                                </Button>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-slate-800/50 pt-6">
                        {step > 1 && (
                            <Button variant="ghost" onClick={() => setStep(step - 1)}>
                                Back
                            </Button>
                        )}
                        <Button 
                            className="bg-emerald-600 hover:bg-emerald-500 text-white ml-auto"
                            onClick={() => step === 1 ? setStep(2) : handleSave()}
                        >
                            {step === 1 ? "Next: Strategic Experience" : "Finalize Neural Sync"}
                            {step === 2 && <Rocket className="ml-2 h-4 w-4" />}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
