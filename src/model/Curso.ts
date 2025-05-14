import { DataBaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DataBaseModel().pool;

/**
 * Classe que representa um curso no sistema
 */
export class Curso {
    private idCurso: number = 0; // Identificador único do curso
    private nomeCurso: string; // nome do curso
    private duracaoCurso: string; // duração do curso
    private categorizacao: string; // categoria do curso
    private statusCurso: boolean = true; // status de registro do curso

    /**
    * Construtor da classe Curso
    * 
    * @param nomeCurso Nome do Curso
    * @param duracaoCurso Duração do curso
    * @param categorizacao Categoria do curso
    */
    public constructor(_nomeCurso: string, _duracaoCurso: string, _categorizacao: string) {

        this.nomeCurso = _nomeCurso;
        this.duracaoCurso = _duracaoCurso;
        this.categorizacao = _categorizacao;
    }

    //métodos GETTERS and SETTERS
    /**
     * Retorna o id do curso
     * @returns id: idCurso
     */
    public getIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Atribui o parâmetro ao atributo idCurso
     * 
     * @param _idCurso : idCurso
     */
    public setIdCurso(_idCurso: number): void {
        this.idCurso = _idCurso;
    }

    /**
    * Retorna o nome do curso
    * @returns nomeCurso: _nomeCurso
    */
    public getNomeCurso(): string {
        return this.nomeCurso;
    }

    /**
     * Atribui o parâmetro ao atributo nomeCurso
     * 
     * @param _nomeCurso : nomeCurso
     */
    public setNomeCurso(_nomeCurso: string): void {
        this.nomeCurso = _nomeCurso;
    }

    /**
    * Retorna a duração do curso
    * @returns duracaoCurso: _duracaoCurso
    */
    public getDuracaoCurso(): string {
        return this.duracaoCurso;
    }

    /**
     * Atribui o parâmetro ao atributo duracaoCurso
     * 
     * @param _duracaoCurso : duracaoCurso
     */
    public setDuracaoCurso(_duracaoCurso: string): void {
        this.duracaoCurso = _duracaoCurso;
    }

    /**
    * Retorna a categorizacao do curso
    * @returns categorizacao: _categorizacao
    */
    public getCategorizacao(): string {
        return this.categorizacao;
    }

    /**
     * Atribui o parâmetro ao atributo categorizacao
     * 
     * @param _categorizacao : categorizacao
     */
    public setCategorizacao(_categorizacao: string): void {
        this.categorizacao = _categorizacao;
    }


    /**
     * Retorna o status de registro do curso
     * @returns status de registro do curso : statusCurso
     */
    public getStatusCurso(): boolean {
        return this.statusCurso;
    }

    /**
     * Atribui o parâmetro ao atributo status de curso
     * 
     * @param _statusCurso : statusCurso
     */
    public setStatusCurso(_statusCurso: boolean) {
        this.statusCurso = _statusCurso;
    }


    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os cursos cadastrados no banco de dados
     * 
     * @returns Lista com todos os cursos cadastrados no banco de dados
     */
    static async listarCursos(): Promise<Array<Curso> | null> {
        // Criando lista vazia para armazenar os cursos
        let listaDeCursos: Array<Curso> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectCurso = `SELECT * FROM Curso WHERE status_curso = true;`;

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectCurso);

            // percorre cada resultado retornado pelo banco de dados
            // cursoo é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((curso) => {
                // criando objeto curso
                let novoCurso = new Curso(
                    curso.nome_curso,
                    curso.duracao_curso,
                    curso.categorizacao
                );
                // adicionando o ID ao objeto
                novoCurso.setIdCurso(curso.id_curso);
                novoCurso.setStatusCurso(curso.status_curso)

                // adicionando um curso na lista
                listaDeCursos.push(novoCurso);
            });

            // retornado a lista de cursos para quem chamou a função
            return listaDeCursos;
        
        // captura qualquer erro que aconteça
        } catch (error) {
            // exibe detalhes do erro no console
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um valor nulo
            return null;
        }
    }

    /**
     * Cadastra um novo Curso no banco de dados
     * @param curso Objeto Curso contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarCurso(curso: Curso): Promise<Boolean> {
        // variável de controle da execução da query
        let insertResult = false;

        try {
            // Cria a consulta (query) para inserir curso na tabela retornado o ID do curso
            const queryInsertCurso = `
                INSERT INTO Curso (nome_curso, duracao_curso, categorizacao)
                VALUES (
                    '${curso.getNomeCurso().toUpperCase()}',
                    '${curso.getDuracaoCurso()}',
                    '${curso.getCategorizacao().toUpperCase()}'
                )
                RETURNING id_curso;`;

            // executa a consulta no banco e armazena o resultado
            const result = await database.query(queryInsertCurso);

            // verifica se o número de linhas alteradas no banco de dados é maior que 0
            if (result.rows.length > 0) {
                // exibe mensagem de sucesso no console
                console.log(`Curso cadastrado com sucesso. ID: ${result.rows[0].id_curso}`);
                // altera o valor da variável de controle para verdadeiro
                insertResult = true;
            }

            // retorna o valor da variável de controle
            return insertResult;
        // captura qualquer tipo de erro que possa acontecer
        } catch (error) {
            // exibe detalhes do erro no console
            console.error(`Erro ao cadastrar curso: ${error}`);
            // retorna o valor da variável de controle
            return insertResult;
        }
    }

    /**
     * Remove um curso do banco de dados
     * @param idCurso ID do curso a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerCurso(id_curso: number): Promise<Boolean> {
        // variável de controle da execução da query
        let queryResult = false;

        try {
            // Cria a consulta para remover matricula do banco de dados
            const queryDeleteMatriculaCurso = `  UPDATE Curso 
                                        SET status_curso = FALSE
                                        WHERE id_curso=${id_curso};`;;
            // executa a query para remover matricula
            await database.query(queryDeleteMatriculaCurso);

            // Construção da query SQL para deletar o Curso.
            const queryDeleteCurso = `  UPDATE Curso 
                                        SET status_curso = FALSE
                                        WHERE id_curso=${id_curso};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteCurso)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // retorna o valor da variável de controle
            return queryResult;

        // captura qualquer erro que possa acontecer
        } catch (error) {
            // Exibe detalhes do erro no console
            console.log(`Erro na consulta: ${error}`);
            // retorna o valor fa variável de controle
            return queryResult;
        }
    }

    /**
     * Atualiza os dados de um curso no banco de dados.
     * @param curso Objeto do tipo Curso com os novos dados
     * @returns true caso sucesso, false caso erro
     */
    static async atualizarCadastroCurso(curso: Curso): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do curso no banco de dados.
            const queryAtualizarCurso = `UPDATE Curso SET 
                                            nome_curso = '${curso.getNomeCurso().toUpperCase()}', 
                                            duracao_curso = '${curso.getDuracaoCurso()}',
                                            categorizacao = '${curso.getCategorizacao().toUpperCase()}'
                                        WHERE id_curso = ${curso.idCurso}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            await database.query(queryAtualizarCurso)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        // captura qualquer erro que possa acontecer
        } catch (error) {
            // exibe detalhes do erro no console
            console.log(`Erro na consulta: ${error}`);
            // retorna o valor da variável de controle
            return queryResult;
        }
    }
}
