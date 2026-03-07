from fastapi import APIRouter, HTTPException
from services.gemini_service import gemini_service
import json
import os

router = APIRouter()

def load_master_profile():
    base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    profile_path = os.path.join(base_path, 'packages', 'shared', 'master-profile.json')
    with open(profile_path, 'r') as f:
        return json.load(f)

@router.get("/daily")
async def get_daily_challenge():
    try:
        master_profile = load_master_profile()
        skills = master_profile.get("skills", [])
        result = gemini_service.get_coding_challenge(skills)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
