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
exports.Usuario = void 0;
const DataBaseModel_1 = require("./DataBaseModel");
// Recupera conexão com o banco de dados
const database = new DataBaseModel_1.DataBaseModel().pool;
/**
 * Classe que representa um usuário no sistema
 */
class Usuario {
    /**
     * Construtor da classe Usuario
     *
     * @param _nome Nome do Usuário
     * @param _username Nome de usuário (login)
     * @param _email Endereço de e-mail do usuário
     */
    constructor(_nome, _username, _email) {
        this.idUsuario = 0; // Identificador único do usuário
        this.uuidUsuario = ''; // Identificador único universal do usuário
        this.senha = ''; // Senha do usuário
        this.imagemPerfil = ''; // Imagem de perfil do usuário
        this.nome = _nome;
        this.username = _username;
        this.email = _email;
    }
    /**
     * Retorna o ID do usuário
     * @returns idUsuario Identificador único do usuário
     */
    getIdUsuario() {
        return this.idUsuario;
    }
    /**
     * Atribui um valor ao ID do usuário
     * @param idUsuario Identificador único do usuário
     */
    setIdUsuario(idUsuario) {
        this.idUsuario = idUsuario;
    }
    /**
     * Retorna o UUID do usuário
     * @returns uuidUsuario Identificador único universal do usuário
     */
    getUuidUsuario() {
        return this.uuidUsuario;
    }
    /**
     * Atribui um valor ao UUID do usuário
     * @param uuidUsuario Identificador único universal do usuário
     */
    setUuidUsuario(uuidUsuario) {
        this.uuidUsuario = uuidUsuario;
    }
    /**
     * Retorna o nome do usuário
     * @returns nome Nome do usuário
     */
    getNome() {
        return this.nome;
    }
    /**
     * Atribui um valor ao nome do usuário
     * @param nome Nome do usuário
     */
    setNome(nome) {
        this.nome = nome;
    }
    /**
     * Retorna o nome de usuário (login)
     * @returns username Nome de usuário
     */
    getUsername() {
        return this.username;
    }
    /**
     * Atribui um valor ao nome de usuário
     * @param username Nome de usuário
     */
    setUsername(username) {
        this.username = username;
    }
    /**
     * Retorna o e-mail do usuário
     * @returns email Endereço de e-mail do usuário
     */
    getEmail() {
        return this.email;
    }
    /**
     * Atribui um valor ao e-mail do usuário
     * @param email Endereço de e-mail do usuário
     */
    setEmail(email) {
        this.email = email;
    }
    /**
     * Retorna a senha do usuário
     * @returns senha Senha do usuário
     */
    getSenha() {
        return this.senha;
    }
    /**
     * Atribui um valor à senha do usuário
     * @param senha Senha do usuário
     */
    setSenha(senha) {
        this.senha = senha;
    }
    /**
     * Retorna a o caminho da imagem do usuario
     * @returns caminho da imagem do usuário
     */
    getImagemPerfil() {
        return this.imagemPerfil;
    }
    /**
     * Atribui um valor à imagem do usuário
     * @param senha caminho da imagem do usuário
     */
    setImagemPerfil(imagem) {
        this.imagemPerfil = imagem;
    }
    /**
     * Retorna uma lista com todos os usuários cadastrados no banco de dados
     * @returns Lista com todos os usuários cadastrados ou null em caso de erro
     */
    static listarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            // Criando lista vazia para armzenar os usuários
            let listaDeUsuarios = [];
            try {
                // Query para recuperar todos os usuários cadastrados
                const querySelectUsuarios = `SELECT * FROM usuario`;
                // Executa a query no banco de dados
                const respostaBD = yield database.query(querySelectUsuarios);
                // Percorre os resultados da consulta
                respostaBD.rows.forEach((usuario) => {
                    // Cria um novo objeto Usuario com os dados retornados
                    let novoUsuario = new Usuario(usuario.nome, usuario.username, usuario.email);
                    // Atribui os valores adicionais ao objeto
                    novoUsuario.setIdUsuario(usuario.id_usuario);
                    novoUsuario.setUuidUsuario(usuario.uuid);
                    // Adiciona o usuário à lista
                    listaDeUsuarios.push(novoUsuario);
                });
                // Retorna a lista de usuários
                return listaDeUsuarios;
            }
            catch (error) {
                // Em caso de erro, exibe uma mensagem no console e retorna null
                console.log(`Erro ao recuperar usuários. ${error}`);
                return null;
            }
        });
    }
    /**
     * Cadastra um usuário no banco de dados
     *
     * @param usuario Usuário a ser cadastrado
     * @returns o UUID do usuário cadastrado
     */
    static cadastroUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Define a query SQL para inserir um novo usuário com nome, username, email e senha
                // A cláusula RETURNING uuid retorna o identificador gerado automaticamente pelo banco
                const query = `
          INSERT INTO usuario (nome, username, email, senha)
          VALUES ($1, $2, $3, $4)
          RETURNING uuid
        `;
                // Define os valores que serão usados na query (evita SQL Injection)
                const valores = [usuario.nome, usuario.username, usuario.email, usuario.senha];
                // Executa a query no banco de dados e aguarda a resposta
                const resultado = yield database.query(query, valores);
                // Obtém o uuid gerado pelo banco de dados a partir do resultado da query
                const uuid = resultado.rows[0].uuid;
                // Atribui o uuid ao objeto do usuário, caso precise ser usado depois
                usuario.uuidUsuario = uuid;
                // Retorna o uuid como confirmação do cadastro
                return uuid;
            }
            catch (error) {
                // Em caso de erro, exibe no console para ajudar na identificação do problema
                console.error('Erro ao salvar usuário:', error);
                // Retorna null para indicar que o cadastro não foi concluído
                return null;
            }
        });
    }
    /**
     * Atualiza o caminho da imagem de perfil no cadastro do usuário
     * @param uuid UUID do usuário, que representará o nome da imagem
     * @param nomeArquivo O nome do arquivo a ser salvo
     */
    static atualizarImagemPerfil(uuid, nomeArquivo) {
        return __awaiter(this, void 0, void 0, function* () {
            // Define a query SQL que atualiza o campo imagem_perfil do usuário com o nome do arquivo
            const query = `UPDATE usuario SET imagem_perfil = $1 WHERE uuid = $2`;
            // Executa a query passando o nome do arquivo e o uuid do usuário como parâmetros
            yield database.query(query, [nomeArquivo, uuid]);
        });
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map