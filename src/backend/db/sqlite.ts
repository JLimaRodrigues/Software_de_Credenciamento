import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDB() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  });
}

export async function createUserTable(db: any) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);
}