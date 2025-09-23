const DB_HOST = "localhost";
const DB_USER = "root";
const DB_PASS = "vegetta777";
const DB_NAME = "DB_Pato";

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: `${DB_HOST}`,
  user: `${DB_USER}`,
  password: `${DB_PASS}`,
  database: `${DB_NAME}`,
});

module.exports = pool.promise();
