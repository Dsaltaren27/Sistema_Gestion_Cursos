const { pool } = require('../config/db');

async function findAll() {
  const result = await pool.query(
    'SELECT id, nombre, email, created_at FROM usuarios'
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    'SELECT id, nombre, email, created_at FROM usuarios WHERE id = $1',
    [id]
  );
  return result.rows[0]; 
}

async function findByEmail(email) {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

async function create(nombre, email, password) {
  const result = await pool.query(
    `INSERT INTO usuarios (nombre, email, password) 
     VALUES ($1, $2, $3) 
     RETURNING id, nombre, email, created_at`,
    [nombre, email, password]
  );
  return result.rows[0];
}

module.exports = { findAll, findById, findByEmail, create };