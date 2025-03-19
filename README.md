# Ventacore

Ventacore es un sistema de ventas completo que incluye tanto el backend como el frontend. Este proyecto permite la gestión de inventarios, facturación, cotizaciones, proveedores y más.

## 📌 Características principales

✅ Gestión de productos y stock
✅ Facturación (POS y electrónica)
✅ Módulo de cotizaciones
✅ Módulo de proveedores
✅ Gestión de egresos y balances
✅ Notificaciones de stock mínimo

---

## 🚀 Tecnologías utilizadas

### **Frontend**
- React Native (Expo)
- Tailwind CSS
- React Router

### **Backend**
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy
- Uvicorn

---

## 📥 Instalación y configuración

### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/jesteban96/ventacore.git
cd ventacore
```

### 2️⃣ Configurar el Backend

#### 📌 Requisitos previos
- Python 3.10+
- PostgreSQL instalado

#### 📌 Instalación de dependencias
```sh
cd ventacore-backend
python -m venv env
source env/bin/activate  # En Windows: env\Scripts\activate
pip install -r requirements.txt
```

#### 📌 Configuración del entorno
Crear un archivo `.env` en `ventacore-backend/` con:
```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/ventacore_db
SECRET_KEY=clave_secreta
```

#### 📌 Ejecutar el backend
```sh
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

### 3️⃣ Configurar el Frontend

#### 📌 Requisitos previos
- Node.js 16+
- Expo CLI

#### 📌 Instalación de dependencias
```sh
cd ventacore-frontend
npm install
```

#### 📌 Ejecutar la aplicación
```sh
npm start
```

---

## 📄 API Endpoints
Puedes explorar la API con la documentación generada automáticamente:
- [Swagger UI](http://localhost:8000/docs)
- [Redoc](http://localhost:8000/redoc)

---

## 📌 Contribuir al proyecto
1. Crea una rama: `git checkout -b feature-nueva`
2. Realiza cambios y commitea: `git commit -m "Agrega nueva funcionalidad"`
3. Sube los cambios: `git push origin feature-nueva`
4. Abre un Pull Request

---

## 📞 Contacto
Si tienes preguntas o sugerencias, ¡contáctame!
- **Desarrollador:** Esteban
- **GitHub:** [jesteban96](https://github.com/jesteban96)

