from pydantic import BaseModel
from typing import Optional

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