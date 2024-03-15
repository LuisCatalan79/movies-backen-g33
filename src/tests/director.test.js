const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe retornar status 200', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
    const body = {
        firstName:"Pepito",
        lastName:"Perez",
        nationality:"Cualquier parte del mundo",
        image:"http://imagendeactor.com",
        birthday:"2000-06-15"
    };
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test('GET /directors/:id debe traer un director por su id', async () => {
    const res = await request(app).get(`/directors/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
});

test('GET /directors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).get('/directors/-1');
    expect(res.status).toBe(404);
});

test('PUT /directors/:id debe actualizar un director por su id', async () => {
    const body = {
        firstName:"Jose"
    };
    const res = await request(app).put(`/directors/${id}`).send(body);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /directors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/directors/-1');
    expect(res.status).toBe(404);
});

test('DELETE /dierectors/:id debe eliminar un director por su id', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});