const { pool } = require('../config/db');

async function findAll() {
  const result = await pool.query(
    'SELECT id, usuario_id, curso_id FROM inscripciones'
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    'SELECT id, usuario_id, curso_id FROM inscripciones WHERE id = $1',
    [id]
  );
  return result.rows[0]; 
}


async function create(usuario_id, curso_id) {
  const result = await pool.query(
    `INSERT INTO inscripciones (usuario_id, curso_id) 
     VALUES ($1, $2) 
     RETURNING *`,
    [usuario_id, curso_id]
  );
  return result.rows[0];
}



async function remove(id) {
  const result = await pool.query(
    `DELETE FROM inscripciones 
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}

async function findByUsuario(usuario_id) {
  const result = await pool.query(
    'SELECT *  FROM inscripciones WHERE usuario_id = $1',
    [usuario_id]
  );
  return result.rows; 
}

async function findByCurso(curso_id) {
  const result = await pool.query(
    'SELECT *  FROM inscripciones WHERE curso_id = $1',
    [curso_id]
  );
  return result.rows; 
}

async function findByUsuarioCurso(usuario_id, curso_id) {
  const result = await pool.query(
    'SELECT * FROM inscripciones WHERE usuario_id = $1 AND curso_id = $2',
    [usuario_id, curso_id]
  );
  return result.rows[0];
}

module.exports = { findAll, findById, create, remove, findByUsuario, findByCurso, findByUsuarioCurso };