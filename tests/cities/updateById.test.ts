import { testServer } from '../jest.setup';

describe('Update City', () => {
  it('Updated Record', async () => {
    const resCreated = await testServer
      .post('/cities')
      .send({ name: 'Cuiabá' });

    expect(resCreated.statusCode).toEqual(201);

    console.log(resCreated.body);

    const resUpdated = await testServer
      .put(`/cities/${resCreated.body}`)
      .send({ name: 'Várzea Grande' });

    expect(resUpdated.statusCode).toEqual(204);
  });

  it('Updated Nonexisted City', async () => {
    const res1 = await testServer
      .put('/cities/9999999999')
      .send({ name: 'Várzea Grande' });

    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
