-- Crear las bases de datos
CREATE DATABASE IF NOT EXISTS courierdev;
CREATE DATABASE IF NOT EXISTS couriertest;
CREATE DATABASE IF NOT EXISTS courier;

-- Seleccionar la base de datos courierdev
USE courierdev;

-- Crear tablas
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL  UNIQUE,
    password  VARCHAR(255) NOT NULL,
    admin  TINYINT(1) NOT NULL  DEFAULT  0,
    createdAt DATETIME  DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(255) NOT NULL,
    sender_address VARCHAR(255) NOT NULL,
    sender_email VARCHAR(100) NOT NULL,
    sender_phone VARCHAR(100) NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    receiver_email VARCHAR(100) NOT NULL,
    receiver_phone VARCHAR(100) NOT NULL,
    origin_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    weight  DECIMAL(10,2) NOT NULL,
    dimensions VARCHAR(100) NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    status  VARCHAR(50) DEFAULT  'en espera',
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP
) AUTO_INCREMENT = 100000;

CREATE TABLE IF NOT EXISTS shipment_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id INT  NOT NULL,
    status  VARCHAR(50) NOT NULL,
    observation TEXT  DEFAULT  NULL,
    changed_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id)
);

CREATE TABLE IF NOT EXISTS routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    origin_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    route_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS carriers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    origin_city VARCHAR(50) NOT NULL,
    available BOOLEAN  DEFAULT TRUE,
    route_id INT  NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrier_id INT  NOT NULL,
    capacity DECIMAL(10, 2) NOT NULL,
    type  VARCHAR(50) NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shipment_assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id INT  NOT NULL,
    carrier_id INT  NOT NULL,
    vehicle_id INT  NOT NULL,
    route_id INT  NOT NULL,
    assigned_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id) ON DELETE CASCADE,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

USE couriertest;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL  UNIQUE,
    password  VARCHAR(255) NOT NULL,
    admin  TINYINT(1) NOT NULL  DEFAULT  0,
    createdAt DATETIME  DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(255) NOT NULL,
    sender_address VARCHAR(255) NOT NULL,
    sender_email VARCHAR(100) NOT NULL,
    sender_phone VARCHAR(100) NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    receiver_email VARCHAR(100) NOT NULL,
    receiver_phone VARCHAR(100) NOT NULL,
    origin_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    weight  DECIMAL(10,2) NOT NULL,
    dimensions VARCHAR(100) NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    status  VARCHAR(50) DEFAULT  'en espera',
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP
) AUTO_INCREMENT = 100000;

CREATE TABLE IF NOT EXISTS shipment_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id INT  NOT NULL,
    status  VARCHAR(50) NOT NULL,
    observation TEXT  DEFAULT  NULL,
    changed_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id)
);

CREATE TABLE IF NOT EXISTS routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    origin_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    route_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS carriers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    origin_city VARCHAR(50) NOT NULL,
    available BOOLEAN  DEFAULT TRUE,
    route_id INT  NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrier_id INT  NOT NULL,
    capacity DECIMAL(10, 2) NOT NULL,
    type  VARCHAR(50) NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shipment_assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id INT  NOT NULL,
    carrier_id INT  NOT NULL,
    vehicle_id INT  NOT NULL,
    route_id INT  NOT NULL,
    assigned_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id) ON DELETE CASCADE,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

USE courier;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL  UNIQUE,
    password  VARCHAR(255) NOT NULL,
    admin  TINYINT(1) NOT NULL  DEFAULT  0,
    createdAt DATETIME  DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(255) NOT NULL,
    sender_address VARCHAR(255) NOT NULL,
    sender_email VARCHAR(100) NOT NULL,
    sender_phone VARCHAR(100) NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    receiver_email VARCHAR(100) NOT NULL,
    receiver_phone VARCHAR(100) NOT NULL,
    origin_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    weight  DECIMAL(10,2) NOT NULL,
    dimensions VARCHAR(100) NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    status  VARCHAR(50) DEFAULT  'en espera',
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP
) AUTO_INCREMENT = 100000;

CREATE TABLE IF NOT EXISTS shipment_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id INT  NOT NULL,
    status  VARCHAR(50) NOT NULL,
    observation TEXT  DEFAULT  NULL,
    changed_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id)
);

CREATE TABLE IF NOT EXISTS routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    origin_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    route_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS carriers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    origin_city VARCHAR(50) NOT NULL,
    available BOOLEAN  DEFAULT TRUE,
    route_id INT  NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrier_id INT  NOT NULL,
    capacity DECIMAL(10, 2) NOT NULL,
    type  VARCHAR(50) NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shipment_assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id INT  NOT NULL,
    carrier_id INT  NOT NULL,
    vehicle_id INT  NOT NULL,
    route_id INT  NOT NULL,
    assigned_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id) ON DELETE CASCADE,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

