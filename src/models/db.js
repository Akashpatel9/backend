const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('students.db');

db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    name TEXT,
    father_name TEXT,
    mother_name TEXT,
    age INTEGER,
    home_address TEXT,
    registration_date TEXT,
    deleted INTEGER DEFAULT 0
)`);

module.exports = db;