from sqlalchemy import Column, Integer, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base

class Supplier(Base):
    __tablename__ = 'suppliers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    phone = Column(Text, nullable=False)
    email = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

    products = relationship("Product", secondary="product_supplier", back_populates="suppliers")