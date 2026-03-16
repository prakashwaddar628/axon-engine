import random

def calculate_proficiency(skills: list, user_streak: int) -> dict:
    """
    Calculate simulated proficiency levels for a list of skills based on the user's current streak.
    In a real app, this would be backed by database tracking of problem completions over time.
    """
    proficiency_map = {}
    
    for skill in skills:
        # Generate a base score, then apply a multiplier based on the streak
        base_score = random.randint(50, 85)
        streak_bonus = min(user_streak * 1.5, 15) # Max 15 points bonus from streak
        
        final_score = int(min(base_score + streak_bonus, 100))
        
        if final_score >= 90:
            level = "Expert"
        elif final_score >= 70:
            level = "Advanced"
        elif final_score >= 50:
            level = "Intermediate"
        else:
            level = "Beginner"
            
        proficiency_map[skill] = {
            "score": final_score,
            "level": level
        }
        
    return {
        "overall_streak": user_streak,
        "skills": proficiency_map
    }
