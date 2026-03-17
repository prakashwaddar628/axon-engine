"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Brain, FileCode, Zap, Sparkles, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { tailorResumeAction } from "@/lib/actions";

// Dynamically import PDFRenderer to avoid SSR issues with @react-pdf/renderer
const PDFPreview = dynamic(() => import("./PDFRenderer"), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full flex items-center justify-center bg-muted/20">Loading Preview...</div>
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
    <div className="grid lg:grid-cols-12 gap-8 h-full">
      <div className="lg:col-span-12 xl:col-span-5 space-y-6">
        <Card className="bg-slate-950/40 backdrop-blur-md border border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden">
          <CardHeader className="bg-slate-900/20 border-b border-slate-800/30 py-6 px-8 flex flex-row items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
                <FileCode className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-400/90 font-mono">Input Matrix</CardTitle>
                <p className="text-[10px] text-slate-500 font-mono">Paste Job Description</p>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Paste the target Job Description (JD) here..."
                className="min-h-[400px] bg-slate-950/50 border-slate-800 rounded-2xl p-6 font-mono text-sm leading-relaxed text-slate-300 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all duration-300 custom-scrollbar"
                value={jd}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJd(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="p-8 bg-slate-900/10 border-t border-slate-800/20">
            <Button 
              onClick={handleTailor} 
              disabled={loading || !jd.trim()} 
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all duration-300 py-8 text-lg group shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              {loading ? (
                <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    <span>Processing Neural Weights...</span>
                </>
              ) : (
                <>
                    <Zap className="mr-3 h-5 w-5 fill-emerald-400 text-emerald-400 group-hover:scale-125 transition-transform" />
                    <span>Execute Tailor Engine</span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-12 xl:col-span-7 space-y-6 flex flex-col min-h-[600px]">
        {tailoredData ? (
          <div className="flex-1 bg-slate-950/40 backdrop-blur-md border border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
             <div className="bg-slate-900/40 p-4 border-b border-slate-800/30 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest leading-none">Output Preview</span>
                 </div>
                 <div className="flex gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-800" />
                     <div className="w-2 h-2 rounded-full bg-slate-800" />
                     <div className="w-2 h-2 rounded-full bg-slate-800" />
                 </div>
             </div>
             <div className="h-full">
                <PDFPreview data={tailoredData} />
             </div>
          </div>
        ) : (
          <Card className="flex-1 h-full min-h-[600px] flex flex-col items-center justify-center text-slate-500 bg-slate-950/20 border-dashed border-2 border-slate-800/50 rounded-3xl gap-6 p-12 text-center group hover:border-emerald-500/20 transition-all duration-500">
            <div className="p-6 rounded-full bg-slate-900/50 border border-slate-800/50 group-hover:bg-emerald-500/5 transition-all duration-500">
                <Brain className="h-12 w-12 text-slate-700 group-hover:text-emerald-500/40 transition-all duration-500" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-400">Analysis Pending</h3>
                <p className="max-w-[280px] text-sm leading-relaxed text-slate-600">Enter a target Job Description to initiate the neural tailoring sequence.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
