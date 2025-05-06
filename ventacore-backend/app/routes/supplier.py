from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models import Supplier
from app.schemas import SupplierCreate, SupplierUpdate, SupplierOut
from app.database import get_db
from app.routes.auth import get_current_user

router = APIRouter(prefix="/suppliers", tags=["Suppliers"])

@router.post("/", response_model=SupplierOut)
def create_supplier(supplier: SupplierCreate, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    existing = db.query(Supplier).filter(Supplier.nit == supplier.nit).first()
    if existing:
        raise HTTPException(status_code=400, detail="El NIT ya está registrado.")
    new_supplier = Supplier(**supplier.dict())
    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)
    return new_supplier

@router.get("/", response_model=list[SupplierOut])
def get_suppliers(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return db.query(Supplier).order_by(Supplier.created_at.desc()).all()

@router.get("/{supplier_id}", response_model=SupplierOut)
def get_supplier(supplier_id: int, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return supplier

@router.put("/{supplier_id}", response_model=SupplierOut)
def update_supplier(supplier_id: int, updated: SupplierUpdate, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")

    # Verifica si se intenta cambiar a un NIT que ya existe en otro proveedor
    if updated.nit != supplier.nit:
        existing = db.query(Supplier).filter(Supplier.nit == updated.nit).first()
        if existing:
            raise HTTPException(status_code=400, detail="El NIT ya está registrado para otro proveedor.")

    for field, value in updated.dict().items():
        setattr(supplier, field, value)

    db.commit()
    db.refresh(supplier)
    return supplier

@router.delete("/{supplier_id}")
def delete_supplier(supplier_id: int, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    db.delete(supplier)
    db.commit()
    return {"detail": "Proveedor eliminado correctamente"}
