"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const DataBaseModel_1 = require("./model/DataBaseModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Define a porta que o servidor vai escutar as requisições
const port = parseInt(process.env.SERVER_PORT);
new DataBaseModel_1.DataBaseModel().testeConexao().then((resdb) => {
    if (resdb) {
        console.clear();
        console.log("Conexão com banco de dados realizada com sucesso!");
        // iniciando o servidor
        server_1.server.listen(port, () => {
            console.log(`Servidor iniciado no endereço ${process.env.SERVER_URL}:${port}`);
        });
    }
    else {
        console.log("Erro ao conectar com o banco de dados");
    }
});
//# sourceMappingURL=app.js.map