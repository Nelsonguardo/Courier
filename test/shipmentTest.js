import chai from 'chai';
import supertest from 'supertest';
import app from '../index.js';

const expect = chai.expect;
const request = supertest(app);

describe('Shipment API Tests', () => {
    let shipmentId;
    let token;

    // Before running shipment tests, we need to login to get a token
    before(async () => {
        const loginResponse = await request
            .post('/api/users/login')
            .send({
                email: 'juanperez@example.com',
                password: 'password123'
            });
        token = loginResponse.body.token;
    });

    // Test create shipment
    it('should create a new shipment', async () => {
        const shipment = {
            sender_name: 'Juan',
            sender_address: '123 Calle Falsa',
            sender_email: 'juan@example.com',
            sender_phone: '1234567890',
            receiver_name: 'Maria',
            receiver_address: '456 Calle Verdadera',
            receiver_email: 'maria@example.com',
            receiver_phone: '0987654321',
            origin_city: 'cartagena',
            destination_city: 'barranquilla',
            weight: 10.5,
            dimensions: '30x30x30',
            product_type: 'Electrónica'
        };

        const response = await request
            .post('/api/shipment')
            .set('Authorization', `Bearer ${token}`)
            .send(shipment);

        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('guideNumber');
        shipmentId = response.body.guideNumber;
    });

    // Test update shipment status
    it('should update shipment status', async () => {
        const statusUpdate = {
            shipment_id: shipmentId,
            new_status: 'en tránsito',
            observation: 'El envío está en camino'
        };

        const response = await request
            .put('/api/shipment')
            .set('Authorization', `Bearer ${token}`)
            .send(statusUpdate);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'Estado del envío actualizado correctamente');
    });

    // Test get current shipment status
    it('should get current shipment status', async () => {
        const response = await request
            .get(`/api/shipment/one?shipment_id=${shipmentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.result).to.be.an('array');
        expect(response.body.result[0]).to.have.property('status');
    });

    // Test get shipment history
    it('should get shipment history', async () => {
        const response = await request
            .get(`/api/shipment/all?shipment_id=${shipmentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.result).to.be.an('array');
    });

    // Test filter shipments
    it('should filter shipments', async () => {
        const response = await request
            .get('/api/shipment/filter')
            .query({ status: 'en tránsito' })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body.shipments).to.be.an('array');
    });
});