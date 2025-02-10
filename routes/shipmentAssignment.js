import express from 'express';
import { auth as checkAuth } from '../middlewares/auth.js';
import {createShipmentAssignment} from '../controllers/shipmentAssignmentController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ShipmentAssignment
 *   description: API para gestionar la asignación de envíos
 */

/**
 * @swagger
 * /shipmentAssignment:
 *   post:
 *     summary: Crear una nueva asignación de envío
 *     tags: [ShipmentAssignment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipment_id:
 *                 type: integer
 *                 example: 1
 *               carrier_id:
 *                 type: integer
 *                 example: 2
 *               vehicle_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Asignación de envío creada exitosamente
 *       400:
 *         description: Faltan datos por enviar
 *       409:
 *         description: Envío ya asignado
 *       404:
 *         description: |
 *           - Envío no encontrado
 *           - Ruta no encontrada
 *           - Transportista y vehículo no vinculados a la ruta
 *           - Transportista no disponible
 *           - Vehículo no cuenta con suficiente capacidad
 *       500:
 *         description: Error al crear la asignación de envío
 */

router.post('/', checkAuth, createShipmentAssignment);

export default router;