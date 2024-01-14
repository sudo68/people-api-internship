const mysql = require("mysql2/promise");

// Creating a database pool so that the files can share the database connection.
const dbPool = mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10,
});
module.exports = { dbPool };
// Exporting the database pool instance.
