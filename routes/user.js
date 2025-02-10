const express = require('express');
const router = express.Router();
const check = require('../middlewares/auth');

const { UserList, UserCreate, login } = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Juan
 *                   last_name:
 *                     type: string
 *                     example: Pérez
 *                   email:
 *                     type: string
 *                     example: juan.perez@example.com
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error obteniendo usuarios
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan
 *               last_name:
 *                 type: string
 *                 example: Pérez
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 *       409:
 *         description: El usuario ya existe
 *       500:
 *         description: Error creando usuario
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Te has logueado correctamente
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Juan
 *                     last_name:
 *                       type: string
 *                       example: Pérez
 *                     email:
 *                       type: string
 *                       example: juan.perez@example.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Faltan datos por enviar o la contraseña es incorrecta
 *       404:
 *         description: El usuario no existe
 *       500:
 *         description: Error en el login
 */

router.get('/', check.auth, UserList);
router.post('/', UserCreate);
router.post('/login', login);

module.exports = router;