// get the client
const mysql = require("mysql2");

// create the connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  // MySQL Username
  user: "root",
  // MySQL Password
  password: process.env.DB_PASSWORD,
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;