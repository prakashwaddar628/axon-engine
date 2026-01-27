"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "@/components/ResumePDF";
import DailyChallenge from "@/components/DailyChallenge";
import { useState } from "react";

export default function Home() {
  const [jd, setJd] = useState("");
  const [tailoredText, setTailoredText] = useState("");

  const handleTailor = async () => {
    const res = await fetch("http://127.0.0.1:8000/tailor-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_description: jd }),
    });
    const data = await res.json();
    setTailoredText(data.tailored_bullets);
  };
  return (
    <main className="min-h-screen p-8 md:p-24 bg-background">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tighter text-primary">
            AXON Engine
          </h1>
          <p className="text-muted-foreground text-lg">
            Personalized Career Intelligence v3.0
          </p>
        </header>

        <section className="grid grid-cols-1 gap-8">
          <DailyChallenge />
          {/* We will add the Resume Tailor Card here next! */}
        </section>
      </div>
    </main>
  );
}
