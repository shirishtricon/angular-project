const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("Database connected successfully");
});

module.exports = connection;