from pydantic import BaseModel
from typing import Optional

class SupplierCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    notes: Optional[str] = None

class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    notes: Optional[str] = None
    is_active: Optional[bool] = None

class SupplierResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: Optional[str] = None
    notes: Optional[str] = None
    is_active: bool
    created_at: str

    class Config:
        from_attributes = True