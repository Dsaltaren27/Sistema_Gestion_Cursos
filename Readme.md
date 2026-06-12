# 📚 Sistema de Gestión de Cursos

Una API REST robusta para la gestión integral de cursos, usuarios e inscripciones. Desarrollada con Node.js y Express, esta solución proporciona autenticación segura, control de roles y validación de datos completa.

## 🚀 Características

- ✅ **Autenticación segura** con JWT (JSON Web Tokens)
- ✅ **Gestión de roles y permisos** (Admin, Instructor, Estudiante)
- ✅ **CRUD completo** para usuarios, cursos e inscripciones
- ✅ **Validación robusta** de datos con Joi y Zod
- ✅ **Encriptación de contraseñas** con bcryptjs
- ✅ **Base de datos PostgreSQL** para persistencia confiable
- ✅ **Manejo centralizado de errores**
- ✅ **CORS configurado** para integración con aplicaciones frontend
- ✅ **Arquitectura escalable** con separación de capas

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v14 o superior)
- **npm** o **yarn**
- **PostgreSQL** (v12 o superior)
- **Git**

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

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=sistema_cursos

# Servidor
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRE=7d
```

### 4. Configurar la base de datos

```bash
# Crear la base de datos
createdb sistema_cursos

# Ejecutar las migraciones (si las tienes)
# npm run migrate
```

### 5. Iniciar el servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📂 Estructura del Proyecto

```
src/
├── config/              # Configuración (BD, variables de entorno)
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
├── routes/             # Definición de rutas
│   ├── auth.routes.js
│   ├── cursos.routes.js
│   ├── inscripciones.routes.js
│   └── usuarios.routes.js
├── schemas/            # Esquemas de validación
│   ├── curso.schema.js
│   ├── inscripciones.schema.js
│   ├── login.schema.js
│   └── usuario.schema.js
├── utils/              # Utilidades
│   └── constants.js
├── errors/             # Manejo de errores personalizado
│   └── AppError.js
└── server.js           # Punto de entrada
```

## 🔌 Endpoints Principales

### Autenticación
```http
POST   /auth/login        # Iniciar sesión
POST   /auth/register     # Registrar nuevo usuario
```

### Usuarios
```http
GET    /usuarios           # Listar todos los usuarios
GET    /usuarios/:id       # Obtener usuario por ID
POST   /usuarios           # Crear nuevo usuario
PUT    /usuarios/:id       # Actualizar usuario
DELETE /usuarios/:id       # Eliminar usuario
```

### Cursos
```http
GET    /cursos             # Listar todos los cursos
GET    /cursos/:id         # Obtener curso por ID
POST   /cursos             # Crear nuevo curso
PUT    /cursos/:id         # Actualizar curso
DELETE /cursos/:id         # Eliminar curso
```

### Inscripciones
```http
GET    /inscripciones      # Listar todas las inscripciones
POST   /inscripciones      # Crear nueva inscripción
DELETE /inscripciones/:id  # Cancelar inscripción
```

## 📚 Ejemplo de Uso

### 1. Registrarse

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "contraseña": "miContraseña123"
  }'
```

### 2. Iniciar Sesión

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "contraseña": "miContraseña123"
  }'
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### 3. Crear un Curso (con autenticación)

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

- Autenticación con JWT
- Contraseñas encriptadas con bcryptjs
- Validación de entrada con Joi y Zod
- Control de acceso basado en roles (RBAC)
- CORS configurado para dominios específicos
- Manejo seguro de errores (no expone detalles internos)

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Express | ^4.18.2 | Framework web |
| PostgreSQL | ^8.11.3 | Base de datos |
| JWT | ^9.0.0 | Autenticación |
| bcryptjs | ^2.4.3 | Encriptación |
| Joi | ^17.9.2 | Validación |
| Zod | ^3.23.0 | Type-safe validation |
| CORS | ^2.8.5 | Cross-origin requests |
| dotenv | ^16.6.1 | Variables de entorno |
| body-parser | ^1.20.2 | Parseo de JSON |

## 🚦 Estados HTTP

El API utiliza los siguientes códigos de estado:

- `200 OK` - Solicitud exitosa
- `201 Created` - Recurso creado exitosamente
- `400 Bad Request` - Solicitud inválida
- `401 Unauthorized` - Autenticación requerida
- `403 Forbidden` - Acceso denegado
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

## 📝 Logs y Debugging

Para habilitar logs detallados, establece la variable de entorno:

```bash
NODE_ENV=development
```

## 🐛 Solución de Problemas

### Error de conexión a base de datos
- Verifica que PostgreSQL está corriendo
- Revisa las credenciales en el archivo `.env`
- Asegúrate que la base de datos existe

### Error 401 - No autorizado
- Verifica que incluyes el token JWT en el header `Authorization: Bearer <token>`
- Comprueba que el token no ha expirado

### Error 403 - Acceso denegado
- Verifica que tu usuario tiene el rol requerido
- Contacta al administrador para obtener permisos

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
