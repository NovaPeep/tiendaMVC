from sqlalchemy.orm import Session
from datetime import datetime, timezone
from fastapi import HTTPException, status
from app.models.sale import Sale
from app.models.product import Product
from app.schemas.sale_schema import SaleCreate

def create_sale(db: Session, data: SaleCreate, user_id: int) -> Sale:
    product = db.query(Product).filter(
    Product.id == data.product_id,
    Product.is_active == True
).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Producto no encontrado"
        )
    
    if data.unit_type == "unit":
        units_to_deduct = data.quantity * 1
    elif data.unit_type in ["sixpack", "box"]:
        units_to_deduct = data.quantity * product.units_per_package
   
    if product.stock < units_to_deduct: 
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient stock")

    total = product.sale_price * units_to_deduct

    new_sale = Sale(
    user_id=user_id,
    product_id=data.product_id,
    quantity=data.quantity,
    unit_type=data.unit_type,
    total=total,
    payment_method=data.payment_method,
    purchase_price_snapshot=product.purchase_price,
    sale_price_snapshot=product.sale_price
    )
    db.add(new_sale)
    product.stock -= units_to_deduct
    db.commit()
    db.refresh(new_sale)
    return new_sale

def get_daily_sales(db: Session) -> list[Sale]:
    return db.query(Sale).filter(
        Sale.created_at >= datetime.combine(datetime.now(timezone.utc).date(), datetime.min.time()),
        Sale.is_cancelled == False
    ).all()

def cancel_sale(db: Session, sale_id: int) -> Sale:
    sale = db.query(Sale).filter(Sale.id == sale_id, Sale.is_cancelled == False).first()
    if not sale:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=" Sale not found or already cancelled")
    product = db.query(Product).filter(Product.id == sale.product_id).first()
    if sale.unit_type == "unit":
        units_to_restore = sale.quantity * 1
    elif sale.unit_type in ["sixpack", "box"]:
        units_to_restore = sale.quantity * product.units_per_package
    product.stock += units_to_restore
    sale.is_cancelled = True
    db.commit()
    db.refresh(sale)
    return sale

