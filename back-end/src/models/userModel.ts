import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz para los datos del usuario
 * -----------------------------------
 * Esta interfaz define la estructura de los datos que se pueden almacenar en la colección de usuarios.
 * Tiene tres propiedades:
 * - username: nombre de usuario (cadena de texto)
 * - email: dirección de correo electrónico (cadena de texto)
 * - password: contraseña (cadena de texto)
 * - products: lista de identificadores de productos (ObjectId)
 * Todos los campos son obligatorios.
 */
interface User extends Document {
  username: string;
  email: string;
  password: string;
  products: mongoose.Schema.Types.ObjectId[]; // Relación con los productos
}

/**
 * Esquema de Mongoose para los usuarios
 * --------------------------------------
 * Este esquema define la estructura de los documentos que se pueden almacenar en la colección de usuarios.
 * Tiene cuatro campos:
 * - username: nombre de usuario (cadena de texto) - obligatorio y único
 * - email: dirección de correo electrónico (cadena de texto) - obligatorio y único
 * - password: contraseña (cadena de texto) - obligatorio
 * - products: lista de identificadores de productos (ObjectId) - opcional
 */
const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }]
}, { timestamps: true });

/**
 * Modelo de Mongoose para los usuarios
 */
const User = mongoose.model<User>('User', userSchema);

export default User;