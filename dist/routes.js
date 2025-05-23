"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const appConfig_1 = require("./appConfig");
const AlunoController_1 = __importDefault(require("./controller/AlunoController"));
const CursoController_1 = __importDefault(require("./controller/CursoController"));
const MatriculaController_1 = __importDefault(require("./controller/MatriculaController"));
const router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" });
});
// CRUD Aluno
router.get(appConfig_1.SERVER_ROUTES.LISTAR_ALUNOS, AlunoController_1.default.todos);
router.post(appConfig_1.SERVER_ROUTES.NOVO_ALUNO, AlunoController_1.default.cadastrar);
router.put(appConfig_1.SERVER_ROUTES.REMOVER_ALUNO, AlunoController_1.default.remover);
router.put(appConfig_1.SERVER_ROUTES.ATUALIZAR_ALUNO, AlunoController_1.default.atualizar);
//CRUD Curso
router.get(appConfig_1.SERVER_ROUTES.LISTAR_CURSOS, CursoController_1.default.todos);
router.post(appConfig_1.SERVER_ROUTES.NOVO_CURSO, CursoController_1.default.cadastrar);
router.put(appConfig_1.SERVER_ROUTES.REMOVER_CURSO, CursoController_1.default.remover);
router.put(appConfig_1.SERVER_ROUTES.ATUALIZAR_CURSO, CursoController_1.default.atualizar);
//CRUD Matricula
router.get(appConfig_1.SERVER_ROUTES.LISTAR_MATRICULAS, MatriculaController_1.default.todos);
router.post(appConfig_1.SERVER_ROUTES.NOVA_MATRICULA, MatriculaController_1.default.cadastrar);
router.put(appConfig_1.SERVER_ROUTES.ATUALIZAR_MATRICULA, MatriculaController_1.default.atualizar);
router.put(appConfig_1.SERVER_ROUTES.REMOVER_MATRICULA, MatriculaController_1.default.remover);
//# sourceMappingURL=routes.js.map