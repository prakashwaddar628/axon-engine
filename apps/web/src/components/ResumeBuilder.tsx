"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import masterProfile from "@axon/shared";

// Dynamically import PDFRenderer to avoid SSR issues with @react-pdf/renderer
const PDFPreview = dynamic(() => import("./PDFRenderer"), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full flex items-center justify-center bg-muted/20">Loading Preview...</div>
});

const API_URL = "http://localhost:8000";

export default function ResumeBuilder() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [tailoredData, setTailoredData] = useState<any>(null);

  const handleTailor = async () => {
    if (!jd) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/resume/tailor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_description: jd }),
      });
      const data = await res.json();
      setTailoredData({
        ...data,
        master_profile: masterProfile
      });
    } catch (error) {
      console.error("Failed to tailor resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Paste the JD here</Label>
              <Textarea
                placeholder="Senior React Engineer at Google..."
                className="h-[300px] font-mono text-sm"
                value={jd}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJd(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleTailor} 
              disabled={loading || !jd} 
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Tailoring..." : "Tailor Resume"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {tailoredData ? (
          <PDFPreview data={tailoredData} />
        ) : (
          <Card className="h-[600px] flex items-center justify-center text-muted-foreground bg-muted/10 border-dashed">
            Enter a Job Description to generate your resume
          </Card>
        )}
      </div>
    </div>
  );
}
