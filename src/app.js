require('dotenv').config();

const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger.middleware');

const usuariosRouter = require('./routes/usuarios.routes');
const authRouter = require('./routes/auth.routes');
const cursosRouter = require('./routes/cursos.routes');
const inscripcionesRouter = require('./routes/inscripciones.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();
const allowedOrigins = process.env.CLIENT_URL.split(',');

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error('Origen no permitido por CORS'));
    },
    credentials: true
  })
);
app.use(express.json()); 
app.use(requestLogger);

app.use('/auth',authRouter);
app.use('/usuarios', usuariosRouter);
app.use('/cursos', cursosRouter);
app.use('/inscripciones', inscripcionesRouter);


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

module.exports= app;