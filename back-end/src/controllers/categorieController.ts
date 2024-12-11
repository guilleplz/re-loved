import { Request, Response } from 'express';
import Categorie from "../models/categorieModel.js";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   const categories = await Categorie.find();
   res.status(200).json(categories);

  } catch (err) {
    res.status(500).json({ err: err})
  }
};
