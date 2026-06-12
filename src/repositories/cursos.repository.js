const { pool } = require('../config/db');

async function findAll() {
  const result = await pool.query(
    'SELECT c.id, c.nombre AS curso_nombre, c.descripcion, u.nombre AS profesor_nombre FROM cursos c JOIN usuarios u ON u.id = c.profesor_id'
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    'SELECT c.id, c.nombre AS curso_nombre, c.descripcion, u.nombre AS profesor_nombre  FROM cursos c JOIN usuarios u ON u.id = c.profesor_id WHERE c.id = $1',
    [id]
  );
  return result.rows[0]; 
}


async function create(nombre, descripcion,profesor_id) {
  const result = await pool.query(
    `INSERT INTO cursos (nombre, descripcion,profesor_id) 
     VALUES ($1, $2, $3) 
     RETURNING id, nombre, descripcion,profesor_id`,
    [nombre, descripcion,profesor_id]
  );
  return result.rows[0];
}


async function update(id,nombre, descripcion,profesor_id) {
  const result = await pool.query(
    `UPDATE cursos set nombre = $1, descripcion = $2, profesor_id = $3 
    WHERE id = $4
     RETURNING *`,
    [nombre, descripcion,profesor_id,id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query(
    `DELETE FROM cursos 
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = { findAll, findById, create,update,remove };