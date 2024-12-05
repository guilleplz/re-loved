// OPERACIONES PARA USUARIOS
// CRUD: Create (Crear), Read (Leer), Update (Actualizar), Delete (Eliminar)
// En este archivo se encuentran las operaciones para los usuarios

import { Request, Response } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configura dotenv para usar el archivo en la raíz
dotenv.config();



const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
if (!JWT_SECRET) {
  throw new Error('Las variables de entorno JWT_SECRET o JWT_EXPIRATION no están definidas');
}


/**
 * -----------------------------------------------------------
 * INICIAR SESION DE UN USUARIO
 * -----------------------------------------------------------
 * Esta funcion lo que hace es verificar si el usuario existe en la base de datos y si la contraseña es correcta
 * Primero se busca el usuario por su email, si no existe se devuelve un mensaje de error
 * Luego se verifica la contraseña, si no coincide se devuelve un mensaje de error
 * Si todo es correcto se genera un token JWT y se envia en la respuesta
 */
export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // Buscar el usuario por su email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Contraseña incorrecta' });
      return;
    }
    // Generar el token JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    // Enviar la respuesta con el token
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err });
  }
};


/**
 * -----------------------------------------------------------
 * REGISTRAR UN NUEVO USUARIO
 * -----------------------------------------------------------
 * Esta funcion lo que hace es registrar un nuevo usuario en la base de datos
 * Primero se verifica que la contraseña y la confirmacion coincidan
 * Luego se verifica si el usuario ya existe, si ya existe se devuelve un mensaje de error
 * Si todo es correcto se encripta la contraseña y se guarda el usuario en la base de datos
 * Se genera un token JWT y se envia en la respuesta
 */
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, surname, username, hashedPassword } = req.body;
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El email ya está registrado' });
      return;
    }
    
    // Crear el nuevo usuario
    const newUser = new User({
      email,
      name,
      surname,
      username,
      password: hashedPassword,
    });
    // Guardar el usuario en la base de datos
    await newUser.save();
    // Generar el token JWT
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    // Enviar la respuesta con el token
    res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: err });
    console.log(err)
  }
};


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
    const {name, surname, username, email, password, productsInStore, favProducts } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Usuario ya existe' });
    } 

    const hashedPassword = await bcrypt.hash(password, 10)

    const nuevoUsuario = new User({ name, surname, username, email, password: hashedPassword, productsInStore, favProducts });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Generar el JWT
    const token = jwt.sign({ id: nuevoUsuario._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

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
    const usuarios = await User.find().populate('productsInStore').populate('favProducts'); // Se pueden obtener los productos relacionados

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
    const usuario = await User.findById(req.params.id).populate('productsInStore').populate('favProducts');

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
    const {name, surname, username, email, password, productsInStore, favProducts } = req.body;

    // Buscar usuario por ID
    const usuario = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

    // Si el usuario existe, actualizarlo
    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
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
