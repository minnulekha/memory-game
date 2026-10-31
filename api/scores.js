// api/scores.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    try {
        await client.connect();
        const db = client.db('memory_game');
        const collection = db.collection('leaderboard');

        if (req.method === 'GET') {
            // Fetch top scores
            const scores = await collection.find({ is_win: true })
                .sort({ moves: 1, time_seconds: 1 })
                .limit(10)
                .toArray();
            return res.status(200).json(scores);
            
        } else if (req.method === 'POST') {
            // Submit a new score
            const newScore = req.body;
            newScore.created_at = new Date().toISOString();
            await collection.insertOne(newScore);
            return res.status(201).json({ success: true });
        }
        
    } catch (error) {
        return res.status(500).json({ error: 'Database connection failed' });
    } finally {
        await client.close();
    }
}