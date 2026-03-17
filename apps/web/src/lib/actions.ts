"use server";

const API_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function tailorResumeAction(formData: { jobDescription: string; masterProfile: any }) {
    try {
        const response = await fetch(`${API_URL}/api/resume/tailor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                job_description: formData.jobDescription,
                master_profile: formData.masterProfile,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to tailor resume");
        }

        return await response.json();
    } catch (error) {
        console.error("Server Action Error (tailorResume):", error);
        return { error: "Failed to process resume tailoring on server." };
    }
}

export async function getAnalysisAction(masterProfile: any) {
    try {
        const response = await fetch(`${API_URL}/api/engine/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profile: masterProfile,
                trends: [
                    "High demand for AI Agents and RAG applications.",
                    "Serverless and edge computing growing in popularity.",
                    "Increased focus on web performance and Rust integration.",
                    "Strict ATS systems rejecting generic resumes."
                ]
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to analyze profile");
        }

        return await response.json();
    } catch (error) {
        console.error("Server Action Error (getAnalysis):", error);
        return { error: "Failed to analyze profile on server." };
    }
}

export async function getDailyChallengeAction(skills: string[]) {
    try {
        const response = await fetch(`${API_URL}/api/challenge/daily?skills=${skills.join(",")}`);
        if (!response.ok) throw new Error("Failed to fetch challenge");
        return await response.json();
    } catch (error) {
        console.error("Server Action Error (getDailyChallenge):", error);
        return { error: "Failed to fetch daily challenge." };
    }
}
