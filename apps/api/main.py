import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load credentials
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="AXON Intelligence Engine")

# This will eventually pull from your packages/shared/master-profile.json
class UserStats(BaseModel):
    skills: list[str]
    weak_points: list[str]
    target_role: str

@app.get("/")
def home():
    return {"status": "AXON Engine Online", "version": "3.0"}

@app.post("/generate-daily-challenge")
async def generate_challenge(stats: UserStats):
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    prompt = f"""
    User is an AI student aiming for: {stats.target_role}.
    Current Skills: {', '.join(stats.skills)}
    Weaknesses: {', '.join(stats.weak_points)}
    
    Generate one highly specific, 15-minute coding or system design challenge.
    Focus on one of the weak points. 
    Format:
    1. Title
    2. The Problem
    3. Constraints
    4. Why this matters for {stats.target_role}
    """
    
    try:
        response = model.generate_content(prompt)
        return {"challenge": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))