from app.database import engine, Base
from app.models import Category  # Asegúrate de importar tus modelos

print("Creando tablas en la base de datos...")
Base.metadata.create_all(bind=engine)
print("¡Tablas creadas exitosamente!")
