CREATE TABLE IF NOT EXISTS sites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, -- 'exchange' or 'cabinet'
    code TEXT, -- for exchanges
    name TEXT, -- for exchanges
    ipid INTEGER, -- for cabinets
    mdf TEXT, -- for cabinets
    ccp_no TEXT, -- for cabinets
    link TEXT, -- coordinations string "lat,lng" or URL
    latitude REAL,
    longitude REAL,
    photo_gallery_url TEXT,
    is_new BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS site_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_id INTEGER NOT NULL,
    category TEXT NOT NULL, -- 'Address', 'Security', 'Power', 'Emergency', etc.
    key TEXT NOT NULL,
    value TEXT,
    FOREIGN KEY (site_id) REFERENCES sites(id)
);

CREATE INDEX IF NOT EXISTS idx_sites_code ON sites(code);
CREATE INDEX IF NOT EXISTS idx_sites_ipid ON sites(ipid);
CREATE INDEX IF NOT EXISTS idx_sites_type ON sites(type);
