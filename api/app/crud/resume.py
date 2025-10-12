from sqlalchemy.orm import Session
from ..db import models
from ..services.llm_analyzer import ResumeAnalysis as LLMResumeAnalysis

def get_resume_by_id(db: Session, resume_id: int):
    return db.query(models.Resume).filter(models.Resume.id == resume_id).first()

def get_all_resumes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Resume).offset(skip).limit(limit).all()

def create_resume(db: Session, file_name: str, text: str, analysis: LLMResumeAnalysis):
    parsed_details = analysis.parsed_details

    db_resume = models.Resume(
        file_name=file_name,
        full_text=text,
        name=parsed_details.name,
        email=parsed_details.email,
        phone=parsed_details.phone,
        work_experience=parsed_details.work_experience,
        education=parsed_details.education,
        hard_skills=parsed_details.hard_skills,
        soft_skills=parsed_details.soft_skills,
        resume_rating=analysis.resume_rating,
        improvement_areas=analysis.improvement_areas,
        upskill_suggestions=analysis.upskill_suggestions
    )

    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    return db_resume
