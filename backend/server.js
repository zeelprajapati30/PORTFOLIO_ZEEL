const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// ✅ Root route (IMPORTANT for Render)
app.get("/", (req, res) => {
    res.send("Backend Working 🚀");
});


// ✅ Database connection (Render ENV use kare che)
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


// ✅ API route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error saving data");
        } else {
            res.send("Data saved successfully");
        }
    });
});


// ✅ Dynamic PORT (Render mate jaruri)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));