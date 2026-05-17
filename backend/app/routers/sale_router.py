from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.sale_service import create_sale, get_daily_sales, cancel_sale 
from app.schemas.sale_schema import SaleCreate, SaleResponse
from app.core.dependencies import get_current_user, require_owner

router = APIRouter()

@router.post("/", response_model=SaleResponse)
def create_sale_endpoint(
    data: SaleCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return create_sale(db, data, current_user.id)
@router.get("/daily", response_model=list[SaleResponse])
def get_daily_sales_endpoint(
    db: Session = Depends(get_db),
    current_user = Depends(require_owner)
):
    return get_daily_sales(db)

@router.put("/cancel/{sale_id}", response_model=SaleResponse)
def cancel_sale_endpoint(
    sale_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_owner),
):
    return cancel_sale(db, sale_id)