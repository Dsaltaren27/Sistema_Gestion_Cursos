-- Tabla usuarios — con rol para el sistema RBAC
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'profesor', 'estudiante')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla cursos — relacionada con usuarios (profesor_id)
CREATE TABLE cursos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  profesor_id INTEGER NOT NULL REFERENCES usuarios(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla inscripciones — tabla pivote (muchos a muchos)
CREATE TABLE inscripciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  curso_id INTEGER NOT NULL REFERENCES cursos(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (usuario_id, curso_id)
);

-- Datos iniciales — un admin para poder probar la API de inmediato
-- Password: "admin123" hasheada con bcrypt
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Admin', 'admin@email.com', '$2a$10$wda6Z11YZGQklDaU7vF49OWUGt5PxEkrri7CfufHRzA5cVZ4G09M2', 'admin');