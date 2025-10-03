import cors from 'cors';
import logging from '@/config/logging';

const NAMESPACE = 'CORS';

// Allowed origins
const allowedOrigins = [
  process.env.SERVER_FRONTEND_URL_LOCAL,    // e.g., http://localhost:5173
  'http://localhost:8080',                   // <-- add this
  process.env.SERVER_FRONTEND_URL_PROD,
  'https://backoffice.patinesbarcelona.com',
  process.env.SERVER_API_URL_LOCAL,
  process.env.SERVER_API_URL_PROD
].filter(Boolean);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, same-origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true); // allowed
    } else {
      logging.warn(NAMESPACE, `Blocked CORS request from origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // allow cookies/credentials
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
});
