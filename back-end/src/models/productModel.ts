// MODELO DEL PRODUCTO DE LA BASE DE DATOS
// Este archivo contiene el modelo de Mongoose para los productos, 
// que define la estructura de los documentos que se pueden almacenar en la colección de productos. 


import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interfaz para los datos del producto
 * -----------------------------------
 * Esta interfaz define la estructura de los datos que se pueden almacenar en la colección de productos.
 * Tiene tres propiedades:
 * - nombre: nombre del producto (cadena de texto)
 * - precio: precio del producto (número)
 * - categoria: categoría del producto (cadena de texto)
 * Todos los campos son obligatorios.
 */
export interface IProduct extends Document {
  nombre: string;
  precio: number;
  categoria: string;
}

/**
 * Esquema de Mongoose para los productos
 * --------------------------------------
 * Este esquema define la estructura de los documentos que se pueden almacenar en la colección de productos.
 * Tiene tres campos:
 * - nombre: nombre del producto (cadena de texto) - obligatorio
 * - precio: precio del producto (número) - obligatorio
 * - categoria: categoría del producto (cadena de texto) - obligatorio
 * Todos los campos son obligatorios.
 */
const productSchema: Schema<IProduct> = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});

/**
 * Modelo de Mongoose para los productos
 * -------------------------------------
 * Este modelo se utiliza para realizar operaciones en la colección de productos.
 * Se crea a partir del esquema de productos y se exporta para poder utilizarlo en otras partes de la aplicación.
 */
const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
