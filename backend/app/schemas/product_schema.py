from decimal import Decimal
from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    brand: Optional[str] = None
    category: Optional[str] = None
    presentation: Optional[str] = None
    units_per_package: Optional[int] = 1
    stock: Optional[int] = 0
    stock_min: Optional[int] = 0
    purchase_price: Decimal
    sale_price: Decimal

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    category: Optional[str] = None
    presentation: Optional[str] = None
    units_per_package: Optional[int] = None
    stock: Optional[int] = None
    stock_min: Optional[int] = None
    purchase_price: Optional[Decimal] = None
    sale_price: Optional[Decimal] = None
    is_active: Optional[bool] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    brand: Optional[str] = None
    category: Optional[str] = None
    presentation: Optional[str] = None
    units_per_package: Optional[int] = 1
    stock: Optional[int] = 0
    stock_min: Optional[int] = 0
    purchase_price: Optional[Decimal] = None
    sale_price: Optional[Decimal] = None
    is_active: bool

    class Config:
        from_attributes = True