const shipmentAssignmentModel = require('../models/shipmentAssignmentModel.js');

// Crear una nueva asignación de envío
const createShipmentAssignment =  async (req, res) => {
    try {
        const { shipment_id, carrier_id, vehicle_id} = req.body;

        // Validar datos
        if (!shipment_id || !carrier_id || !vehicle_id) {
            return res.status(400).json({ error: 'Faltan datos por enviar' });
        }
        // Verificar si el envío ya fue asignado
        const assignmentExists = await shipmentAssignmentModel.shipmentAssignmentExists(shipment_id);
        if (assignmentExists.length > 0) {
            return res.status(409).json({ error: 'Envío ya asignado' });
        }
        // Verificar si el envío existe
        const oneShipment = await shipmentAssignmentModel.findOneShipment(shipment_id);
        if (oneShipment.length === 0) {
            return res.status(404).json({ error: 'Envío no encontrado' });
        }
        // Verificar si la ruta existe
        const oneRoute = await shipmentAssignmentModel.findRoute(oneShipment[0].origin_city, oneShipment[0].destination_city);
        if (oneRoute.length === 0) {
            return res.status(404).json({ error: 'Ruta no encontrada' });
        }
        // Crear la asignación de envío
        const result = await shipmentAssignmentModel.createShipmentAssignment(shipment_id, carrier_id, vehicle_id, oneRoute[0].id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignación de envío' });
    }
};

module.exports = {
    createShipmentAssignment
};