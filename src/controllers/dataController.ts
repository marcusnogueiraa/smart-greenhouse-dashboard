import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.sqlite');

let latestTimestamp = new Date().toISOString();

export const getSensorData = (req: Request, res: Response) => {
    db.all(
        `SELECT r1.sensor, r1.value, r1.timestamp 
         FROM readings r1
         JOIN (
             SELECT sensor, MAX(timestamp) AS max_timestamp
             FROM readings
             GROUP BY sensor
         ) r2 ON r1.sensor = r2.sensor AND r1.timestamp = r2.max_timestamp
         ORDER BY r1.timestamp DESC;`,
        (err, rows: { sensor: string; value: number; timestamp: string }[] | undefined) => {
            if (err) {
                console.error("Erro ao buscar dados:", err);
                return res.status(500).json({ error: 'Erro ao buscar os dados' });
            }

            if (!rows || rows.length === 0) {
                return res.status(404).json({ message: "Nenhum dado encontrado" });
            }

            const mostRecent = rows[0]?.timestamp ?? new Date().toISOString();

            if (mostRecent === latestTimestamp) {
                setTimeout(() => {
                    res.json(rows);
                }, 5000); 
            } else {
                latestTimestamp = mostRecent;
                res.json(rows);
            }
        }
    );
};
