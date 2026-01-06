const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL || 'redis://db:6379';

const client = createClient({
    url: redisUrl
});

client.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

async function connect() {
    if (!isConnected) {
        try {
            await client.connect();
            isConnected = true;
            console.log(`Connected to Redis at ${redisUrl}`);
        } catch (err) {
            console.error('Failed to connect to Redis:', err);
            // In a real app, we might want to retry or fail gracefully
        }
    }
}

async function getVisitorCount() {
    await connect();
    if (!isConnected) return 0;

    try {
        const count = await client.get('visitor_count');
        return count ? parseInt(count, 10) : 0;
    } catch (err) {
        console.error('Error getting visitor count:', err);
        return 0;
    }
}

async function incrementVisitorCount() {
    await connect();
    if (!isConnected) return 0;

    try {
        const newCount = await client.incr('visitor_count');
        return newCount;
    } catch (err) {
        console.error('Error incrementing visitor count:', err);
        return 0;
    }
}

module.exports = {
    getVisitorCount,
    incrementVisitorCount
};
