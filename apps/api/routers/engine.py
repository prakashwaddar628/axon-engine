from fastapi import APIRouter, HTTPException
from services.gemini_service import gemini_service
from services.skill_mapper import calculate_proficiency
import json
import os

router = APIRouter()

def load_master_profile():
    base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    profile_path = os.path.join(base_path, 'packages', 'shared', 'master-profile.json')
    try:
        with open(profile_path, 'r') as f:
            return json.load(f)
    except Exception:
        return {}

def mock_market_trends():
    return [
        "High demand for AI Agents and RAG applications.",
        "Serverless and edge computing growing in popularity.",
        "Increased focus on web performance and Rust integration.",
        "Strict ATS systems rejecting generic resumes."
    ]

@router.post("/analyze")
async def analyze_profile(data: dict):
    try:
        master_profile = data.get("profile", {})
        trends = data.get("trends", [
            "High demand for AI Agents and RAG applications.",
            "Serverless and edge computing growing in popularity.",
            "Increased focus on web performance and Rust integration.",
            "Strict ATS systems rejecting generic resumes."
        ])
        
        result = gemini_service.analyze_profile(master_profile, trends)
        
        # Merge with skill mapping for proficiency
        skills = master_profile.get("skills", [])
        proficiency_data = calculate_proficiency(skills, user_streak=12) # Mock streak data
        
        result["proficiency"] = proficiency_data
        
        return result
    except Exception as e:
        print(f"Engine Analyze Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
