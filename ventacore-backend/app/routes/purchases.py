# app/routes/purchases.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.routes.auth import get_current_user
from app.models import Purchase, PurchaseItem, Product
from app.schemas import PurchaseCreate, PurchaseResponse
from typing import List

router = APIRouter(prefix="/purchases", tags=["Purchases"])

@router.post("/", response_model=PurchaseResponse)
def create_purchase(purchase_data: PurchaseCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    # Crear la compra
    purchase = Purchase(
        invoice_number=purchase_data.invoice_number,
        supplier_id=purchase_data.supplier_id
    )
    db.add(purchase)
    db.commit()
    db.refresh(purchase)

    # Agregar productos comprados
    for item in purchase_data.items:
        # Aumentar stock
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        product.stock += item.quantity

        db_item = PurchaseItem(
            purchase_id=purchase.id,
            product_id=item.product_id,
            quantity=item.quantity,
            purchase_price=item.purchase_price,
            tax=item.tax,
            total=item.total,
            suggested_price=item.suggested_price
        )
        db.add(db_item)

    db.commit()
    db.refresh(purchase)
    return purchase

@router.get("/", response_model=List[PurchaseResponse])
def get_purchases(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return db.query(Purchase).all()

@router.get("/{purchase_id}", response_model=PurchaseResponse)
def get_purchase(purchase_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    purchase = db.query(Purchase).filter(Purchase.id == purchase_id).first()
    if not purchase:
        raise HTTPException(status_code=404, detail="Compra no encontrada")
    return purchase

