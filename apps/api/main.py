from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import resume, challenge, engine
import uvicorn
import os

app = FastAPI(title="AXON Engine")

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router, prefix="/api/resume", tags=["resume"])
app.include_router(challenge.router, prefix="/api/challenge", tags=["challenge"])
app.include_router(engine.router, prefix="/api/engine", tags=["engine"])

@app.get("/")
def read_root():
    return {"message": "AXON Engine Online"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)