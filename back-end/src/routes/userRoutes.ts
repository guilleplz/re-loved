// FICHERO DE RUTAS DE USUARIOS

import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, signIn, signUp, getUserByEmail } from '../controllers/userController.js';

const router = express.Router();

// Ruta para crear un usuario
router.post('/', createUser);

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', getUserById);

// Ruta para actualizar un usuario por ID
router.put('/:id', updateUser);

// Ruta para buscar un usuario por su email
router.get('/email/:email', getUserByEmail)

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteUser);

// R// Ruta para el registro de usuario (sign-up)
router.post('/signup', signUp);

// Ruta para el inicio de sesión (sign-in)
router.post('/signin', signIn);


export default router;
