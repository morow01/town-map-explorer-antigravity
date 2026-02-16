
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as fs from 'fs';
import * as path from 'path';

// Note: We'll read the data files as strings and parse them to avoid complex TS configuration issues during migration
async function migrate() {
    const db = await open({
        filename: path.join(__dirname, 'exchanges.db'),
        driver: sqlite3.Database
    });

    console.log('Opened database for migration...');

    const townsFilePath = path.join(__dirname, '../src/data/towns.ts');
    const cabinetsFilePath = path.join(__dirname, '../src/data/cabinets.ts');

    // Simple parser for the specific format in the .ts files
    const parseTsData = (content: string, varName: string) => {
        const startIdx = content.indexOf(`export const ${varName}`);
        const dataStart = content.indexOf('[', startIdx);
        const dataEnd = content.lastIndexOf(']');
        const jsonLike = content.substring(dataStart, dataEnd + 1);
        // Clean up some common TS syntax to make it JSON-ish
        const cleaned = jsonLike
            .replace(/\/\/.*$/gm, '') // remove comments
            .replace(/,\s*]/g, ']') // remove trailing commas in arrays
            .replace(/,\s*}/g, '}') // remove trailing commas in objects
            .replace(/([a-zA-Z0-9_]+):/g, '"$1":'); // quote keys
        
        try {
            return JSON.parse(cleaned);
        } catch (e) {
            console.error(`Failed to parse ${varName}:`, e);
            // Fallback: very basic regex based extraction if JSON.parse fails
            return [];
        }
    };

    console.log('Reading towns...');
    const townsContent = fs.readFileSync(townsFilePath, 'utf-8');
    const towns = parseTsData(townsContent, 'towns');
    console.log(`Found ${towns.length} towns.`);

    for (const town of towns) {
        const [lat, lng] = town.link ? town.link.split(',').map((s: string) => parseFloat(s.trim())) : [null, null];
        const res = await db.run(
            `INSERT INTO sites (type, code, name, link, latitude, longitude, photo_gallery_url, is_new) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            ['exchange', town.code, town.name, town.link, lat, lng, town.photoGalleryUrl || null, town.isNew ? 1 : 0]
        );
        
        const siteId = res.lastID;
        
        // Insert details (mapping fields from the type)
        const categories: Record<string, string[]> = {
            'Address': ['street', 'city', 'county', 'eircode', 'address1', 'address2', 'address3', 'state', 'country', 'zipCode'],
            'Site Details': ['siteCode', 'parentSiteCode', 'parentSiteName', 'siteType', 'area', 'numberRange', 'numberOfCustomers', 'skillType', 'alcatelSiteCode'],
            'Security': ['hasWatchman', 'watchmanHours', 'watchmanPhone', 'keyCentres', 'keys', 'keys2', 'doorCode', 'intruderAlarmCode', 'locationOfRecords', 'securityRemarks'],
            'Power': ['hasGenerator', 'hasMaxDemand', 'hasAutoCutIn', 'generatorInfo', 'esbPhone', 'esbAccount', 'esbDistrict', 'powerRemarks'],
            'Emergency': ['gardaNumber', 'fireBrigadeNumber', 'ambulanceNumber', 'specialSafetyIssues', 'waterNumber', 'waterShutOffLocation', 'gasBoardNumber', 'gasShutOffLocation']
        };

        for (const [category, fields] of Object.entries(categories)) {
            for (const field of fields) {
                if (town[field] !== undefined && town[field] !== null) {
                    await db.run(
                        `INSERT INTO site_details (site_id, category, key, value) VALUES (?, ?, ?, ?)`,
                        [siteId, category, field, String(town[field])]
                    );
                }
            }
        }
    }

    console.log('Reading cabinets...');
    const cabinetsContent = fs.readFileSync(cabinetsFilePath, 'utf-8');
    const cabinets = parseTsData(cabinetsContent, 'cabinets');
    console.log(`Found ${cabinets.length} cabinets.`);

    for (const cab of cabinets) {
        const [lat, lng] = cab.link ? cab.link.split(',').map((s: string) => parseFloat(s.trim())) : [null, null];
        await db.run(
            `INSERT INTO sites (type, ipid, mdf, ccp_no, link, latitude, longitude, is_new) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            ['cabinet', cab.IPID, cab.MDF, cab.CCP_NO, cab.link, lat, lng, cab.isNew ? 1 : 0]
        );
    }

    console.log('Migration complete!');
    await db.close();
}

migrate().catch(console.error);
