const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "nurianoelho@hotmail.com",
                whatsapp: "32999776854",
                city: "Rio Grande do sul",
                uf: "SC",
            });

            console.log(response.body);
    });
});