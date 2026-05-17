from fastapi import FastAPI
from app.database import engine, Base
from app.models import Product, Supplier, Sale, User
from contextlib import asynccontextmanager

# Routers
from app.routers.auth_router import router as auth_router
from app.routers.product_router import router as product_router
from app.routers.report_router import router as report_router
from app.routers.sale_router import router as sale_router
from app.routers.supplier_router import router as supplier_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    Base.metadata.create_all(bind=engine)
    yield
    # No specific shutdown actions needed

app = FastAPI(lifespan=lifespan)

app.include_router(product_router, prefix="/api/v1/products", tags=["products"])
app.include_router(supplier_router, prefix="/api/v1/suppliers", tags=["suppliers"])
app.include_router(sale_router, prefix="/api/v1/sales", tags=["sales"])
app.include_router(report_router, prefix="/api/v1/reports", tags=["reports"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])

