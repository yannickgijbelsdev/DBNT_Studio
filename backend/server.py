from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import hashlib
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
import requests
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configure logging (must be before any route that uses `logger`)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# ---- DBNT News API proxy (avoids browser mixed-content / CORS on HTTP source) ----
NEWS_BASE = "http://clr.koodh.com/api/news"

@api_router.get("/news/homepagina")
def get_news_homepagina():
    try:
        r = requests.get(f"{NEWS_BASE}/dbnt/homepagina", timeout=25, allow_redirects=True)
        r.raise_for_status()
        return r.json()
    except requests.RequestException as e:
        logger.error(f"News homepagina fetch failed: {e}")
        raise HTTPException(status_code=502, detail="Kon nieuws niet ophalen")

@api_router.get("/news/articles/{article_id}")
def get_news_article(article_id: str):
    try:
        r = requests.get(f"{NEWS_BASE}/articles/{article_id}", timeout=25, allow_redirects=True)
        r.raise_for_status()
        return r.json()
    except requests.RequestException as e:
        logger.error(f"News article fetch failed: {e}")
        raise HTTPException(status_code=502, detail="Kon artikel niet ophalen")

# ---- VDC deploy integration: read-only source-version hash ----
@api_router.get("/vdc/source-version")
def source_version():
    """Public, read-only. Returns a content hash of the source tree.
    No parameters, no side effects, no source content or secrets exposed."""
    h = hashlib.sha256()
    roots = [Path("/app/backend"), Path("/app/frontend/src")]
    files = []
    skip = {"node_modules", "__pycache__", ".venv", "venv", "dist", "build", ".git"}
    for root in roots:
        if not root.exists():
            continue
        for p in sorted(root.rglob("*")):
            if any(part in skip for part in p.parts):
                continue
            if p.is_file():
                files.append(p)
    for p in files:
        h.update(str(p).encode())
        h.update(str(p.stat().st_mtime_ns).encode())
        h.update(str(p.stat().st_size).encode())
    return {"hash": h.hexdigest()[:16], "files": len(files)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()