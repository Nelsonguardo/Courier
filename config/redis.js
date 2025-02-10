import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                return new Error('Redis connection retries exhausted');
            }
            return Math.min(retries * 100, 3000);
        }
    },
    password: process.env.REDIS_PASSWORD // Añadiendo autenticación
});
redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('error', (err) => console.log('Redis Client Error:', err));
redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting...'));

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Redis Connection Error:', error);
        process.exit(1);
    }
};

export { redisClient, connectRedis };