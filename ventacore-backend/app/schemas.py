from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str
    description: str | None = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int

    class Config:
        orm_mode = True

class CategorySimple(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str
    code: str
    price: float
    stock: int
    photo: Optional[str] = None
    category_id: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductResponse(BaseModel):
    id: int
    name: str
    code: str
    price: float
    stock: int
    photo: Optional[str] = None
    category: CategorySimple  # 🔥 Cambiamos de "category_id" a "category"

    class Config:
        orm_mode = True

class SupplierBase(BaseModel):
    name: str
    nit: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None

class SupplierCreate(SupplierBase):
    pass

class SupplierUpdate(SupplierBase):
    pass

class SupplierOut(SupplierBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class PurchaseItemCreate(BaseModel):
    product_id: int
    quantity: int
    purchase_price: float
    tax: Optional[float] = 0.0
    total: float
    suggested_price: Optional[float]

class PurchaseCreate(BaseModel):
    invoice_number: str
    supplier_id: int
    items: List[PurchaseItemCreate]

class PurchaseItemResponse(PurchaseItemCreate):
    id: int
    product_id: int
    class Config:
        orm_mode = True

class PurchaseResponse(BaseModel):
    id: int
    invoice_number: str
    supplier_id: int
    date: datetime
    items: List[PurchaseItemResponse]
    class Config:
        orm_mode = True