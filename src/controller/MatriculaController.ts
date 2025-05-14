import { Matricula } from "../model/Matricula";
import { Request,Response } from "express";

/**
 * Interface MatriculaDTO
 * Define os atributos que devem ser recebidos do aluno nas requisições
 */
interface MatriculaDTO {
    idAluno: number;
    idCurso: number;
    dataMatricula: string;
}

class MatriculaController extends Matricula{
    /**
     * Método para listar todas as matriculas.
     * Retorna um array de matriculas com informações dos alunos e dos cursos.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarMatriculas do service
            const listaDeMatriculas = await Matricula.listarMatriculas();
            
            // Verifica se houve retorno de dados
            if (!listaDeMatriculas || listaDeMatriculas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma matricula encontrada.' });
            }

            // Retorna a lista de matriculas com status 200 (OK)
            return res.status(200).json(listaDeMatriculas);
        } catch (error) {
            // Em caso de erro, retorna o erro com status 500 (erro do servidor)
            console.error('Erro ao listar matriculas:', error);
            return res.status(500).json({ message: 'Erro ao listar os matriculas.' });
        }
    }

    /**
     * Cadastra uma nova matricula.
     * Recebe os dados da matricula a partir da requisição e passa para o serviço.
     */
    static async cadastrar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: MatriculaDTO = req.body;
            console.log(dadosRecebidos)

            // Verifica se todos os campos obrigatórios foram fornecidos
            if (!dadosRecebidos.idAluno || !dadosRecebidos.idCurso || !dadosRecebidos.dataMatricula ) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Chama o serviço para cadastrar a matricula
            const novoIdMatricula = await Matricula.cadastrarMatricula(
                dadosRecebidos.idAluno, dadosRecebidos.idCurso, new Date(dadosRecebidos.dataMatricula)
            );

            // Retorna a resposta de sucesso com o ID da nova matricula
            return res.status(201).json({ message: 'Matricula cadastrada com sucesso', idMatricula: novoIdMatricula });

        } catch (error) {
            console.error('Erro ao cadastrar matricula:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar a matricula.' });
        }
    }

    /**
     * Atualiza uma matricula existente.
     * Recebe os dados da matricula a partir da requisição e passa para o serviço.
     */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: MatriculaDTO = req.body;
            const idMatricula = parseInt(req.query.idMatricula as string);
            
            // Verifica se todos os campos obrigatórios foram fornecidos
            if (!idMatricula || !dadosRecebidos.idAluno || !dadosRecebidos.idCurso || !dadosRecebidos.dataMatricula ) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Chama o MODEL para atualizar a matricula/ Number(idMatricula) converte o idMatricula de string para number
                const matriculaAtualizada = await Matricula.atualizarMatricula(
                idMatricula, dadosRecebidos.idAluno, dadosRecebidos.idCurso, new Date(dadosRecebidos.dataMatricula)
            );

            // Retorna a resposta de sucesso com o ID da matricula atualizada
            return res.status(200).json({ message: 'Matricula atualizada com sucesso', idMatricula: matriculaAtualizada });

        } catch (error) {
            console.error('Erro ao atualizar matricula:', error);
            return res.status(500).json({ message: 'Erro ao atualizar a matricula.' });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando o id da matricula que será removido
            const idMatricula = parseInt(req.query.idMatricula as string);

            // chamando a função de remoção de uma matricula
            const respostaModelo = await Matricula.removerMatricula(idMatricula);
            
            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Matricula foi removida com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover a matricula. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover uma matricula. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover a matricula. Entre em contato com o administrador do sistema." });
        }
    }

}

export default MatriculaController;