"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Clock, Trophy, Loader2, Sparkles } from "lucide-react";
import { getDailyChallengeAction } from "@/lib/actions";

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const stored = localStorage.getItem("axon_user_profile");
        const profile = stored ? JSON.parse(stored) : { skills: ["Python", "AI"] };
        
        const data = await getDailyChallengeAction(profile.skills);
        if (data.error) throw new Error(data.error);
        setChallenge(data);
      } catch (error) {
        console.error("Failed to fetch challenge:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, []);

  if (loading) {
    return (
      <Card className="w-full h-full bg-slate-950/40 backdrop-blur-md border-slate-800/50 rounded-3xl animate-pulse">
        <div className="p-12 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 text-emerald-500/20 animate-spin" />
        </div>
      </Card>
    );
  }

  if (!challenge) return null;

  return (
    <Card className="h-full bg-slate-950/40 backdrop-blur-md border-slate-800/50 text-slate-100 rounded-3xl shadow-xl overflow-hidden flex flex-col">
      <CardHeader className="bg-slate-900/20 border-b border-slate-800/30 py-4 px-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-400/90 font-mono">Neural Quest</CardTitle>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {challenge.difficulty}
        </span>
      </CardHeader>
      <CardContent className="flex-1 p-6 space-y-4">
        <h3 className="font-bold text-xl tracking-tight text-slate-100">{challenge.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-4">
          {challenge.description}
        </p>
        
        <div className="flex items-center gap-6 pt-4 border-t border-slate-800/30">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Clock className="h-3 w-3 text-emerald-500/50" />
                {challenge.time_limit}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Code className="h-3 w-3 text-emerald-500/50" />
                Universal Sync
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-slate-900/10">
        <Button className="w-full bg-slate-100 hover:bg-white text-slate-950 rounded-xl font-bold transition-all duration-300 py-6">
            Initiate Protocol
        </Button>
      </CardFooter>
    </Card>
  );
}
