import chai from 'chai';
import supertest from 'supertest';
import app from '../index.js';

const expect = chai.expect;
const request = supertest(app);

describe('User API Tests', () => {
    let userId;
    let token;

    it('should create a new user', async () => {
        const user = {
            name: 'Juan',
            last_name: 'Pérez',
            email: 'juanperez@example.com',
            password: 'password123'
        };
        const response = await request.post('/api/users').send(user);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        userId = response.body.id;
    });

    it('should login a user', async () => {
        const user = {
            email: 'juanperez@example.com',
            password: 'password123'
        };
        const response = await request.post('/api/users/login').send(user);
        expect(response.body.token).to.be.a('string');
        token = response.body.token;
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });

    it('should get all users', async () => {
        const response = await request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });
});