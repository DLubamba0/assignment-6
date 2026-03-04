const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const router = express.Router();

const dbPath = path.join(__dirname, "..", "database", "university.db");
const db = new sqlite3.Database(dbPath);

// GET /api/courses - get all courses
router.get("/", (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

// GET /api/courses/:id - get one course
router.get("/:id", (req, res) => {
  db.get("SELECT * FROM courses WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Course not found" });
    res.status(200).json(row);
  });
});

// POST /api/courses - create a course
router.post("/", (req, res) => {
  const { courseCode, title, credits, description, semester } = req.body;

  if (!courseCode || !title || credits === undefined || !description || !semester) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO courses (courseCode, title, credits, description, semester)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [courseCode, title, credits, description, semester], function (err) {
    if (err) return res.status(400).json({ error: err.message });

    res.status(201).json({
      id: this.lastID,
      courseCode,
      title,
      credits,
      description,
      semester,
    });
  });
});

// PUT /api/courses/:id - update a course
router.put("/:id", (req, res) => {
  const { courseCode, title, credits, description, semester } = req.body;

  if (!courseCode || !title || credits === undefined || !description || !semester) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    UPDATE courses
    SET courseCode = ?, title = ?, credits = ?, description = ?, semester = ?
    WHERE id = ?
  `;

  db.run(sql, [courseCode, title, credits, description, semester, req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Course not found" });

    res.status(200).json({ message: "Course updated successfully" });
  });
});

// DELETE /api/courses/:id - delete a course
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM courses WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  });
});

module.exports = router;