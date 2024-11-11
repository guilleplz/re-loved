// MODELO DEL USUARIO DE LA BASE DE DATOS
// Este archivo contiene el modelo de Mongoose para los usuarios,
// que define la estructura de los documentos que se pueden almacenar en la colección de usuarios.

import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interfaz para los datos del usuario
 * -----------------------------------
 * Esta interfaz define la estructura de los datos que se pueden almacenar en la colección de usuarios.
 * Tiene tres propiedades:
 * - nombre: nombre del usuario (cadena de texto)
 * - email: dirección de correo electrónico del usuario (cadena de texto)
 * - fechaRegistro: fecha y hora en que se registró el usuario (fecha)
 * Todos los campos son obligatorios.
 */
export interface IUser extends Document {
  nombre: string;
  email: string;
  fechaRegistro: Date;
}

/**
 * Esquema de Mongoose para los usuarios
 * -------------------------------------
 * Este esquema define la estructura de los documentos que se pueden almacenar en la colección de usuarios.
 * Tiene tres campos:
 * - nombre: nombre del usuario (cadena de texto) - obligatorio
 * - email: dirección de correo electrónico del usuario (cadena de texto) - obligatorio y único
 * - fechaRegistro: fecha y hora en que se registró el usuario (fecha) - por defecto, la fecha y hora actuales
 * Todos los campos son obligatorios.
 */
const userSchema: Schema<IUser> = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Modelo de Mongoose para los usuarios
 * ------------------------------------
 * Este modelo se utiliza para realizar operaciones en la colección de usuarios.
 * Se crea a partir del esquema de usuarios y se exporta para poder utilizarlo en otras partes de la aplicación.
 */
const User = mongoose.model<IUser>('User', userSchema);

export default User;
