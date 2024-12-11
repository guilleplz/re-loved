import express from "express";
import { getCategories } from "../controllers/categorieController.js"

const router = express.Router();

router.get('/', getCategories);

export default router;