-- Tabla cursos — relacionada con usuarios (profesor_id)
CREATE TABLE cursos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  profesor_id INTEGER NOT NULL REFERENCES usuarios(id),
  created_at TIMESTAMP DEFAULT NOW()
);
