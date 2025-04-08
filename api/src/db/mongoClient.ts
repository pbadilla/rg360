// Description: MongoDB client connection utility
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const uriBase = process.env.MONGO_URI;

if (!user || !password || !uriBase) {
  throw new Error("Missing MongoDB env configuration.");
}

const client = new MongoClient(uriBase);
const dbName = user;

export async function getDb() {
  try {
    await client.db().command({ ping: 1 });
  } catch {
    await client.connect();
  }
  return client.db(dbName);
}
