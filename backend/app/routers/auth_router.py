from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth_schema import LoginRequest, TokenResponse
from app.core.security import verify_password, create_access_token
from app.models.user import User
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.username == form_data.username
    ).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    access_token = create_access_token(data={
        "sub": str(user.id),
        "role": user.role.value
    })
    return TokenResponse(access_token=access_token, token_type="bearer")