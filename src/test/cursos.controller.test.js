const { getCursoById } = require('../controller/cursos.controller');
const cursoService = require('../services/cursos.service');
const { AppError } = require('../errors/AppError');

jest.mock('../services/cursos.service');

describe('getCursoById', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('retorna 200 y el curso existe', async () => {
        cursoService.getCursoById.mockResolvedValue({ id: 1, curso_nombre: 'JavaScript', descripcion: 'Curso de JS desde cero', profesor_nombre: 'carlos_profesor' });

        const req = { params: { id: '1' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const next = jest.fn();

        await getCursoById(req, res, next);

        expect(cursoService.getCursoById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({
            curso: { id: 1, curso_nombre: 'JavaScript', descripcion: 'Curso de JS desde cero', profesor_nombre: 'carlos_profesor' }
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('llama a next con AppError 404 cuando no existe', async () => {
        cursoService.getCursoById.mockRejectedValue(
            new AppError('Curso no encontrado', 404)
        );

        const req = { params: { id: '999' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const next = jest.fn();

        await getCursoById(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);

        const errorRecibido = next.mock.calls[0][0];
        expect(errorRecibido.statusCode).toBe(404);
        expect(errorRecibido.message).toBe('Curso no encontrado');
    });

});