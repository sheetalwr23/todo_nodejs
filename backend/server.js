const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/todo", (req, res, next) => {
  console.log("request comes from frontend", req.body);
  next();
});

app.post("/api/todo", (req, res) => {
  const { Todo, Description } = req.body;
  const insertQuery = "INSERT INTO todo (Todo, Description) VALUES ( ?, ?)";
  db.query(insertQuery, [Todo, Description], (err, result) => {
    if (err) {
      console.error("Database insertion error:", err);
      res.status(500).json({ error: "Failed to insert todo" });
    } else {
      res.json({ message: "todo booked successfully" });
    }
  });
});

app.get("/api/todo", (req, res) => {
  const selectQuery = "SELECT * FROM todo";
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Database selection error:", err);
      res.status(500).json({ error: "Failed to fetch todo" });
    } else {
      res.json(results);
      console.log(results);
      res.end();
    }
  });
});

app.delete("/api/todo/:id", (req, res) => {
  const appointmentId = req.params.id;
  const deleteQuery = "DELETE FROM todo WHERE id = ?";
  db.query(deleteQuery, [appointmentId], (err, result) => {
    if (err) {
      console.error("Database deletion error:", err);
      res.status(500).json({ error: "Failed to delete todo" });
    } else {
      res.json({ message: "todo deleted successfully", appointmentId });
    }
  });
});

app.listen(3005, () => {
  console.log("its running at port 3005");
});
