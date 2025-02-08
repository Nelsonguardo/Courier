const mysql = require('mysql2/promise');
const { dbConfig } = require("../config/config");

async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Conectado a MySQL");
    return connection;
  } catch (err) {
    console.error("Error conectando a MySQL:", err);
    throw err;
  }
}

module.exports = createConnection;
