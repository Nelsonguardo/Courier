const createConnection = require('../dataBase/db');

// Crear un nuevo envío
const createShipment = async (shipmentData) => {
    const {
        sender_name,
        sender_address,
        sender_email,
        sender_phone,
        receiver_name,
        receiver_address,
        receiver_email,
        receiver_phone,
        origin_city,
        destination_city,
        weight,
        dimensions,
        product_type
    } = shipmentData;

    const connection = await createConnection();
    const [result] = await connection.execute(
        "INSERT INTO shipments (sender_name, sender_address, sender_email, sender_phone ,receiver_name, receiver_address, receiver_email, receiver_phone, origin_city, destination_city, weight, dimensions, product_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'en espera')",
        [sender_name, sender_address, sender_email, sender_phone, receiver_name, receiver_address, receiver_email, receiver_phone, origin_city, destination_city, weight, dimensions, product_type]
    );

    await connection.end();
    return result;
};

//Crear primer estado del envío
const createShipmentStatus = async (shipment_id) => {
    const connection = await createConnection();
    const [result] = await connection.execute(
        "INSERT INTO shipment_status_history (shipment_id, status, observation) VALUES (?, 'en espera', 'Envío creado')",
        [shipment_id]
    );

    await connection.end();
    return result;
};

// Actualizar el estado del envío
const updateShipmentStatus = async (shipment_id, new_status, observation) => {
    const connection = await createConnection();
    await connection.execute(
        "UPDATE shipments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [new_status, shipment_id]
    );

    // Insertar el nuevo estado en el historial con observación
    const [result] = await connection.execute(
        "INSERT INTO shipment_status_history (shipment_id, status, observation) VALUES (?, ?, ?)",
        [shipment_id, new_status, observation]
    );

    await connection.end();
    return result;
};

// Obtener el historial de estados del envío por ID
const getTrackShipmentStatusById = async (shipment_id) => {
    const connection = await createConnection();
    const [rows] = await connection.execute(
        "SELECT * FROM shipment_status_history WHERE shipment_id = ? ORDER BY changed_at DESC",
        [shipment_id]
    );
    await connection.end();
    return rows;
};

module.exports = {
    createShipment,
    createShipmentStatus,
    updateShipmentStatus,
    getTrackShipmentStatusById
};