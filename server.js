const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        // MySQL password
        password: 'Underhill_10@',
        database: 'election'
    },
    console.log('Connected to the electin database')
);

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});


// Default request for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, ()=>{
    console.log(`Server runnning on port ${PORT}`);
})