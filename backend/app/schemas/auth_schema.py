from pydantic import BaseModel

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    pass

class LoginRequest(BaseModel):
    username: str
    password: str
    pass