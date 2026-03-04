const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET /api/courses - all courses
router.get("/", (req, res) => {
  db.all("SELECT * FROM courses;", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

// GET /api/courses/:id - course by id
router.get("/:id", (req, res) => {
  db.get("SELECT * FROM courses WHERE id = ?;", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(row);
  });
});

// POST /api/courses - create course
router.post("/", (req, res) => {
  const { courseCode, title, credits, description, semester } = req.body;

  if (!courseCode || !title || credits == null || !description || !semester) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO courses (courseCode, title, credits, description, semester)
    VALUES (?, ?, ?, ?, ?);
  `;

  db.run(sql, [courseCode, title, credits, description, semester], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Course created", id: this.lastID });
  });
});

// PUT /api/courses/:id - update course
router.put("/:id", (req, res) => {
  const { courseCode, title, credits, description, semester } = req.body;

  const sql = `
    UPDATE courses
    SET courseCode = ?, title = ?, credits = ?, description = ?, semester = ?
    WHERE id = ?;
  `;

  db.run(sql, [courseCode, title, credits, description, semester, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course updated" });
  });
});

// DELETE /api/courses/:id - delete course
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM courses WHERE id = ?;", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted" });
  });
});

module.exports = router;