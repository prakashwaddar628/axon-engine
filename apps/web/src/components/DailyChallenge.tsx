"use client";

import { useEffect, useState } from "react";
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
      <div className="w-full h-full glass rounded-[2.5rem] animate-pulse flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-primary/20 animate-spin" />
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div className="h-full glass rounded-[2.5rem] p-8 border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6">
          <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">{challenge.difficulty}</span>
          </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-mono">Neural Quest</h3>
                <p className="text-xl font-bold text-white tracking-tight mt-1 leading-tight">{challenge.title}</p>
            </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed font-sans line-clamp-3">
          {challenge.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
            <div className="glass bg-white/5 p-4 rounded-3xl border-white/5">
                <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Runtime</span>
                </div>
                <p className="text-sm font-bold text-white uppercase font-mono">{challenge.time_limit}</p>
            </div>
            <div className="glass bg-white/5 p-4 rounded-3xl border-white/5">
                <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-3 w-3 text-slate-500" />
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Yield</span>
                </div>
                <p className="text-sm font-bold text-white uppercase font-mono">50 XP</p>
            </div>
        </div>
      </div>

      <Button className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-[1.5rem] font-bold text-sm tracking-tight mt-8 transition-transform active:scale-95">
        Initiate Protocol
      </Button>
    </div>
  );
}
