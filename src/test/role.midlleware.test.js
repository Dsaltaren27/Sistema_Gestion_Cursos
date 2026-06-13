const { CheckRole } = require('../middleware/roles.middleware');

describe('CheckRole', () => {

    //NO HAY USUARIO
  test('retorna 401 si no hay req.usuario', () => {
    const middleware = CheckRole('admin'); // obtenemos el middleware real

    const req = {};
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuario no autenticado' });
  });


  //ROL INCORRECTO
  test('retorna 403 si el rol no está permitido', () => {
  const middleware = CheckRole('admin');

  const req = { usuario: { rol: 'estudiante' } };
  const res = { 
    status: jest.fn().mockReturnThis(), 
    json: jest.fn() 
  };
  const next = jest.fn();

  middleware(req, res, next);

  expect(res.status).toHaveBeenCalledWith(403);
  expect(res.json).toHaveBeenCalledWith({ error: 'No autorizado' });
  expect(next).not.toHaveBeenCalled();
});

// ROL PERMITIDO
test('llama a next() si el rol está permitido', () => {
  const middleware = CheckRole('admin');

  const req = { usuario: { rol: 'admin' } };
  const res = { 
    status: jest.fn().mockReturnThis(), 
    json: jest.fn() 
  };
  const next = jest.fn();

  middleware(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(res.status).not.toHaveBeenCalled();
  expect(res.json).not.toHaveBeenCalled();


});

});