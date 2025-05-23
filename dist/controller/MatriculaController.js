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
const Matricula_1 = require("../model/Matricula");
class MatriculaController extends Matricula_1.Matricula {
    /**
     * Método para listar todas as matriculas.
     * Retorna um array de matriculas com informações dos alunos e dos cursos.
     */
    static todos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Chama o método listarMatriculas do service
                const listaDeMatriculas = yield Matricula_1.Matricula.listarMatriculas();
                // Verifica se houve retorno de dados
                if (!listaDeMatriculas || listaDeMatriculas.length === 0) {
                    return res.status(404).json({ message: 'Nenhuma matricula encontrada.' });
                }
                // Retorna a lista de matriculas com status 200 (OK)
                return res.status(200).json(listaDeMatriculas);
            }
            catch (error) {
                // Em caso de erro, retorna o erro com status 500 (erro do servidor)
                console.error('Erro ao listar matriculas:', error);
                return res.status(500).json({ message: 'Erro ao listar os matriculas.' });
            }
        });
    }
    /**
     * Cadastra uma nova matricula.
     * Recebe os dados da matricula a partir da requisição e passa para o serviço.
     */
    static cadastrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosRecebidos = req.body;
                console.log(dadosRecebidos);
                // Verifica se todos os campos obrigatórios foram fornecidos
                if (!dadosRecebidos.idAluno || !dadosRecebidos.idCurso || !dadosRecebidos.dataMatricula) {
                    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
                }
                // Chama o serviço para cadastrar a matricula
                const novoIdMatricula = yield Matricula_1.Matricula.cadastrarMatricula(dadosRecebidos.idAluno, dadosRecebidos.idCurso, new Date(dadosRecebidos.dataMatricula));
                // Retorna a resposta de sucesso com o ID da nova matricula
                return res.status(201).json({ message: 'Matricula cadastrada com sucesso', idMatricula: novoIdMatricula });
            }
            catch (error) {
                console.error('Erro ao cadastrar matricula:', error);
                return res.status(500).json({ message: 'Erro ao cadastrar a matricula.' });
            }
        });
    }
    /**
     * Atualiza uma matricula existente.
     * Recebe os dados da matricula a partir da requisição e passa para o serviço.
     */
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dadosRecebidos = req.body;
                const idMatricula = parseInt(req.query.idMatricula);
                // Verifica se todos os campos obrigatórios foram fornecidos
                if (!idMatricula || !dadosRecebidos.idAluno || !dadosRecebidos.idCurso || !dadosRecebidos.dataMatricula) {
                    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
                }
                // Chama o MODEL para atualizar a matricula/ Number(idMatricula) converte o idMatricula de string para number
                const matriculaAtualizada = yield Matricula_1.Matricula.atualizarMatricula(idMatricula, dadosRecebidos.idAluno, dadosRecebidos.idCurso, new Date(dadosRecebidos.dataMatricula));
                // Retorna a resposta de sucesso com o ID da matricula atualizada
                return res.status(200).json({ message: 'Matricula atualizada com sucesso', idMatricula: matriculaAtualizada });
            }
            catch (error) {
                console.error('Erro ao atualizar matricula:', error);
                return res.status(500).json({ message: 'Erro ao atualizar a matricula.' });
            }
        });
    }
    static remover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // recuperando o id da matricula que será removido
                const idMatricula = parseInt(req.query.idMatricula);
                // chamando a função de remoção de uma matricula
                const respostaModelo = yield Matricula_1.Matricula.removerMatricula(idMatricula);
                // verificando a resposta da função
                if (respostaModelo) {
                    // retornar uma mensagem de sucesso
                    return res.status(200).json({ mensagem: "Matricula foi removida com sucesso!" });
                }
                else {
                    // retorno uma mensagem de erro
                    return res.status(400).json({ mensagem: "Erro ao remover a matricula. Entre em contato com o administrador do sistema." });
                }
            }
            catch (error) {
                // lança uma mensagem de erro no console
                console.log(`Erro ao remover uma matricula. ${error}`);
                // retorna uma mensagem de erro há quem chamou a mensagem
                return res.status(400).json({ mensagem: "Não foi possível remover a matricula. Entre em contato com o administrador do sistema." });
            }
        });
    }
}
exports.default = MatriculaController;
//# sourceMappingURL=MatriculaController.js.map