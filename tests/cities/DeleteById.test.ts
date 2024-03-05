import { testServer } from '../jest.setup';

describe('Delete City', () => {
  it('Deleted Record', async () => {
    const resCreated = await testServer
      .post('/cities')
      .send({ name: 'Cuiabá' });

    expect(resCreated.statusCode).toEqual(201);

    const resDeleted = await testServer
      .delete(`/cities/${resCreated.body}`)
      .send();

    expect(resDeleted.statusCode).toEqual(204);
  });

  it('Deleted Nonexisted City', async () => {
    const res1 = await testServer.delete('/cities/9999999999').send();

    expect(res1.statusCode).toEqual(404);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
