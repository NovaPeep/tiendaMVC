from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_user, require_owner
from app.schemas.product_schema import ProductCreate, ProductUpdate, ProductResponse
from app.services import product_service
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=list[ProductResponse])
def get_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return product_service.get_all_products(db)

@router.get("/low-stock", response_model=list[ProductResponse])
def get_low_stock_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return product_service.get_low_stock_products(db)

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_owner)
):
    return product_service.create_product(db, data)

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    data: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_owner)
):
    try:
        return product_service.update_product(db, product_id, data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))