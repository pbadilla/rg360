import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import logging from '@/config/logging';
import config from '@/config/config';

import authRoutes from '@/routes/authRoutes';
import inventoryRoutes from '@/routes/inventoryRoutes';
import notificationsRoutes from '@/routes/notificationsRoutes';
import ordersRoutes from '@/routes/ordersRoutes';
import paymentRoutes from '@/routes/paymentsRoutes';
import productRoutes from '@/routes/productsRoutes';
import shippingRoutes from '@/routes/shippingRoutes';
import usersRoutes from '@/routes/usersRoutes';
import vendorsRoutes from '@/routes/vendorsRoutes';
import wishlistRoutes from '@/routes/wishListRoutes';

import importerUniverskate from '@/routes/importerUniverskate';
import importerRollerblade from '@/routes/importerRollerblade';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/config/swagger';

import '@/docs/components/productSchemas';
import '@/docs/routes/productDocs';

const NAMESPACE = 'Server';
const app = express();

dotenv.config();

/** Connect to MongoDB using Mongoose */
const startServer = async () => {
  try {
    // Connect to MongoDB (the 'ecommerce' database is inferred from the Mongo URI)
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    logging.info(NAMESPACE, 'Connected to MongoDB.');

    // List collections using async/await or then (Check for 'products' collection)
    const collections = await mongoose.connection.db.listCollections().toArray();
    logging.info(NAMESPACE, 'Collections in the DB:', collections);

    // You can check specifically for the "products" collection
    const productsCollectionExists = collections.some(col => col.name === 'products');
    if (productsCollectionExists) {
      logging.info(NAMESPACE, 'Products collection found!');
    } else {
      logging.error(NAMESPACE, 'Products collection does not exist in the database');
    }

    // Middleware setup
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Logging the request
    app.use((req, res, next) => {
      logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
      next();
    });

    // CORS Headers
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
      }
      next();
    });

    // Routes
    app.use('/auth', authRoutes);
    app.use('/inventory', inventoryRoutes);
    app.use('/notifications', notificationsRoutes);
    app.use('/orders', ordersRoutes);
    app.use('/payments', paymentRoutes);
    app.use('/products', productRoutes);
    app.use('/shipping', shippingRoutes);
    app.use('/users', usersRoutes)
    app.use('vendors', vendorsRoutes);
    app.use('/wishlist', wishlistRoutes);

    app.use('/importerUniverskate', importerUniverskate);
    app.use('/importerRollerblade', importerRollerblade); 

    // Error handling for unmatched routes
    app.use((_req, res, _next) => {
      res.status(404).json({ message: 'Not found' });
    });

    // Start the server
    const httpServer = http.createServer(app);
    httpServer.listen(config.server.port, () =>
      logging.info(NAMESPACE, `Server running at http://${config.server.hostname}:${config.server.port}/`)
    );
  } catch (error) {
    logging.error(NAMESPACE, 'Unable to connect to MongoDB');
    if (error instanceof Error) {
      logging.error(NAMESPACE, error.message);
    } else {
      logging.error(NAMESPACE, 'An unknown error occurred');
    }
    process.exit(1); // Exit process if DB connection fails
  }

  //SWAGGER Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

// Start server once MongoDB connection is established
startServer();
