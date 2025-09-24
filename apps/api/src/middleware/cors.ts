import cors from 'cors';
import logging from '@/config/logging';

const NAMESPACE = 'CORS';

const allowedOrigins = [
  process.env.SERVER_FRONTEND_URL_LOCAL,
  process.env.SERVER_FRONTEND_URL_PROD,
  'https://backoffice.patinesbarcelona.com',
  process.env.SERVER_API_URL_LOCAL,
  process.env.SERVER_API_URL_PROD
].filter(Boolean);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    logging.warn(NAMESPACE, `Blocked CORS request from origin: ${origin}`);
    callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
});
