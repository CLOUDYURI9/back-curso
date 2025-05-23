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
exports.Aluno = void 0;
const DataBaseModel_1 = require("./DataBaseModel");
// Recupera conexão com o banco de dados
const database = new DataBaseModel_1.DataBaseModel().pool;
/**
 * Classe que representa um aluno no sistema
 */
class Aluno {
    /**
     * Construtor da classe Aluno
     *
     * @param nomeAluno Nome do Aluno
     * @param Sobrenome Sobrenome do Aluno
     * @param dataNascimento Data de nascimento do Aluno
     * @param celular Celular do Aluno
     *  @param email Email do Aluno
     * @param statusAluno Status do Aluno
     */
    constructor(_nomeAluno, _dataNascimento, _celular, _email) {
        this.idAluno = 0; // Identificador único do aluno
        this.ra = ''; // Registro acadêmico do aluno
        this.statusAluno = true; //Controla o status do aluno 
        this.nomeAluno = _nomeAluno;
        this.dataNascimento = _dataNascimento;
        this.celular = _celular;
        this.email = _email;
    }
    //métodos GETTERS and SETTERS
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
    /*
    /**
     * Retorna o ra do aluno
     * @returns ra: ra aluno
     */
    getRA() {
        return this.ra;
    }
    /**
     * Atribui o parâmetro ao atributo ra
     *
     * @param _ra : ra do aluno
     */
    setRA(_ra) {
        this.ra = _ra;
    }
    /**
     * Retorna o nome do aluno
     * @returns nome: nome aluno
     */
    getNomeAluno() {
        return this.nomeAluno;
    }
    /**
     * Atribui o parâmetro ao atributo nome
     *
     * @param _nomeAluno : nome do aluno
     */
    setNomeAluno(_nomeAluno) {
        this.nomeAluno = _nomeAluno;
    }
    /**
     * Retorna a dataNascimento do aluno
     * @returns datanascimento: dataNascimento aluno
     */
    getDataNascimento() {
        return this.dataNascimento;
    }
    /**
     * Atribui o parâmetro ao atributo dataNascimento
     *
     * @param _dataNascimento : dataNascimento do aluno
     */
    setDataNascimento(_dataNascimento) {
        this.dataNascimento = _dataNascimento;
    }
    /**
     * Retorna o email do aluno
     * @returns email: email aluno
     */
    getEmail() {
        return this.email;
    }
    /**
     * Retorna o status do aluno no sistema
     *
     * @returns status: status do aluno
     */
    getStatusAluno() {
        return this.statusAluno;
    }
    /**
     * Atribui um valor ao status do aluno
     *
     * @param _statusAluno : valor a ser atribuido ao status do aluno
     */
    setStatusAluno(_statusAluno) {
        this.statusAluno = _statusAluno;
    }
    /**
     * Retorna o celular do aluno
     * @returns celular: celular aluno
     */
    getCelular() {
        return this.celular;
    }
    /**
     * Atribui o parâmetro ao atributo celular
     *
     * @param _celular : celular do aluno
     */
    setCelular(_celular) {
        this.celular = _celular;
    }
    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete
    /**
     * Retorna uma lista com todos os alunos cadastrados no banco de dados
     *
     * @returns Lista com todos os alunos cadastrados no banco de dados
     */
    static listarAlunos() {
        return __awaiter(this, void 0, void 0, function* () {
            // Criando lista vazia para armazenar os alunos
            let listaDeAlunos = [];
            try {
                // Query para consulta no banco de dados
                const querySelectAluno = `SELECT * FROM Aluno WHERE status_aluno = TRUE;`;
                // executa a query no banco de dados
                const respostaBD = yield database.query(querySelectAluno);
                // percorre cada resultado retornado pelo banco de dados
                // aluno é o apelido que demos para cada linha retornada do banco de dados
                respostaBD.rows.forEach((aluno) => {
                    // criando objeto aluno
                    let novoAluno = new Aluno(aluno.nome_aluno, aluno.data_nascimento, aluno.celular, aluno.email);
                    // adicionando o ID ao objeto
                    novoAluno.setIdAluno(aluno.id_aluno);
                    novoAluno.setRA(aluno.ra);
                    novoAluno.setStatusAluno(aluno.status_aluno);
                    // adicionando a pessoa na lista
                    listaDeAlunos.push(novoAluno);
                });
                // retornado a lista de pessoas para quem chamou a função
                return listaDeAlunos;
            }
            catch (error) {
                console.log(`Erro ao acessar o modelo: ${error}`);
                return null;
            }
        });
    }
    /**
     * Cadastra um novo aluno no banco de dados
     * @param aluno Objeto Aluno contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static cadastrarAluno(aluno) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Cria a consulta (query) para inserir o registro de um aluno no banco de dados, retorna o ID do aluno que foi criado no final
                const queryInsertAluno = `
                INSERT INTO Aluno (nome_aluno, data_nascimento, celular, email) 
                VALUES (
                    '${aluno.getNomeAluno().toUpperCase()}',
                    '${aluno.getDataNascimento()}',
                    '${aluno.getCelular()}',
                    '${aluno.getEmail().toLowerCase()}'
                )
                RETURNING id_aluno;`;
                // Executa a query no banco de dados e armazena o resultado
                const result = yield database.query(queryInsertAluno);
                // verifica se a quantidade de linhas que foram alteradas é maior que 0
                if (result.rows.length > 0) {
                    // Exibe a mensagem de sucesso
                    console.log(`Aluno cadastrado com sucesso. ID: ${result.rows[0].id_aluno}`);
                    // retorna verdadeiro
                    return true;
                }
                // caso a consulta não tenha tido sucesso, retorna falso
                return false;
                // captura erro
            }
            catch (error) {
                // Exibe mensagem com detalhes do erro no console
                console.error(`Erro ao cadastrar aluno: ${error}`);
                // retorna falso
                return false;
            }
        });
    }
    /**
     * Remove um aluno do banco de dados
     * @param idAluno ID do aluno a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static removerAluno(id_aluno) {
        return __awaiter(this, void 0, void 0, function* () {
            // variável para controle de resultado da consulta (query)
            let queryResult = false;
            try {
                // Cria a consulta (query) para remover o aluno
                const queryDeleteMatriculaAluno = `    UPDATE matricula 
                                                    SET status_matricula = FALSE
                                                    WHERE id_aluno=${id_aluno}`;
                // remove os emprestimos associado ao aluno
                yield database.query(queryDeleteMatriculaAluno);
                // Construção da query SQL para deletar o Aluno.
                const queryDeleteAluno = `  UPDATE Aluno 
                                        SET status_aluno = FALSE
                                        WHERE id_aluno=${id_aluno};`;
                // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
                yield database.query(queryDeleteAluno)
                    .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });
                // retorna o resultado da query
                return queryResult;
                // captura qualquer erro que aconteça
            }
            catch (error) {
                // Em caso de erro na consulta, exibe o erro no console e retorna false.
                console.log(`Erro na consulta: ${error}`);
                // retorna false
                return queryResult;
            }
        });
    }
    /**
    * Atualiza os dados de um aluno no banco de dados.
    * @param aluno Objeto do tipo Aluno com os novos dados
    * @returns true caso sucesso, false caso erro
    */
    static atualizarCadastroAluno(aluno) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult = false; // Variável para armazenar o resultado da operação.
            try {
                // Construção da query SQL para atualizar os dados do aluno no banco de dados.
                const queryAtualizarAluno = `UPDATE Aluno SET 
                                            nome_aluno = '${aluno.getNomeAluno().toUpperCase()}', 
                                            data_nascimento = '${aluno.getDataNascimento()}', 
                                            email = '${aluno.getEmail().toLowerCase()}',                                                                                        
                                            celular = '${aluno.getCelular()}' 
                                        WHERE id_aluno = ${aluno.idAluno}`;
                // Executa a query de atualização e verifica se a operação foi bem-sucedida.
                yield database.query(queryAtualizarAluno)
                    .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });
                // Retorna o resultado da operação para quem chamou a função.
                return queryResult;
            }
            catch (error) {
                // Em caso de erro na consulta, exibe o erro no console e retorna false.
                console.log(`Erro na consulta: ${error}`);
                return queryResult;
            }
        });
    }
}
exports.Aluno = Aluno;
//# sourceMappingURL=Aluno.js.map