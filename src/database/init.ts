import { openDb } from "./database";

async function setupDatabase() {
    const db = await openDb();

    db.exec(`
        CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sensor TEXT NOT NULL CHECK (sensor IN ('temperature', 'light', 'soil_moisture')),
            value REAL NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
    );

    console.log("Created database");
}

setupDatabase();