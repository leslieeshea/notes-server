const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const Note = require('../../lib/models/Note.js');

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

  it('can get a list of notes', async() => {
    // eslint-disable-next-line no-unused-vars
    const testNote = Note.create({
      title: 'test',
      body: 'test'
    });
    const note = await request(app)
      .get('/api/v1/notes');

    expect(note.body).toHaveLength(1);
  });
});
