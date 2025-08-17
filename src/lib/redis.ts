// lib/redis.ts
import { createClient, RedisClientType } from 'redis';

const globalRedis = globalThis as unknown as {
	redisClient: RedisClientType | undefined;
};

let client: RedisClientType;

if (!globalRedis.redisClient) {
	client = createClient({
		url: process.env.REDIS_URL || 'redis://localhost:6379',
		socket: {
			reconnectStrategy: retries => {
				if (retries > 5) return new Error('Retry limit exceeded');
				return Math.min(retries * 100, 3000);
			},
		},
	});
	client.on('error', err => console.error('Redis Client Error', err));
	client.connect().catch(console.error);
	globalRedis.redisClient = client;
} else {
	client = globalRedis.redisClient;
}

export async function getRedisClient(): Promise<RedisClientType> {
	if (!client.isOpen) {
		await client.connect();
	}
	return client;
}
