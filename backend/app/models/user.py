import enum
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy import Enum as SAEnum
from app.database import Base

class UserRole(enum.Enum):
    owner = "owner"
    employee = "employee"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(SAEnum(UserRole), nullable=False)
    username = Column(String, nullable=False, unique=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))