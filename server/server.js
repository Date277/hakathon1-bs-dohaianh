const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "haianh123",
  database: "sqlite",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Kết nối thành công đến Database");
});

// Route để thêm mới user
app.post("/api/v1/users", (req, res) => {
  const { name, email, age } = req.body;
  const sql = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
  db.query(sql, [name, email, age], (err, result) => {
    if (err) throw err;
    console.log("thêm mới thành công");
    res.send("thêm mới thành công");
  });
});

// Route để lấy tất cả user
app.get("/api/v1/users", (req, res) => {
  const sql = `SELECT * FROM users`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Route để lấy 1 user với id
app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "Không tìm thấy user" });
    }
  });
});

// Route để update user
app.patch("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const sql = `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`;
  db.query(sql, [name, email, age, id], (err, result) => {
    if (err) throw err;
    console.log("cập nhật thành công");
    res.send("cập nhật thành công");
  });
});

// Route để xóa user
app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log("Xóa thành công");
    res.send("Xóa thành công");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
