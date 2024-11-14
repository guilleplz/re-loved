// FICHERO DE RUTAS DE PRODUCTOS

import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = express.Router();

// Ruta para crear un producto
router.post('/', createProduct);

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para obtener un producto por ID
router.get('/:id', getProductById);

// Ruta para actualizar un producto por ID
router.put('/:id', updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/:id', deleteProduct);

export default router;

