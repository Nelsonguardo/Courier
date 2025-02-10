import * as ShipmentModel from '../models/shipmentModel.js';
import * as shipmentAssignmentModel from '../models/shipmentAssignmentModel.js';

// Controlador para crear un nuevo envío
export const createShipment = async (req, res) => {
    try {
        const shipmentData = req.body;

        // Validar datos
        const requiredFields = [
            'sender_name', 'sender_address', 'sender_email', 'sender_phone',
            'receiver_name', 'receiver_address', 'receiver_email', 'receiver_phone',
            'origin_city', 'destination_city', 'weight', 'dimensions', 'product_type'
        ];

        for (const field of requiredFields) {
            if (!shipmentData[field]) {
                return res.status(400).json({ error: `Falta el campo ${field}` });
            }
        }

        let origin_city = shipmentData.origin_city.toLowerCase();
        let destination_city = shipmentData.destination_city.toLowerCase();

        // Validar ruta de envío
        const oneRoute = await shipmentAssignmentModel.findRoute(origin_city, destination_city);
        if (oneRoute.length === 0) {
            return res.status(404).json({ error: 'Ruta no encontrada' });
        }

        // Crear el envío
        const result = await ShipmentModel.createShipment(shipmentData);

        // Insertar el nuevo estado en el historial con observación
        await ShipmentModel.createShipmentStatus(result.insertId);

        res.status(201).json({
            message: "Envío creado exitosamente",
            guideNumber: result.insertId
        });
    } catch (error) {
        console.error("Error creando el envío:", error);
        res.status(500).json({ error: "Error creando el envío" });
    }
};

// Controlador para actualizar el estado del envío
export const updateShipmentStatus = async (req, res) => {
    try {
        const { shipment_id, new_status, observation } = req.body;

        // Validar datos
        if (!shipment_id || !new_status || !observation) {
            return res.status(400).json({ error: "Faltan datos por enviar" });
        }

        // Actualizar el estado del envío y registrar en el historial
        let newstatus = new_status.toLowerCase();
        let newobservation = observation.toLowerCase();

        const result = await ShipmentModel.updateShipmentStatus(shipment_id, newstatus, newobservation);

        if (!result) {
            return res.status(404).json({ error: "Envío no encontrado" });
        }

        res.status(200).json({ message: "Estado del envío actualizado correctamente", result });
    } catch (error) {
        console.error("Error actualizando el estado del envío:", error);
        res.status(500).json({ error: "Error actualizando el estado del envío" });
    }
};

// Controlador para obtener el estado actual de un envío
export const getOneTrackShipmentStatusById = async (req, res) => {
    try {
        const { shipment_id } = req.query;

        // Validar datos
        if (!shipment_id) {
            return res.status(400).json({ error: "Faltan datos por enviar" });
        }

        // Obtener el historial de estados del envío
        const result = await ShipmentModel.getOneTrackShipmentStatusById(shipment_id);

        if (result.length === 0) {
            return res.status(404).json({ error: "Historial de estados del envío no encontrado" });
        }

        res.status(200).json({ message: "Historial de estados del envío obtenido correctamente", result });
    } catch (error) {
        console.error("Error obteniendo el historial de estados del envío:", error);
        res.status(500).json({ error: "Error obteniendo el historial de estados del envío" });
    }
};

// Controlador para obtener el historial de estados del envío por ID
export const getAllTrackShipmentStatusById = async (req, res) => {
    try {
        const { shipment_id } = req.query;

        // Validar datos
        if (!shipment_id) {
            return res.status(400).json({ error: "Faltan datos por enviar" });
        }

        // Obtener el historial de estados del envío
        const result = await ShipmentModel.getAllTrackShipmentStatusById(shipment_id);

        if (result.length === 0) {
            return res.status(404).json({ error: "Historial de estados del envío no encontrado" });
        }

        res.status(200).json({ message: "Historial de estados del envío obtenido correctamente", result });
    } catch (error) {
        console.error("Error obteniendo el historial de estados del envío:", error);
        res.status(500).json({ error: "Error obteniendo el historial de estados del envío" });
    }
};

// Controlador para filtrar envíos
export const filterShipments = async (req, res) => {
    try {
        // Obtener los filtros de la URL
        const filters = req.query;

        // Validar fechas
        if (filters.start_date && filters.end_date) {
            if (filters.start_date > filters.end_date) {
                return res.status(400).json({ error: "La fecha de inicio no puede ser mayor a la fecha final" });
            }
        }

        // Filtrar envíos
        const shipments = await ShipmentModel.filterShipments(filters);

        if (shipments.length === 0) {
            return res.status(404).json({ error: "Envíos no encontrados" });
        } else {
            return res.status(200).json({
                status: "success",
                shipments
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};