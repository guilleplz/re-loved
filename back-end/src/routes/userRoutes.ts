// FICHERO DE RUTAS DE USUARIOS

import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Ruta para crear un usuario
router.post('/', createUser);

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', getUserById);

// Ruta para actualizar un usuario por ID
router.put('/:id', updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteUser);

export default router;
