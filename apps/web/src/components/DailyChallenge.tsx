"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Clock, Trophy, Loader2 } from "lucide-react";

const API_URL = "http://localhost:8000";

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`${API_URL}/api/challenge/daily`);
        const data = await res.json();
        setChallenge(data);
      } catch (error) {
        console.error("Failed to fetch challenge:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, []);

  if (loading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <div className="h-6 w-1/3 bg-muted rounded mb-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!challenge) return null;

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Daily Code Quest
                </CardTitle>
                <CardDescription>Based on your skill gaps</CardDescription>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {challenge.difficulty}
            </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="font-semibold text-lg">{challenge.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {challenge.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
            <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {challenge.time_limit}
            </div>
            <div className="flex items-center gap-1">
                <Code className="h-3 w-3" />
                Python/TypeScript
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
            Start Timer
        </Button>
      </CardFooter>
    </Card>
  );
}
