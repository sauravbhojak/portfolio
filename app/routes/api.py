from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ContactMessage
from app.schemas import ContactCreate, ContactOut

router = APIRouter(prefix="/api", tags=["api"])


@router.post("/contact", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def create_message(payload: ContactCreate, db: Session = Depends(get_db)):
    item = ContactMessage(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
