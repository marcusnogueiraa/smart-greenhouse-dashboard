import { openDb } from "./database";

async function setupDatabase() {
    const db = await openDb();

    db.exec(`
        CREATE TABLE IF NOT EXISTS readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL CHECK (type IN ('temperature', 'light', 'soil_moisture'))
            value REAL NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
    );

    console.log("Created database");
}

setupDatabase();