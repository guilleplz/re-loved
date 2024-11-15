import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import Product from '../src/models/productModel.js';
import app from '../src/server.js'; // Importar el app exportado

describe('Product Controller (Supertest)', () => {
  before(async () => {
    // Conectar a la base de datos y configurar el servidor
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  });

  after(async () => {
    // Cerrar la conexión a la base de datos
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Limpiar la base de datos después de cada prueba
    await Product.deleteMany({});
  });

  it('should get all products', async () => {
    const product = new Product({
      name: 'Test Product',
      priceInCents: 1000,
      category: 'Test Category',
      description: 'Test Description',
      owner: 'Test Owner',
      img: 'http://example.com/test.jpg',
      likes: 0,
    });
    await product.save();

    const response = await request(app).get('/api/products');
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(1);
  });

  it('should get a product by ID', async () => {
    const product = new Product({
      name: 'Test Product',
      priceInCents: 1000,
      category: 'Test Category',
      description: 'Test Description',
      owner: 'Test Owner',
      img: 'http://example.com/test.jpg',
      likes: 0,
    });
    await product.save();

    const response = await request(app).get(`/api/products/${product._id}`);
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(product.name);
  });

  it('should update a product by ID', async () => {
    const product = new Product({
      name: 'Test Product',
      priceInCents: 1000,
      category: 'Test Category',
      description: 'Test Description',
      owner: 'Test Owner',
      img: 'http://example.com/test.jpg',
      likes: 0,
    });
    await product.save();

    const updatedData = {
      name: 'Updated Product',
      priceInCents: 2000,
    };

    const response = await request(app).put(`/api/products/${product._id}`).send(updatedData);
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(updatedData.name);
  });

  it('should delete a product by ID', async () => {
    const product = new Product({
      name: 'Test Product',
      priceInCents: 1000,
      category: 'Test Category',
      description: 'Test Description',
      owner: 'Test Owner',
      img: 'http://example.com/test.jpg',
      likes: 0,
    });
    await product.save();

    const response = await request(app).delete(`/api/products/${product._id}`);
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Producto eliminado');
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'New Product',
      priceInCents: 3000,
      category: 'New Category',
      description: 'New Description',
      owner: 'New Owner',
      img: 'http://example.com/new.jpg',
    };

    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.status).to.equal(201);
    expect(response.body.name).to.equal(newProduct.name);
  });

  it('should return an error when creating a product with missing data', async () => {
    const newProduct = {
      name: 'New Product',
      priceInCents: 3000,
      category: 'New Category',
      description: 'New Description',
      owner: 'New Owner',
    };

    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal('Error al crear el producto');
  });

  it('should return an error when getting a product by invalid ID', async () => {
    const response = await request(app).get('/api/products/invalid_id');
    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal('Error al obtener el producto');
  });

  it('should return an error when updating a product by invalid ID', async () => {
    const response = await request(app).put('/api/products/invalid_id');
    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal('Error al actualizar el producto');
  });

  it('should return an error when deleting a product by invalid ID', async () => {
    const response = await request(app).delete('/api/products/invalid_id');
    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal('Error al eliminar el producto');
  });

  
});