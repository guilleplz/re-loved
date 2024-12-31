import { Request, Response, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) throw new Error("La clave secreta (JWT_SECRET) no está definida");

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: "Hace falta un token que verificar" });
    return;
  }

  try {
    const verified = jwt.verify(token, secret);
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
};

interface CustomJwtPayload extends JwtPayload {
  id?: string; // Agrega otros campos según la estructura de tu token
}

export const idFromToken = async (req: Request, res: Response) => {
  const { token } = req.params;
  if (!token) {
    res.status(400).json({ message: "Hace falta un token que verificar" });
    return;
  }

  try {
    const verified = jwt.verify(token, secret) as CustomJwtPayload;
    if (verified && verified.id) {
      res.status(200).json({ id: verified.id });
    } else {
      res.status(400).json({ message: "El token no contiene un ID válido" });
    }
  } catch (error) {
    res.status(401).json({ error: "error obteniendo id" });
  }
};
