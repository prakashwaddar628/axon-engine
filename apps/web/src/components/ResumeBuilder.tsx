"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, FileCode, Zap, Sparkles, Loader2, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { tailorResumeAction } from "@/lib/actions";

// Dynamically import PDFRenderer to avoid SSR issues with @react-pdf/renderer
const PDFPreview = dynamic(() => import("./PDFRenderer"), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full flex items-center justify-center bg-white/5 glass rounded-[2rem]">Loading Preview Engine...</div>
});

export default function ResumeBuilder() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [tailoredData, setTailoredData] = useState<any>(null);

  const handleTailor = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    try {
      const stored = localStorage.getItem("axon_user_profile");
      const profile = stored ? JSON.parse(stored) : null;
      
      if (!profile) {
          alert("Initiate Neural Sync (Onboarding) before tailoring.");
          return;
      }

      const result = await tailorResumeAction({
          jobDescription: jd,
          masterProfile: profile
      });

      if (result.error) throw new Error(result.error);
      
      setTailoredData({
        ...result,
        master_profile: profile
      });
    } catch (error) {
      console.error("Neural tailoring failed:", error);
      alert("Neural tailoring failed. System recalibrating...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-12 h-full">
      <div className="lg:col-span-12 xl:col-span-5 space-y-8">
        <div className="glass rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <FileCode className="h-6 w-6 text-primary" />
              </div>
          </div>

          <div className="space-y-8">
            <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] font-mono leading-none mb-3 text-glow-primary">Input Matrix</h3>
                <h2 className="text-2xl font-bold text-white tracking-tight">Requirement Analysis</h2>
                <p className="text-sm text-slate-500 mt-2">Inject the target Job Description to initiate alignment protocols.</p>
            </div>

            <div className="relative">
                <Textarea
                    placeholder="Paste target Job Description here..."
                    className="min-h-[450px] glass bg-white/5 border-white/10 rounded-3xl p-8 font-mono text-sm leading-relaxed text-slate-300 focus:ring-primary/20 focus:border-primary/40 transition-all duration-500 custom-scrollbar resize-none shadow-inner"
                    value={jd}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJd(e.target.value)}
                />
                <div className="absolute bottom-6 right-6 pointer-events-none opacity-20">
                    <Brain className="h-12 w-12 text-primary" />
                </div>
            </div>

            <Button 
                onClick={handleTailor} 
                disabled={loading || !jd.trim()} 
                className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
            >
                {loading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="uppercase tracking-widest text-xs">Processing Neural Weights...</span>
                    </>
                ) : (
                    <>
                        <Zap className="h-5 w-5 fill-current" />
                        <span className="uppercase tracking-widest text-xs">Execute Tactical Alignment</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                )}
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 flex flex-col min-h-[700px]">
        {tailoredData ? (
          <div className="flex-1 glass rounded-[2.5rem] border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700 flex flex-col">
             <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex justify-between items-center backdrop-blur-3xl">
                 <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em] leading-none">Intelligence Output</span>
                 </div>
                 <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                     <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                 </div>
             </div>
             <div className="flex-1 h-full">
                <PDFPreview data={tailoredData} />
             </div>
          </div>
        ) : (
          <div className="flex-1 glass rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600 border-dashed border-2 border-white/5 gap-8 p-16 text-center group hover:border-primary/10 transition-all duration-700 min-h-[600px]">
            <div className="relative">
                <div className="absolute -inset-8 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="h-24 w-24 rounded-[2rem] glass border-white/5 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                    <Brain className="h-12 w-12 text-slate-800 group-hover:text-primary/40 transition-colors" />
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-400 group-hover:text-white transition-colors">Tactical Preview Pending</h3>
                <p className="max-w-[320px] text-sm leading-relaxed text-slate-600 font-medium">Inject a target Job Description to initiate the neural tailoring sequence and generate your tactical resume.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
