"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Curso_1 = require("../model/Curso");
/**
 * Controlador para operações relacionadas aos Cursos.
*/
class CursoController extends Curso_1.Curso {
    /**
     * Lista todos os cursos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de cursos em formato JSON.
     */
    static todos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listaDeCursos = yield Curso_1.Curso.listarCursos();
                res.status(200).json(listaDeCursos);
            }
            catch (error) {
                console.log(`Erro ao acessar método herdado: ${error}`);
                res.status(400).json("Erro ao recuperar as informações do Curso");
            }
        });
    }
    /**
     * Cadastra um novo curso.
     * @param req Objeto de requisição HTTP com os dados do curso.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static cadastrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosRecebidos = req.body;
                console.log(dadosRecebidos);
                // Instanciando objeto Curso
                const novoCurso = new Curso_1.Curso(dadosRecebidos.nomeCurso, dadosRecebidos.duracaoCurso, dadosRecebidos.categorizacao);
                console.log(novoCurso);
                // Chama o método para persistir o curso no banco de dados
                const result = yield Curso_1.Curso.cadastrarCurso(novoCurso);
                // Verifica se a query foi executada com sucesso
                if (result) {
                    return res.status(200).json(`Curso cadastrado com sucesso`);
                }
                else {
                    return res.status(400).json('Não foi possível cadastrar o curso no banco de dados');
                }
            }
            catch (error) {
                console.log(`Erro ao cadastrar o curso: ${error}`);
                return res.status(400).json('Erro ao cadastrar o curso');
            }
        });
    }
    /**
    * Remove um curso.
    * @param req Objeto de requisição HTTP com o ID do curso a ser removido.
    * @param res Objeto de resposta HTTP.
    * @returns Mensagem de sucesso ou erro em formato JSON.
    */
    static remover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idCurso = parseInt(req.query.idCurso);
                const result = yield Curso_1.Curso.removerCurso(idCurso);
                if (result) {
                    return res.status(200).json('Curso removido com sucesso');
                }
                else {
                    return res.status(401).json('Erro ao deletar curso');
                }
            }
            catch (error) {
                console.log("Erro ao remover o Curso");
                console.log(error);
                return res.status(500).send("error");
            }
        });
    }
    /**
     * Método para atualizar o cadastro de um curso.
     *
     * @param req Objeto de requisição do Express, contendo os dados atualizados do curso
     * @param res Objeto de resposta do Express
     * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
     */
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosRecebidos = req.body;
                // Cria uma nova instância de Curso com os dados atualizados
                const curso = new Curso_1.Curso(dadosRecebidos.nomeCurso, dadosRecebidos.duracaoCurso, dadosRecebidos.categorizacao);
                // Define o ID do curso, que deve ser passado na query string
                curso.setIdCurso(parseInt(req.query.idCurso));
                // Chama o método para atualizar o cadastro do curso no banco de dados
                if (yield Curso_1.Curso.atualizarCadastroCurso(curso)) {
                    return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
                }
                else {
                    return res.status(400).json('Não foi possível atualizar o curso no banco de dados');
                }
            }
            catch (error) {
                // Caso ocorra algum erro, este é registrado nos logs do servidor
                console.error(`Erro no modelo: ${error}`);
                // Retorna uma resposta com uma mensagem de erro
                return res.json({ mensagem: "Erro ao atualizar curso." });
            }
        });
    }
}
exports.default = CursoController;
//# sourceMappingURL=CursoController.js.map