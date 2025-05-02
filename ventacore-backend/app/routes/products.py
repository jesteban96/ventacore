from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Product
from app.schemas import ProductCreate, ProductResponse
from app.routes.auth import get_current_user

router = APIRouter(prefix="/products", tags=["Products"])

# Crear producto
@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # ✅ Verificar si ya existe un producto con el mismo nombre o código
    existing_name = db.query(Product).filter(Product.name == product.name).first()
    if existing_name:
        raise HTTPException(status_code=400, detail="Ya existe un producto con este nombre.")

    existing_code = db.query(Product).filter(Product.code == product.code).first()
    if existing_code:
        raise HTTPException(status_code=400, detail="Ya existe un producto con este código.")

    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# Obtener productos
@router.get("/", response_model=List[ProductResponse])
def get_products(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return db.query(Product).all()

# Obtener un producto
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product

# Actualizar producto
@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    # ✅ Verificar si el nuevo nombre ya lo tiene otro producto
    existing_name = db.query(Product).filter(Product.name == product.name, Product.id != product_id).first()
    if existing_name:
        raise HTTPException(status_code=400, detail="Ya existe otro producto con este nombre.")

    # ✅ Verificar si el nuevo código ya lo tiene otro producto
    existing_code = db.query(Product).filter(Product.code == product.code, Product.id != product_id).first()
    if existing_code:
        raise HTTPException(status_code=400, detail="Ya existe otro producto con este código.")

    for key, value in product.dict().items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)
    return db_product

# Eliminar producto
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    db.delete(db_product)
    db.commit()
    return {"message": "Producto eliminado correctamente"}
