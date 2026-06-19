# Sistema de Gestión de Cursos

API REST construida con Node.js + Express para administrar usuarios, cursos e inscripciones, con autenticación JWT, control de acceso por roles (RBAC), validación con Joi y logging estructurado con Winston + Morgan.

## Stack

- **Runtime:** Node.js 22 (alpine)
- **Framework:** Express
- **Base de datos:** PostgreSQL 16
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Validación:** Joi
- **Logging:** Winston + winston-daily-rotate-file + Morgan
- **Testing:** Jest + Supertest
- **Contenedores:** Docker + Docker Compose

## Arquitectura

El proyecto sigue una arquitectura en capas:

```
Request
  ↓
CORS + express.json()
  ↓
Morgan (logging HTTP) ──→ Winston
  ↓
Auth JWT (CheckToken)
  ↓
Roles (CheckRole)
  ↓
Validación (Joi)
  ↓
Controller
  ↓
Service ──────────────→ Winston (eventos de negocio)
  ↓
Repository (PostgreSQL)
  ↓
Error Middleware Global ─→ Winston (warn 4xx / error 5xx)
```

Cada capa tiene una única responsabilidad: el controller no toca la base de datos, el service no conoce `req`/`res`, y el repository solo ejecuta queries parametrizadas.

## Estructura del proyecto

```
src/
├── app.js                  # Configuración de Express y middlewares globales
├── server.js                # Arranque del servidor
├── config/
│   ├── db.js                  # Pool de conexión a PostgreSQL
│   └── env.js                  # Variables de entorno
├── controller/               # Maneja req/res, delega a services
├── services/                  # Lógica de negocio
├── repositories/               # Acceso a datos (queries SQL)
├── routes/                    # Definición de endpoints
├── schemas/                   # Esquemas de validación Joi
├── middleware/
│   ├── auth.middleware.js         # Verificación de JWT
│   ├── roles.middleware.js         # Control de acceso por rol
│   ├── validation.middleware.js     # Validación de body con Joi
│   ├── logger.middleware.js         # Morgan → Winston (logs HTTP)
│   └── error.middleware.js           # Manejador de errores global
├── errors/
│   └── AppError.js              # Clase de error personalizada
├── utils/
│   ├── constants.js               # Roles y constantes
│   └── logger.js                   # Configuración de Winston
└── test/                       # Tests de controllers y middleware
```

## Roles y permisos

| Rol         | Permisos                                                  |
|-------------|------------------------------------------------------------|
| `admin`      | Acceso total: gestiona usuarios, cursos e inscripciones     |
| `profesor`   | Lectura de cursos e inscripciones de sus cursos               |
| `estudiante` | Lectura de cursos, gestión de sus propias inscripciones        |

## Logging

El proyecto usa **Winston** como logger central y **Morgan** para capturar logs HTTP, con rotación diaria de archivos vía `winston-daily-rotate-file`.

Los logs se separan en tres streams independientes dentro de `logs/`:

| Archivo                      | Contenido                                            | Retención |
|--------------------------------|---------------------------------------------------------|-----------|
| `application-YYYY-MM-DD.log`      | Eventos de negocio (`info`, `warn`): logins, registros | 14 días   |
| `error-YYYY-MM-DD.log`              | Errores reales no controlados (5xx, excepciones)         | 30 días   |
| `http-YYYY-MM-DD.log`                | Tráfico HTTP (Morgan): método, URL, status, tiempo         | 7 días    |

El manejador de errores global distingue severidad automáticamente: errores esperados del negocio (4xx, como credenciales inválidas) se registran como `warn`, mientras que errores no controlados o 5xx se registran como `error` con stack trace completo.

En desarrollo (`NODE_ENV !== 'production'`), los logs también se imprimen en consola.

> ⚠️ La carpeta `logs/` está en `.gitignore` y no debe subirse al repositorio.

## Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes variables:

```env
PORT=3000
CLIENT_URL=http://localhost:4200

DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=gestion_escolar
DB_USER=postgres
DB_PASSWORD=tu_password

JWT_SECRET=tu_clave_secreta
NODE_ENV=development
```

> ⚠️ **Nunca subas el `.env` real al repositorio.** Usa este bloque como plantilla (`.env.example`).

> ⚠️ Si usas `docker-compose.yml`, verifica que `CLIENT_URL` también esté definido en la sección `environment` del servicio `api` — actualmente no lo está, y la app requiere esa variable para configurar CORS.

## Instalación y uso

### Con Docker (recomendado)

```bash
docker compose up --build
```

Esto levanta dos contenedores: la API en `localhost:3000` y PostgreSQL en `localhost:5432`, con la base de datos inicializada automáticamente desde `init-db/init.sql`.

Para detener y limpiar:
```bash
docker compose down
```

### Local (sin Docker)

```bash
npm install
npm run dev      # con --watch, recarga automática
# o
npm start
```

> Asegúrate de que no haya un contenedor Docker corriendo en el puerto 3000 al mismo tiempo (`docker compose down` primero).

### Tests

```bash
npm test
```

## Endpoints principales

| Método | Ruta                    | Descripción              | Roles permitidos          |
|--------|----------------------------|------------------------------|------------------------------|
| POST   | `/auth/login`                | Iniciar sesión                | Público                      |
| POST   | `/auth/register`              | Registro de usuario             | Público                      |
| GET    | `/usuarios`                    | Listar usuarios                  | admin                        |
| GET    | `/usuarios/:id`                  | Obtener usuario                   | Autenticado                  |
| POST   | `/usuarios`                        | Crear usuario                      | admin                        |
| GET    | `/cursos`                            | Listar cursos                        | admin, profesor               |
| GET    | `/cursos/:id`                          | Obtener curso                          | admin, profesor, estudiante    |
| POST   | `/cursos`                                | Crear curso                              | admin                          |
| PUT    | `/cursos/:id`                              | Actualizar curso                           | admin                          |
| DELETE | `/cursos/:id`                                | Eliminar curso                              | admin                          |
| GET    | `/inscripciones`                               | Listar inscripciones                          | admin, profesor                |
| GET    | `/inscripciones/:id`                             | Obtener inscripción                            | admin, estudiante                |
| POST   | `/inscripciones`                                   | Crear inscripción                               | admin, estudiante                |
| DELETE | `/inscripciones/:id`                                 | Eliminar inscripción                             | admin                            |

