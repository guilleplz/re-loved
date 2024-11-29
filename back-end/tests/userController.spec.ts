import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import User from '../src/models/userModel.js';
import app from '../src/server.js'; 

describe('User Controller (Supertest)', () => {
  before(async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  });

  after(async () => {
    await mongoose.connection.close();
  });

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

  it('should get all users', async () => {
    const user1 = new User({
      name: 'Alice',
      surname: 'Wonderland',
      username: 'alicew',
      email: 'alice@example.com',
      password: 'password789',
      productsInStore: [],
      favProducts: [],
    });
    await user1.save();

    const user2 = new User({
      name: 'Bob',
      surname: 'Builder',
      username: 'bobb',
      email: 'bob@example.com',
      password: 'password456',
      productsInStore: [],
      favProducts: [],
    });
    await user2.save();

    const response = await request(app).get('/api/users').expect(200);

    expect(response.body.length).to.equal(2);
    expect(response.body[0].username).to.equal(user1.username);
    expect(response.body[1].username).to.equal(user2.username);
  });

  it('should get a user by ID', async () => {
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

    const response = await request(app).get(`/api/users/${user._id}`).expect(200);

    expect(response.body).to.have.property('_id', user.id.toString());
    expect(response.body.username).to.equal(user.username);
  });


});

