import DailyChallenge from "@/components/DailyChallenge";

export default function Home() {
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
