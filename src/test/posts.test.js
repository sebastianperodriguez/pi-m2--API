import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import pool from '../db/pool.js';

let authorId;
let postId;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/authors')
    .send({
      name: 'Author Posts Test',
      email: `poststest${Date.now()}@mail.com`,
      bio: 'Bio de prueba'
    });
  authorId = res.body.id;
});

afterAll(async () => {
  await pool.query('DELETE FROM authors WHERE id = $1', [authorId]);
  await pool.end();
});

describe('Posts endpoints', () => {
  it('POST /api/posts - crea un post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        author_id: authorId,
        title: 'Post de prueba',
        content: 'Contenido de prueba',
        published: true
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    postId = res.body.id;
  });

  it('GET /api/posts - lista todos los posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/posts/:id - obtiene un post por id', async () => {
    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(postId);
  });

  it('GET /api/posts/author/:authorId - posts por author', async () => {
    const res = await request(app).get(`/api/posts/author/${authorId}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

it('PUT /api/posts/:id - actualiza un post', async () => {
  const res = await request(app)
    .put(`/api/posts/${postId}`)
    .send({
      author_id: authorId,
      title: 'Post actualizado',
      content: 'Contenido actualizado',
      published: false
    });
  expect(res.status).toBe(200);
  expect(res.body.title).toBe('Post actualizado');
});

  it('DELETE /api/posts/:id - elimina un post', async () => {
    const res = await request(app).delete(`/api/posts/${postId}`);
    expect(res.status).toBe(204);
  });

  it('GET /api/posts/:id - devuelve 404 si no existe', async () => {
    const res = await request(app).get('/api/posts/999');
    expect(res.status).toBe(404);
  });

  it('POST /api/posts - devuelve 400 si title está vacío', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: '', content: 'algo', author_id: authorId });
    expect(res.status).toBe(400);
  });
});