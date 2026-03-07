from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import gemini_service
import json

router = APIRouter()

# Load master profile (simulated as we can't directly allow-import from outside src in python easily without packaging)
# In a real monorepo, we might publish the shared package or use a build step to copy it.
# For simplicity, we will load the json directly if possible, or duplicate the data structure for the backend.
# Since we have the file in packages/shared/master-profile.json, we can read it.

import os

# Helper to load master profile
def load_master_profile():
    base_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    profile_path = os.path.join(base_path, 'packages', 'shared', 'master-profile.json')
    with open(profile_path, 'r') as f:
        return json.load(f)

class TailorRequest(BaseModel):
    job_description: str

@router.post("/tailor")
async def tailor_resume(request: TailorRequest):
    try:
        master_profile = load_master_profile()
        result = gemini_service.tailor_resume(request.job_description, master_profile)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
