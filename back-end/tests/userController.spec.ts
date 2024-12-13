import 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import User from '../src/models/userModel.js';
import app from '../src/server.js';
import request from 'supertest';
import bcrypt from 'bcryptjs';

describe('User Controller Tests', () => {

  // Conectar a MongoDB antes de las pruebas
  before(async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    await User.deleteMany({});
  });

  // Cerrar la conexión después de las pruebas
  after(async () => {
    await mongoose.connection.close();
  });

  // Eliminar los usuarios de la base de datos después de cada prueba
  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should get a user by ID', async () => {
    // Crear un usuario para la prueba
    const user = new User({
      name: 'Alice',
      surname: 'Wonderland',
      username: 'alicew',
      email: 'alice@example.com',
      password: 'password789',
      productsInStore: [],
      favProducts: [],
    });
    await user.save();

    // Probar la obtención del usuario por ID
    const response = await request(app).get(`/api/users/${user._id}`).expect(200);

    // Validar la respuesta
    expect(response.body).to.have.property('_id', user.id.toString());
    expect(response.body.username).to.equal(user.username);
  });

  it('should update a user by ID', async () => {
    // Crear un usuario para la prueba
    const user = new User({
      name: 'Charlie',
      surname: 'Brown',
      username: 'charlieb',
      email: 'charlie@example.com',
      password: 'password321',
      productsInStore: [],
      favProducts: [],
    });
    await user.save();

    // Datos para actualizar el usuario
    const updatedData = {
      name: 'Charles',
      surname: 'Brown',
    };

    // Probar la actualización del usuario
    const response = await request(app).put(`/api/users/${user._id}`).send(updatedData).expect(200);

    // Validar la respuesta
    expect(response.body.name).to.equal(updatedData.name);
    expect(response.body.surname).to.equal(updatedData.surname);
  });

  it('should have a signup method', async () => {
    const response = await request(app).options('/api/auth/signup');
    expect(response.status).to.equal(204); // Verifica que la ruta existe
  });

  it('should have a signin method', async () => {
    const response = await request(app).options('/api/auth/signin');
    expect(response.status).to.equal(204); // Verifica que la ruta existe
  });
});