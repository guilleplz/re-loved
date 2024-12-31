import express from "express";
import { idFromToken, verifyToken } from "../controllers/tokenController.js";

const router = express.Router();

router.post('/', verifyToken);
router.get('/:token', idFromToken);

export default router;