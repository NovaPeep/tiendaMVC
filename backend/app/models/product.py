from sqlalchemy import Column, Integer, Text, ForeignKey, Numeric, Boolean, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy import Table
from .enums import product_category_enum, presentation_enum

product_supplier = Table(
    "product_supplier",
    Base.metadata,
    Column("product_id", Integer, ForeignKey("products.id"), primary_key=True),
    Column("supplier_id", Integer, ForeignKey("suppliers.id"), primary_key=True)
)

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    brand = Column(Text)
    category = Column(product_category_enum)
    presentation = Column(presentation_enum)
    units_per_package = Column(Integer, default=1)
    stock = Column(Integer, default=0)
    stock_min = Column(Integer, default=0)
    purchase_price = Column(Numeric(10, 2))
    sale_price = Column(Numeric(10, 2))
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

    suppliers = relationship("Supplier", secondary="product_supplier", back_populates="products")
