import request from 'supertest';
import app from '../../src/app';

describe('Cliente', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/clientes')
      .send({
        primeiro_nome: 'Adriano',
        ultimo_nome: 'Milagres',
        email: 'adriano.m.m1@gmail.com',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/clientes')
      .send({
        primeiro_nome: 'Adriano',
        ultimo_nome: 'Milagres',
        email: 'adriano.m.m1@gmail.com',
      });

    const response = await request(app)
      .post('/clientes')
      .send({
        primeiro_nome: 'Adriano',
        ultimo_nome: 'Milagres',
        email: 'adriano.m.m1@gmail.com',
      });

    expect(response.status).toBe(400);
  });
});
