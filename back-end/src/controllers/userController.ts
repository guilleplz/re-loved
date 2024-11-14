// OPERACIONES PARA USUARIOS
// CRUD: Create (Crear), Read (Leer), Update (Actualizar), Delete (Eliminar)
// En este archivo se encuentran las operaciones para los usuarios

import { Request, Response } from 'express';
import User from '../models/userModel';

/**
 * Función para CREAR NUEVO USUARIO
 * -----------------------------------
 * Esta función crea un nuevo usuario en la base de datos a partir de los datos recibidos 
 * en el cuerpo de la petición. Se espera que el cuerpo de la petición contenga un objeto
 * con tres propiedades: username, email y password.
 * Al crear el usuario, se guarda en la base de datos y se devuelve en la respuesta.
 * Si hay algún error al crear el usuario, se devuelve un mensaje de error con el código 500.
 * @param req petición con los datos del usuario a crear
 * @param res respuesta con el usuario creado
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, products } = req.body;

    // Verificación básica de datos (puedes añadir más validaciones)
    if (!username || !email || !password) {
      res.status(400).json({ mensaje: 'Los campos username, email y password son obligatorios.' });
      return;
    }

    const nuevoUsuario = new User({ username, email, password, products });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Responder con el usuario creado
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear el usuario', error: err });
  }
};

/**
 * Función para OBTENER TODOS LOS USUARIOS
 * ---------------------------------------
 * Esta función obtiene todos los usuarios de la base de datos y los devuelve en la respuesta.
 * Si hay algún error al obtener los usuarios, se devuelve un mensaje de error con el código 500.
 * @param req petición para obtener los usuarios
 * @param res respuesta con los usuarios obtenidos
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await User.find().populate('products'); // Se pueden obtener los productos relacionados

    // Responder con la lista de usuarios
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: err });
  }
};

/**
 * Función para OBTENER UN USUARIO POR SU ID
 * -----------------------------------------
 * Esta función obtiene un usuario de la base de datos a partir de su ID y lo devuelve en la respuesta.
 * Si el usuario no existe, se devuelve un mensaje de error con el código 404.
 * Si hay algún error al obtener el usuario, se devuelve un mensaje de error con el código 500.
 * @param req petición con el ID del usuario a obtener
 * @param res respuesta con el usuario obtenido
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Buscar usuario por ID, incluyendo los productos relacionados
    const usuario = await User.findById(req.params.id).populate('products');

    // Si el usuario existe, responder con el usuario
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      // Si el usuario no existe, devolver un mensaje de error
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error: err });
  }
};

/**
 * Función para ACTUALIZAR UN USUARIO POR SU ID
 * --------------------------------------------
 * Esta función actualiza un usuario de la base de datos a partir de su ID y los datos recibidos
 * en el cuerpo de la petición. Se espera que el cuerpo de la petición contenga un objeto con las
 * propiedades a actualizar: username, email, password, y productos (opcional).
 * Si el usuario no existe, se devuelve un mensaje de error con el código 404.
 * Si hay algún error al actualizar el usuario, se devuelve un mensaje de error con el código 500.
 * @param req petición con el ID del usuario a actualizar y los datos a modificar
 * @param res respuesta con el usuario actualizado
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, products } = req.body;

    // Buscar usuario por ID
    const usuario = await User.findById(req.params.id);

    // Si el usuario existe, actualizarlo
    if (usuario) {
      usuario.username = username || usuario.username;
      usuario.email = email || usuario.email;
      usuario.password = password || usuario.password;
      usuario.products = products || usuario.products;

      // Guardar los cambios
      await usuario.save();

      // Responder con el usuario actualizado
      res.status(200).json(usuario);
    } else {
      // Si el usuario no existe, devolver un mensaje de error
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: err });
  }
};

/**
 * Función para ELIMINAR UN USUARIO POR SU ID
 * ------------------------------------------
 * Esta función elimina un usuario de la base de datos a partir de su ID.
 * Si el usuario no existe, se devuelve un mensaje de error con el código 404.
 * Si hay algún error al eliminar el usuario, se devuelve un mensaje de error con el código 500.
 * @param req petición con el ID del usuario a eliminar
 * @param res respuesta con el mensaje de confirmación
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Eliminar el usuario por su ID
    const user = await User.findByIdAndDelete(req.params.id);

    // Si no se encuentra el usuario, devolver un mensaje de error
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Responder con un mensaje de éxito
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
