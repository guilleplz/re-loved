import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // Rutas de usuario
import productRoutes from './routes/productRoutes.js'; // Rutas de producto

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Middlewares
    app.use(express.json()); // Parseo de JSON para solicitudes POST y PUT

    // Rutas
    app.use('/api/users', userRoutes);  // Rutas para usuarios
    app.use('/api/products', productRoutes); // Rutas para productos

    // Ruta de prueba ara asegurarse de que la app está corriendo
    app.get('/', (req: Request, res: Response) => {
      res.send('¡Servidor Express en TypeScript está funcionando!');
    });

    // Manejo de errores global
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error('Error:', err);
      res.status(500).json({
        message: 'Error en el servidor',
        error: err.message || 'Error desconocido',
      });
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1); // Salir si no se puede iniciar el servidor
  }
};

startServer();

export default app;