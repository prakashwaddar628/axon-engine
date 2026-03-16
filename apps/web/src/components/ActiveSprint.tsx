import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, CircleDashed } from "lucide-react";

export default function ActiveSprint() {
    const steps = [
        { title: "Master Profile Analysis", status: "completed", date: "Today" },
        { title: "Skill Gap Identification", status: "completed", date: "Today" },
        { title: "Daily Challenge - Python APIs", status: "current", date: "Pending" },
        { title: "Resume Tailor: Microsoft Imagine Cup", status: "upcoming", date: "Tomorrow" },
    ];

    return (
        <Card className="bg-slate-900/40 backdrop-blur-md border border-slate-800 text-slate-100">
            <CardHeader>
                <CardTitle className="text-lg">Active Sprint: Next-Gen Roles</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1">
                                {step.status === "completed" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                                {step.status === "current" && <CircleDashed className="h-5 w-5 text-amber-500 animate-spin-slow" />}
                                {step.status === "upcoming" && <CircleDashed className="h-5 w-5 text-slate-600" />}
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${step.status === 'upcoming' ? 'text-slate-500' : 'text-slate-200'}`}>
                                    {step.title}
                                </p>
                                <p className="text-xs text-slate-500">{step.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
