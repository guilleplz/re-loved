import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET

if (!secret) throw new Error("La clave secreta (JWT_SECRET) no está definida");

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: "Hace falta un token que verificar" });
    return;
  }

  try {
    jwt.verify(token, secret);
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
};