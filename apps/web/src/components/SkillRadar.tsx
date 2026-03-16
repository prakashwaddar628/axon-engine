"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000";

export default function SkillRadar() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const res = await fetch(`${API_URL}/api/engine/analyze`);
                const result = await res.json();

                // Transform proficiency data into recharts format
                const profData = result.proficiency?.skills || {};
                const radarData = Object.keys(profData).map(skill => ({
                    subject: skill,
                    A: profData[skill].score,
                    fullMark: 100,
                }));

                setData(radarData.length > 0 ? radarData : [
                    { subject: 'AI/ML', A: 85, fullMark: 100 },
                    { subject: 'Next.js', A: 90, fullMark: 100 },
                    { subject: 'FastAPI', A: 75, fullMark: 100 },
                    { subject: 'Python', A: 88, fullMark: 100 },
                    { subject: 'Cloud', A: 65, fullMark: 100 },
                ]);

            } catch (e) {
                console.error("Failed to fetch skills", e);
                // Fallback dummy data
                setData([
                    { subject: 'AI/ML', A: 85, fullMark: 100 },
                    { subject: 'Next.js', A: 90, fullMark: 100 },
                    { subject: 'FastAPI', A: 75, fullMark: 100 },
                    { subject: 'Python', A: 88, fullMark: 100 },
                    { subject: 'Cloud', A: 65, fullMark: 100 },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalysis();
    }, []);

    return (
        <Card className="h-full bg-slate-900/50 backdrop-blur-md border-slate-800 text-slate-100 shadow-xl">
            <CardHeader>
                <CardTitle>Dynamic Skill Radar</CardTitle>
                <CardDescription className="text-slate-400">Talent Density vs Market Trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="animate-pulse flex flex-col items-center gap-2">
                            <div className="h-32 w-32 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin"></div>
                        </div>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Proficiency"
                                dataKey="A"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.4}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                itemStyle={{ color: '#10b981' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
