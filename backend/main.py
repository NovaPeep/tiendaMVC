from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import engine, Base
from app.models import Product, Supplier, Sale, User
from app.routers.auth_router import router as auth_router
from app.routers.product_router import router as product_router
from app.routers.report_router import router as report_router
from app.routers.sale_router import router as sale_router
from app.routers.supplier_router import router as supplier_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(lifespan=lifespan)

# CORS — permite peticiones desde React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(product_router, prefix="/api/v1/products", tags=["products"])
app.include_router(sale_router, prefix="/api/v1/sales", tags=["sales"])
app.include_router(supplier_router, prefix="/api/v1/suppliers", tags=["suppliers"])
app.include_router(report_router, prefix="/api/v1/reports", tags=["reports"])