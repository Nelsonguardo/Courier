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

    const findShipment = await connection.execute(
        "SELECT * FROM shipments WHERE id = ?", [shipment_id]
    );

    if (findShipment[0].length === 0) {
        await connection.end();
        return null;
    }
    // Actualizar el estado del envío
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

// Obtener el estado actual de un envío
const getOneTrackShipmentStatusById = async (shipment_id) => {
    const connection = await createConnection();
    const [rows] = await connection.execute(
        "SELECT * FROM shipment_status_history WHERE shipment_id = ? ORDER BY changed_at DESC LIMIT 1",
        [shipment_id]
    );
    await connection.end();
    return rows;
};

// Obtener el historial de estados del envío por ID
const getAllTrackShipmentStatusById = async (shipment_id) => {
    const connection = await createConnection();
    const [rows] = await connection.execute(
        "SELECT * FROM shipment_status_history WHERE shipment_id = ? ORDER BY changed_at DESC",
        [shipment_id]
    );
    await connection.end();
    return rows;
};

// Filtrar envíos
const filterShipments = async (filters) => {

    const connection = await createConnection();
    const { id, status, carrier_id, start_date, end_date } = filters;

    let query = `
        SELECT shipments.id, shipments.origin_city, shipments.destination_city, shipments.weight, shipments.status, carriers.name
        FROM shipments
        LEFT JOIN shipment_assignments ON shipment_assignments.shipment_id = shipments.id
        LEFT JOIN carriers ON carriers.id = shipment_assignments.carrier_id
        WHERE 1=1
    `;

    const queryParams = [];

    if (id) {
        query += ' AND shipments.id = ?';
        queryParams.push(id);
    }

    if (status) {
        query += ' AND shipments.status = ?';
        queryParams.push(status);
    }

    if (start_date && end_date) {
        query += ' AND DATE(shipments.created_at) BETWEEN ? AND ?';
        queryParams.push(start_date, end_date);
    }

    if (carrier_id) {
        query += ' AND carriers.id = ?';
        queryParams.push(carrier_id);
    }
    console.log(query);
    const [rows] = await connection.execute(query, queryParams);
    await connection.end();
    return rows;
};

module.exports = {
    createShipment,
    createShipmentStatus,
    updateShipmentStatus,
    getOneTrackShipmentStatusById,
    getAllTrackShipmentStatusById,
    filterShipments
};