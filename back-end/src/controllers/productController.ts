// OPERACIONES RELACIONADAS CON LOS PRODUCTOS
// CRUD: Create (Crear), Read (Leer), Update (Actualizar), Delete (Eliminar)
// En este archivo se encuentran las operaciones para los productos

import { Request, Response } from 'express';
import Product from '../models/productModel.js';

/**
 * Función para CREAR NUEVO PRODUCTO
 * -----------------------------------
 * Crea un nuevo producto en la base de datos a partir de los datos recibidos
 * en el cuerpo de la petición.
 * Se espera que el cuerpo de la petición contenga un objeto con las propiedades:
 * - name: nombre del producto (cadena de texto)
 * - priceInCents: precio del producto en centavos (número)
 * - category: categoría del producto (cadena de texto)
 * - description: descripción del producto (cadena de texto)
 * - owner: nombre del propietario del producto (cadena de texto)
 * - img: URL de la imagen del producto (cadena de texto)
 * Al crear el producto, se guarda en la base de datos y se devuelve en la respuesta.
 * Si hay algún error al crear el producto, se devuelve un mensaje de error con el código 500.
 * @param req petición con los datos del producto a crear
 * @param res respuesta con el producto creado
 */
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, priceInCents, category, description, owner, img } = req.body;

    // Crear el nuevo producto con los datos proporcionados
    const nuevoProducto = new Product({
      name,
      priceInCents,
      category,
      description,
      owner,
      img,
      likes: 0, // Inicializar con 0 likes
    });

    // Guardar el nuevo producto en la base de datos
    await nuevoProducto.save();
    // Responder con el producto creado
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el producto', error: err });
  }
};

/**
 * Función para OBTENER TODOS LOS PRODUCTOS
 * -----------------------------------------
 * Obtiene todos los productos almacenados en la base de datos.
 * Si hay algún error al obtener los productos, se devuelve un mensaje de error con el código 500.
 * @param req petición para obtener los productos
 * @param res respuesta con la lista de productos
 */
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtener todos los productos de la base de datos
    const productos = await Product.find();
    // Responder con la lista de productos
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los productos', error: err });
  }
};

/**
 * Función para OBTENER UN PRODUCTO POR SU ID
 * ------------------------------------------
 * Obtiene un producto de la base de datos utilizando su ID.
 * Si el producto no existe, se devuelve un mensaje de error con el código 404.
 * Si hay algún error al obtener el producto, se devuelve un mensaje de error con el código 500.
 * @param req petición con el ID del producto a obtener
 * @param res respuesta con el producto obtenido
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Buscar el producto por su ID
    const product = await Product.findById(req.params.id);
    // Si no se encuentra el producto, devolver un mensaje de error
    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    // Responder con el producto encontrado
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

/**
 * Función para ACTUALIZAR UN PRODUCTO POR SU ID
 * ---------------------------------------------
 * Actualiza un producto en la base de datos utilizando su ID y los datos proporcionados.
 * Si el producto no existe, se devuelve un mensaje de error con el código 404.
 * Si hay algún error al actualizar el producto, se devuelve un mensaje de error con el código 500.
 * @param req petición con los datos actualizados del producto
 * @param res respuesta con el producto actualizado
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // Actualizar el producto con los nuevos datos recibidos
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Si el producto no existe, devolver un mensaje de error
    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    // Responder con el producto actualizado
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

/**
 * Función para ELIMINAR UN PRODUCTO POR SU ID
 * -------------------------------------------
 * Elimina un producto de la base de datos utilizando su ID.
 * Si el producto no existe, se devuelve un mensaje de error con el código 404.
 * Si hay algún error al eliminar el producto, se devuelve un mensaje de error con el código 500.
 * @param req petición con el ID del producto a eliminar  
 * @param res respuesta con el mensaje de confirmación
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // Eliminar el producto por su ID
    const product = await Product.findByIdAndDelete(req.params.id);
    // Si el producto no existe, devolver un mensaje de error
    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    // Responder con un mensaje de confirmación
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};
