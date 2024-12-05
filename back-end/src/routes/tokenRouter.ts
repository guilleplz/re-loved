import express from "express";
import { verifyToken } from "../controllers/tokenController.js";

const router = express.Router();

router.post('/', verifyToken)

export default router;