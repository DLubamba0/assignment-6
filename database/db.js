const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "university.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB connection error:", err.message);
});

module.exports = db;