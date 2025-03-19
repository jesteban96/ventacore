from fastapi import FastAPI
from app.routes.auth import router as auth_router  # Importa el router de auth

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes cambiar * por ["http://localhost:5173"] para mayor seguridad
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Permite todos los métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permite todos los headers
)




# 🔹 Agregar el router de autenticación
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "Hello, world!"}
