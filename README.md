# TiendaMVC

Sistema de gestión de inventario y ventas para tienda de licores.

## Stack

- Backend: FastAPI + SQLAlchemy + PostgreSQL
- Frontend: React (en desarrollo)

## Configuración

1. Clonar el repositorio
2. Crear `.env` en `backend/` con:
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/tiendamvc
   SECRET_KEY=tu_clave_secreta

3. Instalar dependencias: `uv sync`
4. Ejecutar: `cd backend && uv run uvicorn main:app --reload`
