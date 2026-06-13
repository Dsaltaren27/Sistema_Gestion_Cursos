const { getCursoById } = require('../controller/cursos.controller');
const cursoRepo = require('../repositories/cursos.repository');

jest.mock('../repositories/cursos.repository');

describe('getUserById', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('retorna 200 y el curso existe', async () => {
        cursoRepo.findById.mockResolvedValue({ id: 1, curso_nombre: 'JavaScript', descripcion: 'Curso de JS desde cero', profesor_nombre: 'carlos_profesor' });

        const req = { params: { id: '1' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const next = jest.fn();

        await getCursoById(req, res, next);

        expect(cursoRepo.findById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({
            curso: { id: 1, curso_nombre: 'JavaScript', descripcion: 'Curso de JS desde cero', profesor_nombre: 'carlos_profesor' }
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('llama a next con AppError 404 cuando no existe', async () => {
        cursoRepo.findById.mockResolvedValue(undefined);

        const req = { params: { id: '999' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const next = jest.fn();

        await getCursoById(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);

        const errorRecibido = next.mock.calls[0][0];
        expect(errorRecibido.statusCode).toBe(404);
        expect(errorRecibido.message).toBe('curso no encontrado');
    });

});