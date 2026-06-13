jest.mock('../config/db', () => ({
  pool: {
    query: jest.fn(),
    connect: jest.fn((cb) => cb(null, {}, () => {}))
  }
}));

const { getUserById } = require('../controller/usuarios.controller');
const userRepo = require('../repositories/usuarios.repository');

jest.mock('../repositories/usuarios.repository');

describe('getUserById', () => {

  test('retorna 200 y el usuario cuando existe', async () => {
    userRepo.findById.mockResolvedValue({ id: 1, nombre: 'Ana', email: 'ana@gmail.com' });

    const req = { params: { id: '1' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    await getUserById(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      usuario: { id: 1, nombre: 'Ana', email: 'ana@gmail.com' }
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('llama a next con AppError 404 cuando no existe', async () => {
    userRepo.findById.mockResolvedValue(undefined);

    const req = { params: { id: '999' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    await getUserById(req, res, next);

    expect(next).toHaveBeenCalled();
    const errorRecibido = next.mock.calls[0][0];
    expect(errorRecibido.statusCode).toBe(404);
    expect(errorRecibido.message).toBe('Usuario no encontrado');
  });

});