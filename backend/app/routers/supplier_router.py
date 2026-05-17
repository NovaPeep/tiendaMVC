from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.supplier_service import create_supplier, get_all_suppliers, get_supplier_by_id, update_supplier, delete_supplier
from app.schemas.supplier_schema import SupplierCreate, SupplierUpdate, SupplierResponse
from app.core.dependencies import get_current_user, require_owner

router = APIRouter()

@router.post("/", response_model=SupplierResponse)
def create_supplier_endpoint(
    data: SupplierCreate,
    db: Session = Depends(get_db),
    current_user = Depends(require_owner)
):
    return create_supplier(db, data)

@router.get("/", response_model=list[SupplierResponse])
def get_all_suppliers_endpoint(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_all_suppliers(db)

@router.get("/{supplier_id}", response_model=SupplierResponse)
def get_supplier_by_id_endpoint(
    supplier_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_supplier_by_id(db, supplier_id)

@router.put("/{supplier_id}", response_model=SupplierResponse)
def update_supplier_endpoint(
    supplier_id: int,
    data: SupplierUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(require_owner)
):
    return update_supplier(db, supplier_id, data)

@router.delete("/{supplier_id}", response_model=SupplierResponse)
def delete_supplier_endpoint(
    supplier_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_owner)
):
    return delete_supplier(db, supplier_id)
