import http from 'http';
import dotenv from 'dotenv';
import app from './app';

import logging from './config/logging';
import { connectDB } from './db/db';

dotenv.config();
const NAMESPACE = 'Server';

const startServer = async () => {
  try {
    await connectDB();

    const PORT = Number(process.env.PORT) || 3000;
    const HOST = '0.0.0.0';

    http.createServer(app).listen(PORT, HOST, () => {
      logging.info(NAMESPACE, `Server running at ${HOST}:${PORT}/`);
    });

    process.on('unhandledRejection', (reason) => logging.error(NAMESPACE, 'Unhandled Rejection:', reason));
    process.on('uncaughtException', (err) => logging.error(NAMESPACE, 'Uncaught Exception:', err));

  } catch (error) {
    logging.error(NAMESPACE, 'Failed to start server:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

startServer();
