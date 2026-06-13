const {Pool} = require('pg');
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = require('./env');

const pool = new Pool ({

    host: DB_HOST,
    port: DB_PORT,
    database:DB_DATABASE,
    user: DB_USER,
    password:DB_PASSWORD,
    max:10,
    idleTimeoutMillis: 30000


});

if (process.env.NODE_ENV !== 'test') {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error conectando a PostgreSQL:', err.message);
    } else {
      console.log('PostgreSQL conectado correctamente');
      console.log(`Base de datos: ${process.env.DB_DATABASE}`);
      release();
    }
  });
}

module.exports = {pool};