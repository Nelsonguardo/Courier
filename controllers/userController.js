import bcrypt from 'bcryptjs';
import { createToken } from '../services/jwt.js';
import * as UserModel from '../models/userModel.js';
import * as Validate from '../helpers/validate.js';

// Verificar si un usuario ya existe por su email
export const UserList = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        // Remove password field from each user
        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.status(200).json(usersWithoutPassword);
    } catch (error) {
        console.error("Error en UserList:", error);
        res.status(500).json({ error: "Error obteniendo usuarios" });
    }
};

// Controlador para crear un nuevo usuario
export const UserCreate = async (req, res) => {
    try {
        const { name, last_name, email, password } = req.body;

        try {
            Validate.validate(req.body);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        }

        // Verificar si el usuario ya existe
        if (await UserModel.userExists(email)) {
            return res.status(409).json({ error: "El usuario ya existe" }); // 409 Conflict
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const results = await UserModel.createUser(name, last_name, email, hashedPassword);

        res.status(201).json({ message: "Usuario creado exitosamente", results });
    } catch (error) {
        console.error("Error en UserCreate:", error);
        res.status(500).json({ error: "Error creando usuario" });
    }
};

// Controlador para el login de usuarios
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Validar datos
        if (!email || !password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        // Obtener el usuario por email
        const user = await UserModel.getUserByEmail(email);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "El usuario no existe"
            });
        }

        // Comparar la contraseña con bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).send({
                status: "error",
                message: "La contraseña es incorrecta"
            });
        }

        // Generar el token
        const token = createToken(user);

        // Desestructurar el objeto user excluyendo password
        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).send({
            status: "success",
            message: "Te has logueado correctamente",
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en el login" });
    }
};