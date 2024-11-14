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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar variables de entorno desde el archivo .env
/**
 * Función para conectar a la base de datos
 * ----------------------------------------
 * Esta función se encarga de conectar a la base de datos de MongoDB utilizando Mongoose.
 * Si la conexión es exitosa, imprime un mensaje de éxito en la consola.
 * Si la conexión falla, imprime un mensaje de error en la consola y sale del proceso.
 * Se recomienda llamar a esta función al inicio de la aplicación para establecer la conexión
 * con la base de datos.
 * @returns Promesa que se resuelve cuando se ha establecido la conexión con la base de datos.
 * @throws Error si no se encuentra la variable de entorno MONGO_URI.
 * @throws Error si falla la conexión a la base de datos.
 */
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("No se encontró la variable de entorno MONGO_URI");
        }
        yield mongoose_1.default.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado a MongoDB exitosamente");
    }
    catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); // Salir del proceso si falla la conexión
    }
});
exports.default = connectDB;
