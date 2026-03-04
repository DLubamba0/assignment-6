const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/university.db", (err) => {
  if (err) {
    console.error("Error creating database:", err.message);
  } else {
    console.log("Connected to university database.");
  }
});

db.run(`
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  courseCode TEXT NOT NULL,
  title TEXT NOT NULL,
  credits INTEGER NOT NULL,
  description TEXT NOT NULL,
  semester TEXT NOT NULL
)
`, (err) => {
  if (err) {
    console.error("Error creating courses table:", err.message);
  } else {
    console.log("Courses table created successfully.");
  }
});

db.close();