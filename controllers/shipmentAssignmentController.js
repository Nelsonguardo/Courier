import * as shipmentAssignmentModel from '../models/shipmentAssignmentModel.js';
import * as ShipmentModel from '../models/shipmentModel.js';

// Crear una nueva asignación de envío
export const createShipmentAssignment = async (req, res) => {
    try {
        const { shipment_id, carrier_id, vehicle_id } = req.body;

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

        // Verificar si el transportista y el vehículo existen
        const validateCarrierAndVehicle = await shipmentAssignmentModel.validateCarrierAndVehicle(carrier_id, vehicle_id, oneRoute[0].id);
        if (validateCarrierAndVehicle.length === 0) {
            return res.status(404).json({ error: 'Transportista y vehículo no vinculados a la ruta' });
        }

        // Verificar si el transportista está disponible
        const availableCarriers = await shipmentAssignmentModel.availableCarriers(carrier_id);
        if (availableCarriers.length === 0) {
            return res.status(404).json({ error: 'Transportista no disponible' });
        }

        // Verificar si el vehículo está disponible
        const availableVehicles = await shipmentAssignmentModel.availableVehicles(vehicle_id);
        let current_weight = 0;
        let max_weight = 0;

        if (availableVehicles && availableVehicles.length > 0 && availableVehicles[0]) {
            current_weight = parseFloat(availableVehicles[0].current_weight || 0) + parseFloat(oneShipment[0].weight);
            max_weight = parseFloat(availableVehicles[0].max_weight || 0);
        }

        if (current_weight > max_weight) {
            return res.status(404).json({ error: 'Vehículo no cuenta con suficiente capacidad' });
        }

        // Crear la asignación de envío
        const result = await shipmentAssignmentModel.createShipmentAssignment(shipment_id, carrier_id, vehicle_id, oneRoute[0].id);
        if (result.affectedRows > 0) {
            await ShipmentModel.updateShipmentStatus(shipment_id, 'en tránsito', 'Envío asignado a transportista');
            return res.status(201).json({ message: 'Asignación de envío creada exitosamente' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignación de envío' });
    }
};

// export {
//     createShipmentAssignment
// };