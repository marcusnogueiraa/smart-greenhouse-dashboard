import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

export async function openDb(): Promise<Database> {
  return open({
    filename: path.resolve(__dirname, "database.sqlite"),
    driver: sqlite3.Database,
  });
}
