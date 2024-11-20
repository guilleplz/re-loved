import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env


/**
 * Función para conectar a la base de datos
 * ----------------------------------------
 * Esta función se encarga de conectar a la base de datos de MongoDB utilizando Mongoose.
 * Si la conexión es exitosa, imprime un mensaje de éxito en la consola.
 * Si la conexión falla, imprime un mensaje de error en la consola y sale del proceso.
 * Se recomienda llamar a esta función al inicio de la aplicación para establecer la conexión 
 * con la base de datos.
 * @returns Promesa que se resuelve cuando se ha establecido la conexión con la base de datos.
 * @throws Error si no se encuentra la variable de entorno MONGO_URI.
 * @throws Error si falla la conexión a la base de datos.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("No se encontró la variable de entorno MONGO_URI");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    
    console.log("Conectado a MongoDB exitosamente");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Salir del proceso si falla la conexión
  }
};

export default connectDB;