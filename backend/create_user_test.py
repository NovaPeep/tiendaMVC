from app.database import SessionLocal
from app.models.user import User, UserRole
from app.core.security import hash_password

db = SessionLocal()

user = User(
    username="admin",
    password_hash=hash_password("admin123"),
    role=UserRole.owner
)

db.add(user)
db.commit()
db.refresh(user)
print(f"Usuario creado: {user.id} - {user.username} - {user.role}")
db.close()