const express = require('express');
const cors = require('cors');

const usuariosRouter = require('./routes/usuarios.routes');
const authRouter = require('./routes/auth.routes');
const cursosRouter = require('./routes/cursos.routes')
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json()); 


// Rutas públicas
app.use('/auth',authRouter);
app.use('/usuarios', usuariosRouter);
app.use('/cursos', cursosRouter);


// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);


app.listen(3000, () => {
  console.log('Servidor Express corriendo en http://localhost:3000');
});