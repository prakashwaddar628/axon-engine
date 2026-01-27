"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchChallenge = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-daily-challenge",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skills: ["Python", "Next.js", "Computer Vision"],
            weak_points: ["System Design", "Scalability"],
            target_role: "Software Engineering Intern at Microsoft",
          }),
        },
      );
      const data = await response.json();
      setChallenge(data.challenge);
    } catch (error) {
      console.error("Failed to fetch challenge:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, []);

  return (
    <Card className="w-full max-w-2xl border-2 border-primary/20 shadow-xl bg-gradient-to-br from-background to-secondary/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Daily Growth Pulse
          </CardTitle>
          <Badge variant="outline" className="animate-pulse">
            Gemini 3 Powered
          </Badge>
        </div>
        <CardDescription>
          Generated based on your current skill gaps
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="h-32 flex items-center justify-center animate-pulse bg-muted rounded-md">
            Analyzing market trends...
          </div>
        ) : (
          <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">
            {challenge}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="ghost" onClick={fetchChallenge}>
          Regenerate
        </Button>
        <Button className="bg-primary text-primary-foreground hover:scale-105 transition-transform">
          Mark as Complete
        </Button>
      </CardFooter>
    </Card>
  );
}
