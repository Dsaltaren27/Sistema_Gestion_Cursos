const app = require('./app')
const { PORT } = require('./config/env');


app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`Modo: ${process.env.NODE_ENV || 'development'}\n`);
});