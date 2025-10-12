# File: api/app/schemas/resume.py

from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any

# This is the Pydantic model that your endpoint is looking for.
# It defines the structure and data types of the JSON response.
class ResumeAnalysis(BaseModel):
    id: int
    file_name: str
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None

    work_experience: Optional[List[Dict[str, Any]]] = []
    education: Optional[List[Dict[str, Any]]] = []
    projects: Optional[List[Dict[str, Any]]] = []

    hard_skills: Optional[List[str]] = []
    soft_skills: Optional[List[str]] = []

    resume_rating: Optional[float] = None
    improvement_areas: Optional[List[str]] = []
    upskill_suggestions: Optional[List[Dict[str, Any]]] = []

    # This configuration helps Pydantic work with database models.
    class Config:
        from_attributes = True