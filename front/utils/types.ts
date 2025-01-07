import mongoose from 'mongoose';

export interface Categorie {
  _id?: mongoose.Types.ObjectId;
  category_name: string;
  productsInCategory: number;
}

export interface Product {
  _id?: mongoose.Types.ObjectId,
  name: string;
  priceInCents: number;
  category: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  img:string;
}

export interface User {
  
  
  _id?: mongoose.Types.ObjectId,
  name: string,
  surname: string,
  username: string;
  email: string;
  password: string;
  productsInStore?: mongoose.Types.ObjectId[];
  favProducts?: mongoose.Types.ObjectId[];
}