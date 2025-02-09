const ShipmentModel = require('../models/shipmentModel');

// Controlador para crear un nuevo envío
const createShipment = async (req, res) => {
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

        // Crear el envío
        const result = await ShipmentModel.createShipment(shipmentData);

        //Insertar el nuevo estado en el historial con observación
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
const updateShipmentStatus = async (req, res) => {
    try {
        const { shipment_id, new_status, observation } = req.body;

        // Validar datos
        if (!shipment_id || !new_status) {
            return res.status(400).json({ error: "Faltan datos por enviar" });
        }

        // Actualizar el estado del envío y registrar en el historial
        const result = await ShipmentModel.updateShipmentStatus(shipment_id, new_status, observation);

        if (!result) {
            return res.status(404).json({ error: "Envío no encontrado" });
        }

        res.status(200).json({ message: "Estado del envío actualizado correctamente", result });
    } catch (error) {
        console.error("Error actualizando el estado del envío:", error);
        res.status(500).json({ error: "Error actualizando el estado del envío" });
    }
};

const getOneTrackShipmentStatusById = async (req, res) => {
    try {
        const { shipment_id } = req.body;

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

const getAllTrackShipmentStatusById = async (req, res) => {
    try {
        const { shipment_id } = req.body;

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
const filterShipments = async (req, res) => {
    try {
        // Obtener los filtros de la URL
        const filters = req.body;

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


module.exports = {
    createShipment,
    updateShipmentStatus,
    getOneTrackShipmentStatusById,
    getAllTrackShipmentStatusById,
    filterShipments
};