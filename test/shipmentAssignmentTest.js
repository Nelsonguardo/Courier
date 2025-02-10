import chai from 'chai';
import supertest from 'supertest';
import app from '../index.js';

const expect = chai.expect;
const request = supertest(app);

describe('Shipment Assignment API Tests', () => {
    let token;
    let shipmentId;

    // Before running tests, login and create a shipment
    before(async () => {
        // Login to get token
        const loginResponse = await request
            .post('/api/users/login')
            .send({
                email: 'juanperez@example.com',
                password: 'password123'
            });
        token = loginResponse.body.token;

        // Create a shipment to get shipmentId
        const shipment = {
            sender_name: 'Juan Pérez',
            sender_address: 'Calle 123',
            sender_email: 'juan@example.com',
            sender_phone: '1234567890',
            receiver_name: 'María García',
            receiver_address: 'Avenida 456',
            receiver_email: 'maria@example.com',
            receiver_phone: '0987654321',
            origin_city: 'cartagena',
            destination_city: 'barranquilla',
            weight: 10.5,
            dimensions: '30x30x30',
            product_type: 'Electrónica'
        };

        const shipmentResponse = await request
            .post('/api/shipment')
            .set('Authorization', `Bearer ${token}`)
            .send(shipment);

        shipmentId = shipmentResponse.body.guideNumber;
    });

    // Test create shipment assignment
    it('should create a new shipment assignment', async () => {
        const assignment = {
            shipment_id: shipmentId,
            carrier_id: 2,  // Assuming carrier_id 1 exists and is available
            vehicle_id: 9   // Assuming vehicle_id 1 exists and has capacity
        };

        const response = await request
            .post('/api/shipmentAssignment')
            .set('Authorization', `Bearer ${token}`)
            .send(assignment);

        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message', 'Asignación de envío creada exitosamente');
    });

    // Test create duplicate shipment assignment (should fail)
    it('should not create duplicate shipment assignment', async () => {
        const assignment = {
            shipment_id: shipmentId,
            carrier_id: 2,
            vehicle_id: 9
        };

        const response = await request
            .post('/api/shipmentAssignment')
            .set('Authorization', `Bearer ${token}`)
            .send(assignment);

        expect(response.status).to.equal(409);
        expect(response.body).to.have.property('error', 'Envío ya asignado');
    });
});