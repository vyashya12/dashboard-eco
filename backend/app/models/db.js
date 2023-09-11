const mysql = require("mysql2");
const config = require("../config/db.config.js");

var connection = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  connectionLimit: config.db.connectionLimit,
  queueLimit: config.db.queueLimit,
  waitForConnections: config.db.waitForConnections,
  debug: config.db.debug,
});

connection.getConnection((err) => {
  if (err) {
    console.log("Not connected to database");
    throw err;
  } else {
    console.log("Connected to database");
  }
});

module.exports = connection;

// const mysql = require("mysql2/promise");
// const config = require("../config/db.config");
// const pool = mysql.createPool(config.db);

// async function sql(sql, params) {
//   const [rows, fields] = await pool.execute(sql, params);

//   return rows;
// }

// module.exports = {
//   sql,
// };
