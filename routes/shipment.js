import express from 'express';
import { auth as checkAuth } from '../middlewares/auth.js';
import {
    createShipment,
    updateShipmentStatus,
    getAllTrackShipmentStatusById,
    getOneTrackShipmentStatusById,
    filterShipments
} from '../controllers/shipmentController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shipments
 *   description: API para gestionar envíos
 */

/**
 * @swagger
 * /shipment:
 *   post:
 *     summary: Crear un nuevo envío
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_name:
 *                 type: string
 *                 example: Juan
 *               sender_address:
 *                 type: string
 *                 example: "123 Calle Falsa"
 *               sender_email:
 *                 type: string
 *                 example: juan@example.com
 *               sender_phone:
 *                 type: string
 *                 example: "1234567890"
 *               receiver_name:
 *                 type: string
 *                 example: Maria
 *               receiver_address:
 *                 type: string
 *                 example: "456 Calle Verdadera"
 *               receiver_email:
 *                 type: string
 *                 example: maria@example.com
 *               receiver_phone:
 *                 type: string
 *                 example: "0987654321"
 *               origin_city:
 *                 type: string
 *                 example: "cartagena"
 *               destination_city:
 *                 type: string
 *                 example: "barranquilla"
 *               weight:
 *                 type: number
 *                 example: 10.5
 *               dimensions:
 *                 type: string
 *                 example: "30x30x30"
 *               product_type:
 *                 type: string
 *                 example: "Electrónica"
 *     responses:
 *       201:
 *         description: Envío creado exitosamente
 *       400:
 *         description: Falta algún campo requerido o error de validación
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error creando el envío
 */

/**
 * @swagger
 * /shipment:
 *   put:
 *     summary: Actualizar el estado de un envío
 *     tags: [Shipments]
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
 *                 example: 100000
 *               new_status:
 *                 type: string
 *                 example: "En bodega"
 *               observation:
 *                 type: string
 *                 example: "El paquete en bodega ciudad destino"
 *     responses:
 *       200:
 *         description: Estado del envío actualizado correctamente
 *       400:
 *         description: Faltan datos por enviar
 *       404:
 *         description: Envío no encontrado
 *       500:
 *         description: Error actualizando el estado del envío
 */

/**
 * @swagger
 * /shipment/all:
 *   get:
 *     summary: Obtener el historial de estados de todos los envíos
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: shipment_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del envío
 *     responses:
 *       200:
 *         description: Historial de estados de todos los envíos obtenido correctamente
 *       400:
 *         description: Faltan datos por enviar
 *       404:
 *         description: Historial de estados no encontrado
 *       500:
 *         description: Error obteniendo el historial de estados de los envíos
 */

/**
 * @swagger
 * /shipment/one:
 *   get:
 *     summary: Obtener el estado actual de un envío
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: shipment_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del envío
 *     responses:
 *       200:
 *         description: Estado actual del envío obtenido correctamente
 *       400:
 *         description: Faltan datos por enviar
 *       404:
 *         description: Envío no encontrado
 *       500:
 *         description: Error obteniendo el estado del envío
 */

/**
 * @swagger
 * /shipment/filter:
 *   get:
 *     summary: Filtrar envíos
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del envío
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-02-08"
 *         required: false
 *         description: "Fecha de inicio (Formato: YYYY-MM-DD)"
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-02-08"
 *         required: false
 *         description: "Fecha de fin (Formato: YYYY-MM-DD)"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Estado del envío
 *       - in: query
 *         name: carrier_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del transportista
 *     responses:
 *       200:
 *         description: Envíos filtrados correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Envíos no encontrados
 *       500:
 *         description: Error filtrando los envíos
 */

router.post('/', checkAuth, createShipment);
router.put('/', checkAuth, updateShipmentStatus);
router.get('/all', checkAuth, getAllTrackShipmentStatusById);
router.get('/one', checkAuth, getOneTrackShipmentStatusById);
router.get('/filter', checkAuth, filterShipments);

export default router;