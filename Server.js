const express = require("express");
const { createPool } = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

const generateGitFile = require('giv-gitignore');
generateGitFile();


const pool = createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Vendors",
  connectionLimit: 10,
});

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node.js Application is running!");
});

app.get("/vendors", (req, res) => {
  pool.query("SELECT * FROM vendors", (err, results) => {
    if (err) {
      console.error("Error fetching vendors:", err);
      res.status(500).json({ error: "Failed to fetch vendors" });
    } else {
      res.json(results);
    }
  });
});

app.post("/save", (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = "INSERT INTO users.alluser (email, password) VALUES (?, ?)";

  pool.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Error inserting into MySQL:", err);
      return res.status(500).json({ message: "Failed to save user" });
    }

    res.status(200).json({
      message: "User saved successfully",
      userId: result.insertId,
    });
  });
});

app.post("/book", (req, res) => {
  const { Service, city } = req.body;

  console.log(Service, city);

  if ((!Service, !city)) {
    return res
      .status(400)
      .json({ message: "Email and Service,city are required" });
  }

  const query = "INSERT INTO users.alluser (email, password) VALUES (?, ?)";

  pool.query(query, [Service, city], (err, result) => {
    if (err) {
      console.error("Error inserting into MySQL:", err);
      return res.status(500).json({ message: "Failed to save user" });
    }

    res.status(200).json({
      message: "User saved successfully",
      userId: result.insertId,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
