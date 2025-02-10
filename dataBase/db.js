import mysql from 'mysql2/promise';
import { dbConfig } from '../config/config.js';

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

export default createConnection;