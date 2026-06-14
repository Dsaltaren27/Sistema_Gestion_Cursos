const { CheckRole } = require('../middleware/roles.middleware');

describe('CheckRole', () => {

    //NO HAY USUARIO
  test('llama a next con AppError 401 si no hay req.usuario', () => {
    const middleware = CheckRole('admin');

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0];
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Usuario no autenticado');
  });

  //ROL INCORRECTO
  test('llama a next con AppError 403 si el rol no está permitido', () => {
    const middleware = CheckRole('admin');

    const req = { usuario: { rol: 'estudiante' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0];
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('No autorizado');
  });

  // ROL PERMITIDO
  test('llama a next() sin argumentos si el rol está permitido', () => {
    const middleware = CheckRole('admin');

    const req = { usuario: { rol: 'admin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(); 
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

});