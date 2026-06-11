const { pool } = require('../config/db');

async function findAll() {
  const result = await pool.query(
    'SELECT id, nombre, email, rol, created_at FROM usuarios'
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    'SELECT id, nombre, email,rol, created_at FROM usuarios WHERE id = $1',
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

async function create(nombre, email, rol, password) {
  const result = await pool.query(
    `INSERT INTO usuarios (nombre, email, rol,password) 
     VALUES ($1, $2, $3,$4) 
     RETURNING id, nombre, email, rol, created_at`,
    [nombre, email, rol, password]
  );
  return result.rows[0];
}

module.exports = { findAll, findById, findByEmail, create };