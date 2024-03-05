import { testServer } from '../jest.setup';

describe('Get All Cities', () => {
  it('Got All Records', async () => {
    const resCreate = await testServer.post('/cities').send({ name: 'Cuiabá' });

    expect(resCreate.statusCode).toEqual(201);

    const resGotAll = await testServer.get('/cities').send();

    expect(Number(resGotAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGotAll.statusCode).toEqual(200);
    expect(resGotAll.body.length).toBeGreaterThan(0);
  });
});
