import mongoose from 'mongoose';
import logging from '@/config/logging';
import config from '@/config/config';

const NAMESPACE = 'MongoDB';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    logging.info(NAMESPACE, 'Connected to MongoDB.');

    if (!mongoose.connection.db) {
        logging.warn(NAMESPACE, 'mongoose.connection.db is undefined. Skipping collections summary.');
    } else {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const summaries = await Promise.all(
            collections.map(async ({ name }) => {
            const count = await mongoose.connection.db!.collection(name).estimatedDocumentCount();
            return { name, count };
            })
        );
        logging.info(NAMESPACE, 'Collections Summary:', summaries);
    }

  } catch (err) {
    logging.error(NAMESPACE, 'MongoDB connection error:', err);
    throw err;
  }
};