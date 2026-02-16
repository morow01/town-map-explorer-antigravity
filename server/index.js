
const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection
let db;

function initDb() {
    // Ensure data directory exists
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = path.join(dataDir, 'exchanges.db');
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    console.log('Connected to SQLite database at:', dbPath);
}

// Routes
app.get('/api/search', (req, res) => {
    const { q, type } = req.query;
    if (!q || typeof q !== 'string') {
        return res.json([]);
    }

    const searchTerm = q.toLowerCase();
    const substringQuery = `%${searchTerm}%`;
    const prefixQuery = `${searchTerm}%`;

    try {
        let results;
        if (type === 'exchange' || !type) {
            results = db.prepare(
                `SELECT *, 
                 CASE 
                    WHEN LOWER(code) = ? THEN 1
                    WHEN code LIKE ? THEN 2
                    WHEN name LIKE ? THEN 3
                    ELSE 4
                 END as rank
                 FROM sites 
                 WHERE type = 'exchange' 
                 AND (code LIKE ? OR name LIKE ?) 
                 ORDER BY rank, name
                 LIMIT 50`
            ).all(searchTerm, prefixQuery, prefixQuery, substringQuery, substringQuery);
        } else if (type === 'cabinet') {
            results = db.prepare(
                `SELECT *,
                 CASE 
                    WHEN CAST(ipid AS TEXT) = ? THEN 1
                    WHEN mdf LIKE ? THEN 2
                    WHEN ccp_no LIKE ? THEN 3
                    ELSE 4
                 END as rank
                 FROM sites 
                 WHERE type = 'cabinet' 
                 AND (ipid LIKE ? OR mdf LIKE ? OR ccp_no LIKE ?) 
                 ORDER BY rank, mdf, ccp_no
                 LIMIT 50`
            ).all(searchTerm, prefixQuery, prefixQuery, substringQuery, substringQuery, substringQuery);
        }
        res.json(results || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/details/:id', (req, res) => {
    const { id } = req.params;
    try {
        const site = db.prepare(`SELECT * FROM sites WHERE id = ?`).get(id);
        if (!site) {
            return res.status(404).json({ error: 'Site not found' });
        }

        const details = db.prepare(`SELECT category, key, value FROM site_details WHERE site_id = ?`).all(id);

        // Group details by category
        const groupedDetails = details.reduce((acc, curr) => {
            if (!acc[curr.category]) acc[curr.category] = {};
            acc[curr.category][curr.key] = curr.value;
            return acc;
        }, {});

        res.json({ ...site, details: groupedDetails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin CRUD Routes
app.post('/api/sites', (req, res) => {
    const { type, code, name, ipid, mdf, ccp_no, link, latitude, longitude } = req.body;
    try {
        const result = db.prepare(
            `INSERT INTO sites (type, code, name, ipid, mdf, ccp_no, link, latitude, longitude) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).run(type, code, name, ipid, mdf, ccp_no, link, latitude, longitude);
        res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/sites/:id', (req, res) => {
    const { id } = req.params;
    const { code, name, ipid, mdf, ccp_no, link, latitude, longitude } = req.body;
    try {
        db.prepare(
            `UPDATE sites SET code = ?, name = ?, ipid = ?, mdf = ?, ccp_no = ?, link = ?, latitude = ?, longitude = ? 
             WHERE id = ?`
        ).run(code, name, ipid, mdf, ccp_no, link, latitude, longitude, id);
        res.json({ message: 'Site updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/details/:id', (req, res) => {
    const { id } = req.params;
    const { details } = req.body; // Expecting { category: { key: value } }

    try {
        const updateDetails = db.transaction(() => {
            // Clear existing details for this site
            db.prepare(`DELETE FROM site_details WHERE site_id = ?`).run(id);

            // Insert new details
            const insert = db.prepare(
                `INSERT INTO site_details (site_id, category, key, value) VALUES (?, ?, ?, ?)`
            );

            for (const [category, keys] of Object.entries(details)) {
                for (const [key, value] of Object.entries(keys)) {
                    if (value !== null && value !== undefined) {
                        insert.run(id, category, key, String(value));
                    }
                }
            }
        });

        updateDetails();
        res.json({ message: 'Details updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/sites/:id', (req, res) => {
    const { id } = req.params;
    try {
        const deleteSite = db.transaction(() => {
            db.prepare(`DELETE FROM site_details WHERE site_id = ?`).run(id);
            db.prepare(`DELETE FROM sites WHERE id = ?`).run(id);
        });

        deleteSite();
        res.json({ message: 'Site deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// THE ULTIMATE CATCH-ALL (works for all Express versions)
app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
try {
    initDb();
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running at http://0.0.0.0:${port}`);
    });
} catch (err) {
    console.error('Failed to start server:', err);
}
