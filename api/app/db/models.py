from sqlalchemy import Column, Integer, String, Text, Float, JSON
from .database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, index=True)
    
    # Personal Info
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    location = Column(String)
    linkedin_url = Column(String)
    portfolio_url = Column(String)
    
    # Extracted Content
    full_text = Column(Text)
    work_experience = Column(JSON) # List of dicts: {title, company, dates, description}
    education = Column(JSON)      # List of dicts: {degree, institution, dates}
    projects = Column(JSON)       # List of dicts: {name, description, technologies}
    
    # Categorized Skills
    hard_skills = Column(JSON)    # e.g., ["Python", "React", "SQL"]
    soft_skills = Column(JSON)    # e.g., ["Communication", "Teamwork"]
    programming_languages = Column(JSON)
    technologies_frameworks = Column(JSON)
    databases = Column(JSON)
    
    # LLM Analysis
    resume_rating = Column(Float) # Score out of 10
    improvement_areas = Column(JSON) # List of strings
    upskill_suggestions = Column(JSON) # List of dicts: {skill, reason}