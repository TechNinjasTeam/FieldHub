import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'fieldhub.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS sensor_readings (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id   INTEGER,
    temperature REAL,
    humidity    REAL,
    lux         REAL,
    recorded_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS irrigation_log (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id  INTEGER,
    action     TEXT,
    trigger    TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );
`);

export default db;
