/**
 * OWNER: Member 2 (Database Configuration)
 * 
 * TASKS:
 * 1. Create a MongoDB Atlas account, create a cluster, and enable Data API.
 * 2. Add your Data API URL and API Key below.
 */

export const mongoConfig = {
    url: 'YOUR_MONGODB_DATA_API_URL',
    key: 'YOUR_MONGODB_DATA_API_KEY',
    cluster: 'Cluster0',
    database: 'memory_game',
    collection: 'leaderboard'
};