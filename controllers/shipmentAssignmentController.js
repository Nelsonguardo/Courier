const shipmentAssignmentModel = require('../models/shipmentAssignmentModel.js');

const createShipmentAssignment =  async (req, res) => {
    try {
        const { shipment_id, carrier_id, vehicle_id, route_id} = req.body;

        if (!shipment_id || !carrier_id || !vehicle_id || !route_id) {
            return res.status(400).json({ error: 'Faltan datos por enviar' });
        }

        const result = await shipmentAssignmentModel.createShipmentAssignment(shipment_id, carrier_id, vehicle_id, route_id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignación de envío' });
    }
};

module.exports = {
    createShipmentAssignment
};