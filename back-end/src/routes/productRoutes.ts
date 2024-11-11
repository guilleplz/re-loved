// FICHERO DE RUTAS DE PRODUCTOS

import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.ts';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);

export default router;
