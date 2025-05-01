import dotenv from 'dotenv';

dotenv.config();

const user = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const uriBase = process.env.MONGO_URI;

if (!user || !password || !uriBase) {
  throw new Error("Missing MongoDB env configuration.");
}

// MongoDB connection string for Atlas
const MONGO_URL = uriBase.replace('<username>', user).replace('<password>', password);

// Server configurations
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

// Configuration object
const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
  },
};

export default config;
