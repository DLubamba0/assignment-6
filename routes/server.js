const express = require("express");
const coursesRouter = require("./routes/courses");

const app = express();
app.use(express.json());

app.use("/api/courses", coursesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));