const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres debe retornar status 200', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe crear un genero', async () => {
    const body = {
        name:"lo que sea"
    };
    const res = await request(app).post('/genres').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});

test('GET /genres/:id debe traer el genero por su id', async () => {
    const res=await request(app).get(`/genres/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
});

test('GET /genres/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).get('/genres/-1');
    expect(res.status).toBe(404);
});

test('PUT /genres/:id debe actualizar el genero por su id', async () => {
    const body = {
        name:"otro lo q sea"
    };
    const res = await request(app).put(`/genres/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /genres/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/genres/-1');
    expect(res.status).toBe(404);
});

test('DELETE /genres/:id debe eliminar el genero por su id', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});