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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Rutas de usuario
const productRoutes_1 = __importDefault(require("./routes/productRoutes")); // Rutas de producto
// Cargar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conectar a la base de datos
        yield (0, db_1.default)();
        // Middlewares
        app.use(express_1.default.json()); // Parseo de JSON para solicitudes POST y PUT
        // Rutas
        app.use('/api/users', userRoutes_1.default); // Rutas para usuarios
        app.use('/api/products', productRoutes_1.default); // Rutas para productos
        // Ruta de prueba ara asegurarse de que la app está corriendo
        app.get('/', (req, res) => {
            res.send('¡Servidor Express en TypeScript está funcionando!');
        });
        // Manejo de errores global
        app.use((err, req, res, next) => {
            console.error('Error:', err);
            res.status(500).json({
                message: 'Error en el servidor',
                error: err.message || 'Error desconocido',
            });
        });
        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1); // Salir si no se puede iniciar el servidor
    }
});
startServer();
