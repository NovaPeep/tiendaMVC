from sqlalchemy.orm import Session
from app.models.supplier import Supplier
from app.schemas.supplier_schema import SupplierCreate, SupplierUpdate, SupplierResponse
from fastapi import HTTPException, status

def create_supplier(db: Session, data: SupplierCreate) -> Supplier:
    new_supplier = Supplier(
        name=data.name,
        phone=data.phone,
        email=data.email,
        notes=data.notes
    )
    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)
    return new_supplier

def get_all_suppliers(db: Session) -> list[Supplier]:
    return db.query(Supplier).filter(Supplier.is_active == True).all()

def get_supplier_by_id(db: Session, supplier_id: int) -> SupplierResponse:
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

def update_supplier(db: Session, supplier_id: int, data: SupplierUpdate) -> Supplier:
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(supplier, field, value)
    
    db.commit()
    db.refresh(supplier)
    return supplier

def delete_supplier(db: Session, supplier_id: int) -> Supplier:
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    supplier.is_active = False
    db.commit()
    db.refresh(supplier)
    return supplier