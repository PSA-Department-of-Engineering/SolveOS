from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SolveOS API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to SolveOS API"}


@app.post("/api/auth/login")
def login():
    """Login endpoint - to be implemented"""
    return {
        "access_token": "dummy-token",
        "token_type": "bearer"
    }
