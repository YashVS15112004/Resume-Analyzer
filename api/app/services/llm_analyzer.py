# 1. Import the settings object to securely access environment variables
from ..core.config import settings
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import List, Dict, Optional

# 3. Expanded the details to capture more from the resume
class ResumeDetails(BaseModel):
    name: str = Field(description="The full name of the candidate.")
    email: str = Field(description="The email address of the candidate.")
    phone: str = Field(description="The phone number of the candidate.")
    location: Optional[str] = Field(description="The city and state of the candidate, e.g., 'San Francisco, CA'.")
    linkedin_url: Optional[str] = Field(description="The URL of the candidate's LinkedIn profile.")
    portfolio_url: Optional[str] = Field(description="The URL of the candidate's personal portfolio or GitHub.")
    work_experience: List[Dict] = Field(description="A list of work experiences, each with 'title', 'company', 'dates', and 'description'.")
    education: List[Dict] = Field(description="A list of educational qualifications, each with 'degree', 'institution', and 'dates'.")
    hard_skills: List[str] = Field(description="List of technical or hard skills mentioned, such as programming languages, software, or tools.")
    soft_skills: List[str] = Field(description="List of soft or interpersonal skills mentioned.")

class ResumeAnalysis(BaseModel):
    parsed_details: ResumeDetails
    resume_rating: float = Field(description="A rating of the resume on a scale of 1 to 10, based on clarity, impact, and skill relevance for a typical role related to the resume's content.")
    improvement_areas: List[str] = Field(description="A list of 3-5 actionable suggestions to improve the resume, focusing on weak areas.")
    upskill_suggestions: List[Dict] = Field(description="A list of 3 relevant skills to learn, with a 'skill' and a 'reason' explaining why it's valuable for the candidate's career path.")


def analyze_resume_with_gemini(resume_text: str):
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("❌ GOOGLE_API_KEY not set in environment variables.")

    # ✅ Use latest valid Gemini model
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=api_key)

    parser = PydanticOutputParser(pydantic_object=ResumeAnalysis)
    prompt_template = """
    You are an expert career coach and resume analyzer.
    Analyze the following resume text and extract the information in a structured JSON format.

    Based on the extracted information, provide:
    1. A resume rating (1–10) based on clarity, impact, and skill relevance.
    2. Actionable improvement points.
    3. Highly relevant upskilling suggestions (specific technologies, frameworks, or certifications).

    Resume Text:
    {resume_text}

    {format_instructions}
    """

    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=["resume_text"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = prompt | llm | parser

    try:
        result = chain.invoke({"resume_text": resume_text})
        return result
    except Exception as e:
        print(f"⚠️ Error analyzing resume: {e}")
        return {"error": str(e)}
