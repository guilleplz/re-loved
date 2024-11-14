import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz para los datos del producto
 * -----------------------------------
 * Esta interfaz define la estructura de los datos que se pueden almacenar en la colección de productos.
 * Tiene cinco propiedades:
 * - name: nombre del producto (cadena de texto)
 * - description: descripción del producto (cadena de texto)
 * - price: precio del producto (número)
 * - category: categoría del producto (cadena de texto)
 * - userId: identificador del usuario que creó el producto (ObjectId)
 * Todos los campos son obligatorios.
 */
interface Product extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  userId: mongoose.Schema.Types.ObjectId; // Relación con el usuario
}

/**
 * Esquema de Mongoose para los productos
 * --------------------------------------
 * Este esquema define la estructura de los documentos que se pueden almacenar en la colección de productos.
 * Tiene cinco campos:
 * - name: nombre del producto (cadena de texto) - obligatorio
 * - description: descripción del producto (cadena de texto) - obligatorio
 * - price: precio del producto (número) - obligatorio
 * - category: categoría del producto (cadena de texto) - obligatorio
 * - userId: identificador del usuario que creó el producto (ObjectId) - obligatorio
 * Todos los campos son obligatorios.
 */
const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Relación con el modelo de Usuario
    required: true,
  }
}, { timestamps: true });

/**
 * Modelo de Mongoose para los productos
 * -------------------------------------
 * Este modelo se utiliza para realizar operaciones en la colección de productos.
 * Se crea a partir del esquema de productos y se exporta para poder utilizarlo en otras partes de la aplicación.
 */
const Product = mongoose.model<Product>('Product', productSchema);

export default Product;
