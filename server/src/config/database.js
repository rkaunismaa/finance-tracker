import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../../database.sqlite');

// Create database connection
const db = new Database(DB_PATH, {
  verbose: process.env.NODE_ENV === 'development' ? console.log : null,
});

// Enable foreign keys
db.pragma('foreign_keys = ON');

console.log(`📦 Database connected: ${DB_PATH}`);

export default db;
