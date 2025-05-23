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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../model/Usuario"); // modelo do usuário
const fs_1 = __importDefault(require("fs")); // Importa o módulo fs para manipulação de arquivos (file system)
const path_1 = __importDefault(require("path")); // Importa o módulo path para lidar com caminhos de arquivos e diretórios
/**
 * Controlador responsável pelas operações relacionadas aos usuários.
 */
class UsuarioController extends Usuario_1.Usuario {
    /**
     * Cadastra um novo usuário.
     * Também processa o upload da imagem de perfil, se fornecida.
     *
     * @param req Objeto de requisição HTTP contendo os dados do usuário e, opcionalmente, o arquivo de imagem.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static cadastrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrai os dados do corpo da requisição
                const dadosRecebidos = req.body;
                // Instancia um novo objeto de usuário com os dados recebidos
                const novoUsuario = new Usuario_1.Usuario(dadosRecebidos.nome, dadosRecebidos.username, dadosRecebidos.email);
                // Define a senha do usuário (armazenada de forma segura no modelo)
                novoUsuario.setSenha(dadosRecebidos.senha);
                // Cadastra o usuário no banco de dados e obtém seu UUID
                const uuid = yield Usuario_1.Usuario.cadastroUsuario(novoUsuario);
                // Se não foi possível cadastrar, retorna erro
                if (!uuid) {
                    return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
                }
                // Se uma imagem de perfil foi enviada, renomeia e atualiza o nome no banco
                if (req.file) {
                    const ext = path_1.default.extname(req.file.originalname); // Pega a extensão original do arquivo
                    const novoNome = `${uuid}${ext}`; // Define o novo nome do arquivo como o UUID do usuário
                    const antigoPath = req.file.path; // Caminho temporário do upload
                    const novoPath = path_1.default.resolve(req.file.destination, novoNome); // Caminho de destino final
                    fs_1.default.renameSync(antigoPath, novoPath); // Renomeia o arquivo no sistema de arquivos
                    yield Usuario_1.Usuario.atualizarImagemPerfil(uuid, novoNome); // Atualiza o nome do arquivo no banco de dados
                }
                // Retorna sucesso
                return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
            }
            catch (error) {
                // Em caso de erro, registra nos logs e retorna erro para o cliente
                console.error('Erro ao cadastrar usuário:', error);
                res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhes: error });
            }
        });
    }
}
exports.default = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map