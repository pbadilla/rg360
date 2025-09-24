import { createClient } from 'redis';
import logging from '@/config/logging';

const NAMESPACE = 'Cache';
const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

redisClient.on('error', (err) => logging.error(NAMESPACE, 'Redis Client Error:', err));
redisClient.on('connect', () => logging.info(NAMESPACE, 'Connected to Redis'));

await redisClient.connect();

export default redisClient;
