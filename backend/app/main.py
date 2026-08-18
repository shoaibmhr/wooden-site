from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Ashtech Wooden API",
    version="1.0.0",
    description="Backend API for Ashtech Wooden furniture store.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health"])
def read_root():
    return {"message": "Ashtech Wooden API is running"}


@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {"status": "ok"}