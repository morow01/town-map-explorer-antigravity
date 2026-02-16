const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

async function migrate() {
    const db = await open({
        filename: path.join(__dirname, 'exchanges.db'),
        driver: sqlite3.Database
    });

    console.log('Opened database for migration...');

    const townsFilePath = path.join(__dirname, '../src/data/towns.ts');
    const cabinetsFilePath = path.join(__dirname, '../src/data/cabinets.ts');

    const parseTsData = (content, varName) => {
        // Find the start of the array [
        const startMarker = `export const ${varName}`;
        const startIdx = content.indexOf(startMarker);
        if (startIdx === -1) {
            console.error(`Could not find ${varName} in file`);
            return [];
        }

        const dataStart = content.indexOf('[', startIdx);
        const dataEnd = content.lastIndexOf(']');
        const rawData = content.substring(dataStart, dataEnd + 1);

        try {
            // Use Function constructor as a safer eval to parse the JS array
            // This handles unquoted keys and other JS syntax in the .ts file
            return new Function(`return ${rawData}`)();
        } catch (e) {
            console.error(`Failed to parse ${varName} using evaluation:`, e.message);
            return [];
        }
    };

    console.log('Reading towns...');
    const townsContent = fs.readFileSync(townsFilePath, 'utf-8');
    const towns = parseTsData(townsContent, 'towns');
    console.log(`Found ${towns.length} towns.`);

    if (towns.length > 0) {
        // Clear existing data to avoid duplicates on retry
        await db.run("DELETE FROM sites WHERE type = 'exchange'");
        await db.run("DELETE FROM site_details");

        const siteStmt = await db.prepare(
            `INSERT INTO sites (type, code, name, link, latitude, longitude, photo_gallery_url, is_new) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );

        for (const town of towns) {
            let lat = null, lng = null;
            if (town.link && town.link.includes(',')) {
                const parts = town.link.split(',');
                lat = parseFloat(parts[0]);
                lng = parseFloat(parts[1]);
            }

            const res = await siteStmt.run(['exchange', town.code, town.name, town.link, lat, lng, town.photoGalleryUrl || null, town.isNew ? 1 : 0]);
            const siteId = res.lastID;

            const categories = {
                'Address': ['street', 'city', 'county', 'eircode', 'address1', 'address2', 'address3', 'state', 'country', 'zipCode'],
                'Site Details': ['siteCode', 'parentSiteCode', 'parentSiteName', 'siteType', 'area', 'numberRange', 'numberOfCustomers', 'skillType', 'alcatelSiteCode'],
                'Security': ['hasWatchman', 'watchmanHours', 'watchmanPhone', 'keyCentres', 'keys', 'keys2', 'doorCode', 'intruderAlarmCode', 'locationOfRecords', 'securityRemarks'],
                'Power': ['hasGenerator', 'hasMaxDemand', 'hasAutoCutIn', 'generatorInfo', 'esbPhone', 'esbAccount', 'esbDistrict', 'powerRemarks'],
                'Emergency': ['gardaNumber', 'fireBrigadeNumber', 'ambulanceNumber', 'specialSafetyIssues', 'waterNumber', 'waterShutOffLocation', 'gasBoardNumber', 'gasShutOffLocation']
            };

            for (const [category, fields] of Object.entries(categories)) {
                for (const field of fields) {
                    if (town[field] !== undefined && town[field] !== null && town[field] !== '') {
                        await db.run(
                            `INSERT INTO site_details (site_id, category, key, value) VALUES (?, ?, ?, ?)`,
                            [siteId, category, field, String(town[field])]
                        );
                    }
                }
            }
        }
        await siteStmt.finalize();
    }

    console.log('Reading cabinets...');
    const cabinetsContent = fs.readFileSync(cabinetsFilePath, 'utf-8');
    const cabinets = parseTsData(cabinetsContent, 'cabinets');
    console.log(`Found ${cabinets.length} cabinets.`);

    if (cabinets.length > 0) {
        await db.run("DELETE FROM sites WHERE type = 'cabinet'");
        const cabStmt = await db.prepare(
            `INSERT INTO sites (type, ipid, mdf, ccp_no, link, latitude, longitude, is_new) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );

        for (const cab of cabinets) {
            let lat = null, lng = null;
            if (cab.link && cab.link.includes(',')) {
                const parts = cab.link.split(',');
                lat = parseFloat(parts[0]);
                lng = parseFloat(parts[1]);
            }
            await cabStmt.run(['cabinet', cab.IPID, cab.MDF, cab.CCP_NO, cab.link, lat, lng, cab.isNew ? 1 : 0]);
        }
        await cabStmt.finalize();
    }

    console.log('Migration complete!');
    await db.close();
}

migrate().catch(console.error);
