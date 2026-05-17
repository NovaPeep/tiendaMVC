from decimal import Decimal
from pydantic import BaseModel  

class DailySummaryResponse(BaseModel):
    total_sale: Decimal
    cash_total: Decimal
    transfer_total: Decimal
    total_transactions: int

class PeriodSummaryResponse(BaseModel):
    period: str #(ej: "2024-04")
    total_sales: Decimal
    total_profit: Decimal
    top_products: list