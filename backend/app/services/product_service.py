from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product_schema import ProductCreate, ProductUpdate

def get_all_products(db: Session) -> list[Product]:
    return db.query(Product).filter(Product.is_active == True).all()

def get_low_stock_products(db: Session) -> list[Product]:
    return db.query(Product).filter(Product.stock <= Product.stock_min, Product.is_active == True).all()

def create_product(db: Session, data: ProductCreate) -> Product:
    product = Product(**data.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

def update_product(db: Session, product_id: int, data: ProductUpdate) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product