USE courierdev;

-- Insertar datos de ejemplo
INSERT INTO routes (origin_city, destination_city, route_name, created_at, updated_at) VALUES
('bogota', 'medellin', 'ruta bogota - medellin', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'barranquilla', 'ruta costera 1', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'santa marta', 'ruta costera 2', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'monteria', 'ruta caribe', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'medellin', 'ruta cartagena - medellin', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cali', 'pereira', 'ruta del cafe', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('bucaramanga', 'cucuta', 'ruta norte', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('santa marta', 'valledupar', 'ruta caribe', '2025-02-08 17:38:21', '2025-02-08 17:38:21');

INSERT INTO carriers (name, email, phone, origin_city, available, route_id, created_at, updated_at) VALUES
('carlos perez', 'carlos.perez@transportes.com', '3101234567', 'bogota', 1, 1, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('andres gomez', 'andres.gomez@transportes.com', '3207654321', 'cartagena', 1, 2, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('javier herrera', 'javier.herrera@transportes.com', '3019876543', 'cartagena', 1, 3, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('luis rodriguez', 'luis.rodriguez@transportes.com', '3156789012', 'cartagena', 1, 4, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('pedro suarez', 'pedro.suarez@transportes.com', '3054321098', 'cartagena', 1, 5, '2025-02-08 17:38:25', '2025-02-08 19:22:04'),
('manuel torres', 'manuel.torres@transportes.com', '3114567890', 'bucaramanga', 0, 6, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('ricardo mendoza', 'ricardo.mendoza@transportes.com', '3209988776', 'santa marta', 1, 7, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('juan perez', 'juanperez@transportes.com', '3209988776', 'cartagena', 1, 5, '2025-02-08 20:49:06', '2025-02-08 20:49:06'),
('andres lopez', 'lopezandres@transportes.com', '3114567890', 'cartagena', 0, 5, '2025-02-08 20:50:12', '2025-02-08 20:50:12');

INSERT INTO vehicles ( carrier_id, capacity, type, created_at, updated_at) VALUES
(1, 5000.00, 'camion refrigerado', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(2, 12000.50, 'trailer', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(3, 3000.00, 'furgoneta', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(4, 8000.75, 'camion cisterna', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(5, 120.20, 'camion de carga', '2025-02-08 17:38:28', '2025-02-08 21:15:04'),
(6, 5000.00, 'pickup', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(7, 7500.00, 'camion liviano', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(8, 150.00, 'camion de carga', '2025-02-08 20:47:33', '2025-02-08 20:49:19'),
(9, 100.00, 'camion de carga', '2025-02-08 20:48:08', '2025-02-08 20:50:16');

CREATE  INDEX  idx_shipments_id_status  ON shipments (id, status);
CREATE  INDEX  idx_shipments_created_at  ON shipments (created_at);
CREATE  INDEX  idx_carriers_id  ON carriers (id);
CREATE  INDEX  idx_shipment_assignments_shipment_id  ON shipment_assignments (shipment_id);
CREATE  INDEX  idx_shipment_status_history_shipment_id  ON shipment_status_history (shipment_id);

USE couriertest;

INSERT INTO routes (origin_city, destination_city, route_name, created_at, updated_at) VALUES
('bogota', 'medellin', 'ruta bogota - medellin', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'barranquilla', 'ruta costera 1', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'santa marta', 'ruta costera 2', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'monteria', 'ruta caribe', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'medellin', 'ruta cartagena - medellin', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cali', 'pereira', 'ruta del cafe', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('bucaramanga', 'cucuta', 'ruta norte', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('santa marta', 'valledupar', 'ruta caribe', '2025-02-08 17:38:21', '2025-02-08 17:38:21');

INSERT INTO carriers (name, email, phone, origin_city, available, route_id, created_at, updated_at) VALUES
('carlos perez', 'carlos.perez@transportes.com', '3101234567', 'bogota', 1, 1, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('andres gomez', 'andres.gomez@transportes.com', '3207654321', 'cartagena', 1, 2, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('javier herrera', 'javier.herrera@transportes.com', '3019876543', 'cartagena', 1, 3, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('luis rodriguez', 'luis.rodriguez@transportes.com', '3156789012', 'cartagena', 1, 4, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('pedro suarez', 'pedro.suarez@transportes.com', '3054321098', 'cartagena', 1, 5, '2025-02-08 17:38:25', '2025-02-08 19:22:04'),
('manuel torres', 'manuel.torres@transportes.com', '3114567890', 'bucaramanga', 0, 6, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('ricardo mendoza', 'ricardo.mendoza@transportes.com', '3209988776', 'santa marta', 1, 7, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('juan perez', 'juanperez@transportes.com', '3209988776', 'cartagena', 1, 5, '2025-02-08 20:49:06', '2025-02-08 20:49:06'),
('andres lopez', 'lopezandres@transportes.com', '3114567890', 'cartagena', 0, 5, '2025-02-08 20:50:12', '2025-02-08 20:50:12');

INSERT INTO vehicles ( carrier_id, capacity, type, created_at, updated_at) VALUES
(1, 5000.00, 'camion refrigerado', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(2, 12000.50, 'trailer', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(3, 3000.00, 'furgoneta', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(4, 8000.75, 'camion cisterna', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(5, 120.20, 'camion de carga', '2025-02-08 17:38:28', '2025-02-08 21:15:04'),
(6, 5000.00, 'pickup', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(7, 7500.00, 'camion liviano', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(8, 150.00, 'camion de carga', '2025-02-08 20:47:33', '2025-02-08 20:49:19'),
(9, 100.00, 'camion de carga', '2025-02-08 20:48:08', '2025-02-08 20:50:16');

CREATE  INDEX  idx_shipments_id_status  ON shipments (id, status);
CREATE  INDEX  idx_shipments_created_at  ON shipments (created_at);
CREATE  INDEX  idx_carriers_id  ON carriers (id);
CREATE  INDEX  idx_shipment_assignments_shipment_id  ON shipment_assignments (shipment_id);
CREATE  INDEX  idx_shipment_status_history_shipment_id  ON shipment_status_history (shipment_id);

USE courier;

INSERT INTO routes (origin_city, destination_city, route_name, created_at, updated_at) VALUES
('bogota', 'medellin', 'ruta bogota - medellin', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'barranquilla', 'ruta costera 1', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'santa marta', 'ruta costera 2', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'monteria', 'ruta caribe', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cartagena', 'medellin', 'ruta cartagena - medellin', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('cali', 'pereira', 'ruta del cafe', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('bucaramanga', 'cucuta', 'ruta norte', '2025-02-08 17:38:21', '2025-02-08 17:38:21'),
('santa marta', 'valledupar', 'ruta caribe', '2025-02-08 17:38:21', '2025-02-08 17:38:21');

INSERT INTO carriers (name, email, phone, origin_city, available, route_id, created_at, updated_at) VALUES
('carlos perez', 'carlos.perez@transportes.com', '3101234567', 'bogota', 1, 1, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('andres gomez', 'andres.gomez@transportes.com', '3207654321', 'cartagena', 1, 2, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('javier herrera', 'javier.herrera@transportes.com', '3019876543', 'cartagena', 1, 3, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('luis rodriguez', 'luis.rodriguez@transportes.com', '3156789012', 'cartagena', 1, 4, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('pedro suarez', 'pedro.suarez@transportes.com', '3054321098', 'cartagena', 1, 5, '2025-02-08 17:38:25', '2025-02-08 19:22:04'),
('manuel torres', 'manuel.torres@transportes.com', '3114567890', 'bucaramanga', 0, 6, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('ricardo mendoza', 'ricardo.mendoza@transportes.com', '3209988776', 'santa marta', 1, 7, '2025-02-08 17:38:25', '2025-02-08 17:38:25'),
('juan perez', 'juanperez@transportes.com', '3209988776', 'cartagena', 1, 5, '2025-02-08 20:49:06', '2025-02-08 20:49:06'),
('andres lopez', 'lopezandres@transportes.com', '3114567890', 'cartagena', 0, 5, '2025-02-08 20:50:12', '2025-02-08 20:50:12');

INSERT INTO vehicles ( carrier_id, capacity, type, created_at, updated_at) VALUES
(1, 5000.00, 'camion refrigerado', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(2, 12000.50, 'trailer', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(3, 3000.00, 'furgoneta', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(4, 8000.75, 'camion cisterna', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(5, 120.20, 'camion de carga', '2025-02-08 17:38:28', '2025-02-08 21:15:04'),
(6, 5000.00, 'pickup', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(7, 7500.00, 'camion liviano', '2025-02-08 17:38:28', '2025-02-08 17:38:28'),
(8, 150.00, 'camion de carga', '2025-02-08 20:47:33', '2025-02-08 20:49:19'),
(9, 100.00, 'camion de carga', '2025-02-08 20:48:08', '2025-02-08 20:50:16');

CREATE  INDEX  idx_shipments_id_status  ON shipments (id, status);
CREATE  INDEX  idx_shipments_created_at  ON shipments (created_at);
CREATE  INDEX  idx_carriers_id  ON carriers (id);
CREATE  INDEX  idx_shipment_assignments_shipment_id  ON shipment_assignments (shipment_id);
CREATE  INDEX  idx_shipment_status_history_shipment_id  ON shipment_status_history (shipment_id);