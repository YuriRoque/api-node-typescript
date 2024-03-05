import { testServer } from '../jest.setup';

describe('Get City By Id', () => {
  it('Get Record', async () => {
    const resCreated = await testServer
      .post('/cities')
      .send({ name: 'Cuiabá' });

    expect(resCreated.statusCode).toEqual(201);

    const resGetById = await testServer
      .get(`/cities/${resCreated.body}`)
      .send();

    expect(resGetById.statusCode).toEqual(200);
    expect(resGetById.body).toHaveProperty('name');
  });

  it('Get Nonexisted City', async () => {
    const res1 = await testServer.get('/cities/9999999999').send();

    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
