import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai  # NEW SDK
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AXON Intelligence Engine")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Client (Will automatically look for GEMINI_API_KEY env var)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class UserStats(BaseModel):
    skills: list[str]
    weak_points: list[str]
    target_role: str

@app.post("/generate-daily-challenge")
async def generate_challenge(stats: UserStats):
    try:
        # Using Gemini 1.5/3 Flash for speed and reliability
        response = client.models.generate_content(
            model='gemini-2.5-flash', 
            contents=f"""
                Act as a Senior Tech Lead. User target: {stats.target_role}.
                Skills: {stats.skills}. Weakness: {stats.weak_points}.
                Generate a 15-min coding challenge on one weakness.
                Format: Title, Problem, Constraints, and 'Why it matters'.
            """
        )
        return {"challenge": response.text}
    except Exception as e:
        print(f"AXON Error: {e}")
        raise HTTPException(status_code=500, detail="Gemini Engine Overloaded. Try again in 10 seconds.")
    
# Add this to your main.py

@app.post("/tailor-resume")
async def tailor_resume(job_description: str):
    try:
        # 1. In a real app, we'd fetch your master profile from packages/shared/master-profile.json
        # For now, let's use a sample of your 'SentinAI' project
        user_context = "Project SentinAI: Drone-based fire detection and women safety using YOLO and Python."

        prompt = f"""
        Act as a FAANG Technical Recruiter.
        Job Description: {job_description}
        My Experience: {user_context}
        
        Task: Rewrite the 'SentinAI' project description to perfectly match the JD.
        - Use the STAR method (Situation, Task, Action, Result).
        - Include metrics and hard skills mentioned in the JD.
        - Ensure it is 100% ATS-readable.
        Return ONLY the rewritten bullet points.
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        return {"tailored_bullets": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/health")
async def health_check():
    return {"status": "API is healthy"}