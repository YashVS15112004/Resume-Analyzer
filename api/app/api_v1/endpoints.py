from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas
from ..db.database import get_db
from ..services import parser, llm_analyzer

router = APIRouter()

@router.post("/upload", response_model=schemas.ResumeAnalysis)
async def upload_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if file.content_type != 'application/pdf':
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF is accepted.")
    
    # 1. Extract text from PDF
    contents = await file.read()
    resume_text = parser.extract_text_from_pdf(contents)

    # 2. Use LLM to parse and analyze
    analysis_result = llm_analyzer.analyze_resume_with_gemini(resume_text)
    
    # 3. Create a record in the database
    db_resume = crud.resume.create_resume(db=db, file_name=file.filename, text=resume_text, analysis=analysis_result)

    return db_resume

@router.get("/resumes", response_model=List[schemas.ResumeAnalysis])
def get_all_resumes(db: Session = Depends(get_db)):
    resumes = crud.resume.get_all_resumes(db)
    return resumes

@router.get("/resumes/{resume_id}", response_model=schemas.ResumeAnalysis)
def get_resume_details(resume_id: int, db: Session = Depends(get_db)):
    db_resume = crud.resume.get_resume_by_id(db, resume_id)
    if db_resume is None:
        raise HTTPException(status_code=404, detail="Resume not found")
    return db_resume