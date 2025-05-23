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
exports.Matricula = void 0;
const DataBaseModel_1 = require("./DataBaseModel");
// Recupera conexão com o banco de dados
const database = new DataBaseModel_1.DataBaseModel().pool;
/**
 * Classe que representa uma matricula no sistema
 */
class Matricula {
    /**
    * Construtor da classe Matriculas
    *
    * @param idAluno Identificador do aluno que fez a matricula
    * @param idCurso Identificador do curso no sistema
    * @param dataMatricula Data em que o aluno foi matriculado
    */
    constructor(_idAluno, _idCurso, _dataMatricula) {
        this.idMatricula = 0; // identificador único da matricula
        this.statusMatricula = true; //status de registro da matricula
        this.idAluno = _idAluno;
        this.idCurso = _idCurso;
        this.dataMatricula = _dataMatricula;
    }
    // métodos GETTERS and SETTERS
    /**
     * Retorna o id da matricula
     * @returns id: id matricula
     */
    getIdMatricula() {
        return this.idMatricula;
    }
    /**
     * Atribui o parâmetro ao atributo idMatricula
     *
     * @param _idMatricula : idMatricula
     */
    setIdMatricula(_idMatricula) {
        this.idMatricula = _idMatricula;
    }
    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    getIdAluno() {
        return this.idAluno;
    }
    /**
     * Atribui o parâmetro ao atributo idAluno
     *
     * @param _idAluno : idAluno
     */
    setIdAluno(_idAluno) {
        this.idAluno = _idAluno;
    }
    /**
     * Retorna o id do curso
     * @returns id: id curso
     */
    getIdCurso() {
        return this.idCurso;
    }
    /**
     * Atribui o parâmetro ao atributo idCurso
     *
     * @param _idCurso : idCurso
     */
    setIdCurso(_idCurso) {
        this.idCurso = _idCurso;
    }
    /**
     * Retorna a data da matricula
     * @returns dataMatricula: data da matricula
     */
    getDataMatricula() {
        return this.dataMatricula;
    }
    /**
     * Atribui o parâmetro ao atributo dataMatricula
     *
     * @param _dataMatricula : data da Matricula
     */
    setDataMatricula(_dataMatricula) {
        this.dataMatricula = _dataMatricula;
    }
    getStatusMatricula() {
        return this.statusMatricula;
    }
    setStatusMatricula(_statusMatricula) {
        this.statusMatricula = _statusMatricula;
    }
    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete
    /**
     * Retorna uma lista com todos as matriculas cadastradas no banco de dados
     *
     * @returns Lista com todas as matriculas cadastradas no banco de dados
     */
    static listarMatriculas() {
        return __awaiter(this, void 0, void 0, function* () {
            // Criando lista vazia para armazenar as matriculas
            let listaDeMatriculas = [];
            try {
                // Query para consulta no banco de dados
                const querySelectMatricula = `
                SELECT m.id_matricula, m.id_aluno, m.id_curso,
                       m.data_matricula, m.status_matricula,
                       a.ra, a.nome_aluno, a.data_nascimento, a.celular, a.email, 
                       c.nome_curso, c.duracao_curso, c.categorizacao
                FROM Matricula m
                JOIN Aluno a ON m.id_aluno = a.id_aluno
                JOIN Curso c ON m.id_curso = c.id_curso
                WHERE status_matricula = true;
            `;
                // Executa a query no banco de dados
                const respostaBD = yield database.query(querySelectMatricula);
                // Verifica se há resultados
                if (respostaBD.rows.length === 0) {
                    return null;
                }
                // Itera sobre as linhas retornadas
                respostaBD.rows.forEach((linha) => {
                    // Monta o objeto de matricula com os dados do aluno e do curso
                    const matricula = {
                        idMatricula: linha.id_matricula,
                        idAluno: linha.id_aluno,
                        idCurso: linha.id_curso,
                        dataMatricula: linha.data_matricula,
                        statusMatricula: linha.status_matricula,
                        aluno: {
                            ra: linha.ra,
                            nomeAluno: linha.nome_aluno,
                            celular: linha.celular,
                            email: linha.email
                        },
                        curso: {
                            nomeCurso: linha.nome_curso,
                            duracaoCurso: linha.duracao_curso,
                            categorizacao: linha.categoriacao
                        }
                    };
                    // Adiciona o objeto à lista de matriculas
                    listaDeMatriculas.push(matricula);
                });
                // retorna a lista de matriculas
                return listaDeMatriculas;
                // captura qualquer erro que possa acontecer
            }
            catch (error) {
                // exibe o erro detalhado no console
                console.log(`Erro ao acessar o modelo: ${error}`);
                // retorna um valor nulo
                return null;
            }
        });
    }
    /**
     * Cadastra uma nova matricula no banco de dados
     *
     * @param idAluno : number
     * @param idCurso : number
     * @param dataMatricula : Date
     * @returns Promise com o resultado da inserção ou erro
     */
    static cadastrarMatricula(idAluno, idCurso, dataMatricula) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Cria a consulta (query) para inserir uma matricula na tabela retornando o ID da matricula criada
                const queryInsertMatricula = `
                INSERT INTO Matricula (id_aluno, id_curso, data_matricula)
                VALUES ($1, $2, $3) RETURNING id_matricula;
            `;
                // estrutura os valores recebidos pela função em uma lista (array)
                const valores = [idAluno, idCurso, dataMatricula];
                // realizada a consulta no banco de dados e armazena o resultado
                const resultado = yield database.query(queryInsertMatricula, valores);
                // verifica se a quantidade de linhas alteradas é diferente de 0
                if (resultado.rowCount != 0) {
                    // exibe mensagem de sucesso no console
                    console.log(`Matricula cadastrada com sucesso! ID: ${resultado.rows[0].id_matricula}`);
                    // retorna o ID da matricula
                    return resultado.rows[0].id_matricula;
                }
                // retorna falso
                return false;
                // captura qualquer tipo de erro que possa acontecer
            }
            catch (error) {
                // exibe o detalhe do erro no console
                console.error(`Erro ao cadastrar matricula: ${error}`);
                // lança um novo erro
                throw new Error('Erro ao cadastrar a matricula.');
            }
        });
    }
    static removerMatricula(idMatricula) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ID recebido para remoção:", idMatricula);
                if (!idMatricula || isNaN(idMatricula)) {
                    console.error("Erro: ID da matricula inválido!");
                    return false;
                }
                //cria uma query para deletar um objeto do banco de dados, passando como parametro o id da matriucla recebido na função
                const queryUpdateMatricula = ` UPDATE matricula
                                            SET status_matricula = FALSE
                                            WHERE id_matricula = ${idMatricula}`;
                //executar a query e armazenar a resposta do BD
                const respostaBD = yield database.query(queryUpdateMatricula);
                //verifica se a quantidade de linhas modificadas é diferente de 0
                if (respostaBD.rowCount != 0) {
                    console.log(`Matricula removida com sucesso! ID da matricula: ${idMatricula}`);
                    //true significa que a remoção foi bem sucedida
                    return true;
                }
                //false, o que indica que a remoção não foi bem sucedida
                return false;
                //trata qualquer erro que possa acontecer no caminho
            }
            catch (error) {
                //exibe uma mensagem de erro
                console.log(`Erro ao remover a matricula. Verifique os logs para mais detalhes.`);
                //imprime o erro no console da API
                console.log(error);
                //retorna false, o que indica a remoção não foi feita
                return false;
            }
        });
    }
    /**
    * Atualiza os dados de uma matricula existente no banco de dados
    *
    * @param idMatricula : number
    * @param idAluno : number'
    * @param idCurso : number
    * @param dataMatricula : Date
    * @returns Promise com o resultado da atualização ou erro
    */
    static atualizarMatricula(idMatricula, idAluno, idCurso, dataMatricula) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Cria a consulta (query) para atualizar uma matricula
                const queryUpdateMatricula = `UPDATE Matricula
            SET id_aluno = $1, id_curso = $2, data_matricula = $3
            WHERE id_matricula = $4
            RETURNING id_matricula;`;
                // estrutura os valores recebidos pela função em uma lista (array)
                const valores = [idAluno, idCurso, dataMatricula, idMatricula];
                // executa a consulta e armazena o resultado
                const resultado = yield database.query(queryUpdateMatricula, valores);
                // verifica se a matricula não existe
                if (resultado.rowCount === 0) {
                    // lança um novo erro
                    throw new Error('Matricula não encontrado.');
                }
                return resultado.rows[0].id_matricula; // Retorna o ID da matricula atualizada
                // captura qualquer erro que possa acontecer
            }
            catch (error) {
                // exibe detalhes do erro no console
                console.error(`Erro ao atualizar matricula: ${error}`);
                // lança um novo erro
                throw new Error('Erro ao atualizar a matricula.');
            }
        });
    }
}
exports.Matricula = Matricula;
//# sourceMappingURL=Matricula.js.map