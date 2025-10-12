import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    # Database configuration
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # Google Gemini API Key
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")

    # Project metadata
    PROJECT_NAME: str = "Resume Analyzer API"
    API_V1_STR: str = "/api/v1"
    
    # CORS settings
    # A comma-separated list of origins that should be permitted to make cross-origin requests.
    # e.g., "http://localhost:5173,http://localhost:3000"
    BACKEND_CORS_ORIGINS: str = os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:5173")


    class Config:
        case_sensitive = True

# Instantiate the settings
settings = Settings()