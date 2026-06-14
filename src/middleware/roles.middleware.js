const { AppError } = require("../errors/AppError");

function CheckRole(...rolesPermitidos) {

    return (req, res, next) => {

        if (!req.usuario) {

            return next(new AppError('Usuario no autenticado', 401));
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
        
                return next(new AppError('No autorizado', 403));
        }

        next();
    };
}

module.exports = { CheckRole };