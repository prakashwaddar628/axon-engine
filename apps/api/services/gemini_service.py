import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        self.client = genai.Client(api_key=api_key)
        self.model = "gemini-2.5-flash"

    def generate_content(self, prompt: str) -> str:
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt
        )
        return response.text

    def tailor_resume(self, job_description: str, master_profile: dict) -> dict:
        prompt = f"""
        You are an expert resume writer and career coach.
        
        Job Description:
        {job_description}
        
        Master Profile:
        {master_profile}
        
        Task:
        1. Select the top 2 most relevant projects from the Master Profile based on the Job Description.
        2. Rewrite the project descriptions and tech stack presentation to maximize ATS impact for this specific job.
        3. Return the result as a JSON object with the following structure:
        {{
            "selected_projects": [
                {{
                    "name": "Project Name",
                    "description": "Rewritten description...",
                    "techStack": ["Rewritten", "Stack"],
                    "impact": "Rewritten impact..."
                }}
            ],
            "summary": "A brief professional summary tailored to the JD."
        }}
        
        Ensure the output is valid JSON.
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )
            return response.parsed
        except Exception as e:
            print(f"Gemini API Error in Tailor: {e}. Returning Mock Response.")
            return {
                "selected_projects": [
                    {
                        "name": "Project Name (Mocked)",
                        "description": "Mocked description due to expired AI key...",
                        "techStack": ["Mocked", "Stack"],
                        "impact": "Mocked impact..."
                    }
                ],
                "summary": "Mock professional summary."
            }

    def get_coding_challenge(self, skills: list) -> dict:
        prompt = f"""
        Generate a coding challenge for a Senior Engineer with the following skills: {skills}.
        
        The challenge should be:
        1. Solvable in 15 minutes.
        2. Relevant to identifying a "Skill Gap" or reinforcing a core concept.
        3. Returned as a JSON object:
        {{
            "title": "Challenge Title",
            "description": "Problem statement...",
            "difficulty": "Medium",
            "time_limit": "15 minutes"
        }}
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                 config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )
            return response.parsed
        except Exception as e:
            print(f"Gemini API Error in Challenge: {e}. Returning Mock Response.")
            return {
                "title": "Mocked System Design",
                "description": "API Key expired. This is a mocked challenge.",
                "difficulty": "Medium",
                "time_limit": "15 minutes"
            }

    def analyze_profile(self, master_profile: dict, market_trends: list) -> dict:
        prompt = f"""
        You are an elite Career Strategist AI.
        
        Master Profile:
        {master_profile}
        
        Current Market Trends:
        {market_trends}
        
        Task:
        1. Perform a "Reasoning Loop" to identify the user's biggest skill gaps and fastest learning opportunities given the current market trends.
        2. Give concrete actionable advice to bridge these gaps.
        3. Return a JSON object:
        {{
            "market_alignment_score": 85,
            "key_strengths": ["list of 2 strengths"],
            "skill_gaps": ["list of 2 areas for improvement"],
            "action_plan": "A short, proactive learning recommendation."
        }}
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                 config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )
            return response.parsed
        except Exception as e:
            print(f"Gemini API Error in Analyze: {e}. Returning Mock.")
            return {
                "market_alignment_score": 85,
                "key_strengths": ["Mocked Strength 1", "Mocked Strength 2"],
                "skill_gaps": ["Mocked Gap 1"],
                "action_plan": "Mocked Action Plan."
            }

gemini_service = GeminiService()
