"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { getAnalysisAction } from "@/lib/actions";
import { Activity, ShieldCheck, Zap } from "lucide-react";

export default function SkillRadar() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const stored = localStorage.getItem("axon_user_profile");
                const profile = stored ? JSON.parse(stored) : null;
                if (!profile) return;
                const result = await getAnalysisAction(profile);
                if (result.error) throw new Error(result.error);

                const profData = result.proficiency?.skills || {};
                const radarData = Object.keys(profData).map(skill => ({
                    subject: skill,
                    A: profData[skill].score,
                    fullMark: 100,
                }));

                setData(radarData.length > 0 ? radarData : [
                    { subject: 'AI/ML', A: 85, fullMark: 100 },
                    { subject: 'Next.js', A: 90, fullMark: 100 },
                    { subject: 'Cloud', A: 65, fullMark: 100 },
                    { subject: 'Python', A: 75, fullMark: 100 },
                ]);
            } catch (e) {
                console.error("Failed to fetch skills", e);
                setData([
                    { subject: 'Strategy', A: 80, fullMark: 100 },
                    { subject: 'Technical', A: 90, fullMark: 100 },
                    { subject: 'Market', A: 70, fullMark: 100 },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalysis();
    }, []);

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 glass rounded-xl flex items-center justify-center border-white/10">
                        <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-mono leading-none">Intelligence Matrix</h3>
                        <p className="text-lg font-bold text-white tracking-tight mt-1">Neural Proficiency</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary/20 border border-primary/40 animate-pulse" />
                    <div className="h-2 w-2 rounded-full bg-cyan-500/20 border border-cyan-500/40" />
                </div>
            </div>

            <div className="flex-1 min-h-[300px] relative">
                {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <div className="h-24 w-24 rounded-full border-2 border-white/5 border-t-primary/40 animate-spin" />
                        <span className="text-[10px] font-mono text-slate-500 tracking-[0.4em] uppercase">Processing...</span>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="rgba(255,255,255,0.05)" />
                            <PolarAngleAxis 
                                dataKey="subject" 
                                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }} 
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Proficiency"
                                dataKey="A"
                                stroke="var(--primary)"
                                fill="var(--primary)"
                                fillOpacity={0.1}
                                strokeWidth={2}
                            />
                            <Tooltip
                                contentStyle={{ 
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                                    backdropFilter: 'blur(12px)',
                                    borderColor: 'rgba(255,255,255,0.1)', 
                                    borderRadius: '16px', 
                                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)'
                                }}
                                itemStyle={{ color: 'var(--primary)', fontWeight: 700 }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-primary/60" />
                    <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Growth</p>
                        <p className="text-xs font-bold text-white">+12.4%</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-cyan-500/60" />
                    <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Verified</p>
                        <p className="text-xs font-bold text-white">Neural Tier 1</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
