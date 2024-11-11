// OPERACIONES RELACIONADAS CON LOS PRODUCTOS
// CRUD: Create (Crear), Read (Leer), Update (Actualizar), Delete (Eliminar)
// En este archivo se encuentran las operaciones para los productos

import { Request, Response } from 'express';
import Product from '../models/productModel';

/**
 * Función para CREAR NUEVO PRODUCTO
 * -----------------------------------
 * Esta función crea un nuevo producto en la base de datos a partir de los datos recibidos
 * en el cuerpo de la petición. Se espera que el cuerpo de la petición contenga un objeto
 * con tres propiedades: nombre, precio y categoria.
 * Al crear el producto, se guarda en la base de datos y se devuelve en la respuesta.
 * Si hay algún error al crear el producto, se devuelve un mensaje de error con el código 500.
 * @param req petición con los datos del producto a crear
 * @param res respuesta con el producto creado
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { nombre, precio, categoria } = req.body;
    const nuevoProducto = new Product({ nombre, precio, categoria });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear el producto', error: err });
  }
};

/**
 * Función para OBETENER TODOS LOS PRODUCTOS
 * ---------------------------------------
 * Esta función obtiene todos los productos de la base de datos y los devuelve en la respuesta.
 * Si hay algún error al obtener los productos, se devuelve un mensaje de error con el código 500.
 * @param req petición para obtener los productos
 * @param res respuesta con los productos obtenidos
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const productos = await Product.find();
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener los productos', error: err });
  }
};

// FUNCION PARA OBTENER UN PRODUCTO POR SU ID

// FUNCION PARA ACTUALIZAR UN PRODUCTO POR SU ID

// FUNCION PARA ELIMINAR UN PRODUCTO POR SU ID