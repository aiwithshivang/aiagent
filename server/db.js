import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');
export const db = new sqlite3.Database(dbPath);

export const initDb = () => {
  db.serialize(() => {
    // Stats table for global counters
    db.run(`CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY,
      tasks_fired INTEGER DEFAULT 0,
      invoices_sent INTEGER DEFAULT 0,
      time_saved_hours REAL DEFAULT 0,
      cost_savings REAL DEFAULT 0
    )`);

    // Invoices table
    db.run(`CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      client TEXT,
      amount REAL,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Seed data if empty
    db.get("SELECT COUNT(*) as count FROM stats", (err, row) => {
      if (row && row.count === 0) {
        db.run(`INSERT INTO stats (id, tasks_fired, invoices_sent, time_saved_hours, cost_savings) VALUES (1, 47, 1284, 10.0, 500.0)`);
      }
    });

    db.get("SELECT COUNT(*) as count FROM invoices", (err, row) => {
      if (row && row.count === 0) {
        const stmt = db.prepare("INSERT INTO invoices (id, client, amount, status) VALUES (?, ?, ?, ?)");
        stmt.run("INV-1042", "Acme Corp", 1200, "Sent");
        stmt.run("INV-1043", "Globex", 450, "Sent");
        stmt.run("INV-1044", "Initech", 3400, "Failed");
        stmt.finalize();
      }
    });
  });
};
