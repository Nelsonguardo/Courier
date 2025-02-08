const createConnection = require('../dataBase/db');
const jwt = require('../services/jwt');
const bcrypt = require('bcrypt');
// const validate = require('../helpers/validate');

const UserList = async (req, res) => {
    try {
        const connection = await createConnection(); // Crear nueva conexión
        const [rows] = await connection.execute("SELECT * FROM users");
        await connection.end(); // Cerrar conexión
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error en UserList:", error);
        res.status(500).json({ error: "Error obteniendo usuarios" });
    }
};

const UserCreate = async (req, res) => {
    try {
        const { name, last_name, email, password } = req.body;

        // Validar datos
        if (!name || !last_name || !email || !password) {
            return res.status(400).json({ error: "Faltan datos por enviar" });
        }

        const connection = await createConnection();

        // Verificar si el usuario ya existe
        const [existingUser] = await connection.execute(
            "SELECT id FROM users WHERE email = ?",
            [email.toLowerCase()]
        );

        if (existingUser.length > 0) {
            await connection.end();
            return res.status(409).json({ error: "El usuario ya existe" }); // 409 Conflict
        }

        // Encriptar la contraseña
        const pwd = await bcrypt.hash(password, 10);

        // Crear el usuario
        const [results] = await connection.execute(
            "INSERT INTO users (name, last_name, email, password) VALUES (?,?,?,?)",
            [name, last_name, email.toLowerCase(), pwd]
        );

        await connection.end();

        res.status(201).json({ message: "Usuario creado exitosamente", results });
    } catch (error) {
        console.error("Error en UserCreate:", error);
        res.status(500).json({ error: "Error creando usuario" });
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        // Conectar a la base de datos
        const connection = await createConnection();
        const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "El usuario no existe"
            });
        }

        const user = rows[0];

        // Comparar la contraseña con bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).send({
                status: "error",
                message: "La contraseña es incorrecta"
            });
        }

        // Generar el token (descomenta cuando tengas `jwt`)
        const token = jwt.createToken(user);

        return res.status(200).send({
            status: "success",
            message: "Te has logueado correctamente",
            user,
            token
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en el login" });
    }
};

module.exports = {
    UserList,
    UserCreate,
    login
};
