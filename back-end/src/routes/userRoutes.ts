// FICHERO DE RUTAS DE USUARIOS

import express from 'express';
import { createUser, getUsers } from '../controllers/userController.ts';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

export default router;
