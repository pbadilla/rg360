import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';

import logging from '@/config/logging';
import config from '@/config/config';

import filmsRoutes from '@/routes/films';
import productRoutes from '@/routes/products';

const NAMESPACE = 'Server';
const router = express();

dotenv.config();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        logging.info(NAMESPACE,`Running on ENV = ${process.env.NODE_ENV}`);
        logging.info(NAMESPACE,'Connected to mongoDB.');
    })
    .catch((error) => {
        logging.error(NAMESPACE,'Unable to connect.');
        logging.error(NAMESPACE,error);
    });


/** Log the request */
router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/api/films', filmsRoutes);

// Use the product routes
router.use('/api/products', productRoutes);

/** Error handling */
router.use((_req, res, _next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));