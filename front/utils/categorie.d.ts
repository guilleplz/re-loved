import mongoose from 'mongoose';

export interface Categorie {
  _id: mongoose.Types.ObjectId;
  category_name: string;
  productsInCategory: number;
}