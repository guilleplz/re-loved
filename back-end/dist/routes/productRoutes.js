"use strict";
// FICHERO DE RUTAS DE PRODUCTOS
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
// Ruta para crear un producto
router.post('/', productController_1.createProduct);
// Ruta para obtener todos los productos
router.get('/', productController_1.getProducts);
// Ruta para obtener un producto por ID
router.get('/:id', productController_1.getProductById);
// Ruta para actualizar un producto por ID
router.put('/:id', productController_1.updateProduct);
// Ruta para eliminar un producto por ID
router.delete('/:id', productController_1.deleteProduct);
exports.default = router;
