import createConnection from '../dataBase/db.js';

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

    // Aplicando toLowerCase
    let sendername = sender_name.toLowerCase();
    let senderaddress = sender_address.toLowerCase();
    let senderemail = sender_email.toLowerCase();
    let receivername = receiver_name.toLowerCase();
    let receiveraddress = receiver_address.toLowerCase();
    let receiveremail = receiver_email.toLowerCase();
    let origincity = origin_city.toLowerCase();
    let destinationcity = destination_city.toLowerCase();

    const connection = await createConnection();
    const [result] = await connection.execute(
        "INSERT INTO shipments (sender_name, sender_address, sender_email, sender_phone, receiver_name, receiver_address, receiver_email, receiver_phone, origin_city, destination_city, weight, dimensions, product_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'en espera')",
        [sendername, senderaddress, senderemail, sender_phone, receivername, receiveraddress, receiveremail, receiver_phone, origincity, destinationcity, weight, dimensions, product_type]
    );

    await connection.end();
    return result;
};

// Crear primer estado del envío
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
        SELECT 
            s.id, 
            s.origin_city, 
            s.destination_city, 
            s.weight, 
            s.status, 
            c.name AS carrier_name,
            ssh.latest_status,
            ssh.latest_changed_at,
            TIMESTAMPDIFF(DAY, s.created_at, s.updated_at) AS total_days,
            TIMESTAMPDIFF(HOUR, s.created_at, s.updated_at) % 24 AS total_hours,
            TIMESTAMPDIFF(MINUTE, s.created_at, s.updated_at) % 60 AS total_minutes
        FROM shipments s
        LEFT JOIN shipment_assignments sa 
            ON sa.shipment_id = s.id
        LEFT JOIN carriers c 
            ON c.id = sa.carrier_id 
        LEFT JOIN (
            SELECT shipment_id, 
                status AS latest_status, 
                changed_at AS latest_changed_at
            FROM shipment_status_history 
            WHERE (shipment_id, changed_at) IN (
                SELECT shipment_id, MAX(changed_at) 
                FROM shipment_status_history 
                GROUP BY shipment_id
            )
        ) ssh ON ssh.shipment_id = s.id
        WHERE 1=1
    `;

    const queryParams = [];

    if (id) {
        query += ' AND s.id = ?';
        queryParams.push(id);
    }

    if (status) {
        let newostatus = status.toLowerCase();
        query += ' AND s.status = ?';
        queryParams.push(newostatus);
    }

    if (start_date && end_date) {
        query += ' AND DATE(s.created_at) BETWEEN ? AND ?';
        queryParams.push(start_date, end_date);
    }

    if (carrier_id) {
        query += ' AND c.id = ?';
        queryParams.push(carrier_id);
    }

    // Agregar ORDER BY, LIMIT y OFFSET
    query += ' ORDER BY s.created_at DESC LIMIT 10 OFFSET 0';

    const [rows] = await connection.execute(query, queryParams);
    await connection.end();
    return rows;
};

export {
    createShipment,
    createShipmentStatus,
    updateShipmentStatus,
    getOneTrackShipmentStatusById,
    getAllTrackShipmentStatusById,
    filterShipments
};