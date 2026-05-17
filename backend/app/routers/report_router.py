from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.core.dependencies import get_current_user, require_owner
from app.schemas.report_schema import DailySummaryResponse, PeriodSummaryResponse
from app.models.user import User
from app.models.sale import Sale
from datetime import datetime, timezone, date, timedelta
from decimal import Decimal

router = APIRouter()

@router.get("/daily", response_model=DailySummaryResponse)
def daily_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_owner)
):
    today = datetime.now(timezone.utc).date()
    start = datetime.combine(today, datetime.min.time())

    base_query = db.query(Sale).filter(
        Sale.created_at >= start,
        Sale.is_cancelled == False
    )

    total_sales = db.query(func.sum(Sale.total)).filter(
        Sale.created_at >= start,
        Sale.is_cancelled == False
    ).scalar() or Decimal("0")

    cash_totales = db.query(func.sum(Sale.total)).filter(
        Sale.created_at >= start,
        Sale.is_cancelled == False,
        Sale.payment_method == "cash"
    ).scalar() or Decimal("0")

    transfer_totales = db.query(func.sum(Sale.total)).filter(
        Sale.created_at >= start,
        Sale.is_cancelled == False,
        Sale.payment_method == "transfer"
    ).scalar() or Decimal("0")

    total_transactions = db.query(func.count(Sale.id)).filter(
    Sale.created_at >= start,
    Sale.is_cancelled == False
    ).scalar() or 0

    return DailySummaryResponse(
        total_sale=total_sales,
        cash_total=cash_totales,
        transfer_total=transfer_totales,
        total_transactions=total_transactions
    )

@router.get("/period", response_model=PeriodSummaryResponse)
def period_summary(
    period: str = "week",          # query param
    db: Session = Depends(get_db),
    current_user: User = Depends(require_owner)
):
    today = datetime.now(timezone.utc).date()
    
    if period == "week":
        start = datetime.combine(today - timedelta(days=7), datetime.min.time())
    else:  # month
        start = datetime.combine(today - timedelta(days=30), datetime.min.time())

    total_sales = db.query(func.sum(Sale.total)).filter(
        Sale.created_at >= start,
        Sale.is_cancelled == False
    ).scalar() or Decimal("0")

    total_profit = db.query(
        func.sum((Sale.sale_price_snapshot - Sale.purchase_price_snapshot) * Sale.quantity)
        ).filter(
        Sale.created_at >= start,
        Sale.is_cancelled == False
    ).scalar() or Decimal("0")

    return PeriodSummaryResponse(
        period=period,
        total_sales=total_sales,
        total_profit=total_profit,
        top_products=[]
    )

