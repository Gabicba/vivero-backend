"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const data_sourse_1 = require("./config/data-sourse");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Ruta de prueba
app.get('/health', (_req, res) => {
    res.json({ ok: true });
});
// Función para arrancar
async function start() {
    try {
        await data_sourse_1.AppDataSource.initialize();
        console.log('📦 Conectado a la base de datos');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error('❌ Error al iniciar la app:', err);
    }
}
// Si este archivo se ejecuta directamente → arrancamos
if (require.main === module) {
    start();
}
exports.default = app;
