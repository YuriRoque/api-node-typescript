import { testServer } from '../jest.setup';

describe('Create City', () => {
  it('Created Record', async () => {
    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Caxias do Sul' });

    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });

  it('Can\'t Put Short Name To Create Record', async () => {
    const res1 = await testServer.post('/cities').send({ name: 'Ca' });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.name');
  });
});
