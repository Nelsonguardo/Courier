const createConnection = require('../dataBase/db');

const createShipmentAssignment = async (shipment_id, carrier_id, vehicle_id, route_id) => {
    const connection = await createConnection();
    const [result] = await connection.execute(
        "INSERT INTO shipment_assignments (shipment_id, carrier_id, vehicle_id, route_id) VALUES (?, ?, ?, ?);",
        [shipment_id, carrier_id, vehicle_id, route_id]
    );
    await connection.end();
    return result;
};

module.exports = {
    createShipmentAssignment
};