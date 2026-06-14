const { getUserById } = require('../controller/usuarios.controller');
const userService = require('../services/usuarios.service');
const { AppError } = require('../errors/AppError');

jest.mock('../services/usuarios.service');

describe('getUserById', () => {

        beforeEach(() => {
        jest.clearAllMocks();
    });

  test('retorna 200 y el usuario cuando existe', async () => {
    userService.getUserById.mockResolvedValue({ id: 1, nombre: 'Ana', email: 'ana@gmail.com' });

    const req = { params: { id: '1' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    await getUserById(req, res, next);

    expect(userService.getUserById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({
      usuario: { id: 1, nombre: 'Ana', email: 'ana@gmail.com' }
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('llama a next con AppError 404 cuando no existe', async () => {
    userService.getUserById.mockRejectedValue(
      new AppError('Usuario no encontrado', 404)
    );

    const req = { params: { id: '999' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    await getUserById(req, res, next);

  
    expect(next).toHaveBeenCalledTimes(1);
    
    const errorRecibido = next.mock.calls[0][0];
    expect(errorRecibido.statusCode).toBe(404);
    expect(errorRecibido.message).toBe('Usuario no encontrado');
  });

});