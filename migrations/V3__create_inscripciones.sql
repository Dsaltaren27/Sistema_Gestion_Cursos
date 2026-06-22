-- Tabla inscripciones — tabla pivote (muchos a muchos)
CREATE TABLE inscripciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  curso_id INTEGER NOT NULL REFERENCES cursos(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (usuario_id, curso_id)
);