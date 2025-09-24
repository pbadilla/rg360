// config/config.ts
import dotenv from 'dotenv';
dotenv.config();

const user = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const uriBase = process.env.MONGO_URI;

if (!user || !password || !uriBase) {
  throw new Error("Missing MongoDB env configuration.");
}

const MONGO_URL = uriBase.replace('<username>', user).replace('<password>', password);

const SERVER_HOSTNAME = process.env.RENDER ? '0.0.0.0' : 'localhost';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

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
