from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .core.config import settings
from .db import models
from .db.database import engine
from .api_v1 import endpoints

# Create all database tables defined in models.py
# This is useful for development but for production, you might use Alembic migrations.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
# This allows the frontend (running on a different origin) to communicate with the backend.
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[origin.strip() for origin in settings.BACKEND_CORS_ORIGINS.split(",")],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include the API router
app.include_router(endpoints.router, prefix=settings.API_V1_STR)

@app.get("/", summary="Health check endpoint")
def read_root():
    """
    Root endpoint to check if the API is running.
    """
    return {"status": "ok", "message": "Welcome to the Resume Analyzer API!"}