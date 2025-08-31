import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import logging from '@/config/logging';
import config from '@/config/config';

import abandonedCartsRoutes from '@/routes/abandonedCartsRoutes';
import authRoutes from '@/routes/authRoutes';
import categoriesRoutes from '@/routes/categoriesRoutes';
import carrierRoutes from '@/routes/carrierRoutes';
import notificationsRoutes from '@/routes/notificationsRoutes';
import ordersRoutes from '@/routes/ordersRoutes';
import paymentRoutes from '@/routes/paymentsRoutes';
import posRoutes from '@/routes/posRoutes';
import productRoutes from '@/routes/productsRoutes';
import promotionsRoutes from '@/routes/promotionsRoutes';
import salesRoutes from '@/routes/salesRoutes';
import shippingRoutes from '@/routes/shippingRoutes';
import stockRoutes from '@/routes/stockRoutes';
import trackingRoutes from '@/routes/trackingRoutes';
import usersRoutes from '@/routes/usersRoutes';
import vendorsRoutes from '@/routes/vendorsRoutes';
import wishlistRoutes from '@/routes/wishListRoutes';

import importUniverskateRoutes from '@/routes/importUniverskateRoutes';
import importRollerbladeRoutes from '@/routes/importRollerbladeRoutes';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const NAMESPACE = 'Server';
const app = express();

dotenv.config();

/** ✅ Connect to MongoDB using Mongoose */
const startServer = async () => {
  try {
    // ✅ Connect to MongoDB
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    logging.info(NAMESPACE, 'Connected to MongoDB.');

    const db = mongoose.connection.db;

    if (!db) {
      logging.error(NAMESPACE, 'MongoDB database connection is undefined.');
      throw new Error('MongoDB database connection is undefined.');
    }

    const collections = await db.listCollections().toArray();

    const summaries = (await Promise.all(
      collections.map(async ({ name }) => {
        const collection = db.collection(name);
        const count = await collection.estimatedDocumentCount();
        return { name, count };
      })
    )).sort((a, b) => a.name.localeCompare(b.name));

    logging.info(NAMESPACE, 'Collections Summary:', summaries);

    // ✅ Middleware setup
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // ✅ Logging requests
    app.use((req, res, next) => {
      logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
      next();
    });

    // ✅ CORS setup with 'cors' package
    const allowedOrigins = [
      process.env.SERVER_FRONTEND_URL_LOCAL || 'http://localhost:8080',
      process.env.SERVER_FRONTEND_URL_PROD || 'https://patinesbarcelona.com',
      process.env.SERVER_API_URL_LOCAL || 'http://localhost:3000',
      process.env.SERVER_API_URL_PROD || 'https://api.patinesbarcelona.com'
    ];

    app.use(cors({
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (like Postman or mobile apps)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          logging.warn(NAMESPACE, `Blocked CORS request from origin: ${origin}`);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    }));

    // ✅ Routes
    app.use('/abandonedCarts', abandonedCartsRoutes);
    app.use('/auth', authRoutes);
    app.use('/carriers', carrierRoutes);
    app.use('/categories', categoriesRoutes);
    app.use('/login', authRoutes);
    app.use('/notifications', notificationsRoutes);
    app.use('/orders', ordersRoutes);
    app.use('/payments', paymentRoutes);
    app.use('/pos', posRoutes);
    app.use('/products', productRoutes);
    app.use('/promotions', promotionsRoutes);
    app.use('/sales', salesRoutes);
    app.use('/shippings', shippingRoutes);
    app.use('/stock', stockRoutes);
    app.use('/tracking', trackingRoutes);
    app.use('/users', usersRoutes);
    app.use('/vendors', vendorsRoutes);
    app.use('/wishlist', wishlistRoutes);

    app.use('/importUniverskate', importUniverskateRoutes);
    app.use('/importRollerblade', importRollerbladeRoutes);

    // ✅ Swagger API docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // ✅ Only ONE 404 handler
    app.use((_req, res) => {
      res.status(404).json({ message: 'Not found' });
    });

    // ✅ Start the server
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
    process.exit(1);
  }
};

startServer();
