import { Button } from "@/components/ui/button";
import { FileText, Cpu, Settings, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const pathname = usePathname();
    const menu = [
        { title: "Terminal", icon: LayoutDashboard, href: "/" },
        { title: "Tailor Engine", icon: FileText, href: "/resume-tailor" },
        { title: "System Quest", icon: Cpu, href: "/quest" },
        { title: "Configuration", icon: Settings, href: "/settings" },
    ];

    const handleReset = () => {
        if (confirm("Reset System Neural Sync? All local profile data will be purged.")) {
            localStorage.removeItem("axon_user_profile");
            window.location.reload();
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950/40 backdrop-blur-md border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800/30 bg-slate-900/20">
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/70 font-mono font-bold">
                    System Hub
                </p>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
                {menu.map((item, idx) => (
                    <Link href={item.href} key={idx}>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-4 px-4 py-6 rounded-2xl transition-all duration-300 group",
                                pathname === item.href 
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                    : "hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-transparent"
                            )}
                        >
                            <item.icon className={cn(
                                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                                pathname === item.href ? "text-emerald-400" : "text-slate-500"
                            )} />
                            <span className="font-medium tracking-tight">{item.title}</span>
                        </Button>
                    </Link>
                ))}
            </nav>

            <div className="p-4 mt-auto border-t border-slate-800/30 bg-slate-950/20">
                <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-4 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl px-4 py-5"
                    onClick={handleReset}
                >
                    <LogOut className="h-4 w-4" />
                    <span className="text-xs font-mono">Purge Profile</span>
                </Button>
            </div>
        </div>
    );
}
