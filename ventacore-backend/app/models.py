from .database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

# Modelo para los usuarios
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)


# Modelo para las categorías
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    code = Column(String(100), nullable=False, unique=True)  # Código de barras
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False, default=0)  # Inventario
    photo = Column(String(255), nullable=True)  # URL de foto
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    # 🔥 Relación para que SQLAlchemy permita acceder a la categoría fácilmente
    category = relationship("Category")

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    nit = Column(String(50), unique=True, nullable=False)
    phone = Column(String(30), nullable=True)
    email = Column(String(100), nullable=True)
    address = Column(String(200), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
