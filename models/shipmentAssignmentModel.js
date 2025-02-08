const createConnection = require('../dataBase/db');

// Crear una nueva asignación de envío
const createShipmentAssignment = async (shipment_id, carrier_id, vehicle_id, route_id) => {
    const connection = await createConnection();
    const [result] = await connection.execute(
        "INSERT INTO shipment_assignments (shipment_id, carrier_id, vehicle_id, route_id) VALUES (?, ?, ?, ?);",
        [shipment_id, carrier_id, vehicle_id, route_id]
    );
    await connection.end();
    return result;
};

// Encontrar una ruta
const findRoute = async (origin_city, destination_city) => {
    const connection = await createConnection();
    const [result] = await connection.execute(
        "SELECT * FROM routes WHERE origin_city = ? AND destination_city = ?;",
        [origin_city, destination_city]
    );
    await connection.end();
    return result;
};

// Encontrar un envío
const findOneShipment = async (shipment_id) => {
    const connection = await createConnection();
    const [result] = await connection.execute(
        "SELECT * FROM shipments WHERE id = ?;",
        [shipment_id]
    );
    await connection.end();
    return result;
};

// Verificar si una asignación de envío ya existe
const shipmentAssignmentExists = async (shipment_id) => {
    const connection = await createConnection();
    const [result] = await connection.execute(
        "SELECT * FROM shipment_assignments WHERE shipment_id = ?;",
        [shipment_id]
    );
    await connection.end();
    return result;
};

module.exports = {
    createShipmentAssignment,
    findRoute,
    findOneShipment,
    shipmentAssignmentExists
};