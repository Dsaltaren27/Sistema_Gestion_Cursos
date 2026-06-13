const express = require('express');
const cors = require('cors');

const usuariosRouter = require('./routes/usuarios.routes');
const authRouter = require('./routes/auth.routes');
const cursosRouter = require('./routes/cursos.routes')
const inscripcionesRouter = require('./routes/inscripciones.routes')
const { errorHandler } = require('./middleware/error.middleware');


const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json()); 


app.use('/auth',authRouter);
app.use('/usuarios', usuariosRouter);
app.use('/cursos', cursosRouter);
app.use('/inscripciones', inscripcionesRouter);


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

module.exports= app;