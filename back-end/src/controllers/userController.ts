// OPERACIONES PARA USUARIOS
// CRUD: Create (Crear), Read (Leer), Update (Actualizar), Delete (Eliminar)
// En este archivo se encuentran las operaciones para los usuarios

import { Request, Response } from 'express';
import User from '../models/userModel';

/**
 * Fucnion para CREAR NUEVO USUARIO
 * -----------------------------------
 * Esta función crea un nuevo usuario en la base de datos a partir de los datos recibidos 
 * en el cuerpo de la petición. Se espera que el cuerpo de la petición contenga un objeto
 * con dos propiedades: nombre y email.
 * Al crear el usuario, se guarda en la base de datos y se devuelve en la respuesta.
 * Si hay algún error al crear el usuario, se devuelve un mensaje de error con el código 500.
 * @param req petición con los datos del usuario a crear
 * @param res respuesta con el usuario creado
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { nombre, email } = req.body;
    const nuevoUsuario = new User({ nombre, email });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear el usuario', error: err });
  }
};

/**
 * Función para OBETENER TODOS LOS USUARIOS
 * ---------------------------------------
 * Esta función obtiene todos los usuarios de la base de datos y los devuelve en la respuesta.
 * Si hay algún error al obtener los usuarios, se devuelve un mensaje de error con el código 500.
 * @param req petición para obtener los usuarios
 * @param res respuesta con los usuarios obtenidos
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const usuarios = await User.find();
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
export const getUserById = async (req: Request, res: Response) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error: err });
  }
}

/**
 * Función para ACTUALIZAR UN USUARIO POR SU ID
 * --------------------------------------------
 * Esta función actualiza un usuario de la base de datos a partir de su ID y los datos recibidos
 * en el cuerpo de la petición. Se espera que el cuerpo de la petición contenga un objeto con las
 * propiedades a actualizar: nombre y email.
 * Si el usuario no existe, se devuelve un mensaje de error con el código 404.
 * Si hay algún error al actualizar el usuario, se devuelve un mensaje de error con el código 500.
 * @param req petición con el ID del usuario a actualizar y los datos a modificar
 * @param res respuesta con el usuario actualizado
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (usuario) {
      usuario.nombre = req.body.nombre || usuario.nombre;
      usuario.email = req.body.email || usuario.email;
      await usuario.save();
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: err });
  }
}


// FUNCION PARA ELIMINAR UN USUARIO POR SU ID

