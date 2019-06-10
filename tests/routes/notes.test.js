const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');

describe('Notes routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new note', async() => {
    const note = await request(app)
      .post('/api/v1/notes')
      .send({
        title: 'new note title',
        body: 'new note body'
      });

    expect(note.body).toEqual({
      title: 'new note title',
      body: 'new note body',
      _id: expect.any(String),
      __v: 0
    });
  });
});
