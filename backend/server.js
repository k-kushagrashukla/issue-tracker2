const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let issues = [];

// GET all issues
app.get("/issues", (req, res) => {
  res.json(issues);
});

// CREATE issue
app.post("/issues", (req, res) => {
  const issue = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    status: "open",
  };
  issues.push(issue);
  res.json(issue);
});

// DELETE issue
app.delete("/issues/:id", (req, res) => {
  issues = issues.filter((i) => i.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});