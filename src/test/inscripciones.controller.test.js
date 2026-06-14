const { getInscripcionById } = require('../controller/inscripciones.controller');
const inscripcionesServices = require('../services/inscripciones.service');
const { AppError } = require('../errors/AppError');

jest.mock('../services/inscripciones.service');

describe('getInscripcionById', () => {

beforeEach(() => {
    jest.clearAllMocks();
});

test('retorna 200 cuando la inscripción existe', async () => {

    inscripcionesServices.getInscripcionById.mockResolvedValue({ id: 1, usuario_id: 2, curso_id: 3 });

    const req = {params: { id: '1'}};
    const res = {json: jest.fn(),status: jest.fn().mockReturnThis()};
        const next = jest.fn();

    await getInscripcionById(req, res, next);

    expect(inscripcionesServices.getInscripcionById).toHaveBeenCalledWith(1);

    expect(res.json).toHaveBeenCalledWith({
        inscripcion: {
            id: 1,
            usuario_id: 2,
            curso_id: 3
        }
    });

    expect(next).not.toHaveBeenCalled();
});

test('llama a next con AppError 404 cuando no existe', async () => {

    inscripcionesServices.getInscripcionById.mockRejectedValue(
        new AppError('No hay inscripcion',404)
    );

    const req = { params: { id: '999'}
    };

    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    const next = jest.fn();

    await getInscripcionById(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    const errorRecibido = next.mock.calls[0][0];

    expect(errorRecibido.statusCode).toBe(404);
    expect(errorRecibido.message).toBe('No hay inscripcion');
});


});
