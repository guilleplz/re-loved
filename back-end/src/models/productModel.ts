import mongoose, { Schema, Document, Types } from 'mongoose';
import { types } from 'util';

/**
 * Interfaz para los datos del producto
 * -----------------------------------
 * Define la estructura de los datos que se pueden almacenar en la colección de productos.
 * Incluye:
 * - _id: identificador único del producto (ObjectId)
 * - name: nombre del producto (cadena de texto)
 * - owner: nombre del propietario del producto (cadena de texto)
 * - img: URL de la imagen del producto (cadena de texto)
 * - priceInCents: precio del producto en centavos (número)
 * - description: descripción del producto (cadena de texto)
 * - category: categoría del producto (cadena de texto)
 * - likes: número de "me gusta" (número)
 */
interface Product extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  owner: mongoose.Types.ObjectId;
  img: string;
  priceInCents: number;
  description: string;
  category: string;
  likes: number;
}

/**
 * Esquema de Mongoose para los productos
 * --------------------------------------
 * Define la estructura de los documentos almacenados en la colección de productos.
 * Incluye validaciones y relaciones.
 * Campos:
 * - name: nombre del producto (cadena de texto) - obligatorio
 * - owner: nombre del propietario del producto (cadena de texto) - obligatorio
 * - img: URL de la imagen del producto (cadena de texto) - obligatorio
 * - priceInCents: precio del producto en centavos (número) - obligatorio
 * - description: descripción del producto (cadena de texto) - obligatorio
 * - category: categoría del producto (cadena de texto) - obligatorio
 * - likes: número de "me gusta" (número) - por defecto inicia con 0
 * - timestamps: campos de fecha de creación y actualización
 * @see Product - Interfaz para los datos del producto
 */
const productSchema = new Schema<Product>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  priceInCents: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0, // Por defecto inicia con 0 "likes"
  },
}, { timestamps: true });

/**
 * Modelo de Mongoose para los productos
 * -------------------------------------
 * Utilizado para realizar operaciones CRUD en la colección de productos.
 */
const Product = mongoose.model<Product>('Product', productSchema);

export default Product;
