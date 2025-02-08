const createConnection = require('../dataBase/db');

// Obtener un usuario por su email
const getUserByEmail = async (email) => {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
    await connection.end();
    return rows[0];
};

// Obtener todos los usuarios
const getAllUsers = async () => {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT * FROM users");
    await connection.end();
    return rows;
};

// Crear un nuevo usuario
const createUser = async (name, last_name, email, password) => {
    const connection = await createConnection();
    const [results] = await connection.execute(
        "INSERT INTO users (name, last_name, email, password) VALUES (?,?,?,?)",
        [name, last_name, email.toLowerCase(), password]
    );
    await connection.end();
    return results;
};

// Verificar si un usuario ya existe por su email
const userExists = async (email) => {
    const connection = await createConnection();
    const [existingUser] = await connection.execute(
        "SELECT id FROM users WHERE email = ?",
        [email.toLowerCase()]
    );
    await connection.end();
    return existingUser.length > 0;
};

module.exports = {
    getUserByEmail,
    getAllUsers,
    createUser,
    userExists
};