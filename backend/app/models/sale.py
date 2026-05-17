from sqlalchemy import Column, Integer, ForeignKey, Numeric, Boolean, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
from .enums import unit_type_enum, payment_method_enum

class Sale(Base):
    __tablename__ = 'sales'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    product_id = Column(Integer, ForeignKey('products.id'))
    quantity = Column(Integer, nullable=False)
    unit_type = Column(unit_type_enum)
    total = Column(Numeric(10, 2))
    payment_method = Column(payment_method_enum)
    is_cancelled = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    product = relationship("Product")
    user = relationship("User")
    purchase_price_snapshot = Column(Numeric(10, 2))
    sale_price_snapshot = Column(Numeric(10, 2))