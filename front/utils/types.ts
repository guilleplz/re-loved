import mongoose from 'mongoose';

export interface Categorie {
  _id: mongoose.Types.ObjectId;
  category_name: string;
  productsInCategory: number;
}

export interface Product {
  nombre: string;
  precio: number;
  categoria: string;
  imagen:string;
}

export interface User {
  name: string,
  surname: string,
  username: string;
  email: string;
  password: string;
  productsInStore?: mongoose.Schema.Types.ObjectId[];
  favProducts?: mongoose.Schema.Types.ObjectId[];
}