import redis from 'redis';
import { logger } from './logger';
import { config } from '../app/config';

const url = process.env.REDIS_URL || `redis://localhost:${config.reids.port}`;
const client = redis.createClient({
    url
});

client.on('connect', () => {
  logger.log('Connected to Redis');
});

client.on('error', (error) => {
  logger.error('Error connecting to Redis:', error);
});

client.quit();