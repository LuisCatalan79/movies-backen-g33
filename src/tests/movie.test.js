const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

let id;

test('GET /movies debe retornar status 200', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
    const body = {
        name:"Juanito en la ciudad",
        image:"http://imagendeunapelicula.com",
        synopsis:"la historia de juanito siendo juanito",
        releaseYear: 2024
    };
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});

test('GET /movies/:id debe traer la pelicula por su id', async () => {
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
});

test('GET /movies/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).post('/movies/-1/actors');
    expect(res.status).toBe(404);
});

test('PUT /movies/:id debe actualizar la pelicula por su id', async () => {
    const body = {
        name:"Juanito en la gran ciudad"
    };
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /movies/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/movies/-1');
    expect(res.status).toBe(404);
});

test('POST /movies/:id/actors agrega los actores de la pelicula', async () => {
    const actor = await Actor.create({
        firstName:"Alvin",
        lastName:"la ardilla",
        nationality:"Cualquier parte del mundo",
        image:"http://imagendeactor.com",
        birthday:"2000-06-15"
    });
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/actors con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).post('/movies/-1/actors').send([]);
    expect(res.status).toBe(404);
});

test('POST /movies/:id/directors agraga los directores a la pelicula', async () => {
    const director = await Director.create({
        firstName:"Alvin",
        lastName:"la ardilla",
        nationality:"Cualquier parte del mundo",
        image:"http://imagendeactor.com",
        birthday:"2000-06-15"
    });
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/dierctors con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).post('/movies/-1/directors').send([]);
    expect(res.status).toBe(404);
});

test('POST /movies/:id/genres agrega los generos a la pelicula ', async () => {
    const genre = await Genre.create({
        name:"lo que sea"
    });
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).post('/movies/-1/genres').send([]);
    expect(res.status).toBe(404);
});


test('DELETE /movies/:id debe eliminar una pelicula por su id', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});