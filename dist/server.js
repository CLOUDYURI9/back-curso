"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express")); // Importa o framework Express
const cors_1 = __importDefault(require("cors")); // Importa o middleware Cors
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const server = (0, express_1.default)(); // Cria uma instância do servidor Express
exports.server = server;
server.use(express_1.default.json()); // Habilita o uso de JSON no servidor
server.use((0, cors_1.default)()); // Habilita o uso do middleware Cors para lidar com CO
server.use(routes_1.router); // Habilita o uso das rotas do arquivo routes.ts
server.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '..', 'uploads'))); // Serve os arquivos da pasta uploads
//# sourceMappingURL=server.js.map