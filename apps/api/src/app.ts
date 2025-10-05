import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

import { requestLogger } from './middleware/logger';
import { corsMiddleware } from './middleware/cors';
import { notFound, errorHandler } from './middleware/errorHandler';
import { performanceLogger } from './middleware/performance';

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
import enrichUniverskateImportRoutes from '@/routes/enrichUniverskateImportRoutes';


const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use(corsMiddleware);
app.use(performanceLogger);

// Ensure OPTIONS preflight requests are handled globally
app.options(/.*/, corsMiddleware);

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

app.use('/enrichProducts', enrichUniverskateImportRoutes)

// ✅ Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
