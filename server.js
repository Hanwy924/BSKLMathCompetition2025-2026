const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

let results = []; // store answers in memory (clears when server restarts)

app.use(bodyParser.json());
app.use(express.static("public")); // serve your html files

// save result
app.post("/submit", (req, res) => {
  const { ks, answers, score } = req.body;
  const time = new Date().toLocaleString();
  results.push({ ks, answers, score, time });
  res.json({ success: true });
});

// get results
app.get("/results", (req, res) => {
  res.json(results);
});

// delete result by index
app.post("/delete", (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < results.length) {
    results.splice(index, 1); // remove result from array
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid index" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
