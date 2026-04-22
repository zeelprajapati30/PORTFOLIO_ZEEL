const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* ================= ROOT ================= */
app.get("/", (req, res) => {
    res.send("Backend Working 🚀");
});

/* ================= DB CONNECTION ================= */
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected...");
    }
});

/* ================= CONTACT API ================= */
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Missing fields");
    }

    const sql = `
        INSERT INTO contacts (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, subject, message], (err, result) => {
        if (err) {
            console.log("DB Error:", err);
            return res.status(500).send("Database error");
        }

        res.send("Message saved successfully 🚀");
    });
});
/* ================= PORT ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));