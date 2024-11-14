"use strict";
// FICHERO DE RUTAS DE USUARIOS
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Ruta para crear un usuario
router.post('/', userController_1.createUser);
// Ruta para obtener todos los usuarios
router.get('/', userController_1.getUsers);
// Ruta para obtener un usuario por ID
router.get('/:id', userController_1.getUserById);
// Ruta para actualizar un usuario por ID
router.put('/:id', userController_1.updateUser);
// Ruta para eliminar un usuario por ID
router.delete('/:id', userController_1.deleteUser);
exports.default = router;
