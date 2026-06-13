# 📚 Sistema de Gestión de Cursos

Una API REST para la gestión de cursos, usuarios e inscripciones. Desarrollada con Node.js y Express, esta solución incluye autenticación JWT, control de roles y validación de datos.

## 🚀 Características

- ✅ Autenticación segura con JWT
- ✅ Control de roles y permisos (admin, profesor, estudiante)
- ✅ CRUD para usuarios, cursos e inscripciones
- ✅ Validaciones con Joi y Zod
- ✅ Contraseñas cifradas con bcryptjs
- ✅ Persistencia con PostgreSQL
- ✅ Manejo de errores centralizado
- ✅ Soporte para ejecución con Docker

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v14 o superior)
- npm
- PostgreSQL
- Git
- Docker y Docker Compose (opcional)

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd Sistema_Gestion_Cursos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con estas variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=gestion_escolar
DB_USER=postgres
DB_PASSWORD=root
PORT=3000
JWT_SECRET=tu_clave_secreta
```

> Nota: este proyecto usa `DB_DATABASE` en `src/config/env.js`, no `DB_NAME`.

## ▶️ Ejecución local

```bash
node src/server.js
```

Luego abre `http://localhost:3000`.

## 🐳 Ejecución con Docker

```bash
docker compose up --build
```

El servicio quedará expuesto en `http://localhost:3000`.

## 🧪 Pruebas

Este proyecto usa Jest y Supertest.

```bash
npm test
```

## 📂 Estructura del Proyecto

```
src/
├── config/              # Configuración de base de datos y variables de entorno
├── controller/          # Lógica de negocio
│   ├── auth.controller.js
│   ├── cursos.controller.js
│   ├── inscripciones.controller.js
│   └── usuarios.controller.js
├── middleware/          # Middlewares de Express
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── roles.middleware.js
│   └── validation.middleware.js
├── repositories/        # Acceso a datos
│   ├── cursos.repository.js
│   ├── inscripciones.repository.js
│   └── usuarios.repository.js
├── routes/              # Rutas del API
│   ├── auth.routes.js
│   ├── cursos.routes.js
│   ├── inscripciones.routes.js
│   └── usuarios.routes.js
├── schemas/             # Esquemas de validación
│   ├── curso.schema.js
│   ├── inscripciones.schema.js
│   ├── login.schema.js
│   └── usuario.schema.js
├── utils/               # Constantes y utilidades
│   └── constants.js
├── errors/              # Manejo de errores personalizado
│   └── AppError.js
└── server.js            # Punto de entrada
```

## 🔌 Endpoints Principales

### Autenticación
```http
POST /auth/login    # Iniciar sesión
POST /auth/register # Registrar nuevo usuario
```

### Usuarios
```http
GET  /usuarios       # Requiere token
GET  /usuarios/:id   # Requiere token
POST /usuarios       # Requiere token + rol admin
```

### Cursos
```http
GET    /cursos           # Requiere token + rol admin
GET    /cursos/:id       # Requiere token
POST   /cursos           # Requiere token + rol admin
PUT    /cursos/:id       # Requiere token + rol admin
DELETE /cursos/:id       # Requiere token + rol admin
```

### Inscripciones
```http
GET    /inscripciones       # Requiere token + rol admin
GET    /inscripciones/:id   # Requiere token
POST   /inscripciones       # Requiere token + rol admin
DELETE /inscripciones/:id   # Requiere token
```

## 📚 Ejemplo de Uso

### Registrarse

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "miContraseña123",
    "rol": "estudiante"
  }'
```

### Iniciar sesión

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "miContraseña123"
  }'
```

Respuesta de ejemplo:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "estudiante"
  }
}
```

### Crear un curso (admin)

```bash
curl -X POST http://localhost:3000/cursos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_jwt" \
  -d '{
    "nombre": "Introducción a Node.js",
    "descripcion": "Aprende los fundamentos de Node.js",
    "instructor_id": 1,
    "duracion": 40
  }'
```

## 🔐 Seguridad

- JWT para autenticación
- Bcryptjs para cifrado de contraseñas
- Validación con Joi y Zod
- Control de acceso basado en roles
- CORS habilitado
- Manejo de errores con middleware

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Express | ^4.18.2 | Framework web |
| PostgreSQL | ^8.11.3 | Base de datos |
| JWT | ^9.0.0 | Autenticación |
| bcryptjs | ^2.4.3 | Cifrado de contraseñas |
| Joi | ^17.9.2 | Validación |
| Zod | ^3.23.0 | Validación tipo-safe |
| CORS | ^2.8.5 | Cross-origin requests |
| dotenv | ^16.6.1 | Variables de entorno |
| body-parser | ^1.20.2 | Parseo de JSON |

## 📝 Notas

- El comando disponible es `node src/server.js`.
- El script `npm test` ejecuta las pruebas con Jest.
- El archivo `docker-compose.yml` está listo para levantar la API y PostgreSQL.
- Asegúrate de usar el header `Authorization: Bearer <token>` en rutas protegidas.

## 🔧 Consejos de mejora

- Agregar scripts `start` y `dev` en `package.json`.
- Mantener la documentación de rutas y permisos sincronizada con el código.
- Añadir un README de configuración de base de datos con los pasos de creación de esquemas.


## 📖 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `PORT` | Puerto del servidor | ✅ |
| `NODE_ENV` | Entorno (development/production) | ✅ |
| `DB_HOST` | Host de PostgreSQL | ✅ |
| `DB_PORT` | Puerto de PostgreSQL | ✅ |
| `DB_USER` | Usuario de BD | ✅ |
| `DB_PASSWORD` | Contraseña de BD | ✅ |
| `DB_NAME` | Nombre de la BD | ✅ |
| `JWT_SECRET` | Clave secreta JWT | ✅ |
| `JWT_EXPIRE` | Expiración del token | ❌ |

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💼 Autor

**Dsaltaren27**

- GitHub: [@Dsaltaren27](https://github.com/Dsaltaren27)
- Email: tu-email@example.com

## 📞 Soporte

Si encuentras problemas o tienes sugerencias, abre un issue en el repositorio.

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
