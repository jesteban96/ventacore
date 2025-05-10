from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importar routers
from app.routes.auth import router as auth_router  
from app.routes.category import router as category_router  # Agregar categorías
from app.routes.products import router as products_router
from app.routes.supplier import router as supplier_router
from app.routes.purchases import router as purchases_router

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes cambiar * por ["http://localhost:5173"] para mayor seguridad
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Se añaden PUT y DELETE
    allow_headers=["*"],  # Permite todos los headers
)

# 🔹 Agregar routers
app.include_router(auth_router)
app.include_router(category_router)  # Agregamos las rutas de categorías
app.include_router(products_router)
app.include_router(supplier_router)
app.include_router(purchases_router)


@app.get("/")
def read_root():
    return {"message": "Hello, world!"}
