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
const Aluno_1 = require("../model/Aluno");
/**
 * Controlador para operações relacionadas aos alunos.
 */
class AlunoController extends Aluno_1.Aluno {
    /**
     * Lista todos os alunos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de alunos em formato JSON.
     */
    static todos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listaDeAlunos = yield Aluno_1.Aluno.listarAlunos();
                res.status(200).json(listaDeAlunos);
            }
            catch (error) {
                console.log(`Erro ao acessar método herdado: ${error}`);
                res.status(400).json("Erro ao recuperar as informações do Aluno");
            }
        });
    }
    /**
      * Cadastra um novo aluno.
      * @param req Objeto de requisição HTTP com os dados do aluno.
      * @param res Objeto de resposta HTTP.
      * @returns Mensagem de sucesso ou erro em formato JSON.
      */
    static cadastrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Desestruturando objeto recebido pelo front-end
                const dadosRecebidos = req.body;
                // Instanciando objeto Aluno
                const novoAluno = new Aluno_1.Aluno(dadosRecebidos.nomeAluno, (_a = dadosRecebidos.dataNascimento) !== null && _a !== void 0 ? _a : new Date("1900-01-01"), dadosRecebidos.celular, (_b = dadosRecebidos.email) !== null && _b !== void 0 ? _b : '');
                console.log(novoAluno);
                // Chama o método para persistir o aluno no banco de dados
                const result = yield Aluno_1.Aluno.cadastrarAluno(novoAluno);
                // Verifica se a query foi executada com sucesso
                if (result) {
                    return res.status(200).json(`Aluno cadastrado com sucesso`);
                }
                else {
                    return res.status(400).json('Não foi possível cadastrar o aluno no banco de dados');
                }
            }
            catch (error) {
                console.log(`Erro ao cadastrar o aluno: ${error}`);
                return res.status(400).json('Erro ao cadastrar o aluno');
            }
        });
    }
    /**
     * Remove um aluno.
     * @param req Objeto de requisição HTTP com o ID do aluno a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static remover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idAluno = parseInt(req.query.idAluno);
                const result = yield Aluno_1.Aluno.removerAluno(idAluno);
                if (result) {
                    return res.status(200).json('Aluno removido com sucesso');
                }
                else {
                    return res.status(401).json('Erro ao deletar aluno');
                }
            }
            catch (error) {
                console.log("Erro ao remover o Aluno");
                console.log(error);
                return res.status(500).send("error");
            }
        });
    }
    /**
     * Método para atualizar o cadastro de um aluno.
     *
     * @param req Objeto de requisição do Express, contendo os dados atualizados do aluno
     * @param res Objeto de resposta do Express
     * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
     */
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Desestruturando objeto recebido pelo front-end
                const dadosRecebidos = req.body;
                // Instanciando objeto Aluno
                const aluno = new Aluno_1.Aluno(dadosRecebidos.nomeAluno, (_a = dadosRecebidos.dataNascimento) !== null && _a !== void 0 ? _a : new Date("1900-01-01"), dadosRecebidos.celular, (_b = dadosRecebidos.email) !== null && _b !== void 0 ? _b : '');
                // Define o ID do aluno, que deve ser passado na query string
                aluno.setIdAluno(parseInt(req.query.idAluno));
                console.log(dadosRecebidos);
                // Chama o método para atualizar o cadastro do aluno no banco de dados
                if (yield Aluno_1.Aluno.atualizarCadastroAluno(aluno)) {
                    return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
                }
                else {
                    return res.status(400).json('Não foi possível atualizar o aluno no banco de dados');
                }
            }
            catch (error) {
                // Caso ocorra algum erro, este é registrado nos logs do servidor
                console.error(`Erro no modelo: ${error}`);
                // Retorna uma resposta com uma mensagem de erro
                return res.json({ mensagem: "Erro ao atualizar aluno." });
            }
        });
    }
}
exports.default = AlunoController;
//# sourceMappingURL=AlunoController.js.map