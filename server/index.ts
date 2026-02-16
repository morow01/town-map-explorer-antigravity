
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection
let db: any;

async function initDb() {
    db = await open({
        filename: path.join(__dirname, 'exchanges.db'),
        driver: sqlite3.Database
    });
    console.log('Connected to SQLite database.');
}

// Routes
app.get('/api/search', async (req, res) => {
    const { q, type } = req.query;
    if (!q || typeof q !== 'string') {
        return res.json([]);
    }

    const query = `%${q}%`;
    try {
        let results;
        if (type === 'exchange' || !type) {
            results = await db.all(
                `SELECT * FROM sites 
                 WHERE type = 'exchange' 
                 AND (code LIKE ? OR name LIKE ?) 
                 LIMIT 50`,
                [query, query]
            );
        } else if (type === 'cabinet') {
            results = await db.all(
                `SELECT * FROM sites 
                 WHERE type = 'cabinet' 
                 AND (ipid LIKE ? OR mdf LIKE ? OR ccp_no LIKE ?) 
                 LIMIT 50`,
                [query, query, query]
            );
        }
        res.json(results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const site = await db.get(`SELECT * FROM sites WHERE id = ?`, [id]);
        if (!site) {
            return res.status(404).json({ error: 'Site not found' });
        }

        const details = await db.all(`SELECT category, key, value FROM site_details WHERE site_id = ?`, [id]);

        // Group details by category
        const groupedDetails = details.reduce((acc: any, curr: any) => {
            if (!acc[curr.category]) acc[curr.category] = {};
            acc[curr.category][curr.key] = curr.value;
            return acc;
        }, {});

        res.json({ ...site, details: groupedDetails });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
initDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
