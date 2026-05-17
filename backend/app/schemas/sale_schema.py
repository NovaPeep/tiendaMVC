from decimal import Decimal
from pydantic import BaseModel
from typing import Optional

class SaleCreate(BaseModel):
    product_id: int
    quantity: int
    unit_type: str    # 'unit', 'sixpack', 'box'
    payment_method: str   # 'cash', 'transfer'

class SaleResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    unit_type: Optional[str] = None
    total: Optional[Decimal] = None
    payment_method: Optional[str] = None
    is_cancelled: bool

    class Config:
        from_attributes = True