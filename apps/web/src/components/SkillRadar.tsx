import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getAnalysisAction } from "@/lib/actions";
import { Activity } from "lucide-react";

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
        <Card className="h-full bg-slate-950/40 backdrop-blur-md border-slate-800/50 text-slate-100 rounded-3xl shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="bg-slate-900/20 border-b border-slate-800/30 py-4 px-6 flex flex-row items-center gap-3">
                <Activity className="h-4 w-4 text-emerald-400" />
                <div>
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-400/90 font-mono">Neural Proficiency</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-6 flex items-center justify-center">
                {loading ? (
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="h-32 w-32 rounded-full border-4 border-emerald-500/10 border-t-emerald-500/40 animate-spin"></div>
                        <span className="text-[10px] font-mono text-slate-500 tracking-widest">ANALYZING...</span>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="#1e293b" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600, fontFamily: 'monospace' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Proficiency"
                                dataKey="A"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.15}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                                itemStyle={{ color: '#10b981' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
