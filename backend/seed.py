from app.database import SessionLocal
from app.models.user import User, UserRole
from app.models.product import Product
from app.models.supplier import Supplier
from app.core.security import hash_password

db = SessionLocal()

# Usuarios
owner = User(
    username="admin",
    password_hash=hash_password("admin123"),
    role=UserRole.owner
)
employee = User(
    username="empleado",
    password_hash=hash_password("emp123"),
    role=UserRole.employee
)

# Productos
product1 = Product(
    name="Ron Medellín",
    brand="Medellín",
    category="ron",
    presentation="botella",
    units_per_package=1,
    stock=20,
    stock_min=5,
    purchase_price=25000,
    sale_price=32000
)

# Proveedor
supplier1 = Supplier(
    name="Distribuidora Central",
    phone="3001234567",
    notes="Llega los lunes"
)

db.add_all([owner, employee, product1, supplier1])
db.commit()
print("Datos de prueba creados correctamente")
db.close()