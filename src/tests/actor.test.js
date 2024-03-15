const request = require('supertest');
const app = require('../app');
const { NUMBER } = require('sequelize');

let id;

test('GET /actors debe retornar status 200', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
    const body ={
        firstName:"Juanito",
        lastName:"Perez",
        nationality:"Cualquier parte del mundo",
        image:"http://imagendeactor.com",
        birthday:"2000-06-15"
    };
    const res = await request(app).post('/actors').send(body);
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test('GET /actors/:id debe traer al actor por id', async () => {
    const res = await request(app).get(`/actors/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
});

test('GET /actors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).get('/actors/-1');
    expect(res.status).toBe(404);
});

test('PUT /actors/:id debe actualizar un actor por su id', async () => {
    const body ={
        firstName:"Juancho"
    };
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /actors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/actors/-1');
    expect(res.status).toBe(404);
});

test('DELETE /actors/:id debe eliminar un actor por su id', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});