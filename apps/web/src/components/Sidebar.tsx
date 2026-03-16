import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Cpu, Settings, Target } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    const menu = [
        { title: "Dashboard", icon: Target, href: "/" },
        { title: "Resume Tailor", icon: FileText, href: "/resume-tailor" },
        { title: "Daily Quest", icon: Cpu, href: "/quest" },
        { title: "Settings", icon: Settings, href: "/settings" },
    ];

    return (
        <Card className="h-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 text-slate-100 flex flex-col shadow-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-800/50 bg-slate-950/40">
                <CardTitle className="text-sm uppercase tracking-widest text-emerald-400 font-mono">
                    Jarvis Command
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 space-y-2">
                {menu.map((item, idx) => (
                    <Link href={item.href} key={idx}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 hover:bg-slate-800/50 hover:text-emerald-400 text-slate-300 transition-all font-sans"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Button>
                    </Link>
                ))}
            </CardContent>
            <div className="p-4 border-t border-slate-800/50 bg-slate-950/40 text-xs text-slate-500 font-mono text-center">
                v1.0.0-beta.2
            </div>
        </Card>
    );
}
