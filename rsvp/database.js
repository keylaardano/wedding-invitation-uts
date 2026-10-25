
const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "wedding_invitation",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = db;
