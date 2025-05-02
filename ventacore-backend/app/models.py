from .database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
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
    code = Column(String(100), nullable=False, unique=True)  # Barcode
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False, default=0)  # Inventory
    photo = Column(String(255), nullable=True)  # Photo URL
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    # 🔥 Relationship to access category
    category = relationship("Category")

