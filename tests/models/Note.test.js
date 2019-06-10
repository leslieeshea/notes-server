const mongoose = require('mongoose');
const Note = require('../../lib/models/Note');

describe('Note model', () => {
  it('has a title and body', () => {
    const note = new Note({
      title: 'hello there',
      body: 'goodbye see you later'
    });

    expect(note.toJSON()).toEqual({
      title: 'hello there',
      body: 'goodbye see you later',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('requires a title and body', () => {
    const note = new Note({});
    const errors = note.validateSync().errors;

    expect(errors.title.message).toEqual('Path `title` is required.');
    expect(errors.body.message).toEqual('Path `body` is required.');
  });
});
