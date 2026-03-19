import { Button } from "@/components/ui/button";
import { FileText, Cpu, Settings, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const pathname = usePathname();
    const menu = [
        { title: "Dashboard", icon: LayoutDashboard, href: "/" },
        { title: "Tailor Engine", icon: FileText, href: "/resume-tailor" },
        { title: "System Quest", icon: Cpu, href: "/quest" },
        { title: "Settings", icon: Settings, href: "/settings" },
    ];

    const handleReset = () => {
        if (confirm("Purge Neural Profile? This will reset your environment configuration.")) {
            localStorage.removeItem("axon_user_profile");
            window.location.reload();
        }
    };

    return (
        <div className="h-full flex flex-col glass rounded-[2.5rem] overflow-hidden m-2 transition-all duration-500 ease-in-out">
            <div className="p-8 flex items-center justify-center">
                <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="h-10 w-10 glass rounded-2xl flex items-center justify-center border-white/10 relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                    </div>
                </div>
            </div>
            
            <nav className="flex-1 px-4 space-y-6 pt-4">
                {menu.map((item, idx) => (
                    <Link href={item.href} key={idx} className="block group">
                        <div className="flex flex-col items-center gap-2">
                            <div className={cn(
                                "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative",
                                pathname === item.href 
                                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-110" 
                                    : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                            )}>
                                <item.icon className="h-5 w-5" />
                                {pathname === item.href && (
                                    <div className="absolute -left-1 h-6 w-1 bg-primary rounded-full blur-[2px]" />
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold tracking-widest uppercase transition-all duration-300",
                                pathname === item.href ? "text-primary opacity-100" : "text-slate-600 opacity-0 group-hover:opacity-100"
                            )}>
                                {item.title.split(' ')[0]}
                            </span>
                        </div>
                    </Link>
                ))}
            </nav>

            <div className="p-6 space-y-4">
                <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-12 w-12 rounded-2xl text-slate-500 hover:text-red-400 hover:bg-red-400/10"
                    onClick={handleReset}
                >
                    <LogOut className="h-5 w-5" />
                </Button>
                <div className="h-12 w-12 rounded-2xl glass border-white/5 flex items-center justify-center group cursor-help transition-all duration-300 hover:scale-105">
                    <User className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
            </div>
        </div>
    );
}
