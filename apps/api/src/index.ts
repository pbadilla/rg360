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
import recognizeRoutes from '@/routes/recognizeRoutes';
import salesRoutes from '@/routes/salesRoutes';
import shippingRoutes from '@/routes/shippingRoutes';
import stockRoutes from '@/routes/stockRoutes';
import trackingRoutes from '@/routes/trackingRoutes';
import usersRoutes from '@/routes/usersRoutes';
import vendorsRoutes from '@/routes/vendorsRoutes';
import wishlistRoutes from '@/routes/wishListRoutes';

import importRoutes from '@/routes/importRoutes';
import importUniverskateRoutes from '@/routes/importUniverskateRoutes';
import importRollerbladeRoutes from '@/routes/importRollerbladeRoutes';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const NAMESPACE = 'Server';
const app = express();
dotenv.config();

const startServer = async () => {
  try {
    // MongoDB connection
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    logging.info(NAMESPACE, 'Connected to MongoDB.');

    // Collections summary
    const collections = await mongoose.connection.db.listCollections().toArray();
    const summaries = await Promise.all(
      collections.map(async ({ name }) => {
        const count = await mongoose.connection.db.collection(name).estimatedDocumentCount();
        return { name, count };
      })
    );
    logging.info(NAMESPACE, 'Collections Summary:', summaries);

    // Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Logging (skip HEAD/OPTIONS)
    app.use((req, res, next) => {
      if (req.method !== 'HEAD' && req.method !== 'OPTIONS') {
        logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
      }
      next();
    });

    // CORS
    const allowedOrigins = [
      process.env.SERVER_FRONTEND_URL_LOCAL || 'http://localhost:8080',
      process.env.SERVER_FRONTEND_URL_PROD || 'https://patinesbarcelona.com',
      'https://backoffice.patinesbarcelona.com',
      process.env.SERVER_API_URL_LOCAL || 'http://localhost:3000',
      process.env.SERVER_API_URL_PROD || 'https://api.patinesbarcelona.com'
    ];
    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        logging.warn(NAMESPACE, `Blocked CORS request from origin: ${origin}`);
        callback(null, false); // just deny, don't throw
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
    app.use('/stock/recognize', recognizeRoutes)
    app.use('/tracking', trackingRoutes);
    app.use('/users', usersRoutes);
    app.use('/vendors', vendorsRoutes);
    app.use('/wishlist', wishlistRoutes);

    app.use('/importUniverskate', importUniverskateRoutes);
    app.use('/importRollerblade', importRollerbladeRoutes);
    app.use('/import', importRoutes);

    // ✅ Swagger API docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

   // Swagger docs
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

   // 404 handler
   app.use((_req, res) => res.status(404).json({ message: 'Not found' }));

   // Global error handler (prevents crashes)
   app.use((err: any, _req: any, res: any, _next: any) => {
     logging.error(NAMESPACE, 'Unhandled error:', err);
     res.status(500).json({ error: 'Internal Server Error' });
   });

   // Start server
   const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
   const HOST = '0.0.0.0'; // always bind all interfaces in Render

   http.createServer(app).listen(PORT, HOST, () => {
     logging.info(NAMESPACE, `Server running at ${HOST}:${PORT}/`);
   });

   // Handle unhandled rejections globally
   process.on('unhandledRejection', (reason) => {
     logging.error(NAMESPACE, 'Unhandled Rejection at:', reason);
   });
   process.on('uncaughtException', (err) => {
     logging.error(NAMESPACE, 'Uncaught Exception:', err);
   });

 } catch (error) {
   logging.error(NAMESPACE, 'Failed to start server:', error instanceof Error ? error.message : error);
   process.exit(1);
 }
};

startServer();