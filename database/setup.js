const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "university.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error creating database:", err.message);
    process.exit(1);
  }
  console.log("Connected to SQLite database:", dbPath);
});

const sql = `
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseCode TEXT NOT NULL,
    title TEXT NOT NULL,
    credits INTEGER NOT NULL,
    description TEXT NOT NULL,
    semester TEXT NOT NULL
  );
`;

db.run(sql, (err) => {
  if (err) console.error("Error creating table:", err.message);
  else console.log("courses table created successfully.");

  db.close((e) => {
    if (e) console.error("Error closing DB:", e.message);
  });
});