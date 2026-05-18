import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import pool from '../db/pool.js';

afterAll(async () => {
  await pool.end();
});

describe('Authors endpoints', () => {
  let authorId;
  const uniqueEmail = `test${Date.now()}@mail.com`;

  it('POST /api/authors - crea un author', async () => {
    const res = await request(app)
      .post('/api/authors')
      .send({
        name: 'Test Author',
        email: uniqueEmail,
        bio: 'Bio de prueba'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Author');
    authorId = res.body.id;
  });

  it('GET /api/authors - lista todos los authors', async () => {
    const res = await request(app).get('/api/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/authors/:id - obtiene un author por id', async () => {
    const res = await request(app).get(`/api/authors/${authorId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(authorId);
  });

  it('PUT /api/authors/:id - actualiza un author', async () => {
    const res = await request(app)
      .put(`/api/authors/${authorId}`)
      .send({
        name: 'Author Actualizado',
        email: uniqueEmail,
        bio: 'Bio actualizada'
      });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Author Actualizado');
  });

  it('DELETE /api/authors/:id - elimina un author', async () => {
    const res = await request(app).delete(`/api/authors/${authorId}`);
    expect(res.status).toBe(204);
  });

  it('GET /api/authors/:id - devuelve 404 si no existe', async () => {
    const res = await request(app).get('/api/authors/999');
    expect(res.status).toBe(404);
  });

  it('POST /api/authors - devuelve 400 si name está vacío', async () => {
    const res = await request(app)
      .post('/api/authors')
      .send({ name: '', email: 'otro@mail.com' });
    expect(res.status).toBe(400);
  });
});
