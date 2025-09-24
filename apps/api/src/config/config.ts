// config/config.ts
import dotenv from 'dotenv';
dotenv.config();

// --- MongoDB configuration ---
const user = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const uriBase = process.env.MONGO_URI;

if (!user || !password || !uriBase) {
  throw new Error("Missing MongoDB env configuration.");
}

const MONGO_URL = uriBase.replace('<username>', user).replace('<password>', password);

// --- Server configuration ---
// Bind to all interfaces so Render can assign the container IP
const SERVER_HOSTNAME = '0.0.0.0';
// Use the port provided by Render, fallback to 3000 for local dev
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// --- Optional API URL for making external requests ---
const API_URL = process.env.SERVER_API_URL_PROD || `http://localhost:${SERVER_PORT}`;

const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
  },
  api: {
    url: API_URL,
  },
};

export default config;
